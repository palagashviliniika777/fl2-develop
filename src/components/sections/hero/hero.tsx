import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("landing.hero");

  return (
    <section className="relative flex h-[670px] max-h-screen items-end overflow-hidden bg-brown max-lg:rounded-[40px] lg:rounded-t-none lg:rounded-b-[40px]">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={85}
      />

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-[336px] lg:px-20 lg:pb-[336px]">
        <h1 className="max-w-3xl text-2xl font-bold leading-tight text-light sm:text-4xl lg:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-light sm:text-xl">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
