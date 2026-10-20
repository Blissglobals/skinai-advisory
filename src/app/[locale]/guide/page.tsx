import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { getSiteContent } from "@/content/site";

export default async function GuideIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-2 pt-2">
        <h1 className="text-2xl font-semibold">{c.guidePage.title}</h1>
        <p className="text-sm text-foreground/60">{c.guidePage.intro}</p>
      </section>

      <section className="flex flex-col gap-3">
        {c.guides.map((g) => {
          const inner = (
            <>
              <span className="text-sm font-medium">{g.title}</span>
              <span className="text-xs text-foreground/60">{g.summary}</span>
              {!g.ready && (
                <span className="w-fit rounded-full bg-foreground/[.06] px-2 py-0.5 text-[10px] text-foreground/50">
                  {c.ui.comingSoon}
                </span>
              )}
            </>
          );
          const cls =
            "motion-scroll flex flex-col gap-1 rounded-xl border border-brand-border bg-brand-surface p-4";
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
