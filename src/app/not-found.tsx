import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NotFoundContent } from "@/components/sections/not-found/not-found-content";
import { routing } from "@/i18n/routing";

export default async function RootNotFoundPage() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
