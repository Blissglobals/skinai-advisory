export const locales = ["ko", "en", "zh-CN", "zh-TW"] as const;

export type Locale = (typeof locales)[number];

// ponytail: 콘텐츠를 한국어로 먼저 만들고 테스트하는 동안은 ko가 기본입니다.
// 출시 전에 서비스 대상(대만이면 zh-TW)으로 바꿔야 합니다 — 한국 사용자에게
// 의원 상담 유도가 노출되지 않도록.
export const defaultLocale: Locale = "ko";

// 언어 선택 메뉴에 보이는 이름(각 언어로 표기).
export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
