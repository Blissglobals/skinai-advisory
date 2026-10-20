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
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
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

// 고민별 단순 선 아이콘(외부 아이콘 라이브러리 없이 인라인 SVG).
const ICON_PATHS: Record<string, React.ReactNode> = {
  pigment: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  pore: (
    <>
      <circle cx="7" cy="7" r="1.5" />
      <circle cx="17" cy="7" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </>
  ),
  wrinkle: <path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 18c3-2 6 2 9 0s6-2 9 0" />,
  acne: <path d="M12 3c3.5 4.2 6 7.6 6 10.5a6 6 0 0 1-12 0C6 10.6 8.5 7.2 12 3z" />,
  redness: (
    <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
  ),
};

export function ConcernIcon({ slug }: { slug: string }) {
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-brand-secondary text-brand-secondary-fg">
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {ICON_PATHS[slug] ?? <circle cx="12" cy="12" r="5" />}
      </svg>
    </span>
  );
}
