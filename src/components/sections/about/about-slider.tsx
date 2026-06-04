"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperClass } from "swiper/react";
import Image from "next/image";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";

const LG_QUERY = "(min-width: 1024px)";

type AboutSliderProps = {
  images: string[];
};

export const AboutSlider = ({ images }: AboutSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex w-full flex-col gap-3 lg:h-full lg:flex-row lg:items-stretch lg:gap-3">
      <Swiper
        key={isLg ? "vertical" : "horizontal"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay]}
        direction={isLg ? "vertical" : "horizontal"}
        slidesPerView={1.2}
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        autoHeight={!isLg}
        style={isLg ? { height: "100%" } : undefined}
        spaceBetween={16}
        className="!w-full min-h-0 lg:min-h-0 lg:flex-1 lg:!h-full"
      >
        {images.map((src, i) => (
          <SwiperSlide
            key={i}
            className="overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:absolute lg:inset-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 45vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex shrink-0 flex-row items-center justify-center gap-4 lg:flex-col lg:justify-center lg:gap-2">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer text-white/50 transition-colors hover:text-white lg:hidden"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden cursor-pointer text-white/50 transition-colors hover:text-white lg:block"
          aria-label="Previous slide"
        >
          <ChevronUp className="size-4" />
        </button>

        <div className="flex flex-row items-center gap-1.5 lg:flex-col">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => swiperRef.current?.slideTo(i)}
              className={`size-2 cursor-pointer rounded-full transition-opacity ${
                i === activeIndex ? "bg-white opacity-100" : "bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer text-white/50 transition-colors hover:text-white lg:hidden"
          aria-label="Next slide"
        >
          <ChevronRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden cursor-pointer text-white/50 transition-colors hover:text-white lg:block"
          aria-label="Next slide"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
};
