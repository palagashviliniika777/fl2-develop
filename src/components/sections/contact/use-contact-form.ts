"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type FieldErrors = Partial<Record<"fullName" | "phone", string>>;

export function useContactForm(serviceName?: string) {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      website: String(formData.get("website") ?? ""),
      ...(serviceName ? { serviceName } : {}),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        issues?: Record<string, string[] | undefined>;
      };

      if (!response.ok) {
        if (data.error === "validation_failed" && data.issues) {
          const nextErrors: FieldErrors = {};
          for (const key of ["fullName", "phone"] as const) {
            if (data.issues[key]?.length) {
              nextErrors[key] = t(`errors.${key}`);
            }
          }
          setFieldErrors(nextErrors);
          toast.error(t("error"));
          return;
        }

        if (data.error === "email_not_configured") {
          toast.error(t("errorNotConfigured"));
          return;
        }

        toast.error(t("error"));
        return;
      }

      toast.success(t("success"));
      form.reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, fieldErrors, handleSubmit };
}
