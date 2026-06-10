import Image from "next/image";
import type { LandingHero } from "@/shared/types/landing";

type HeroProps = {
  data: LandingHero | null;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative flex h-[670px] max-h-screen items-end overflow-hidden bg-brown max-lg:h-auto max-lg:min-h-[min(670px,100svh)] max-lg:items-start max-lg:rounded-[40px] lg:rounded-t-none lg:rounded-b-[40px]">
      <Image
        src={data?.image ?? "/images/hero.jpg"}
        alt=""
        fill
        className="object-cover"
        priority
        quality={85}
      />

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-24 pb-12 max-lg:pt-28 lg:px-20 lg:pt-0 lg:pb-[336px]">
        {data?.title && (
          <h1 className="max-w-3xl text-2xl font-bold leading-snug text-light sm:text-4xl lg:text-4xl lg:leading-tight">
            {data.title}
          </h1>
        )}
        {data?.description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-light sm:text-xl">
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
}
