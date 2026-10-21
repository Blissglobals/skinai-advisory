"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScanHeader } from "@/components/site/ui";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ConsentView({
  dict,
  locale,
  brand,
}: {
  dict: Dictionary;
  locale: string;
  brand: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <div className="site-theme mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-36">
      <ScanHeader homeHref={`/${locale}`} brand={brand} />

      <div className="motion-rise mt-8 flex flex-col gap-3">
        <p className="text-xs font-medium tracking-wide text-brand-accent">{dict.consent.badge}</p>
        <h1 className="font-display text-[28px] leading-snug font-semibold">{dict.consent.heading}</h1>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {dict.consent.notices.map((text, i) => (
          <li
            key={text}
            className="motion-rise flex gap-3 rounded-2xl bg-brand-surface p-4 text-sm leading-relaxed text-foreground/80 shadow-tinted"
            style={{ "--d": `${120 + i * 70}ms` } as React.CSSProperties}
          >
            <span className="font-display shrink-0 text-base text-brand-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/${locale}/privacy`}
        className="mt-5 w-fit text-xs text-foreground/45 underline underline-offset-2"
      >
        {dict.privacy.linkLabel}
      </Link>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="shadow-tinted mx-auto flex w-full max-w-xl flex-col gap-2 rounded-3xl border border-white/40 bg-brand-surface/85 p-3 backdrop-blur-xl dark:border-white/10">
          <label className="flex cursor-pointer items-start gap-3 px-1 py-1 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--brand-accent)]"
            />
            <span>{dict.consent.agree}</span>
          </label>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/scan`)}
            disabled={!agreed}
            className="flex min-h-13 w-full items-center justify-center rounded-2xl bg-brand-primary text-[15px] font-semibold text-brand-primary-fg active:scale-[0.98] disabled:opacity-35 disabled:active:scale-100"
          >
            {dict.consent.start}
          </button>
        </div>
      </div>
    </div>
  );
}
