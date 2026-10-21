import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { Chip, DraftBadge, PhotoHero, SectionHeader } from "@/components/site/ui";
import { siteImages } from "@/content/site/images";
import { getSiteContent, readyTreatmentSlugs } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => readyTreatmentSlugs.map((slug) => ({ locale, slug })));
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const t = c.treatments.find((x) => x.slug === slug && x.ready);
  if (!t) notFound();

  const concerns = c.concerns.filter((x) => x.treatmentSlugs.includes(t.slug));
  const relatedSlugs = new Set(concerns.flatMap((x) => x.treatmentSlugs));
  const related = c.treatments.filter((x) => x.ready && x.slug !== t.slug && relatedSlugs.has(x.slug));

  return (
    <SiteShell
      locale={locale}
      consultLines={[c.ui.consultMessage.title, `${c.ui.consultMessage.interest}: ${t.name}`]}
    >
      <PhotoHero
        src={siteImages.concern[concerns[0]?.slug ?? ""] ?? siteImages.space}
        eyebrow={<DraftBadge>{c.ui.draftNotice}</DraftBadge>}
        title={t.name}
      >
        <p className="text-[15px] leading-relaxed text-foreground/70">{t.summary}</p>
        {concerns.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground/50">{c.treatmentPage.relatedConcerns}</span>
            {concerns.map((x) => (
              <Chip key={x.slug} href={`/${locale}/concerns/${x.slug}`}>
                {x.name}
              </Chip>
            ))}
          </div>
        )}
      </PhotoHero>

      {t.facts && (
        <section className="motion-scroll flex flex-col gap-4">
          <SectionHeader title={c.treatmentPage.facts} />
          <dl className="grid grid-cols-2 gap-3">
            {t.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5 rounded-3xl bg-brand-surface p-4 shadow-tinted">
                <dt className="text-xs text-foreground/55">{f.label}</dt>
                <dd className="font-display text-[17px] font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {t.forWhom && (
        <section className="motion-scroll flex flex-col gap-4">
          <SectionHeader title={c.treatmentPage.forWhom} />
          <ul className="flex flex-col gap-2.5">
            {t.forWhom.map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed">
                <span className="text-brand-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {t.cautions && (
        <section className="motion-scroll flex flex-col gap-4">
          <SectionHeader title={c.treatmentPage.cautions} />
          <ul className="flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
            {t.cautions.map((caution) => (
              <li key={caution}>· {caution}</li>
            ))}
          </ul>
        </section>
      )}

      {t.faq && (
        <section className="motion-scroll flex flex-col gap-4">
          <SectionHeader title={c.treatmentPage.faq} />
          <div className="divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-surface">
            {t.faq.map((f) => (
              <details key={f.q} className="group px-4 py-3.5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium">
                  {f.q}
                  <span className="text-foreground/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="motion-scroll flex flex-col gap-4">
          <SectionHeader title={c.treatmentPage.related} />
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${locale}/treatments/${r.slug}`}
                className="flex w-[60%] shrink-0 snap-start flex-col gap-1.5 rounded-2xl border border-brand-border bg-brand-surface p-4"
              >
                <span className="text-[15px] font-semibold">{r.name}</span>
                <span className="line-clamp-2 text-xs text-foreground/55">{r.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
