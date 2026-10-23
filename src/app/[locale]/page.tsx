import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { SectionHeader } from "@/components/site/ui";
import { lineConsultUrl } from "@/lib/line/consult";
import { getSiteContent } from "@/content/site";
import { siteImages } from "@/content/site/images";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const readyTreatments = c.treatments.filter((t) => t.ready);
  const concernOf = (slug: string) => c.concerns.find((x) => x.treatmentSlugs.includes(slug));

  return (
    <SiteShell locale={locale}>
      {/* ── 첫 화면: 사진이 천천히 확대되고, 스크롤하면 글자보다 느리게 움직임 ── */}
      <section className="-mx-5 -mt-6 flex flex-col">
        <div className="relative h-[62svh] min-h-[420px] overflow-hidden">
          <div className="motion-parallax absolute inset-0">
            <Image
              src={siteImages.hero}
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 100vw, 640px"
              className="motion-kenburns object-cover object-[60%_30%]"
            />
          </div>
          <div className="absolute inset-x-0 top-0 -bottom-px bg-gradient-to-b from-transparent via-transparent via-55% to-background" />
          <span className="absolute top-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {c.ui.aiPersonLabel}
          </span>
        </div>

        <div className="relative -mt-36 flex flex-col gap-5 px-5">
          <p
            className="motion-rise w-fit rounded-full border border-brand-border/70 bg-brand-surface/80 px-3 py-1 text-xs font-medium tracking-wide text-brand-accent backdrop-blur"
            style={delay(200)}
          >
            {c.home.eyebrow}
          </p>
          <h1 className="font-display text-[36px] leading-[1.15] font-semibold">
            {c.home.heading.split("\n").map((line, i) => (
              <span key={i} className="motion-rise block" style={delay(320 + i * 130)}>
                {line}
              </span>
            ))}
          </h1>
          <p
            className="motion-rise max-w-[34ch] text-[15px] leading-relaxed text-foreground/70"
            style={delay(760)}
          >
            {c.home.subheading}
          </p>
          <ul
            className="motion-rise flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/70"
            style={delay(860)}
          >
            {c.home.chips.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-brand-accent" />
                {chip}
              </li>
            ))}
          </ul>
          <div className="motion-rise flex flex-col gap-3 pt-2" style={delay(960)}>
            <Link
              href={`/${locale}/analysis`}
              className="shadow-tinted flex min-h-14 items-center justify-center rounded-2xl bg-brand-primary px-5 text-[15px] font-semibold text-brand-primary-fg hover:opacity-90 active:scale-[0.98]"
            >
              {c.ui.scanCta}
            </Link>
            <a
              href={lineConsultUrl([c.ui.consultMessage.title])}
              className="mx-auto text-sm font-medium text-foreground/70 underline decoration-brand-border underline-offset-4 hover:text-foreground"
            >
              {c.ui.consultCta} →
            </a>
          </div>
        </div>
      </section>

      {/* ── 시술명이 흘러가는 띠 ── */}
      <div className="-mx-5 overflow-hidden border-y border-brand-border/70 py-4" aria-hidden>
        <div className="motion-marquee flex w-max gap-8 whitespace-nowrap">
          {[...c.home.marquee, ...c.home.marquee].map((word, i) => (
            <span key={i} className="font-display flex items-center gap-8 text-xl text-foreground/75 italic">
              {word}
              <span className="text-sm text-brand-accent not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 고민별: 큰 카드 하나 + 작은 카드 넷 ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader title={c.home.concernsTitle} />
        <div className="grid grid-cols-2 gap-3">
          {c.concerns.map((concern, i) => {
            const featured = i === 0;
            return (
              <Link
                key={concern.slug}
                href={`/${locale}/concerns/${concern.slug}`}
                className={`group relative overflow-hidden rounded-3xl active:scale-[0.98] ${
                  featured ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <Image
                  src={siteImages.concern[concern.slug]}
                  alt=""
                  fill
                  sizes={featured ? "(max-width: 640px) 100vw, 640px" : "(max-width: 640px) 50vw, 320px"}
                  className="motion-image object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4 text-white">
                  <span className={`font-display font-semibold ${featured ? "text-2xl" : "text-lg"}`}>
                    {concern.name}
                  </span>
                  <span className="text-xs text-white/80">{concern.hint}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="text-xs text-foreground/45">{c.ui.aiPageNotice}</p>
      </section>

      {/* ── 인기 시술: 가로로 넘기는 카드 ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader
          title={c.home.treatmentsTitle}
          href={`/${locale}/treatments`}
          linkLabel={c.ui.seeAll}
        />
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4">
          {readyTreatments.map((t, i) => {
            const concern = concernOf(t.slug);
            return (
              <Link
                key={t.slug}
                href={`/${locale}/treatments/${t.slug}`}
                className="shadow-tinted flex w-[74%] shrink-0 snap-start flex-col gap-4 rounded-3xl bg-brand-surface p-5 active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-brand-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {concern && (
                    <span className="relative size-10 overflow-hidden rounded-full">
                      <Image
                        src={siteImages.concern[concern.slug]}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  )}
                </div>
                <span className="font-display text-[22px] leading-tight font-semibold">{t.name}</span>
                <span className="line-clamp-3 text-sm leading-relaxed text-foreground/65">
                  {t.summary}
                </span>
                {concern && (
                  <span className="mt-auto text-xs font-medium text-foreground/50">#{concern.name}</span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 사진 위 문장 ── */}
      <section className="relative -mx-5 overflow-hidden">
        <div className="relative aspect-[4/5]">
          <Image
            src={siteImages.space}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="motion-image object-cover object-[30%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-5 pb-6">
          <p className="motion-scroll font-display text-[30px] leading-snug font-semibold whitespace-pre-line">
            {c.home.quote}
          </p>
          <p className="motion-scroll text-sm text-foreground/60">{c.home.quoteBy}</p>
        </div>
      </section>

      {/* ── 진행 단계: 스크롤하면 카드가 위에 차곡차곡 쌓임 ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader title={c.home.stepsTitle} />
        <ol className="flex flex-col gap-4">
          {c.steps.map((s, i) => (
            <li
              key={i}
              className="shadow-tinted sticky flex min-h-32 flex-col justify-between gap-6 rounded-3xl border border-brand-border/60 bg-brand-surface p-5"
              style={{ top: `${5 + i * 0.75}rem` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-brand-accent/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-foreground/40">
                  {i + 1} / {c.steps.length}
                </span>
              </div>
              <div>
                <p className="font-display text-xl font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-foreground/60">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 여행 가이드: 세로 사진 카드 ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader title={c.home.guideTitle} href={`/${locale}/guide`} linkLabel={c.ui.seeAll} />
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {c.guides.map((g) => (
            <Link
              key={g.slug}
              href={g.ready ? `/${locale}/guide/${g.slug}` : `/${locale}/guide`}
              className="group relative aspect-[4/5] w-[68%] shrink-0 snap-start overflow-hidden rounded-3xl active:scale-[0.98]"
            >
              <Image
                src={siteImages.guide[g.slug]}
                alt=""
                fill
                sizes="(max-width: 640px) 70vw, 440px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-white">
                <span className="font-display text-xl leading-snug font-semibold">{g.title}</span>
                <span className="text-xs text-white/80">{g.summary}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 병원 안내 ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader title={c.home.clinicTitle} href={`/${locale}/clinics`} linkLabel={c.ui.seeAll} />
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-brand-border bg-brand-border">
          {c.clinics.map((clinic) => (
            <li key={clinic.slug} className="bg-brand-surface">
              <Link
                href={`/${locale}/clinics/${clinic.slug}`}
                className="flex h-full flex-col gap-1 p-5 active:bg-foreground/[.03]"
              >
                <span className="font-display text-lg font-semibold">{clinic.name}</span>
                <span className="text-xs text-foreground/50">{clinic.area}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="flex scroll-mt-20 flex-col gap-5">
        <SectionHeader title={c.home.faqTitle} />
        <div className="flex flex-col divide-y divide-brand-border border-y border-brand-border">
          {c.faq.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
                {f.q}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-border text-foreground/50 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-10 text-sm leading-relaxed text-foreground/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 마무리 ── */}
      <section className="relative -mx-5 -mb-14 overflow-hidden rounded-t-[2rem] bg-brand-accent px-5 py-12 text-brand-accent-fg">
        <Image
          src={siteImages.space}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="relative flex flex-col gap-4">
          <p className="motion-scroll font-display text-[28px] leading-snug font-semibold">
            {c.home.finalTitle}
          </p>
          <p className="motion-scroll max-w-[34ch] text-[15px] opacity-80">{c.home.finalBody}</p>
          <div className="motion-scroll flex flex-col gap-3 pt-2">
            <Link
              href={`/${locale}/analysis`}
              className="flex min-h-14 items-center justify-center rounded-2xl bg-brand-accent-fg text-[15px] font-semibold text-brand-accent hover:opacity-90 active:scale-[0.98]"
            >
              {c.ui.scanCta}
            </Link>
            <a
              href={lineConsultUrl([c.ui.consultMessage.title])}
              className="mx-auto text-sm font-medium underline underline-offset-4 opacity-90"
            >
              {c.ui.consultCta} →
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
