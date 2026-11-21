/// <reference types="@cloudflare/workers-types" />

import { handleAdmin } from "./admin";
import { type Env, handleGet, handlePut } from "./hospitationen";

// Static files in dist/ are served by Workers Assets. Only the paths listed in
// run_worker_first in wrangler.jsonc reach this handler.
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (pathname === "/admin" || pathname === "/admin/") {
      if (method === "GET" || method === "HEAD") return handleAdmin();
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET" } });
    }

    if (pathname === "/api/hospitationen") {
      if (method === "GET") return handleGet(request, env);
      if (method === "PUT") return handlePut(request, env);
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, PUT" } });
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
