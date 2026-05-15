/** Plain 200 for uptime checks; bypasses locale middleware (see `src/proxy.ts` matcher). */
export function GET() {
  return new Response("ok", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
