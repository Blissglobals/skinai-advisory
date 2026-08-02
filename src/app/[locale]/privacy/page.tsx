import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="app-shell gap-6 overflow-y-auto">
      <div>
        <h1 className="text-xl font-medium">{dict.privacy.title}</h1>
        <p className="mt-1 text-xs text-foreground/50">{dict.privacy.effectiveDate}</p>
      </div>

      <p className="text-sm text-foreground/80">{dict.privacy.intro}</p>

      <div className="flex flex-col gap-5">
        {dict.privacy.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-sm font-medium">{section.heading}</h2>
            <div className="mt-1.5 flex flex-col gap-1">
              {section.body.map((line) => (
                <p key={line} className="text-xs text-foreground/70">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-foreground/40">{dict.privacy.footer}</p>
    </div>
  );
}
