"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CALCULATOR_AREA_MAX, CALCULATOR_AREA_MID, CALCULATOR_AREA_MIN } from "@/shared/constants";

type CalculatorAreaSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

function clampArea(value: number) {
  return Math.min(CALCULATOR_AREA_MAX, Math.max(CALCULATOR_AREA_MIN, value));
}

export function CalculatorAreaSlider({
  value,
  onChange,
}: CalculatorAreaSliderProps) {
  const t = useTranslations("calculator");
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  function handleSliderChange(next: number) {
    onChange(clampArea(next));
  }

  function handleInputChange(raw: string) {
    setInputValue(raw);

    const parsed = Number.parseInt(raw, 10);
    if (!Number.isNaN(parsed)) {
      onChange(clampArea(parsed));
    }
  }

  function handleInputBlur() {
    const parsed = Number.parseInt(inputValue, 10);
    const next = Number.isNaN(parsed) ? CALCULATOR_AREA_MIN : clampArea(parsed);
    onChange(next);
    setInputValue(String(next));
  }

  const progress =
    ((value - CALCULATOR_AREA_MIN) / (CALCULATOR_AREA_MAX - CALCULATOR_AREA_MIN)) * 100;

  return (
    <div className="rounded-[20px] border border-brown/20 bg-white px-6 py-6 lg:px-8 lg:py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-text lg:text-2xl">
            {t("areaLabel")}
          </h3>
          <p className="mt-1 text-sm text-text/40">{t("areaSubtitle")}</p>
        </div>

        <div className="flex shrink-0 items-center rounded-full border border-brown/15 bg-cream p-1">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleInputBlur}
            aria-label={t("areaLabel")}
            className="w-16 rounded-full bg-light px-3 py-1.5 text-center text-base font-semibold text-text outline-none"
          />
          <span className="px-3 text-sm text-text/50">{t("sqmAbbrev")}</span>
        </div>
      </div>

      <div className="mt-8">
        <input
          type="range"
          min={CALCULATOR_AREA_MIN}
          max={CALCULATOR_AREA_MAX}
          step={1}
          value={value}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          aria-label={t("areaLabel")}
          style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
          className="calculator-area-range w-full"
        />

        <div className="mt-3 flex justify-between text-sm text-text/40">
          <span>
            {CALCULATOR_AREA_MIN}
            {t("sqmAbbrev")}
          </span>
          <span>
            {CALCULATOR_AREA_MID}
            {t("sqmAbbrev")}
          </span>
          <span>
            {CALCULATOR_AREA_MAX}
            {t("sqmAbbrev")}
          </span>
        </div>
      </div>
    </div>
  );
}
