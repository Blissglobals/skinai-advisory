import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { DraftBadge, PhotoHero, SectionHeader } from "@/components/site/ui";
import { siteImages } from "@/content/site/images";
import { getSiteContent, readyGuideSlugs } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => readyGuideSlugs.map((slug) => ({ locale, slug })));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const g = c.guides.find((x) => x.slug === slug && x.ready);
  if (!g) notFound();
  const others = c.guides.filter((x) => x.ready && x.slug !== g.slug);

  return (
    <SiteShell
      locale={locale}
      consultLines={[c.ui.consultMessage.title, `${c.ui.consultMessage.topic}: ${g.title}`]}
    >
      <PhotoHero
        src={siteImages.guide[g.slug] ?? siteImages.space}
        eyebrow={<DraftBadge>{c.ui.draftNotice}</DraftBadge>}
        title={g.title}
      >
        <p className="text-xs text-foreground/50">
          {c.guidePage.lastChecked}: {g.lastChecked} · {c.guidePage.sponsoredNote}
        </p>
      </PhotoHero>

      {g.sections?.map((section) => (
        <section key={section.heading} className="motion-scroll flex flex-col gap-3">
          <SectionHeader title={section.heading} />
          {section.body && (
            <p className="text-sm leading-relaxed text-foreground/65">{section.body}</p>
          )}
          {section.items && (
            <ul className="flex flex-col gap-2.5 rounded-2xl bg-foreground/[.03] p-4">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed">
                  <span className="text-brand-accent">•</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.spots && (
            <ul className="flex flex-col gap-2">
              {section.spots.map((spot) => (
                <li
                  key={spot.name}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-brand-border bg-brand-surface p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold">
                      {spot.name}
                      {spot.sponsored && (
                        <span className="rounded bg-foreground/[.08] px-1.5 py-0.5 text-[10px] text-foreground/60">
                          {c.ui.adLabel}
                        </span>
                      )}
                      {spot.badges?.map((badge) => (
                        <span
                          key={badge}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            badge === "visited" ? "bg-brand-secondary text-brand-secondary-fg" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {c.ui.spotBadges[badge]}
                        </span>
                      ))}
                    </p>
                    <p className="mt-1 text-sm text-foreground/60">{spot.note}</p>
                    {spot.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={spot.photo} alt={spot.name} loading="lazy" className="mt-3 aspect-[4/3] w-full rounded-xl object-cover" />
                    )}
                  </div>
                  {spot.mapUrl && (
                    <a
                      href={spot.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-sm font-medium text-brand-accent"
                    >
                      Map
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {others.length > 0 && (
        <section className="motion-scroll flex flex-col gap-3">
          <SectionHeader title={c.guidePage.title} href={`/${locale}/guide`} linkLabel={c.ui.seeAll} />
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/${locale}/guide/${o.slug}`}
                className="flex w-[60%] shrink-0 snap-start flex-col gap-1 rounded-2xl bg-brand-secondary/60 p-4"
              >
                <span className="text-[15px] font-semibold">{o.title}</span>
                <span className="text-xs text-foreground/60">{o.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
