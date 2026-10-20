import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import ResultPreview from "./ResultPreview";

// 카메라 촬영 없이 결과 화면 연출만 반복 확인하는 개발용 페이지입니다.
// 프로덕션 배포에서는 열리지 않습니다(로컬·프리뷰 배포에서만).
export default async function ResultPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.VERCEL_ENV === "production") notFound();
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return <ResultPreview dict={dict} />;
}
