export const locales = ["ko", "zh-TW", "zh-CN"] as const;

export type Locale = (typeof locales)[number];

// 서비스 대상이 대만이라 중국어가 아닌 브라우저도 번체로 엽니다.
// ko는 내부 테스트용으로 /ko 경로로 직접 들어갈 때만 보입니다.
export const defaultLocale: Locale = "zh-TW";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
