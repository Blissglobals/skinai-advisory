import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { getSiteContent } from "@/content/site";

export default async function ClinicIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);

  return (
    <SiteShell locale={locale}>
      <section className="motion-rise flex flex-col gap-2 pt-2">
        <h1 className="font-display text-[34px] leading-tight font-semibold">{c.clinicPage.title}</h1>
        <p className="text-[15px] leading-relaxed text-foreground/65">{c.clinicPage.intro}</p>
      </section>

      <section className="flex flex-col gap-3">
        {c.clinics.map((clinic, i) => (
          <Link
            key={clinic.slug}
            href={`/${locale}/clinics/${clinic.slug}`}
            className="motion-scroll shadow-tinted flex items-center gap-4 rounded-3xl bg-brand-surface p-5 active:scale-[0.98]"
          >
            <span className="font-display text-2xl text-brand-accent/40">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-xl font-semibold">{clinic.name}</span>
              <span className="text-sm text-foreground/55">
                {clinic.area} · {clinic.station}
              </span>
            </span>
            <span className="ml-auto text-foreground/30">›</span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
