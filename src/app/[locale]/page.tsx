import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { lineConsultUrl } from "@/lib/line/consult";
import { getSiteContent } from "@/content/site";

const cardClass =
  "flex flex-col gap-1 rounded-xl border border-brand-border bg-brand-surface p-4 transition-transform active:scale-[0.98]";

// 준비된 페이지가 있으면 링크, 아니면 "준비 중" 카드로 보여줍니다.
function Card({
  href,
  title,
  body,
  soonLabel,
}: {
  href: string | null;
  title: string;
  body: string;
  soonLabel: string;
}) {
  const inner = (
    <>
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-foreground/60">{body}</span>
      {!href && (
        <span className="w-fit rounded-full bg-foreground/[.06] px-2 py-0.5 text-[10px] text-foreground/50">
          {soonLabel}
        </span>
      )}
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
  const c = getSiteContent(locale);
  const soon = c.ui.comingSoon;

  const readyTreatment = (slugs: string[]) =>
    c.treatments.find((t) => slugs.includes(t.slug) && t.ready);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-4 pt-4">
        <p className="w-fit rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
          {c.home.eyebrow}
        </p>
        <h1 className="text-2xl font-semibold leading-snug">{c.home.heading}</h1>
        <p className="text-sm text-foreground/60">{c.home.subheading}</p>
        <div className="flex flex-col gap-2">
          <a
            href={lineConsultUrl([c.ui.consultMessage.title])}
            className="flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
          >
            {c.ui.consultCta}
          </a>
          <Link
            href={`/${locale}/analysis`}
            className="flex min-h-12 items-center justify-center rounded-lg border border-brand-border px-4 text-sm font-medium transition-transform active:scale-[0.98]"
          >
            {c.ui.scanCta}
          </Link>
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{c.home.concernsTitle}</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {c.concerns.map((concern) => {
            const t = readyTreatment(concern.treatmentSlugs);
            return (
              <Card
                key={concern.slug}
                href={t ? `/${locale}/treatments/${t.slug}` : null}
                title={concern.name}
                body={concern.hint}
                soonLabel={soon}
              />
            );
          })}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{c.home.treatmentsTitle}</SectionTitle>
        <div className="flex flex-col gap-3">
          {c.treatments.map((t) => (
            <Card
              key={t.slug}
              href={t.ready ? `/${locale}/treatments/${t.slug}` : null}
              title={t.name}
              body={t.summary}
              soonLabel={soon}
            />
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{c.home.stepsTitle}</SectionTitle>
        <ol className="flex flex-col gap-3">
          {c.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-brand-secondary-fg">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-foreground/60">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <SectionTitle>{c.home.guideTitle}</SectionTitle>
          <Link href={`/${locale}/guide`} className="text-xs text-brand-accent">
            {c.ui.readMore}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {c.guides.map((g) => (
            <Card
              key={g.slug}
              href={g.ready ? `/${locale}/guide/${g.slug}` : null}
              title={g.title}
              body={g.summary}
              soonLabel={soon}
            />
          ))}
        </div>
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{c.home.clinicTitle}</SectionTitle>
        {c.clinics.map((clinic) => (
          <Card key={clinic.name} href={null} title={clinic.name} body={clinic.note} soonLabel={soon} />
        ))}
      </section>

      <section className="motion-scroll flex flex-col gap-3">
        <SectionTitle>{c.home.faqTitle}</SectionTitle>
        {c.faq.map((f, i) => (
          <details key={i} className="rounded-xl border border-brand-border p-4">
            <summary className="cursor-pointer text-sm font-medium">{f.q}</summary>
            <p className="mt-2 text-xs text-foreground/70">{f.a}</p>
          </details>
        ))}
      </section>
    </SiteShell>
  );
}
