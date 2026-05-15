"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { StarRating } from "./star-rating";

import "swiper/css";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  image: string;
};

type TestimonialsSliderProps = {
  items: TestimonialItem[];
};

export const TestimonialsSlider = ({ items }: TestimonialsSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1.1}
      spaceBetween={16}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2.1, spaceBetween: 20 },
        1024: { slidesPerView: 3.1, spaceBetween: 24 },
      }}
      className="!overflow-hidden [&_.swiper-wrapper]:items-stretch"
    >
      {items.map((item, i) => (
        <SwiperSlide key={i} className="!h-auto">
          <article className="flex h-full min-h-[320px] flex-col rounded-[40px] border border-[#F2E2CA] bg-cream p-6 lg:min-h-[340px] lg:p-8">
            <StarRating filled={item.rating} />

            <p className="mt-4 flex-1 text-sm leading-relaxed text-text/80 lg:text-base">
              {item.quote}
            </p>

            <footer className="mt-6 flex items-center gap-4 border-t border-brown/20 pt-4">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{item.name}</p>
                <p className="mt-0.5 text-xs text-text/60">{item.role}</p>
              </div>
            </footer>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
