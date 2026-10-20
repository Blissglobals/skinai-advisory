import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { lineConsultUrl } from "@/lib/line/consult";
import { DRAFT_NOTICE, treatments, tx, ui } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    treatments.filter((t) => t.ready).map((t) => ({ locale, slug: t.slug }))
  );
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = treatments.find((x) => x.slug === slug && x.ready);
  if (!t) notFound();

  const consultUrl = lineConsultUrl([
    tx(ui.consultTitle, locale),
    `${tx(ui.consultInterest, locale)}: ${tx(t.name, locale)}`,
  ]);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-3 pt-2">
        <p className="w-fit rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
          {tx(DRAFT_NOTICE, locale)}
        </p>
        <h1 className="text-2xl font-semibold">{tx(t.name, locale)}</h1>
        <p className="text-sm text-foreground/70">{tx(t.summary, locale)}</p>
      </section>

      {t.forWhom && (
        <section className="motion-scroll flex flex-col gap-3">
          <h2 className="text-base font-semibold">{tx(ui.treatment.forWhom, locale)}</h2>
          <ul className="flex flex-col gap-2">
            {t.forWhom.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-brand-accent">✓</span>
                {tx(item, locale)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {t.facts && (
        <section className="motion-scroll flex flex-col gap-3">
          <h2 className="text-base font-semibold">{tx(ui.treatment.facts, locale)}</h2>
          <dl className="divide-y divide-brand-border rounded-xl border border-brand-border">
            {t.facts.map((f, i) => (
              <div key={i} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-foreground/60">{tx(f.label, locale)}</dt>
                <dd className="text-right font-medium">{tx(f.value, locale)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {t.cautions && (
        <section className="motion-scroll flex flex-col gap-3">
          <h2 className="text-base font-semibold">{tx(ui.treatment.cautions, locale)}</h2>
          <ul className="flex flex-col gap-2 rounded-xl bg-foreground/[.03] p-4 text-xs text-foreground/70">
            {t.cautions.map((c, i) => (
              <li key={i}>· {tx(c, locale)}</li>
            ))}
          </ul>
        </section>
      )}

      {t.faq && (
        <section className="motion-scroll flex flex-col gap-3">
          <h2 className="text-base font-semibold">{tx(ui.treatment.faq, locale)}</h2>
          {t.faq.map((f, i) => (
            <details key={i} className="rounded-xl border border-brand-border p-4">
              <summary className="cursor-pointer text-sm font-medium">{tx(f.q, locale)}</summary>
              <p className="mt-2 text-xs text-foreground/70">{tx(f.a, locale)}</p>
            </details>
          ))}
        </section>
      )}

      <section className="motion-scroll flex flex-col gap-2">
        <a
          href={consultUrl}
          className="flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
        >
          {tx(ui.consultCta, locale)}
        </a>
        <Link
          href={`/${locale}/analysis`}
          className="flex min-h-12 items-center justify-center rounded-lg border border-brand-border px-4 text-sm font-medium transition-transform active:scale-[0.98]"
        >
          {tx(ui.scanCta, locale)}
        </Link>
      </section>
    </SiteShell>
  );
}
