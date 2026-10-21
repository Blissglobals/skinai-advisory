// 홈페이지 분위기 이미지(AI 생성, public/images/site). 언어와 무관해서
// 번역 파일과 분리합니다. 실제 의원·시술 결과를 보여주는 사진이 아니므로
// 특정 의원이나 전후 비교처럼 보이게 쓰지 않습니다.
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
  } as Record<string, string>,
  guide: {
    pharmacies: `${base}/guide-pharmacies.webp`,
    "must-buy": `${base}/guide-must-buy.webp`,
    food: `${base}/guide-food.webp`,
    itinerary: `${base}/guide-itinerary.webp`,
  } as Record<string, string>,
};
