import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/sections/contact";
import { ServiceDetailBlock } from "@/components/sections/services/service-detail-block";
import {
  SERVICE_ITEMS,
  SERVICE_PLACEHOLDER_IMAGE,
} from "@/shared/constants";

function slugToLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function serviceImages(slug: string): string[] {
  return [
    SERVICE_PLACEHOLDER_IMAGE,
    `https://picsum.photos/seed/${slug}-2/630/447`,
    `https://picsum.photos/seed/${slug}-3/630/447`,
  ];
}

function serviceImages2(slug: string): string[] {
  return [
    SERVICE_PLACEHOLDER_IMAGE,
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("meta.pageTitle", { name: slugToLabel(slug) }),
    description: t("meta.description"),
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = SERVICE_ITEMS.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  const tServices = await getTranslations("common.services");
  const tDetailDesc = await getTranslations("services.details.descriptions");
  return (
    <main className="pt-[90px] flex flex-col md:gap-[100px] gap-10 my-20">
      <ServiceDetailBlock
        title={tServices(service.key)}
        description={tDetailDesc(service.key)}
        images={serviceImages(service.slug)}
        direction="left"
      />
      <ServiceDetailBlock
        description={tDetailDesc(service.key)}
        images={serviceImages2(service.slug)}
        direction="right"
      />
      <ServiceDetailBlock
        description={tDetailDesc(service.key)}
        direction="left"
      />
      <ContactForm serviceName={tServices(service.key)} />
    </main>
  );
}
