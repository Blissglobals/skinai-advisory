import "server-only";
import type { Locale } from "./config";
import type { Dictionary as DictionaryType } from "./dictionaries/ko";
import { deepMerge, type DeepPartial } from "./deepMerge";

export type Dictionary = DictionaryType;

const baseDictionary = () => import("./dictionaries/ko").then((m) => m.default);

const localeDictionaries: Record<
  Exclude<Locale, "ko">,
  () => Promise<DeepPartial<Dictionary>>
> = {
  "zh-TW": () => import("./dictionaries/zh-TW").then((m) => m.default),
  "zh-CN": () => import("./dictionaries/zh-CN").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const base = await baseDictionary();
  if (locale === "ko") return base;

  const override = await localeDictionaries[locale]();
  return deepMerge<Dictionary>(base, override);
}
