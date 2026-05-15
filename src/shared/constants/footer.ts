import type { StaticImageData } from "next/image";
import { SERVICE_ITEMS } from "./navigation";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
  TiktokLogo,
} from "@/shared/icons";

export const FOOTER_NAV_KEYS = [
  "home",
  "services",
  "about",
  "contact",
  "blog",
] as const;

export type FooterNavKey = (typeof FOOTER_NAV_KEYS)[number];

export type SocialLinkKey =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok";

export const SOCIAL_LINKS: {
  key: SocialLinkKey;
  href: string;
  icon: StaticImageData;
}[] = [
  { key: "facebook", href: "https://facebook.com", icon: FacebookLogo },
  { key: "instagram", href: "https://instagram.com", icon: InstagramLogo },
  { key: "linkedin", href: "https://linkedin.com", icon: LinkedinLogo },
  { key: "youtube", href: "https://youtube.com", icon: YoutubeLogo },
  { key: "tiktok", href: "https://tiktok.com", icon: TiktokLogo },
];

export function getFooterHref(key: FooterNavKey) {
  if (key === "home") return "/";
  if (key === "services") return `/services/${SERVICE_ITEMS[0].slug}`;
  return `/${key}`;
}
