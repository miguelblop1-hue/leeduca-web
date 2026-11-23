import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ActivityMenu } from "@/features/preleo4/activity-menu";

export const metadata = {
  title: "Actividades PRELEO · 4 años",
};

export default async function Preleo4ActivitiesPage() {
  const t = await getTranslations("Preleo4");

  return (
    <div className="space-y-6">
      <Link
        href="/leeduca/4"
        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
      >
        <span aria-hidden>←</span> {t("backToAge")}
      </Link>

      <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="relative max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            4 años · PRELEO
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("menuTitle")}
          </h1>
          <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">
            {t("menuIntro")}
          </p>
        </div>
      </section>

      <ActivityMenu />
    </div>
  );
}
