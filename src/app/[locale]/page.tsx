import Link from "next/link";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="app-shell justify-center gap-6">
      <div>
        <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
          {dict.home.badge}
        </p>
        <h1 className="mt-3 text-2xl font-medium leading-snug">
          {dict.home.heading1}
          <br />
          {dict.home.heading2}
        </h1>
        <p className="mt-2 text-sm text-foreground/60">{dict.home.subtitle}</p>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-foreground/70">
        {dict.home.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>

      <Link
        href={`/${locale}/consent`}
        className="flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-primary px-4 py-3 text-center text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
      >
        {dict.home.cta}
      </Link>

      <p className="text-xs text-foreground/40">{dict.home.footnote}</p>
      <Link
        href={`/${locale}/privacy`}
        className="text-xs text-foreground/40 underline underline-offset-2"
      >
        {dict.privacy.linkLabel}
      </Link>
    </div>
  );
}
