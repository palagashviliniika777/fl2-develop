import { getTranslations } from "next-intl/server";
import { TestimonialsSlider } from "./testimonials-slider";
import { TESTIMONIALS } from "@/shared/constants";

export async function Testimonials() {
  const t = await getTranslations("landing.testimonials");

  const items = TESTIMONIALS.map((testimonial) => ({
    quote: t(`items.${testimonial.key}.quote`),
    name: t(`items.${testimonial.key}.name`),
    role: t(`items.${testimonial.key}.role`),
    rating: testimonial.rating,
    image: testimonial.image,
  }));

  return (
    <section className="mb-10 lg:mb-[134px] overflow-hidden">
      <div className="mx-auto max-w-[1440px] py-[20px] lg:py-20">
        <div className="px-6 lg:px-20">
          <h2 className="text-left text-xl font-bold uppercase tracking-wide text-text lg:text-center lg:text-[32px]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-3xl text-left text-base leading-relaxed text-text/70 lg:mx-auto lg:mt-6 lg:text-center">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 w-full lg:mt-14">
          <TestimonialsSlider items={items} />
        </div>
      </div>
    </section>
  );
}