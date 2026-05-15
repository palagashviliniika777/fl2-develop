import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { FAQ_KEYS } from "@/shared/constants";

export async function Faq() {
  const t = await getTranslations("landing.faq");

  return (
    <section className="mt-10 mb-10 lg:mt-[62px] lg:mb-[92px] bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-[20px] lg:flex-row lg:items-center lg:gap-20 lg:px-20 lg:py-20">
        <div className="lg:w-[35%] lg:shrink-0">
          <h2 className="text-xl font-bold uppercase tracking-wide text-text lg:text-[32px]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-text/70 lg:mt-6">
            {t("description")}
          </p>
        </div>

        <div className="flex-1">
          <Accordion defaultValue={[0]} className="flex flex-col gap-4">
            {FAQ_KEYS.map((key, i) => (
              <AccordionItem
                key={key}
                value={i}
                className="rounded-2xl bg-brown px-6 py-1 border-none"
              >
                <AccordionTrigger className="py-5 text-base lg:text-[20px] font-medium text-light hover:no-underline">
                  {t(`items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-light/70">
                  <p>{t(`items.${key}.answer`)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
