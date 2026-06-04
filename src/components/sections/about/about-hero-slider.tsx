"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperClass } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

type AboutHeroSliderProps = {
  images: string[];
};

export function AboutHeroSlider({ images }: AboutHeroSliderProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="relative h-[600px] overflow-hidden bg-brown max-lg:rounded-[40px] lg:rounded-t-none lg:rounded-b-[40px]">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="!h-full !w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="!h-full">
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 bg-black/50" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-6 lg:px-10">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
