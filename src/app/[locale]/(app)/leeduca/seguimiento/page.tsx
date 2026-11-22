import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoBadge } from "@/components/ui/demo-badge";
import { StudentTracker } from "@/features/seguimiento/student-tracker";

export default async function SeguimientoPage() {
  const common = await getTranslations("Common");

  return (
    <div className="space-y-6">
      <Link
        href="/leeduca"
        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-surface hover:text-accent"
      >
        <span aria-hidden>←</span> {common("backToPlatform")}
      </Link>

      <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative max-w-3xl space-y-3">
          <DemoBadge />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Seguimiento
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Seguimiento del alumnado</h1>
          <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">
            Registra comentarios por alumno, consulta la agenda semanal (lunes a viernes) y añade
            observaciones en días anteriores desde el inicio de curso.
          </p>
        </div>
      </section>

      <StudentTracker />
    </div>
  );
}
