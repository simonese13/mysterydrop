import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const locales = ["it", "en", "fr", "es", "sr", "hr", "uk", "de", "pt", "ro", "pl", "ar"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}