import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AboutSlider } from "./about-slider";

export async function About() {
  const t = await getTranslations("landing.about");

  return (
    <section className="bg-brown">
      <div className="mx-auto flex max-w-[1440px] flex-col px-6 py-[20px] lg:flex-row lg:px-20 lg:py-20">
        <div className="flex flex-col justify-center lg:w-[45%]">
          <div className="flex items-start justify-between gap-4 lg:contents">
            <h2 className="text-xl font-bold uppercase tracking-wide text-light lg:text-[32px]">
              {t("title")}
            </h2>
            <Link
              href="/about"
              className="text-light shrink-0 pt-1 transition-opacity hover:opacity-90 lg:hidden"
              aria-label={t("cta")}
            >
              <ArrowRight className="size-7" strokeWidth={1.75} />
            </Link>
          </div>
          <p className="mt-4 lg:mt-6 max-w-lg text-base leading-relaxed text-light/70">
            {t("description")}
          </p>
          <div className="mt-8 hidden lg:block">
            <Link
              href="/about"
              className="inline-block rounded-full bg-white/15 px-18 py-3 text-sm font-bold border border-light text-light transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </Link>
          </div>
        </div>

        <div className="mt-6 h-auto overflow-hidden lg:mt-0 lg:h-[556px] lg:min-h-0 lg:w-[53%] lg:pr-10">
          <AboutSlider />
        </div>
      </div>
    </section>
  );
}
