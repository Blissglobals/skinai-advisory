import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { ConcernIcon, DraftBadge, SectionHeader } from "@/components/site/ui";
import { concernSlugs, getSiteContent } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => concernSlugs.map((slug) => ({ locale, slug })));
}

export default async function ConcernPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const concern = c.concerns.find((x) => x.slug === slug);
  if (!concern) notFound();
  const related = c.treatments.filter((t) => t.ready && concern.treatmentSlugs.includes(t.slug));

  return (
    <SiteShell
      locale={locale}
      consultLines={[c.ui.consultMessage.title, `${c.ui.consultMessage.concern}: ${concern.name}`]}
    >
      <section className="motion-rise flex flex-col gap-4 pt-2">
        <DraftBadge>{c.ui.draftNotice}</DraftBadge>
        <div className="flex items-center gap-3">
          <ConcernIcon slug={concern.slug} />
          <h1 className="text-[26px] font-bold tracking-tight">{concern.name}</h1>
        </div>
        <p className="text-[15px] leading-relaxed text-foreground/70">{concern.intro}</p>
      </section>

      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.concernPage.causes} />
        <div className="flex flex-wrap gap-2">
          {concern.causes.map((cause) => (
            <span
              key={cause}
              className="rounded-full border border-brand-border bg-brand-surface px-3 py-1.5 text-sm"
            >
              {cause}
            </span>
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.concernPage.treatments} />
        <div className="flex flex-col gap-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/${locale}/treatments/${t.slug}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-brand-border bg-brand-surface p-4 transition-transform active:scale-[0.98]"
            >
              <span className="flex flex-col gap-1">
                <span className="text-base font-semibold">{t.name}</span>
                <span className="text-sm leading-relaxed text-foreground/60">{t.summary}</span>
              </span>
              <span className="text-foreground/30">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.concernPage.homeCare} />
        <ul className="flex flex-col gap-2.5 rounded-2xl bg-foreground/[.03] p-4">
          {concern.homeCare.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-brand-accent">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="motion-scroll flex flex-col gap-3 rounded-2xl bg-brand-secondary/70 p-5">
        <p className="text-base font-semibold">{c.concernPage.scanTitle}</p>
        <p className="text-sm text-foreground/65">{c.concernPage.scanBody}</p>
        <Link
          href={`/${locale}/analysis`}
          className="mt-1 flex min-h-12 items-center justify-center rounded-xl bg-brand-primary text-sm font-semibold text-brand-primary-fg transition-transform active:scale-[0.98]"
        >
          {c.ui.scanCta}
        </Link>
      </section>
    </SiteShell>
  );
}
