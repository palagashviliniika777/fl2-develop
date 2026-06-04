import { TestimonialsSlider } from "./testimonials-slider";
import type { LandingTestimonials } from "@/shared/types/landing";

type TestimonialsProps = {
  data: LandingTestimonials | null;
};

export function Testimonials({ data }: TestimonialsProps) {
  const items = (data?.items ?? []).map((item) => ({
    quote: item.quote ?? "",
    name: item.name ?? "",
    role: item.role ?? "",
    rating: item.rating,
    image: item.image ?? "",
  }));

  return (
    <section className="mb-10 lg:mb-[134px] overflow-hidden py-[20px] lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
        {data?.title && (
          <h2 className="text-left text-xl font-bold uppercase tracking-wide text-text lg:text-center lg:text-[32px]">
            {data.title}
          </h2>
        )}
        {data?.description && (
          <p className="mt-4 max-w-3xl text-left text-base leading-relaxed text-text/70 lg:mx-auto lg:mt-6 lg:text-center">
            {data.description}
          </p>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-10 w-full px-6 lg:mt-14 lg:px-0">
          <TestimonialsSlider items={items} />
        </div>
      )}
    </section>
  );
}