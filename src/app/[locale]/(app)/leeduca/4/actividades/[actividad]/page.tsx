import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPreleoActivity, preleoActivities } from "@/features/preleo4/catalog";
import { SlideRunner } from "@/features/preleo4/slide-runner";

export function generateStaticParams() {
  return preleoActivities.map((activity) => ({ actividad: activity.id }));
}

export default async function Preleo4ActivityPage({
  params,
}: {
  params: Promise<{ actividad: string }>;
}) {
  const { actividad } = await params;
  const activity = getPreleoActivity(actividad);
  if (!activity) notFound();

  const t = await getTranslations("Preleo4");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/leeduca/4/actividades"
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
        >
          <span aria-hidden>←</span> {t("backToMenu")}
        </Link>
        <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent">
          4 años
        </span>
      </div>

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {activity.subtitle}
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {activity.title}
        </h1>
        <p className="max-w-3xl text-sm text-muted">{activity.objective}</p>
      </header>

      <SlideRunner activity={activity} />
    </div>
  );
}
