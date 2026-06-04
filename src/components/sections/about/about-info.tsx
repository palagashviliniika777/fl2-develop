import type { AboutInfo as AboutInfoData } from "@/shared/types/about";

type AboutInfoProps = {
  data: AboutInfoData | null;
};

export function AboutInfo({ data }: AboutInfoProps) {
  return (
    <section className="bg-light">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            {data?.heading && (
              <h1 className="text-xl font-extrabold uppercase tracking-wide text-text lg:text-[32px] lg:leading-tight">
                {data.heading}
              </h1>
            )}
            {data?.subtitle && (
              <p className="text-base font-semibold text-text lg:text-2xl">
                {data.subtitle}
              </p>
            )}
            {data?.body && (
              <p className="text-base leading-relaxed text-text/70 lg:text-lg">
                {data.body}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {data?.principlesHeading && (
              <p className="text-base font-semibold text-text lg:text-lg">
                {data.principlesHeading}
              </p>
            )}
            {(data?.principles ?? []).length > 0 && (
              <div className="flex flex-col gap-4">
                {data!.principles.map((principle, i) => (
                  <div key={i} className="border-l border-brown/50 pl-5 py-2">
                    {principle.title && (
                      <p className="text-base font-semibold text-text lg:text-lg">
                        {principle.title}
                      </p>
                    )}
                    {principle.description && (
                      <p className="mt-1 text-sm leading-relaxed text-text/70 lg:text-base">
                        {principle.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
