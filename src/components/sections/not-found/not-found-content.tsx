import { ArrowLeft, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function NotFoundContent() {
  const t = await getTranslations("not-found");

  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[calc(100svh-12rem)] max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center lg:px-20 lg:py-28"
    >
      <div className="w-full max-w-xl rounded-[20px] border border-brown/15 bg-white px-8 py-12 lg:px-12 lg:py-16">
        <p
          aria-hidden="true"
          className="text-[clamp(4rem,12vw,7rem)] font-bold leading-none text-gold/25"
        >
          {t("code")}
        </p>

        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-bold uppercase tracking-wide text-text lg:text-[32px]"
        >
          {t("title")}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text/60">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brown px-8 py-3.5 text-sm font-semibold text-light transition-opacity duration-200 hover:opacity-90 sm:w-auto"
          >
            <Home className="size-4" aria-hidden="true" />
            {t("backHome")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-brown/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-brown hover:bg-cream sm:w-auto"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
