import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ContactForm } from "@/components/sections/contact";
import { ServiceDetailBlock } from "@/components/sections/services/service-detail-block";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/sanity/queries/services";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.flatMap(({ slug }) =>
    routing.locales.map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale);
  if (!service) return {};
  return {
    title: service.name ? `${service.name} — FL2` : "FL2",
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug(slug, locale);
  if (!service) notFound();

  return (
    <main className="pt-[90px] flex flex-col md:gap-[100px] gap-10 my-20">
      {service.descriptionBlocks.map((block, i) => (
        <ServiceDetailBlock
          key={i}
          title={i === 0 ? (service.name ?? undefined) : undefined}
          description={block.text ?? ""}
          images={block.images ?? []}
          direction={i % 2 === 0 ? "left" : "right"}
        />
      ))}
      <ContactForm serviceName={service.name ?? undefined} />
    </main>
  );
}
