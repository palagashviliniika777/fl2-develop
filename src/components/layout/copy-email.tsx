"use client";

import { useTranslations } from "next-intl";
import { notifyCopied, notifyCopyFailed } from "@/lib/copy-feedback";

type CopyEmailProps = {
  email: string;
  className?: string;
};

export const CopyEmail = ({ email, className }: CopyEmailProps) => {
  const t = useTranslations("common.toast");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      notifyCopied(t("emailCopied"));
    } catch {
      notifyCopyFailed(t("copyFailed"));
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label={`Copy ${email}`}
    >
      {email}
    </button>
  );
};
