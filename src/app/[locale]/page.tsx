import { setRequestLocale } from "next-intl/server";
import { UnderConstruction } from "@/components/under-construction";
import { Hero, Services, About, Faq, Testimonials } from "@/components/sections";

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

  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Faq />
      <Testimonials />
    </main>
  );
}
