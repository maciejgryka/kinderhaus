/// <reference types="@cloudflare/workers-types" />

interface Env {
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
  ADMIN_PASSWORD: string;
}

const FILE_PATH = "src/data/hospitationen.json";
const BRANCH = "main";
const VALID_STATUSES = new Set(["frei", "belegt"]);
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type HospitationStatus = "frei" | "belegt";

interface HospitationRow {
  date: string;
  platz1: HospitationStatus;
  platz2: HospitationStatus;
}

class ValidationError extends Error {}

function checkAuth(request: Request, env: Env): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === env.ADMIN_PASSWORD;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStatus(value: unknown): value is HospitationStatus {
  return typeof value === "string" && VALID_STATUSES.has(value);
}

function getBerlinToday(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  if (!day || !month || !year) {
    throw new Error("Could not determine current date");
  }

  return `${year}-${month}-${day}`;
}

function parseRows(value: unknown, fieldName: string): HospitationRow[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array`);
  }

  const rows = value.map((row, index) => {
    if (!isRecord(row)) {
      throw new ValidationError(`${fieldName}[${index}] must be an object`);
    }

    const { date, platz1, platz2 } = row;

    if (typeof date !== "string" || !ISO_DATE_RE.test(date)) {
      throw new ValidationError(`${fieldName}[${index}].date must be YYYY-MM-DD`);
    }

    if (!isStatus(platz1)) {
      throw new ValidationError(`${fieldName}[${index}].platz1 must be "frei" or "belegt"`);
    }

    if (!isStatus(platz2)) {
      throw new ValidationError(`${fieldName}[${index}].platz2 must be "frei" or "belegt"`);
    }

    return { date, platz1, platz2 };
  });

  const seenDates = new Set<string>();
  for (const row of rows) {
    if (seenDates.has(row.date)) {
      throw new ValidationError(`${fieldName} contains duplicate date ${row.date}`);
    }
    seenDates.add(row.date);
  }

  return rows;
}

function decodeGitHubFile(content: string): string {
  const bytes = Uint8Array.from(atob(content.replace(/\n/g, "")), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeForGitHub(content: string): string {
  const bytes = new TextEncoder().encode(content);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function mergeRows(existingRows: HospitationRow[], incomingRows: HospitationRow[]): HospitationRow[] {
  const today = getBerlinToday();
  const existingByDate = new Map(existingRows.map((row) => [row.date, row]));
  const mergedByDate = new Map(existingByDate);

  for (const row of incomingRows) {
    const existing = existingByDate.get(row.date);
    const hasChanged =
      !existing || existing.platz1 !== row.platz1 || existing.platz2 !== row.platz2;

    if (hasChanged && row.date <= today) {
      throw new ValidationError(`date ${row.date} must be in the future to be updated`);
    }

    mergedByDate.set(row.date, row);
  }

  return Array.from(mergedByDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

async function getFileFromGitHub(env: Env) {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `token ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "kinderhaus-admin",
      },
    }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<{ content: string; sha: string }>;
}

async function updateFileOnGitHub(env: Env, content: string, sha: string) {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "kinderhaus-admin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "update hospitation availability",
        content: encodeForGitHub(content),
        sha,
        branch: BRANCH,
      }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${body}`);
  }
  return res.json();
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  if (!checkAuth(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const file = await getFileFromGitHub(env);
    const decoded = decodeGitHubFile(file.content);
    const data = parseRows(JSON.parse(decoded), "data");

    return new Response(JSON.stringify({ data, sha: file.sha }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(error.message, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  if (!checkAuth(request, env)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = (await request.json()) as { data?: unknown };
    const incomingRows = parseRows(body.data, "data");
    const file = await getFileFromGitHub(env);
    const existingRows = parseRows(JSON.parse(decodeGitHubFile(file.content)), "existing data");
    const mergedRows = mergeRows(existingRows, incomingRows);
    const content = JSON.stringify(mergedRows, null, 2) + "\n";

    await updateFileOnGitHub(env, content, file.sha);
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(error.message, { status: 400 });
    }
    throw error;
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
