"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

// 같은 페이지를 다른 언어로 엽니다(경로 첫 부분의 언어만 바꿈).
export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label={label}
      value={locale}
      onChange={(e) => router.push(pathname.replace(`/${locale}`, `/${e.target.value}`))}
      className="h-8 max-w-[6.5rem] rounded-full border border-brand-border bg-transparent px-2 text-xs"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
