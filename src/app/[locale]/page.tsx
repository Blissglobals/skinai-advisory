import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { lineConsultUrl } from "@/lib/line/consult";
import {
  concerns,
  guides,
  homeFaq,
  steps,
  treatments,
  tx,
  ui,
  type Text,
} from "@/content/site";

const cardClass =
  "flex flex-col gap-1 rounded-xl border border-brand-border bg-brand-surface p-4 transition-transform active:scale-[0.98]";

function SoonBadge({ locale }: { locale: Locale }) {
  return (
    <span className="w-fit rounded-full bg-foreground/[.06] px-2 py-0.5 text-[10px] text-foreground/50">
      {tx(ui.comingSoon, locale)}
    </span>
  );
}

// 준비된 페이지가 있으면 링크, 아니면 "준비 중" 카드로 보여줍니다.
function Card({
  href,
  title,
  body,
  locale,
}: {
  href: string | null;
  title: Text;
  body: Text;
  locale: Locale;
}) {
  const inner = (
    <>
      <span className="text-sm font-medium">{tx(title, locale)}</span>
      <span className="text-xs text-foreground/60">{tx(body, locale)}</span>
      {!href && <SoonBadge locale={locale} />}
    </>
  );
  return href ? (
    <Link href={href} className={cardClass}>
      {inner}
    </Link>
  ) : (
    <div className={`${cardClass} opacity-70`}>{inner}</div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-semibold">{children}</h2>;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const readyTreatment = (slugs: string[]) =>
    treatments.find((t) => slugs.includes(t.slug) && t.ready);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-4 pt-4">
        <p className="w-fit rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
          {tx(ui.home.eyebrow, locale)}
        </p>
        <h1 className="text-2xl font-semibold leading-snug">{tx(ui.home.heading, locale)}</h1>
        <p className="text-sm text-foreground/60">{tx(ui.home.subheading, locale)}</p>
        <div className="flex flex-col gap-2">
          <a
            href={lineConsultUrl([tx(ui.consultTitle, locale)])}
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
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{tx(ui.home.concernsTitle, locale)}</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {concerns.map((c) => {
            const t = readyTreatment(c.treatmentSlugs);
            return (
              <Card
                key={c.slug}
                href={t ? `/${locale}/treatments/${t.slug}` : null}
                title={c.name}
                body={c.hint}
                locale={locale}
              />
            );
          })}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{tx(ui.home.treatmentsTitle, locale)}</SectionTitle>
        <div className="flex flex-col gap-3">
          {treatments.map((t) => (
            <Card
              key={t.slug}
              href={t.ready ? `/${locale}/treatments/${t.slug}` : null}
              title={t.name}
              body={t.summary}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{tx(ui.home.stepsTitle, locale)}</SectionTitle>
        <ol className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-brand-secondary-fg">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{tx(s.title, locale)}</p>
                <p className="text-xs text-foreground/60">{tx(s.body, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <SectionTitle>{tx(ui.home.guideTitle, locale)}</SectionTitle>
          <Link href={`/${locale}/guide`} className="text-xs text-brand-accent">
            {tx(ui.readMore, locale)}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {guides.map((g) => (
            <Card
              key={g.slug}
              href={g.ready ? `/${locale}/guide/${g.slug}` : null}
              title={g.title}
              body={g.summary}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{tx(ui.home.clinicTitle, locale)}</SectionTitle>
        <Card
          href={null}
          title={{ ko: "제로랩의원", "zh-TW": "제로랩의원（中文名稱待確認）" }}
          body={{ ko: "위치·의료진·진료 정보 준비 중", "zh-TW": "位置、醫師與看診資訊準備中" }}
          locale={locale}
        />
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{tx(ui.home.faqTitle, locale)}</SectionTitle>
        {homeFaq.map((f, i) => (
          <details key={i} className="rounded-xl border border-brand-border p-4">
            <summary className="cursor-pointer text-sm font-medium">{tx(f.q, locale)}</summary>
            <p className="mt-2 text-xs text-foreground/70">{tx(f.a, locale)}</p>
          </details>
        ))}
      </section>
    </SiteShell>
  );
}
