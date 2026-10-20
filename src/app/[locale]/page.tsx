import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { Chip, ConcernIcon, SectionHeader } from "@/components/site/ui";
import { lineConsultUrl } from "@/lib/line/consult";
import { getSiteContent } from "@/content/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const readyTreatments = c.treatments.filter((t) => t.ready);

  return (
    <SiteShell locale={locale}>
      {/* 첫 화면 */}
      <section className="motion-rise -mx-4 -mt-5 flex flex-col gap-5 bg-gradient-to-b from-brand-secondary/70 to-background px-4 pt-8 pb-2">
        <p className="w-fit rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-brand-accent shadow-sm">
          {c.home.eyebrow}
        </p>
        <h1 className="text-[28px] leading-tight font-bold tracking-tight whitespace-pre-line">
          {c.home.heading}
        </h1>
        <p className="text-[15px] leading-relaxed text-foreground/70">{c.home.subheading}</p>
        <div className="flex flex-wrap gap-2">
          {c.home.chips.map((chip) => (
            <Chip key={chip}>✓ {chip}</Chip>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <a
            href={lineConsultUrl([c.ui.consultMessage.title])}
            className="flex min-h-13 items-center justify-center rounded-xl bg-brand-primary px-4 text-[15px] font-semibold text-brand-primary-fg shadow-sm transition-transform active:scale-[0.98]"
          >
            {c.ui.consultCta}
          </a>
          <Link
            href={`/${locale}/analysis`}
            className="flex min-h-13 items-center justify-center rounded-xl border border-brand-border bg-brand-surface px-4 text-[15px] font-medium transition-transform active:scale-[0.98]"
          >
            {c.ui.scanCta}
          </Link>
        </div>
      </section>

      {/* 고민별 */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.concernsTitle} />
        <div className="grid grid-cols-2 gap-3">
          {c.concerns.map((concern, i) => (
            <Link
              key={concern.slug}
              href={`/${locale}/concerns/${concern.slug}`}
              className={`flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-surface p-3.5 transition-transform active:scale-[0.98] ${
                i === c.concerns.length - 1 && c.concerns.length % 2 === 1 ? "col-span-2" : ""
              }`}
            >
              <ConcernIcon slug={concern.slug} />
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-semibold">{concern.name}</span>
                <span className="truncate text-xs text-foreground/55">{concern.hint}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 인기 시술: 가로 스와이프 */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader
          title={c.home.treatmentsTitle}
          href={`/${locale}/treatments`}
          linkLabel={c.ui.seeAll}
        />
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {readyTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/${locale}/treatments/${t.slug}`}
              className="flex w-[72%] shrink-0 snap-start flex-col gap-2 rounded-2xl border border-brand-border bg-brand-surface p-4 transition-transform active:scale-[0.98]"
            >
              <span className="text-base font-semibold">{t.name}</span>
              <span className="line-clamp-3 text-sm leading-relaxed text-foreground/65">
                {t.summary}
              </span>
              {t.facts?.[0] && (
                <span className="mt-auto w-fit rounded-full bg-foreground/[.05] px-2.5 py-1 text-xs text-foreground/60">
                  {t.facts[0].value}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 진행 방법: 세로 타임라인 */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.stepsTitle} />
        <ol className="flex flex-col">
          {c.steps.map((s, i) => (
            <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
              {i < c.steps.length - 1 && (
                <span className="absolute top-8 bottom-0 left-[15px] w-px bg-brand-border" aria-hidden />
              )}
              <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-semibold text-brand-accent-fg">
                {i + 1}
              </span>
              <div className="pt-1">
                <p className="text-[15px] font-semibold">{s.title}</p>
                <p className="mt-0.5 text-sm text-foreground/60">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 여행 가이드 */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.guideTitle} href={`/${locale}/guide`} linkLabel={c.ui.seeAll} />
        <div className="grid grid-cols-2 gap-3">
          {c.guides.map((g) => (
            <Link
              key={g.slug}
              href={g.ready ? `/${locale}/guide/${g.slug}` : `/${locale}/guide`}
              className="flex min-h-28 flex-col justify-between gap-2 rounded-2xl bg-brand-secondary/60 p-4 transition-transform active:scale-[0.98]"
            >
              <span className="text-[15px] leading-snug font-semibold">{g.title}</span>
              <span className="text-xs text-foreground/60">{g.summary}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 제휴 의원 */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.clinicTitle} />
        {c.clinics.map((clinic) => (
          <div
            key={clinic.name}
            className="flex flex-col gap-1 rounded-2xl border border-dashed border-brand-border p-4"
          >
            <span className="text-[15px] font-semibold">{clinic.name}</span>
            <span className="text-sm text-foreground/55">{clinic.note}</span>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.faqTitle} />
        <div className="divide-y divide-brand-border rounded-2xl border border-brand-border bg-brand-surface">
          {c.faq.map((f, i) => (
            <details key={i} className="group px-4 py-3.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium">
                {f.q}
                <span className="text-foreground/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 마무리 */}
      <section className="motion-scroll flex flex-col gap-3 rounded-2xl bg-brand-primary p-5 text-brand-primary-fg">
        <p className="text-lg font-semibold">{c.home.finalTitle}</p>
        <p className="text-sm opacity-80">{c.home.finalBody}</p>
        <Link
          href={`/${locale}/analysis`}
          className="mt-1 flex min-h-12 items-center justify-center rounded-xl bg-brand-primary-fg text-sm font-semibold text-brand-primary transition-transform active:scale-[0.98]"
        >
          {c.ui.scanCta}
        </Link>
      </section>
    </SiteShell>
  );
}
