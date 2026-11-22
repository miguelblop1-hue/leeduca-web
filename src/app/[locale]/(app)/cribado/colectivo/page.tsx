import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo-badge";
import { collectiveAges } from "@/features/plataforma/data";

export default async function CollectiveScreeningPage() {
  const t = await getTranslations("Platform.screeningCollective");
  const common = await getTranslations("Common");

  return (
    <div className="space-y-8">
      <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="relative max-w-3xl space-y-3">
          <DemoBadge />
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong">
            ← {common("backToPlatform")}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
          <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">{t("intro")}</p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{t("ages")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {collectiveAges.map((age) => (
            <Link key={age} href={`/cribado/colectivo/${age}`} className="group">
              <Card className="flex flex-col items-center justify-center gap-1 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-glow)]">
                <p className="text-3xl font-bold tracking-tight text-accent">{age}</p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {common("ageYears", { age })}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
