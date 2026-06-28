import type { Locale } from "@/i18n/routing";
export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;


export const TRANSPARENT_NAV_ROUTES = ["/", "/about"] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "ENG",
  ka: "GEO",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "/icons/en.png",
  ka: "/icons/ge.png",
};
