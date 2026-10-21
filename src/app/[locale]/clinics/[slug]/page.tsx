import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import SiteShell from "@/components/SiteShell";
import { SectionHeader } from "@/components/site/ui";
import { clinicSlugs, getSiteContent, mapsUrl } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => clinicSlugs.map((slug) => ({ locale, slug })));
}

// 의원 사진은 실제 사진을 받기 전까지 넣지 않습니다(AI 이미지로 특정 의원처럼
// 보이게 하면 오인 소지가 있음). 공식 정보 + 외부 링크만 보여줍니다.
export default async function ClinicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getSiteContent(locale);
  const clinic = c.clinics.find((x) => x.slug === slug);
  if (!clinic) notFound();
  const p = c.clinicPage;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: p.address, value: clinic.address },
    { label: p.station, value: clinic.station },
    {
      label: p.phone,
      value: (
        <a href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-2">
          {clinic.phone}
        </a>
      ),
    },
    { label: p.languages, value: clinic.languages },
  ];

  return (
    <SiteShell
      locale={locale}
      consultLines={[c.ui.consultMessage.title, `${p.consultInterest}: ${clinic.name}`]}
    >
      <section className="motion-rise -mx-5 -mt-6 flex flex-col gap-3 bg-gradient-to-b from-brand-secondary to-background px-5 pt-10 pb-4">
        <span className="w-fit rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-brand-accent">
          {clinic.area}
        </span>
        <h1 className="font-display text-[36px] leading-tight font-semibold">{clinic.name}</h1>
        {clinic.formerName && (
          <p className="text-sm text-foreground/55">
            ({p.formerName} {clinic.formerName})
          </p>
        )}
      </section>

      <section className="motion-scroll flex flex-col gap-4">
        <dl className="shadow-tinted divide-y divide-brand-border rounded-3xl bg-brand-surface">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 px-5 py-4">
              <dt className="text-xs text-foreground/50">{row.label}</dt>
              <dd className="text-[15px] leading-relaxed">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={clinic.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-2xl bg-brand-primary px-3 text-sm font-semibold text-brand-primary-fg active:scale-[0.98]"
          >
            {p.homepage} ↗
          </a>
          <a
            href={mapsUrl(`${clinic.name} ${clinic.address}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-surface px-3 text-sm font-medium active:scale-[0.98]"
          >
            {p.map} ↗
          </a>
          {clinic.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 flex min-h-11 items-center justify-center rounded-2xl text-sm font-medium text-foreground/70 hover:bg-foreground/[.04]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-foreground/50">{p.detailNote}</p>
      </section>

      <section className="motion-scroll flex flex-col gap-4">
        <SectionHeader title={c.home.guideTitle} href={`/${locale}/guide`} linkLabel={c.ui.seeAll} />
        <div className="flex flex-col gap-2">
          {c.guides
            .filter((g) => g.ready && (g.slug === "pharmacies" || g.slug === "food"))
            .map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guide/${g.slug}`}
                className="flex items-center justify-between rounded-2xl bg-brand-secondary px-5 py-4 active:scale-[0.98]"
              >
                <span className="font-medium">{g.title}</span>
                <span className="text-foreground/40">›</span>
              </Link>
            ))}
        </div>
      </section>
    </SiteShell>
  );
}
