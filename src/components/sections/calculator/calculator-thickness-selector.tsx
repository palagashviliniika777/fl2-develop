"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ThicknessOption } from "@/shared/types/service";

type CalculatorThicknessSelectorProps = {
  options: ThicknessOption[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export function CalculatorThicknessSelector({
  options,
  selectedIndex,
  onSelect,
}: CalculatorThicknessSelectorProps) {
  const t = useTranslations("calculator");

  return (
    <div>
      <h3 className="text-xl font-bold text-text lg:text-2xl">
        {t("thicknessLabel")}
      </h3>

      <div className="mt-5 flex flex-wrap gap-4">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(index)}
              className={cn(
                "cursor-pointer relative min-w-[240px] rounded-[20px] border px-8 py-5 text-start transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown/40 focus-visible:ring-offset-2",
                isSelected
                  ? "border-brown bg-brown text-light"
                  : "border-tan bg-white text-text hover:border-gold",
              )}
            >
              <p className="text-base font-bold leading-snug">{option.label}</p>
              {option.description && (
                <p
                  className={cn(
                    "mt-1 text-sm transition-colors duration-300",
                    isSelected ? "text-light/70" : "text-text/40",
                  )}
                >
                  {option.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
