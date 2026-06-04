import { sanityClient } from "@/lib/sanity/client";
import type { LandingPageData } from "@/shared/types/landing";

export type { LandingHero, LandingServicesSection, LandingAbout, LandingFaqItem, LandingFaq, LandingTestimonialItem, LandingTestimonials, LandingPageData } from "@/shared/types/landing";

const LANDING_PAGE_QUERY = `
  *[_type == "landingPage" && _id == "landingPage"][0]{
    "hero": {
      "image": hero.image.asset->url,
      "title": hero.title[$locale],
      "description": hero.description[$locale],
    },
    "services": {
      "title": services.title[$locale],
      "description": services.description[$locale],
      "cta": services.cta[$locale],
    },
    "about": {
      "title": about.title[$locale],
      "description": about.description[$locale],
      "cta": about.cta[$locale],
      "images": about.images[].asset->url,
    },
    "faq": {
      "title": faq.title[$locale],
      "description": faq.description[$locale],
      "items": faq.items[]{
        "question": question[$locale],
        "answer": answer[$locale],
      },
    },
    "testimonials": {
      "title": testimonials.title[$locale],
      "description": testimonials.description[$locale],
      "items": testimonials.items[]{
        "quote": quote[$locale],
        "name": name[$locale],
        "role": role[$locale],
        rating,
        "image": image.asset->url,
      },
    },
  }
`;

export async function getLandingPage(locale: string): Promise<LandingPageData | null> {
  return sanityClient.fetch<LandingPageData | null>(LANDING_PAGE_QUERY, { locale });
}
