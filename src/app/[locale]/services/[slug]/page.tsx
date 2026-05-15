import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

function slugToLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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
  const t = await getTranslations("services.details");

  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-zinc-500">{slug}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {t("overview")}
      </h1>
    </main>
  );
}
