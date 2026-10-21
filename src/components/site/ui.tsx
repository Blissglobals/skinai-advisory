import Image from "next/image";
import Link from "next/link";

// 홈페이지 공통 소품: 섹션 제목, 태그 칩, 고민별 아이콘, 초안 배지.

export function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="font-display text-[22px] leading-snug font-semibold">{title}</h2>
      {href && linkLabel && (
        <Link href={href} className="shrink-0 text-sm font-medium text-brand-accent">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export function Chip({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls =
    "inline-flex min-h-8 items-center rounded-full bg-brand-secondary px-3 text-xs font-medium text-brand-secondary-fg";
  return href ? (
    <Link href={href} className={`${cls} transition-transform active:scale-[0.97]`}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}

export function DraftBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-fit rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
      {children}
    </p>
  );
}

// 하위 페이지 상단: 화면 폭 가득 찬 사진 위에 제목을 얹습니다.
export function PhotoHero({
  src,
  eyebrow,
  title,
  children,
}: {
  src: string;
  eyebrow?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="-mx-5 -mt-6 flex flex-col">
      <div className="relative h-[42svh] min-h-[300px] overflow-hidden">
        <div className="motion-parallax absolute inset-0">
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="motion-kenburns object-cover"
          />
        </div>
        <div className="absolute inset-x-0 top-0 -bottom-px bg-gradient-to-b from-black/10 via-transparent via-55% to-background" />
      </div>
      <div className="relative -mt-20 flex flex-col gap-4 px-5">
        {eyebrow && (
          <div className="motion-rise" style={{ "--d": "150ms" } as React.CSSProperties}>
            {eyebrow}
          </div>
        )}
        <h1
          className="motion-rise font-display text-[34px] leading-tight font-semibold"
          style={{ "--d": "260ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {children && (
          <div className="motion-rise flex flex-col gap-4" style={{ "--d": "380ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

// 피부 분석 화면 상단: 브랜드(홈으로) + 닫기. 스캔 흐름은 앱처럼 꽉 찬 화면이라
// 홈페이지 머리말 대신 이 얇은 줄만 둡니다.
export function ScanHeader({ homeHref, brand }: { homeHref: string; brand: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between">
      <Link href={homeHref} className="font-display text-[17px] font-semibold">
        {brand}
      </Link>
      <Link
        href={homeHref}
        aria-label="close"
        className="flex size-9 items-center justify-center rounded-full text-xl text-foreground/50 hover:bg-foreground/[.05]"
      >
        ×
      </Link>
    </div>
  );
}
