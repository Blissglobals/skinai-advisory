import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import Image from "next/image";
import { siteImages } from "@/content/site/images";
import { getSiteContent } from "@/content/site";

// 고민별로 묶어서 보여줍니다. 한 시술이 여러 고민에 걸리면 각 고민 아래에 다 나옵니다.
export default async function TreatmentIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-2 pt-2">
        <h1 className="font-display text-[34px] leading-tight font-semibold">{c.treatmentPage.indexTitle}</h1>
        <p className="text-[15px] text-foreground/65">{c.treatmentPage.indexIntro}</p>
      </section>

      {c.concerns.map((concern) => {
        const items = c.treatments.filter(
          (t) => t.ready && concern.treatmentSlugs.includes(t.slug)
        );
        if (items.length === 0) return null;
        return (
          <section key={concern.slug} className="motion-scroll flex flex-col gap-3">
            <Link href={`/${locale}/concerns/${concern.slug}`} className="flex items-center gap-3">
              <span className="relative size-12 overflow-hidden rounded-2xl">
                <Image src={siteImages.concern[concern.slug]} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="font-display text-xl font-semibold">{concern.name}</span>
              <span className="ml-auto text-foreground/30">›</span>
            </Link>
            <div className="shadow-tinted flex flex-col divide-y divide-brand-border rounded-3xl bg-brand-surface">
              {items.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${locale}/treatments/${t.slug}`}
                  className="flex items-center justify-between gap-3 px-5 py-4 active:bg-foreground/[.03]"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-medium">{t.name}</span>
                    <span className="line-clamp-1 text-xs text-foreground/55">{t.summary}</span>
                  </span>
                  <span className="text-foreground/30">›</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </SiteShell>
  );
}
