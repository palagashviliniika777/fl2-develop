"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import "swiper/css";

type ServiceItem = {
  name: string;
  slug: string;
  featuredImage: string | null;
};

type ServicesSliderProps = {
  items: ServiceItem[];
};

export const ServicesSlider = ({ items }: ServicesSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1.2}
      spaceBetween={16}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 3.3, spaceBetween: 24 },
      }}
      className="!overflow-hidden"
    >
      {items.map((item) => (
        <SwiperSlide key={item.slug}>
          <Link
            href={`/services/${item.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
          >
            {item.featuredImage && (
            <Image
              src={item.featuredImage}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
            />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-5 left-5 text-lg font-semibold text-white">
              {item.name}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
