"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { generatePreleoAction } from "./actions";
import { buildSession, orderOptions } from "./engine";
import { visualCatalog } from "./image-catalog";
import type { PreleoActivity, PreleoExercise, VisualId } from "./types";

type Phase = "question" | "answer" | "finished";

export function SlideRunner({ activity }: { activity: PreleoActivity }) {
  const t = useTranslations("Preleo4");
  const [exercises, setExercises] = useState<PreleoExercise[]>(() =>
    buildSession(activity.exercises),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selected, setSelected] = useState<VisualId | null>(null);
  const [theme, setTheme] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [generating, startTransition] = useTransition();

  const exercise = exercises[index];

  function restart() {
    setIndex(0);
    setPhase("question");
    setSelected(null);
    setError(null);
  }

  function handleNext() {
    if (phase === "question" && !selected) return;
    if (phase === "answer") {
      if (index + 1 >= exercises.length) {
        setPhase("finished");
        return;
      }
      setIndex(index + 1);
      setSelected(null);
      setPhase("question");
      return;
    }
    setPhase("answer");
  }

  function handleGenerate() {
    setError(null);
    startTransition(async () => {
      const result = await generatePreleoAction({
        activityId: activity.id,
        count: 4,
        theme,
      });
      if (!result.ok) {
        setError(t(`errors.${result.error}`));
        return;
      }
      const previousAi = exercises.filter((item) => item.source === "ai");
      setExercises(
        buildSession(activity.exercises, [...previousAi, ...result.exercises], 10),
      );
      restart();
    });
  }

  if (!exercise) {
    return (
      <Card className="space-y-4 p-6 text-center">
        <p className="text-muted">{t("empty")}</p>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
        >
          {t("repeat")}
        </button>
      </Card>
    );
  }

  const options = orderOptions(exercise);
  const isAnswer = phase === "answer";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {activity.subtitle}
          </span>
          {exercise.source === "ai" ? (
            <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-medium text-muted">
              {t("aiBadge")}
            </span>
          ) : null}
        </div>
        {phase !== "finished" ? (
          <span className="text-sm font-medium text-muted" aria-live="polite">
            {index + 1} / {exercises.length}
          </span>
        ) : null}
      </div>

      <Card className="space-y-6 border-accent/20 bg-surface p-5 sm:p-8">
        {phase === "finished" ? (
          <div className="space-y-5 text-center">
            <h2 className="text-2xl font-semibold">{t("finishedTitle")}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={restart}
                className="rounded-xl bg-accent px-6 py-3 text-base font-semibold text-on-accent transition-colors hover:bg-accent-strong"
              >
                {t("repeat")}
              </button>
              <Link
                href="/leeduca/4/actividades"
                className="rounded-xl border border-border bg-surface px-6 py-3 text-base font-semibold transition-colors hover:bg-surface-sunken"
              >
                {t("backToMenu")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-[3.5rem] text-center">
              {isAnswer ? (
                <p className="text-xl font-semibold text-accent sm:text-2xl">{t("answer")}</p>
              ) : (
                <h2 className="text-xl font-semibold leading-snug sm:text-3xl">
                  {exercise.title}
                </h2>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {options.map((optionId) => {
                const visual = visualCatalog[optionId];
                const isCorrect = isAnswer && optionId === exercise.correct;
                const isPicked = !isAnswer && selected === optionId;
                return (
                  <button
                    key={optionId}
                    type="button"
                    disabled={isAnswer}
                    aria-pressed={isPicked}
                    onClick={() => setSelected(optionId)}
                    className={cn(
                      "flex min-h-[10rem] items-center justify-center rounded-2xl border-2 bg-white p-3 transition-all sm:min-h-[12rem]",
                      !isAnswer && isPicked &&
                        "border-accent bg-accent-soft ring-4 ring-accent/20",
                      !isAnswer && !isPicked &&
                        "border-border hover:border-accent/40 hover:bg-surface-sunken/50",
                      isAnswer && isCorrect &&
                        "scale-[1.03] border-accent bg-accent-soft ring-4 ring-accent/30",
                      isAnswer && !isCorrect && "border-border opacity-35",
                    )}
                  >
                    <Image
                      src={visual.image}
                      alt={visual.word}
                      width={160}
                      height={160}
                      loading="eager"
                      className="h-28 w-28 object-contain sm:h-40 sm:w-40"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleNext}
                disabled={phase === "question" && !selected}
                className="rounded-xl bg-accent px-8 py-3 text-base font-semibold text-on-accent transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("next")}
              </button>
            </div>
          </>
        )}
      </Card>

      <details className="overflow-hidden rounded-2xl border border-border/70 bg-surface/70 text-sm">
        <summary className="cursor-pointer px-5 py-3 font-medium text-muted hover:text-foreground">
          {t("generateTitle")}
        </summary>
        <div className="space-y-3 border-t border-border/70 px-5 py-4">
          <p className="text-muted">{t("generateHint")}</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              placeholder={t("themePlaceholder")}
              maxLength={100}
              className="min-w-48 flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent/15 disabled:opacity-50"
            >
              {generating ? t("generating") : t("generate")}
            </button>
          </div>
          {error ? <p className="text-danger">{error}</p> : null}
        </div>
      </details>
    </div>
  );
}
