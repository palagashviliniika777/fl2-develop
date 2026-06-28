import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Calculator } from "@/components/sections/calculator/calculator";
import { getAllServicesForCalculator } from "@/lib/sanity/queries/services";
import { SHOW_CALCULATOR } from "@/shared/constants/features";

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

  if (!SHOW_CALCULATOR) {
    notFound();
  }

  const services = await getAllServicesForCalculator(locale);

  return (
    <main className="pt-[90px] bg-light min-h-screen">
      <Calculator services={services} />
    </main>
  );
}
