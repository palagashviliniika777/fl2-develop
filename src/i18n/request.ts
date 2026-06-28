import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

const NAMESPACES = [
  "common",
  "landing",
  "services",
  "about",
  "contact",
  "calculator",
  "not-found",
] as const;

async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../../messages/${locale}/${ns}.json`);
      return [ns, mod.default] as const;
    })
  );

  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
