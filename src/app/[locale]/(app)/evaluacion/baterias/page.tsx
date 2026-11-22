import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo-badge";

const areas = [
  { key: "readingWriting", status: "active" },
  { key: "phonological", status: "active" },
  { key: "oral", status: "active" },
  { key: "visual", status: "wip" },
  { key: "mathExec", status: "wip" },
] as const;

export default async function BatteriesPage() {
  const t = await getTranslations("Platform.batteries");
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
      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area) => (
          <Card
            key={area.key}
            className="flex items-start justify-between gap-4 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[var(--shadow-soft)]"
          >
            <div>
              <h2 className="text-lg font-semibold">{t(`areas.${area.key}`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{common("placeholder")}</p>
            </div>
            {area.status === "wip" ? (
              <span className="shrink-0 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-1 text-xs font-semibold text-warning">
                {common("inDevelopment")}
              </span>
            ) : (
              <span className="shrink-0 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                ✓
              </span>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
