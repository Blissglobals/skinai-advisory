import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  // PDF 리포트에 쓰는 CJK 폰트 파일을 fs.readFileSync로 동적 경로에서
  // 읽어오기 때문에, 정적 분석만으로는 추적이 안 돼 명시적으로 포함시킵니다.
  outputFileTracingIncludes: {
    "/api/line/link-session": [
      "./node_modules/@fontsource/noto-sans-kr/files/**/*",
      "./node_modules/@fontsource/noto-sans-tc/files/**/*",
      "./node_modules/@fontsource/noto-sans-sc/files/**/*",
    ],
  },
};

export default nextConfig;
