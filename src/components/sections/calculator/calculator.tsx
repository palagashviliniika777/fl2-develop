"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { ServiceCalculatorItem } from "@/shared/types/service";
import "swiper/css";

type CalculatorProps = {
  services: ServiceCalculatorItem[];
};

export function Calculator({ services }: CalculatorProps) {
  const t = useTranslations("calculator");

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    services[0]?.slug ?? null,
  );
  const [area, setArea] = useState("");
  const [selectedThicknessIndex, setSelectedThicknessIndex] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const selectedService = services.find((s) => s.slug === selectedSlug);
  const thicknessOptions = selectedService?.thicknessOptions ?? null;
  const hasThickness = !!thicknessOptions && thicknessOptions.length > 0;

  function handleCalculate() {
    const areaNum = parseFloat(area);
    if (!selectedService?.pricePerSqm || !areaNum || areaNum <= 0) return;
    const thicknessPrice =
      selectedThicknessIndex !== null
        ? (thicknessOptions?.[parseInt(selectedThicknessIndex)]?.price ?? 1)
        : 1;
    setResult(Math.round(areaNum * selectedService.pricePerSqm * thicknessPrice));
  }

  function handleServiceSelect(slug: string, index: number) {
    setSelectedSlug(slug);
    setSelectedThicknessIndex(null);
    setResult(null);
    swiperRef.current?.slideTo(index);
  }

  function handleAreaChange(val: string) {
    setArea(val);
    setResult(null);
  }

  const canCalculate =
    !!selectedSlug &&
    !!selectedService?.pricePerSqm &&
    parseFloat(area) > 0;

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
                    className={`flex h-[215px] w-[256px] cursor-pointer flex-col overflow-hidden rounded-[40px] border bg-light transition-all duration-200 ${
                      isSelected
                        ? "border-brown/50"
                        : "border-brown/50 opacity-50 hover:opacity-70"
                    }`}
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
                    </div>
                    <div className="shrink-0 px-4 py-3 text-center">
                      <span className="text-sm font-medium text-text">
                        {service.name}
                      </span>
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Inputs */}
      <div className={`mt-8 grid grid-cols-1 gap-6 ${hasThickness ? "lg:grid-cols-2" : ""}`}>
        {/* Area */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="area"
            className="text-base font-bold uppercase tracking-wide text-text"
          >
            {t("areaLabel")}
          </label>
          <input
            id="area"
            type="number"
            min="0"
            step="0.1"
            value={area}
            onChange={(e) => handleAreaChange(e.target.value)}
            placeholder={t("areaPlaceholder")}
            className="w-full rounded-[12px] border border-brown/50 bg-transparent px-6 py-[18px] text-center text-2xl font-semibold text-text/70 placeholder:text-text/30 focus:border-brown focus:outline-none"
          />
        </div>

        {/* Thickness — only when service has options */}
        {hasThickness && (
          <div className="flex flex-col gap-4">
            <label className="text-base font-bold uppercase tracking-wide text-text">
              {t("thicknessLabel")}
            </label>
            <Select
              value={selectedThicknessIndex ?? ""}
              onValueChange={(val) => {
                setSelectedThicknessIndex(val);
                setResult(null);
              }}
            >
              <SelectTrigger className="relative !h-auto w-full justify-center rounded-[12px] border border-brown/50 bg-transparent px-6 py-[18px] text-center text-2xl font-semibold text-text/70 shadow-none ring-0 focus-visible:ring-0 focus-visible:border-brown [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:size-5 [&>svg]:-translate-y-1/2 [&>svg]:text-text/40">
                <span className={selectedThicknessIndex !== null ? "text-text/70" : "text-text/30"}>
                  {selectedThicknessIndex !== null
                    ? (thicknessOptions?.[parseInt(selectedThicknessIndex)]?.label ?? t("thicknessPlaceholder"))
                    : t("thicknessPlaceholder")}
                </span>
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="start"
                alignItemWithTrigger={false}
                className="rounded-[12px] border border-brown/50 bg-light shadow-none ring-0 p-0"
              >
                {thicknessOptions.map((opt, i) => (
                  <SelectItem
                    key={i}
                    value={String(i)}
                    className="px-6 py-4 text-center text-2xl font-semibold text-text/70 focus:bg-brown/10 rounded-none first:rounded-t-[12px] last:rounded-b-[12px]"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Calculate button */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="rounded-[20px] bg-brown px-14 py-4 text-base font-semibold text-light transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t("calculate")}
        </button>
      </div>

      {/* Result + Disclaimer */}
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
            <div className="mt-8 flex items-center justify-center rounded-[12px] bg-cream py-6">
              <span className="text-4xl font-bold text-text/70 lg:text-5xl">
                {result.toLocaleString()} {t("currency")}
              </span>
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
