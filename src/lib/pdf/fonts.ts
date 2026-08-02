import { readFileSync } from "fs";
import path from "path";
import { Font } from "@react-pdf/renderer";
import type { Locale } from "@/i18n/config";

// 기본 PDF 폰트(Helvetica 등)는 한글/중국어 글리프가 없어서, 리포트 언어에
// 맞는 Noto Sans 폰트를 로케일별로 등록해 사용합니다. 서버리스 컨테이너가
// 재사용(warm)될 수 있어서, 로케일마다 별도 family 이름을 써야 다른
// 요청의 폰트를 덮어써버리는 문제를 피할 수 있습니다.
const FONT_FILE_BY_LOCALE: Record<Locale, string> = {
  ko: "@fontsource/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff",
  "zh-TW": "@fontsource/noto-sans-tc/files/noto-sans-tc-chinese-traditional-400-normal.woff",
  "zh-CN": "@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff",
};

const registeredLocales = new Set<Locale>();

function familyNameFor(locale: Locale): string {
  return `ReportSans-${locale}`;
}

export function registerReportFont(locale: Locale): string {
  const family = familyNameFor(locale);
  if (!registeredLocales.has(locale)) {
    const fontPath = path.join(process.cwd(), "node_modules", FONT_FILE_BY_LOCALE[locale]);
    const fontBuffer = readFileSync(fontPath);
    const dataUri = `data:font/woff;base64,${fontBuffer.toString("base64")}`;
    Font.register({
      family,
      fonts: [{ src: dataUri }],
    });
    registeredLocales.add(locale);
  }
  return family;
}
