import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { StudentTracker } from "@/features/seguimiento/student-tracker";
import { getSeguimientoData } from "@/features/seguimiento/actions";
import { QuickVoiceComment } from "@/features/seguimiento/quick-voice-comment";

export const dynamic = "force-dynamic";

export default async function SeguimientoPage() {
  const common = await getTranslations("Common");

  let initialData;
  let error: string | null = null;
  try {
    initialData = await getSeguimientoData();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido al cargar la base de datos.";
  }

  return (
    <div className="space-y-6">
      <Link
        href="/leeduca"
        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-surface hover:text-accent"
      >
        <span aria-hidden>←</span> {common("backToPlatform")}
      </Link>

      <section className="space-y-4 py-2">
        <QuickVoiceComment students={initialData?.students ?? []} />
        <p className="mx-auto max-w-2xl text-center text-sm text-muted">
          Registra comentarios por alumno, consulta la agenda semanal (lunes a viernes) y añade
          observaciones en días anteriores desde el inicio de curso.
        </p>
      </section>

      {error ? (
        <Card className="border-danger/30 bg-danger/5 p-5">
          <p className="font-medium text-danger">No se pudo cargar el seguimiento</p>
          <p className="mt-1 text-sm text-muted">{error}</p>
          <p className="mt-2 text-sm text-muted">
            Comprueba TURSO_DATABASE_URL / TURSO_AUTH_TOKEN y ejecuta <code>npm run db:push</code>.
          </p>
        </Card>
      ) : initialData ? (
        <StudentTracker initialData={initialData} />
      ) : null}
    </div>
  );
}
