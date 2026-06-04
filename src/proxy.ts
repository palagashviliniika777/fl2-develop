// Next.js 16+ file convention (replaces middleware.ts). Required for next-intl
// localePrefix: "always" — redirects `/` to /ka or /en (locale detection), validates segments.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/((?!studio|api|_next|_vercel|.*\\..*).*)",
  ],
};
