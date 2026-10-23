// 홈페이지 분위기 이미지(AI 생성, public/images/site). 언어와 무관해서
// 번역 파일과 분리합니다. 실제 의원·시술 결과를 보여주는 사진이 아니므로
// 특정 의원이나 전후 비교처럼 보이게 쓰지 않습니다. concern.* 사진에는 AI 가상인물이
// 등장하므로, 크게 보이는 곳에는 "AI 생성 가상인물" 표시를 함께 둡니다.
const base = "/images/site";

export const siteImages = {
  hero: `${base}/hero.webp`,
  space: `${base}/space.webp`,
  concern: {
    pigment: `${base}/concern-pigment.webp`,
    pore: `${base}/concern-pore.webp`,
    wrinkle: `${base}/concern-wrinkle.webp`,
    acne: `${base}/concern-acne.webp`,
    redness: `${base}/concern-redness.webp`,
    // 피부 분석의 "탄력" 목표 선택 타일용
    elasticity: `${base}/concern-elasticity.webp`,
  } as Record<string, string>,
  // 정밀 분석 거울 촬영 안내 일러스트(AI 생성 일러스트, 실제 인물 아님)
  mirrorShot: `${base}/guide-mirror.webp`,
  // 제로랩 가이드는 기존 분위기 이미지를 재활용합니다(필요하면 전용 이미지로 교체).
  guide: {
    attractions: `${base}/guide-itinerary.webp`,
    pharmacies: `${base}/guide-pharmacies.webp`,
    food: `${base}/guide-food.webp`,
    cosmetics: `${base}/guide-must-buy.webp`,
    shopping: `${base}/space.webp`,
  } as Record<string, string>,
};
