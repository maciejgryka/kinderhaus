/// <reference types="@cloudflare/workers-types" />

export const onRequestGet: PagesFunction = async () => {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hospitation Admin</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #faf8f3; color: #2d2a26; padding: 1rem; max-width: 600px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    .login { margin-top: 2rem; }
    .login input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem; font-size: 1rem; width: 100%; margin-bottom: 0.5rem; }
    .login button { padding: 0.5rem 1.5rem; }
    button { background: #f0c846; border: none; padding: 0.6rem 1.5rem; border-radius: 2rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
    button:hover { background: #d4a72c; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .msg { margin: 1rem 0; padding: 0.75rem; border-radius: 0.5rem; font-size: 0.9rem; }
    .msg.ok { background: #d4edda; color: #155724; }
    .msg.err { background: #f8d7da; color: #721c24; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem; }
    th { text-align: left; padding: 0.5rem; background: rgba(240, 200, 70, 0.3); font-weight: 600; }
    td { padding: 0.4rem 0.5rem; }
    tr:nth-child(even) { background: #f0ece2; }
    td.center { text-align: center; }
    input[type="checkbox"] { width: 1.2rem; height: 1.2rem; cursor: pointer; accent-color: #f0c846; }
    .actions { display: flex; gap: 0.5rem; align-items: center; margin-top: 1rem; }
    #status { font-size: 0.85rem; }
  </style>
</head>
<body>
  <h1>Hospitation Admin</h1>

  <div id="login-form" class="login">
    <input type="password" id="password" placeholder="Passwort" autocomplete="current-password">
    <button onclick="login()">Anmelden</button>
  </div>

  <div id="app" style="display:none">
    <p style="font-size:0.85rem;color:#666;margin-bottom:0.5rem;">Haken setzen = belegt, kein Haken = frei.</p>
    <table>
      <thead>
        <tr><th>Tag</th><th>Datum</th><th class="center">Platz 1</th><th class="center">Platz 2</th></tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
    <div class="actions">
      <button id="save-btn" onclick="save()">Speichern</button>
      <span id="status"></span>
    </div>
  </div>

  <div id="msg"></div>

  <script>
    let token = localStorage.getItem("hospitation_token") || "";
    let currentData = [];

    const dayNames = { 0:"So", 1:"Mo", 2:"Di", 3:"Mi", 4:"Do", 5:"Fr", 6:"Sa" };

    function berlinToday() {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(new Date());
      const day = parts.find(part => part.type === "day")?.value;
      const month = parts.find(part => part.type === "month")?.value;
      const year = parts.find(part => part.type === "year")?.value;
      return year && month && day ? year + "-" + month + "-" + day : "";
    }

    if (token) loadData();

    function showMsg(text, ok) {
      const el = document.getElementById("msg");
      el.className = "msg " + (ok ? "ok" : "err");
      el.textContent = text;
      setTimeout(() => el.textContent = "", 5000);
    }

    async function api(method, body) {
      const opts = {
        method,
        headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
      };
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch("/api/hospitationen", opts);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(res.status === 401 ? "Falsches Passwort" : (errorText || ("Fehler: " + res.status)));
      }
      return res.json();
    }

    async function login() {
      token = document.getElementById("password").value;
      try {
        await loadData();
        localStorage.setItem("hospitation_token", token);
      } catch (e) {
        token = "";
        showMsg(e.message, false);
      }
    }

    async function loadData() {
      const result = await api("GET");
      currentData = result.data;
      document.getElementById("login-form").style.display = "none";
      document.getElementById("app").style.display = "block";
      render();
    }

    function render() {
      const tbody = document.getElementById("tbody");
      const today = berlinToday();
      tbody.innerHTML = "";
      const futureData = currentData.filter(row => row.date > today);
      futureData.forEach((row, i) => {
        const d = new Date(row.date + "T00:00:00");
        const day = dayNames[d.getDay()];
        const formatted = d.toLocaleDateString("de-DE", { day:"2-digit", month:"2-digit", year:"numeric" });
        const tr = document.createElement("tr");
        function addTextCell(text) {
          const td = document.createElement("td");
          td.textContent = text;
          return td;
        }
        function addCheckboxCell(date, slot, checked) {
          const td = document.createElement("td");
          td.className = "center";
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.dataset.date = date;
          cb.dataset.slot = slot;
          cb.checked = checked;
          td.appendChild(cb);
          return td;
        }
        tr.appendChild(addTextCell(day));
        tr.appendChild(addTextCell(formatted));
        tr.appendChild(addCheckboxCell(row.date, "platz1", row.platz1 === "belegt"));
        tr.appendChild(addCheckboxCell(row.date, "platz2", row.platz2 === "belegt"));
        tbody.appendChild(tr);
      });
    }

    async function save() {
      const btn = document.getElementById("save-btn");
      const status = document.getElementById("status");
      btn.disabled = true;
      status.textContent = "Speichern...";

      const byDate = new Map(currentData.map(row => [row.date, row]));
      document.querySelectorAll("#tbody input[type=checkbox]").forEach(cb => {
        const row = byDate.get(cb.dataset.date);
        if (row) row[cb.dataset.slot] = cb.checked ? "belegt" : "frei";
      });

      try {
        await api("PUT", { data: currentData });
        status.textContent = "";
        showMsg("Gespeichert! Die Seite wird in 1-2 Minuten aktualisiert.", true);
        await loadData();
      } catch (e) {
        showMsg("Fehler beim Speichern: " + e.message, false);
        status.textContent = "";
      } finally {
        btn.disabled = false;
      }
    }

    // Enter key on password field
    document.getElementById("password").addEventListener("keydown", e => {
      if (e.key === "Enter") login();
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store",
    },
  });
};
