"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ServiceCalculatorItem } from "@/shared/types/service";
import { CalculatorAreaSlider } from "./calculator-area-slider";
import { CalculatorServiceSlider } from "./calculator-service-slider";
import { CalculatorThicknessSelector } from "./calculator-thickness-selector";
import {
  CalculatorResultSummary,
  type CalculatorResultSummaryData,
} from "./calculator-result-summary";

type CalculatorProps = {
  services: ServiceCalculatorItem[];
};

function getDefaultThicknessIndex(
  service: ServiceCalculatorItem | undefined,
): number | null {
  const options = service?.thicknessOptions;
  if (!options?.length) return null;
  return 0;
}

export function Calculator({ services }: CalculatorProps) {
  const t = useTranslations("calculator");

  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    services[0]?.slug ?? null,
  );
  const [area, setArea] = useState(100);
  const [selectedThicknessIndex, setSelectedThicknessIndex] = useState<number | null>(
    () => getDefaultThicknessIndex(services[0]),
  );

  const selectedService = services.find((s) => s.slug === selectedSlug);
  const thicknessOptions = selectedService?.thicknessOptions ?? null;
  const hasThickness = !!thicknessOptions && thicknessOptions.length > 0;

  const result = useMemo((): CalculatorResultSummaryData | null => {
    if (!selectedService?.pricePerSqm || area <= 0) return null;
    if (hasThickness && selectedThicknessIndex === null) return null;

    const thicknessPrice =
      selectedThicknessIndex !== null
        ? (thicknessOptions?.[selectedThicknessIndex]?.price ?? 1)
        : 1;
    const unitPricePerSqm = selectedService.pricePerSqm * thicknessPrice;

    return {
      unitPricePerSqm,
      area,
      serviceName: selectedService.name,
      total: Math.round(area * unitPricePerSqm),
    };
  }, [selectedService, area, selectedThicknessIndex, hasThickness, thicknessOptions]);

  function handleServiceSelect(slug: string) {
    const service = services.find((s) => s.slug === slug);
    setSelectedSlug(slug);
    setSelectedThicknessIndex(getDefaultThicknessIndex(service));
  }

  function handleAreaChange(val: number) {
    setArea(val);
  }

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

      <CalculatorServiceSlider
        services={services}
        selectedSlug={selectedSlug}
        onSelect={handleServiceSelect}
      />

      <div className="mt-20 flex flex-col gap-16">
        <CalculatorAreaSlider value={area} onChange={handleAreaChange} />

        {hasThickness && thicknessOptions && (
          <CalculatorThicknessSelector
            options={thicknessOptions}
            selectedIndex={selectedThicknessIndex}
            onSelect={setSelectedThicknessIndex}
          />
        )}
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
