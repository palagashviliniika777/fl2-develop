import { sanityClient } from "@/lib/sanity/client";
import type {
  ServiceNavItem,
  ServiceCalculatorItem,
  ServiceListItem,
  ServiceDetail,
} from "@/shared/types/service";

export type { ServiceNavItem, ThicknessOption, ServiceCalculatorItem, ServiceListItem, ServiceDescriptionBlock, ServiceDetail } from "@/shared/types/service";

const ALL_SERVICES_NAV_QUERY = `
  *[_type == "service"] | order(_createdAt asc) {
    "name": name[$locale],
    "slug": slug.current,
  }
`;

const ALL_SERVICES_LIST_QUERY = `
  *[_type == "service"] | order(_createdAt asc) {
    "name": name[$locale],
    "slug": slug.current,
    "shortDescription": shortDescription[$locale],
    "featuredImage": featuredImage.asset->url,
  }
`;

const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug][0]{
    "name": name[$locale],
    "slug": slug.current,
    "featuredImage": featuredImage.asset->url,
    pricePerSqm,
    "descriptionBlocks": descriptionBlocks[]{
      "text": text[$locale],
      "images": images[].asset->url,
    },
  }
`;

const ALL_SERVICES_CALCULATOR_QUERY = `
  *[_type == "service"] | order(_createdAt asc) {
    "name": name[$locale],
    "slug": slug.current,
    "featuredImage": featuredImage.asset->url,
    pricePerSqm,
    "thicknessOptions": thicknessOptions[]{
      "label": label[$locale],
      "description": description[$locale],
      price,
    },
  }
`;

const ALL_SERVICE_SLUGS_QUERY = `
  *[_type == "service"]{ "slug": slug.current }
`;

export async function getAllServicesNav(
  locale: string,
): Promise<ServiceNavItem[]> {
  return (
    (await sanityClient.fetch<ServiceNavItem[]>(ALL_SERVICES_NAV_QUERY, {
      locale,
    })) ?? []
  );
}

export async function getAllServices(
  locale: string,
): Promise<ServiceListItem[]> {
  return (
    (await sanityClient.fetch<ServiceListItem[]>(ALL_SERVICES_LIST_QUERY, {
      locale,
    })) ?? []
  );
}

export async function getServiceBySlug(
  slug: string,
  locale: string,
): Promise<ServiceDetail | null> {
  return sanityClient.fetch<ServiceDetail | null>(SERVICE_BY_SLUG_QUERY, {
    slug,
    locale,
  });
}

export async function getAllServicesForCalculator(
  locale: string,
): Promise<ServiceCalculatorItem[]> {
  return (
    (await sanityClient.fetch<ServiceCalculatorItem[]>(
      ALL_SERVICES_CALCULATOR_QUERY,
      { locale },
    )) ?? []
  );
}

export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
  return (
    (await sanityClient.fetch<{ slug: string }[]>(ALL_SERVICE_SLUGS_QUERY)) ??
    []
  );
}
