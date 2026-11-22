import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoBadge } from "@/components/ui/demo-badge";
import { PlaceholderPanel } from "@/components/ui/placeholder-panel";

export default async function LeetreaPage() {
  const t = await getTranslations("Platform.leetrea");
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
      <div className="grid gap-4 md:grid-cols-3">
        <PlaceholderPanel title="Itinerarios y niveles" />
        <PlaceholderPanel title="Sesiones y actividades" />
        <PlaceholderPanel title="Seguimiento del alumnado" />
      </div>
    </div>
  );
}
