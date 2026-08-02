"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ConsentView({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <div className="app-shell justify-center gap-6">
      <div>
        <p className="inline-block rounded-md bg-brand-secondary px-2 py-1 text-xs font-medium text-brand-secondary-fg">
          {dict.consent.badge}
        </p>
        <h1 className="mt-3 text-xl font-medium">{dict.consent.heading}</h1>
      </div>

      <ul className="flex flex-col gap-3 text-sm text-foreground/80">
        {dict.consent.notices.map((text, i) => (
          <li key={text} className="flex gap-2">
            <span className="shrink-0 text-foreground/40">{i + 1}.</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <label className="flex items-start gap-2 rounded-xl border border-brand-border p-3 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        <span>{dict.consent.agree}</span>
      </label>

      <button
        type="button"
        onClick={() => router.push(`/${locale}/scan`)}
        disabled={!agreed}
        className="flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-primary px-4 py-3 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
      >
        {dict.consent.start}
      </button>

      <Link
        href={`/${locale}/privacy`}
        className="text-center text-xs text-foreground/40 underline underline-offset-2"
      >
        {dict.privacy.linkLabel}
      </Link>
    </div>
  );
}
