import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { lineConsultUrl } from "@/lib/line/consult";
import { tx, ui } from "@/content/site";

// 홈페이지 계열(홈·시술 안내·가이드) 공통 머리말/꼬리말. 스캔 화면은 앱처럼
// 꽉 찬 화면을 쓰므로 이 껍데기를 쓰지 않습니다.
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-brand-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4">
          <Link href={`/${locale}`} className="text-sm font-semibold tracking-tight">
            {tx(ui.brand, locale)}
          </Link>
          <a
            href={lineConsultUrl([tx(ui.consultTitle, locale)])}
            className="rounded-full bg-brand-accent px-3 py-1.5 text-xs font-medium text-brand-accent-fg transition-transform active:scale-[0.97]"
          >
            {tx(ui.consultShort, locale)}
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-10 px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-brand-border">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-2 px-4 py-6 text-xs text-foreground/50">
          <p className="font-medium text-foreground/70">{tx(ui.footer.company, locale)}</p>
          <p>{tx(ui.footer.registration, locale)}</p>
          <p>blissglobalscs@gmail.com</p>
          <p>{tx(ui.footer.disclaimer, locale)}</p>
          <Link href={`/${locale}/privacy`} className="underline underline-offset-2">
            {tx(ui.footer.privacy, locale)}
          </Link>
        </div>
      </footer>
    </div>
  );
}
