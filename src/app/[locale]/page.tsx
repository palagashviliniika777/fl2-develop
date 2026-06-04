import { getTranslations, setRequestLocale } from "next-intl/server";
import { UnderConstruction } from "@/components/under-construction";
import { Hero, Services, About, Faq, Testimonials } from "@/components/sections";
import { getLandingPage } from "@/lib/sanity/queries/landing";
import { getAllServices } from "@/lib/sanity/queries/services";

export const revalidate = 60;

const isUnderConstruction =
  process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }

  const t = await getTranslations("landing.services");

  const [landing, serviceItems] = await Promise.all([
    getLandingPage(locale),
    getAllServices(locale),
  ]);

  return (
    <main>
      <Hero data={landing?.hero ?? null} />
      <Services
        section={landing?.services ?? null}
        items={serviceItems}
        viewAllLabel={t("viewAll")}
      />
      <About data={landing?.about ?? null} />
      <Faq data={landing?.faq ?? null} />
      <Testimonials data={landing?.testimonials ?? null} />
    </main>
  );
}
