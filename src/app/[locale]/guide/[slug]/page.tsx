import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { lineConsultUrl } from "@/lib/line/consult";
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

  const consultUrl = lineConsultUrl([c.ui.consultMessage.title, `${c.ui.consultMessage.topic}: ${g.title}`]);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-2 pt-2">
        <p className="w-fit rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
          {c.ui.draftNotice}
        </p>
        <h1 className="text-2xl font-semibold">{g.title}</h1>
        <p className="text-xs text-foreground/50">
          {c.guidePage.lastChecked}: {g.lastChecked} · {c.guidePage.sponsoredNote}
        </p>
      </section>

      {g.sections?.map((section, i) => (
        <section key={i} className="motion-scroll flex flex-col gap-3">
          <h2 className="text-base font-semibold">{section.heading}</h2>
          <ul className="flex flex-col gap-2">
            {section.spots.map((spot, j) => (
              <li
                key={j}
                className="flex items-start justify-between gap-3 rounded-xl border border-brand-border p-4"
              >
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {spot.name}
                    {spot.sponsored && (
                      <span className="rounded bg-foreground/[.08] px-1.5 py-0.5 text-[10px] text-foreground/60">
                        {c.ui.adLabel}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-foreground/60">{spot.note}</p>
                </div>
                {spot.mapUrl && (
                  <a
                    href={spot.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-brand-accent"
                  >
                    Map
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="motion-scroll flex flex-col gap-2">
        <a
          href={consultUrl}
          className="flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-medium text-brand-primary-fg transition-transform active:scale-[0.98]"
        >
          {c.ui.consultCta}
        </a>
        <Link href={`/${locale}/guide`} className="text-center text-xs text-foreground/50">
          ← {c.guidePage.title}
        </Link>
      </section>
    </SiteShell>
  );
}
