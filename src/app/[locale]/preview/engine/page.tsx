import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import EngineCheck from "./EngineCheck";

// 엔진 일관성 점검(개발용). 같은 얼굴을 크기·밝기·색조만 바꿔 넣고 점수 흔들림을 봅니다.
// 프로덕션 배포에서는 열리지 않습니다.
export default async function EngineCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.VERCEL_ENV === "production") notFound();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <EngineCheck messages={dict.analysisMessages} />;
}
