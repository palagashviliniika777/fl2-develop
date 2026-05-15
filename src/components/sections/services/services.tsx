import { getTranslations } from "next-intl/server";
import { SERVICE_ITEMS, SERVICE_PLACEHOLDER_IMAGE } from "@/shared/constants";
import { ServicesSlider } from "./services-slider";
import { ServicesGrid } from "./services-grid";

export async function Services() {
  const t = await getTranslations("landing.services");
  const tCommon = await getTranslations("common.services");

  const tDesc = await getTranslations("common.serviceDescriptions");

  const items = SERVICE_ITEMS.map((service) => ({
    title: tCommon(service.key),
    description: tDesc(service.key),
    slug: service.slug,
    image: SERVICE_PLACEHOLDER_IMAGE,
  }));

  return (
    <section className="mt-10 mb-14 overflow-hidden border border-brown/30">
      <div className="mx-auto max-w-[1440px] px-6 py-[20px] lg:px-20 lg:py-20">
        <h2 className="text-left text-xl font-bold uppercase tracking-wide text-text lg:text-center lg:text-[32px]">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-left text-base leading-relaxed text-text/70 lg:mx-auto lg:mt-6 lg:text-center">
          {t("description")}
        </p>

        <div className="mt-10 lg:mt-14">
          <ServicesSlider items={items} />
        </div>

        <ServicesGrid items={items} viewAllLabel={t("viewAll")} />
      </div>
    </section>
  );
}
