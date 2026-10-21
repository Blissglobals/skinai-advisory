import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import { siteImages } from "@/content/site/images";
import { getSiteContent } from "@/content/site";

export default async function GuideIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-2 pt-2">
        <h1 className="font-display text-[34px] leading-tight font-semibold">{c.guidePage.title}</h1>
        <p className="text-[15px] text-foreground/65">{c.guidePage.intro}</p>
      </section>

      <section className="flex flex-col gap-4">
        {c.guides.map((g, i) => {
          const inner = (
            <>
              <Image
                src={siteImages.guide[g.slug]}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="motion-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-white">
                <span className="font-display text-sm text-white/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold">{g.title}</span>
                <span className="text-sm text-white/80">{g.summary}</span>
                {!g.ready && <span className="text-xs text-white/70">{c.ui.comingSoon}</span>}
              </div>
            </>
          );
          const cls = "relative aspect-[4/3] overflow-hidden rounded-3xl active:scale-[0.98]";
          return g.ready ? (
            <Link key={g.slug} href={`/${locale}/guide/${g.slug}`} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={g.slug} className={`${cls} opacity-70`}>
              {inner}
            </div>
          );
        })}
      </section>
    </SiteShell>
  );
}
