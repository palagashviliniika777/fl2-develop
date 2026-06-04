import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHeroSlider, AboutInfo } from "@/components/sections/about";
import { getAboutPage } from "@/lib/sanity/queries/about";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const about = await getAboutPage(locale);

  return (
    <main>
      <AboutHeroSlider images={about?.heroImages ?? []} />
      <AboutInfo data={about?.info ?? null} />
    </main>
  );
}
