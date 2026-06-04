import { ServicesSlider } from "./services-slider";
import { ServicesGrid } from "./services-grid";
import type { LandingServicesSection } from "@/shared/types/landing";
import type { ServiceListItem } from "@/shared/types/service";

type ServicesProps = {
  section: LandingServicesSection | null;
  items: ServiceListItem[];
  viewAllLabel: string;
};

export function Services({ section, items, viewAllLabel }: ServicesProps) {
  return (
    <section className="mt-10 mb-14 overflow-hidden border border-brown/30">
      <div className="mx-auto max-w-[1440px] px-6 py-[20px] lg:px-20 lg:py-20">
        {section?.title && (
          <h2 className="text-left text-xl font-bold uppercase tracking-wide text-text lg:text-center lg:text-[32px]">
            {section.title}
          </h2>
        )}
        {section?.description && (
          <p className="mx-auto mt-4 max-w-3xl text-left text-base leading-relaxed text-text/70 lg:mx-auto lg:mt-6 lg:text-center">
            {section.description}
          </p>
        )}

        <div className="mt-10 lg:mt-14">
          <ServicesSlider items={items} />
        </div>

        <ServicesGrid items={items} viewAllLabel={section?.cta ?? viewAllLabel} />
      </div>
    </section>
  );
}
