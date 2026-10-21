import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import ScanWizard from "@/components/ScanWizard";
import { getSiteContent } from "@/content/site";

export default async function ScanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const { ui } = getSiteContent(locale);
  return <ScanWizard dict={dict} locale={locale} brand={ui.brand} aiLabel={ui.aiPersonLabel} />;
}
