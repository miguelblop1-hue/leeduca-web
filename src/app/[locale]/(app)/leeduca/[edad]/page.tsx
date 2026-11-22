import { getLocale, getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo-badge";
import { PlaceholderPanel } from "@/components/ui/placeholder-panel";
import { edades345 } from "@/features/plataforma/edades-345";
import { ExerciseRunner } from "@/features/ejercicios/exercise-runner";

const ALLOWED_AGES = new Set(["4"]);

export default async function LeeducaAgePage({
  params,
}: {
  params: Promise<{ edad: string }>;
}) {
  const { edad } = await params;
  const locale = await getLocale();

  if (!ALLOWED_AGES.has(edad)) {
    redirect({ href: "/leeduca", locale });
  }

  const t = await getTranslations("Platform.agePage");
  const common = await getTranslations("Common");
  const exercises = await getTranslations("Exercises");
  const content = edades345[edad]?.[locale === "en" ? "en" : "es"];

  if (!content) {
    return (
      <div className="space-y-6">
        <Link
          href="/leeduca"
          className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent/40 hover:bg-surface hover:text-accent"
        >
          <span aria-hidden>←</span> {common("backToPlatform")}
        </Link>
        <section className="hero-gradient relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="relative max-w-3xl space-y-3">
            <DemoBadge />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title", { age: edad })}
            </h1>
            <p className="max-w-3xl text-pretty text-base text-muted sm:text-lg">{t("intro")}</p>
          </div>
        </section>
        <div className="grid gap-4 md:grid-cols-3">
          <PlaceholderPanel title={t("blocks.activities")} />
          <PlaceholderPanel title={t("blocks.assessment")} />
          <PlaceholderPanel title={t("blocks.results")} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/leeduca"
        className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-surface/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-surface hover:text-accent"
      >
        <span aria-hidden>←</span> {common("backToPlatform")}
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/70 bg-surface/60 px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:px-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {content.stage}
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("title", { age: edad })}
          </h1>
        </div>
        <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent">
          {common("ageYears", { age: edad })}
        </span>
      </div>

      <section className="space-y-4">
        <ExerciseRunner age={edad} lockAge />
      </section>

      <details className="group overflow-hidden rounded-2xl border border-border/70 bg-surface/70 shadow-[var(--shadow-soft)] backdrop-blur-sm">
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-muted transition-colors hover:bg-surface-sunken/40 hover:text-foreground sm:px-6">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform group-open:rotate-90">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
              </svg>
            </span>
            {exercises("technicalInfo")}
          </span>
        </summary>
        <div className="space-y-8 border-t border-border/70 px-5 py-6 sm:px-6">
          <div className="space-y-3">
            <DemoBadge />
            <p className="max-w-3xl text-base text-muted">{content.summary}</p>
          </div>

          <Card className="border-accent/20 bg-accent/5">
            <p className="text-sm text-foreground/90">{content.note}</p>
          </Card>

          {content.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {section.intro ? (
                  <p className="mt-2 max-w-3xl text-muted">{section.intro}</p>
                ) : null}
              </div>

              {section.items ? (
                <Card>
                  <ul className="space-y-2 text-sm text-muted">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              {section.areas ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {section.areas.map((area) => (
                    <Card key={area.title} className="h-full">
                      <h3 className="text-base font-semibold">{area.title}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-muted">
                        {area.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </details>
    </div>
  );
}

