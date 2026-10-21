import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ScanHeader } from "@/components/site/ui";
import { getSiteContent } from "@/content/site";
import { siteImages } from "@/content/site/images";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default async function AnalysisIntro({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { ui } = getSiteContent(locale);
  // 사전 문구에 "1. " 같은 번호가 붙어 있어 화면에서는 떼고 번호를 따로 그립니다.
  const steps = dict.home.steps.map((s) => s.replace(/^\d+\.\s*/, ""));

  return (
    <div className="site-theme mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-32">
      <ScanHeader homeHref={`/${locale}`} brand={ui.brand} />

      {/* 얼굴 사진 위로 빛 띠가 지나가는 "스캔" 연출 */}
      <div className="motion-rise relative mt-4 aspect-[4/5] overflow-hidden rounded-[2rem]" style={delay(0)}>
        <Image
          src={siteImages.hero}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 600px"
          className="motion-kenburns object-cover object-[60%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="motion-scan absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-white/35 to-transparent mix-blend-overlay" />
        {/* 모서리 프레임 */}
        {["top-5 left-5 border-t-2 border-l-2", "top-5 right-5 border-t-2 border-r-2", "bottom-5 left-5 border-b-2 border-l-2", "bottom-5 right-5 border-b-2 border-r-2"].map(
          (pos) => (
            <span key={pos} className={`absolute size-7 rounded-[4px] border-white/80 ${pos}`} />
          )
        )}
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur">
          {dict.home.badge}
        </p>
      </div>

      <section className="mt-8 flex flex-col gap-4">
        <h1 className="font-display text-[32px] leading-[1.2] font-semibold">
          <span className="motion-rise block" style={delay(150)}>
            {dict.home.heading1}
          </span>
          <span className="motion-rise block" style={delay(280)}>
            {dict.home.heading2}
          </span>
        </h1>
        <p className="motion-rise text-[15px] leading-relaxed text-foreground/65" style={delay(400)}>
          {dict.home.subtitle}
        </p>
      </section>

      <ol className="mt-8 flex flex-col divide-y divide-brand-border border-y border-brand-border">
        {steps.map((step, i) => (
          <li
            key={step}
            className="motion-rise flex items-center gap-4 py-3.5"
            style={delay(500 + i * 90)}
          >
            <span className="font-display w-7 text-lg text-brand-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px]">{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-6 flex items-start gap-2 rounded-2xl bg-brand-secondary px-4 py-3 text-sm text-brand-secondary-fg">
        <span aria-hidden>🔒</span>
        {dict.home.privacyNote}
      </p>

      <p className="mt-4 text-xs text-foreground/45">{dict.home.footnote}</p>
      <Link
        href={`/${locale}/privacy`}
        className="mt-1 w-fit text-xs text-foreground/45 underline underline-offset-2"
      >
        {dict.privacy.linkLabel}
      </Link>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href={`/${locale}/consent`}
          className="shadow-tinted mx-auto flex min-h-14 w-full max-w-xl items-center justify-center rounded-2xl bg-brand-primary text-[15px] font-semibold text-brand-primary-fg active:scale-[0.98]"
        >
          {dict.home.cta}
        </Link>
      </div>
    </div>
  );
}
