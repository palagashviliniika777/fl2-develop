import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { LandingFaq } from "@/shared/types/landing";

type FaqProps = {
  data: LandingFaq | null;
};

export function Faq({ data }: FaqProps) {
  return (
    <section className="mt-10 mb-10 lg:mt-[62px] lg:mb-[92px] bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-[20px] lg:flex-row lg:items-center lg:gap-20 lg:px-20 lg:py-20">
        <div className="lg:w-[35%] lg:shrink-0">
          {data?.title && (
            <h2 className="text-xl font-bold uppercase tracking-wide text-text lg:text-[32px]">
              {data.title}
            </h2>
          )}
          {data?.description && (
            <p className="mt-4 max-w-lg text-base leading-relaxed text-text/70 lg:mt-6">
              {data.description}
            </p>
          )}
        </div>

        <div className="flex-1">
          <Accordion defaultValue={[0]} className="flex flex-col gap-4">
            {(data?.items ?? []).map((item, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="rounded-2xl bg-brown px-6 py-1 border-none"
              >
                <AccordionTrigger className="cursor-pointer py-5 text-base lg:text-[20px] font-medium text-light hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-light/70">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
