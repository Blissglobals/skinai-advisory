import type { Locale } from "@/i18n/config";
import { deepMerge, type DeepPartial } from "@/i18n/deepMerge";
import ko from "./ko";

// 홈페이지 콘텐츠는 한국어(ko.ts)가 원본입니다. 번역은 같은 모양의 파일을
// 만들어 아래 translations에 넣으면 되고, 빠진 항목은 한국어로 보입니다.
// 배열(목록)은 통째로 바뀌므로 번역할 때 목록 전체를 넣어야 합니다.
// ponytail: 콘텐츠를 코드에 두는 방식 — 직원이 자주 고치게 되면 CMS로 옮깁니다.

export interface Spot {
  name: string;
  note: string;
  sponsored: boolean;
  mapUrl?: string;
}

export interface Concern {
  slug: string;
  name: string;
  hint: string;
  intro: string;
  causes: string[];
  homeCare: string[];
  treatmentSlugs: string[];
}

export interface Treatment {
  slug: string;
  ready: boolean;
  name: string;
  summary: string;
  forWhom?: string[];
  facts?: { label: string; value: string }[];
  cautions?: string[];
  faq?: { q: string; a: string }[];
}

export interface GuideSection {
  heading: string;
  body?: string;
  items?: string[];
  spots?: Spot[];
}

export interface Guide {
  slug: string;
  ready: boolean;
  title: string;
  summary: string;
  lastChecked?: string;
  sections?: GuideSection[];
}

export interface SiteContent {
  ui: {
    brand: string;
    draftNotice: string;
    consultCta: string;
    consultBar: string;
    scanCta: string;
    scanBar: string;
    comingSoon: string;
    seeAll: string;
    adLabel: string;
    languageLabel: string;
    nav: { treatments: string; guide: string };
    consultMessage: { title: string; interest: string; topic: string; concern: string };
  };
  home: {
    eyebrow: string;
    heading: string;
    subheading: string;
    chips: string[];
    marquee: string[];
    quote: string;
    quoteBy: string;
    concernsTitle: string;
    treatmentsTitle: string;
    stepsTitle: string;
    guideTitle: string;
    clinicTitle: string;
    faqTitle: string;
    finalTitle: string;
    finalBody: string;
  };
  concernPage: {
    causes: string;
    treatments: string;
    homeCare: string;
    scanTitle: string;
    scanBody: string;
  };
  treatmentPage: {
    indexTitle: string;
    indexIntro: string;
    relatedConcerns: string;
    forWhom: string;
    facts: string;
    cautions: string;
    faq: string;
    related: string;
  };
  guidePage: { title: string; intro: string; lastChecked: string; sponsoredNote: string };
  footer: { company: string; registration: string; disclaimer: string; privacy: string };
  concerns: Concern[];
  treatments: Treatment[];
  steps: { title: string; body: string }[];
  guides: Guide[];
  clinics: { name: string; note: string }[];
  faq: { q: string; a: string }[];
}

const translations: Partial<Record<Locale, DeepPartial<SiteContent>>> = {};

export function getSiteContent(locale: Locale): SiteContent {
  return deepMerge<SiteContent>(ko, translations[locale]);
}

// 언어와 무관하게 존재하는 페이지 목록(정적 생성용). 원본 기준입니다.
export const readyTreatmentSlugs = ko.treatments.filter((t) => t.ready).map((t) => t.slug);
export const readyGuideSlugs = ko.guides.filter((g) => g.ready).map((g) => g.slug);
export const concernSlugs = ko.concerns.map((c) => c.slug);
