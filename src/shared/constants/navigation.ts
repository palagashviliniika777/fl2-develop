import type { Locale } from "@/i18n/routing";

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const SERVICE_ITEMS = [
  { key: "stretchedFloor", slug: "stretched-floor" },
  { key: "selfLevelingFloor", slug: "self-leveling-floor" },
  { key: "epoxyFloor", slug: "epoxy-floor" },
  { key: "vinylCovering", slug: "vinyl-covering" },
  { key: "terrazzoFloor", slug: "terrazzo-floor" },
  { key: "softFloorAndCarpet", slug: "soft-floor-and-carpet" },
] as const;

export const TRANSPARENT_NAV_ROUTES = ["/", "/about"] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "ENG",
  ka: "GEO",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  ka: "🇬🇪",
};
