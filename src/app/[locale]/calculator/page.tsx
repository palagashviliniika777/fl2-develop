import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calculator } from "@/components/sections/calculator/calculator";
import { getAllServicesForCalculator } from "@/lib/sanity/queries/services";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await getAllServicesForCalculator(locale);

  return (
    <main className="pt-[90px] bg-light min-h-screen">
      <Calculator services={services} />
    </main>
  );
}
