import { sanityClient } from "@/lib/sanity/client";
import type { AboutPageData } from "@/shared/types/about";

export type { AboutPrinciple, AboutInfo, AboutPageData } from "@/shared/types/about";

const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    "heroImages": hero.images[].asset->url,
    "info": {
      "heading": info.heading[$locale],
      "subtitle": info.subtitle[$locale],
      "body": info.body[$locale],
      "principlesHeading": info.principlesHeading[$locale],
      "principles": info.principles[]{
        "title": title[$locale],
        "description": description[$locale],
      },
    },
  }
`;

export async function getAboutPage(locale: string): Promise<AboutPageData | null> {
  return sanityClient.fetch<AboutPageData | null>(ABOUT_PAGE_QUERY, { locale });
}
