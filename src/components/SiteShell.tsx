import Link from "next/link";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { lineConsultUrl } from "@/lib/line/consult";
import { getSiteContent } from "@/content/site";

// 홈페이지 계열 공통 껍데기. .site-theme이 색·서체를 스캔 앱과 분리합니다.
// 모바일 엄지 위치에 "피부 분석(주) / LINE 상담(보조)" 고정 바를 두고, consultLines로
// 페이지별 상담 문구를 넘기면 그 내용이 미리 채워집니다.
export default function SiteShell({
  locale,
  consultLines,
  children,
}: {
  locale: Locale;
  consultLines?: string[];
  children: React.ReactNode;
}) {
  const { ui, footer } = getSiteContent(locale);
  const consultUrl = lineConsultUrl(consultLines ?? [ui.consultMessage.title]);

  return (
    <div className="site-theme flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-brand-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-xl items-center gap-4 px-5">
          <Link href={`/${locale}`} className="font-display mr-auto text-[17px] font-semibold">
            {ui.brand}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-foreground/70">
            <Link href={`/${locale}/treatments`} className="hover:text-foreground">
              {ui.nav.treatments}
            </Link>
            <Link href={`/${locale}/guide`} className="hover:text-foreground">
              {ui.nav.guide}
            </Link>
          </nav>
          <LanguageSwitcher locale={locale} label={ui.languageLabel} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-16 px-5 pt-6 pb-14">
        {children}
      </main>

      <footer className="border-t border-brand-border pb-28">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2 px-5 py-10 text-xs leading-relaxed text-foreground/50">
          <p className="font-display text-base font-semibold text-foreground/80">{footer.company}</p>
          <p>{footer.registration}</p>
          <p>info@zerolabclinic.com</p>
          <p className="max-w-[60ch]">{footer.disclaimer}</p>
          <p className="max-w-[60ch]">{footer.aiNotice}</p>
          <Link href={`/${locale}/privacy`} className="w-fit underline underline-offset-2">
            {footer.privacy}
          </Link>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="shadow-tinted mx-auto flex w-full max-w-xl gap-2 rounded-2xl border border-white/40 bg-brand-surface/80 p-2 backdrop-blur-xl dark:border-white/10">
          <Link
            href={`/${locale}/analysis`}
            className="flex min-h-12 flex-[1.6] items-center justify-center rounded-xl bg-brand-accent text-sm font-semibold text-brand-accent-fg hover:opacity-90 active:scale-[0.98]"
          >
            {ui.scanBar}
          </Link>
          <a
            href={consultUrl}
            className="flex min-h-12 flex-1 items-center justify-center rounded-xl text-sm font-medium hover:bg-foreground/[.04] active:scale-[0.98]"
          >
            {ui.consultBar}
          </a>
        </div>
      </div>
    </div>
  );
}
