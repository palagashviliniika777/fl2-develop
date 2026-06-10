"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type CalculatorResultSummaryData = {
  unitPricePerSqm: number;
  area: number;
  serviceName: string;
  total: number;
};

type CalculatorResultSummaryProps = {
  data: CalculatorResultSummaryData;
};

export function CalculatorResultSummary({ data }: CalculatorResultSummaryProps) {
  const t = useTranslations("calculator");

  return (
    <div className="overflow-hidden rounded-[20px] bg-brown">
      <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-3 sm:gap-6 lg:px-10 lg:py-10">
        <div>
          <p className="text-sm text-gold">{t("unitPriceLabel")}</p>
          <p className="mt-2 text-3xl font-bold text-light lg:text-4xl">
            {data.unitPricePerSqm.toLocaleString()}
            {t("currency")}
          </p>
          <p className="mt-1 text-sm text-tan/60">{t("perSqm")}</p>
        </div>

        <div>
          <p className="text-sm text-gold">{t("totalAreaLabel")}</p>
          <p className="mt-2 text-3xl font-bold text-light lg:text-4xl">
            {data.area.toLocaleString()}
            {t("sqmAbbrev")}
          </p>
          <p className="mt-1 text-sm text-tan/60">{data.serviceName}</p>
        </div>

        <div className="sm:text-right">
          <p className="text-sm text-gold">{t("totalCostLabel")}</p>
          <p className="mt-2 text-3xl font-bold text-gold lg:text-[40px] lg:leading-none">
            {data.total.toLocaleString()}
            {t("currency")}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-light/10 px-6 py-5 sm:flex-row sm:items-center lg:px-10 lg:py-6">
        <p className="text-sm text-gold">{t("consultPrompt")}</p>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-brown transition-opacity hover:opacity-90"
        >
          <Phone className="size-4" aria-hidden="true" />
          {t("freeConsultation")}
        </Link>
      </div>
    </div>
  );
}
