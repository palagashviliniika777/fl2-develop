"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { FormInputField } from "@/components/ui/form-input-field";
import { cn } from "@/lib/utils";
import { CONTACT_SECTION_IMAGE } from "@/shared/constants";
import { useContactForm } from "./use-contact-form";

type ServiceContactFormProps = {
  serviceName?: string;
  className?: string;
};

export function ContactForm({
  serviceName,
  className,
}: ServiceContactFormProps) {
  const tSection = useTranslations("contact.section");
  const t = useTranslations("contact.form");
  const { isSubmitting, fieldErrors, handleSubmit } = useContactForm(serviceName);

  return (
    <section className={cn("bg-light", className)}>
      <div className="mx-auto max-w-[1440px] px-6 py-[20px] lg:px-20 lg:py-8">
        <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center gap-2.5">
            <span className="size-2.5 shrink-0 bg-text" aria-hidden />
            <span className="text-sm text-text">{tSection("label")}</span>
          </div>
          <h2 className="mt-4 text-xl font-bold uppercase tracking-wide text-text lg:text-[32px] lg:leading-tight">
            {tSection("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text/70 lg:mt-6">
            {tSection("description")}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-5 lg:items-stretch lg:gap-10">
          <div className="relative min-h-[360px] w-full overflow-hidden rounded-[20px] lg:col-span-2 lg:min-h-[560px]">
            <Image
              src={CONTACT_SECTION_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 40vw"
              priority={false}
            />
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col rounded-[20px] border border-brown/50 bg-light p-6 lg:p-10"
              noValidate
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute size-0 opacity-0"
                aria-hidden
              />

              <h3 className="mb-6 text-lg font-bold text-text lg:mb-8 lg:text-xl">
                {tSection("formTitle")}
              </h3>

              <div className="flex flex-1 flex-col gap-3">
                <FormInputField
                  id="fullName"
                  name="fullName"
                  label={t("fullName")}
                  type="text"
                  autoComplete="name"
                  placeholder={t("fullNamePlaceholder")}
                  error={fieldErrors.fullName}
                  disabled={isSubmitting}
                />

                <FormInputField
                  id="phone"
                  name="phone"
                  label={t("phone")}
                  type="tel"
                  autoComplete="tel"
                  placeholder={t("phonePlaceholder")}
                  error={fieldErrors.phone}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 inline-flex h-11 min-w-[140px] items-center justify-center gap-2 self-start rounded-full border border-brown/50 bg-light px-10 text-base font-medium text-text transition-colors hover:bg-brown/10 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 shrink-0 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  t("submit")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
