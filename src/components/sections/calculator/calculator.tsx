"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import type { ServiceCalculatorItem } from "@/shared/types/service";
import { CalculatorAreaSlider } from "./calculator-area-slider";
import { CalculatorThicknessSelector } from "./calculator-thickness-selector";
import {
  CalculatorResultSummary,
  type CalculatorResultSummaryData,
} from "./calculator-result-summary";
import "swiper/css";

type CalculatorProps = {
  services: ServiceCalculatorItem[];
};

export function Calculator({ services }: CalculatorProps) {
  const t = useTranslations("calculator");

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    services[0]?.slug ?? null,
  );
  const [area, setArea] = useState(100);
  const [selectedThicknessIndex, setSelectedThicknessIndex] = useState<number | null>(null);
  const [result, setResult] = useState<CalculatorResultSummaryData | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const selectedService = services.find((s) => s.slug === selectedSlug);
  const thicknessOptions = selectedService?.thicknessOptions ?? null;
  const hasThickness = !!thicknessOptions && thicknessOptions.length > 0;

  function handleCalculate() {
    if (!selectedService?.pricePerSqm || area <= 0) return;
    const thicknessPrice =
      selectedThicknessIndex !== null
        ? (thicknessOptions?.[selectedThicknessIndex]?.price ?? 1)
        : 1;
    const unitPricePerSqm = selectedService.pricePerSqm * thicknessPrice;

    setResult({
      unitPricePerSqm,
      area,
      serviceName: selectedService.name,
      total: Math.round(area * unitPricePerSqm),
    });
  }

  function handleServiceSelect(slug: string, index: number) {
    setSelectedSlug(slug);
    setSelectedThicknessIndex(null);
    setResult(null);
    swiperRef.current?.slideTo(index);
  }

  function handleAreaChange(val: number) {
    setArea(val);
    setResult(null);
  }

  const canCalculate =
    !!selectedSlug &&
    !!selectedService?.pricePerSqm &&
    area > 0 &&
    (!hasThickness || selectedThicknessIndex !== null);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-20 lg:py-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-extrabold uppercase tracking-wide text-text lg:text-[32px]">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-text/70">
          {t("description")}
        </p>
      </div>

      {/* Service selector */}
      <div className="mt-12">
        <p className="text-base font-bold uppercase tracking-wide text-text lg:text-2xl">
          {t("selectService")}
        </p>

        <div className="mt-5">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            slidesPerView="auto"
            spaceBetween={19}
          >
            {services.map((service, index) => {
              const isSelected = service.slug === selectedSlug;

              return (
                <SwiperSlide key={service.slug} style={{ width: 256 }}>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect(service.slug, index)}
                    aria-pressed={isSelected}
                    className="group relative flex h-[260px] w-[256px] cursor-pointer flex-col overflow-hidden rounded-[40px] border border-brown/50 bg-light transition-all duration-200"
                  >
                    <div className="relative flex-1 overflow-hidden">
                      {service.featuredImage && (
                        <Image
                          src={service.featuredImage}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="256px"
                        />
                      )}
                      <div
                        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
                          isSelected ? "opacity-0" : "opacity-100"
                        }`}
                        aria-hidden="true"
                      />
                      <AnimatePresence>
                        {isSelected && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-gold"
                          >
                            <Check
                              className="size-4 stroke-[2.5] text-text"
                              aria-hidden="true"
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div
                      className={`text-start shrink-0 px-4 pb-[18px] pt-2 transition-colors duration-300 ease-in-out ${
                        isSelected
                          ? "bg-brown text-light"
                          : "bg-light text-text group-hover:bg-brown group-hover:text-light"
                      }`}
                    >
                      <p className="text-sm font-bold leading-snug">
                        {service.name}
                      </p>
                      <p className="text-sm">
                        {service.pricePerSqm}
                        {t("currency")}/{t("sqmAbbrev")}
                      </p>
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-16">
        <CalculatorAreaSlider value={area} onChange={handleAreaChange} />

        {hasThickness && thicknessOptions && (
          <CalculatorThicknessSelector
            options={thicknessOptions}
            selectedIndex={selectedThicknessIndex}
            onSelect={(index) => {
              setSelectedThicknessIndex(index);
              setResult(null);
            }}
          />
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="rounded-[20px] bg-brown px-14 py-4 text-base font-semibold text-light transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          {t("calculate")}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {result !== null && (
          <motion.div
            key="result"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10">
              <CalculatorResultSummary data={result} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-text/50 lg:text-justify">
              {t("disclaimer")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
