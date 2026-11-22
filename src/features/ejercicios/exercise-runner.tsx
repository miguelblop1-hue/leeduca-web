"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { exercisesByAge } from "./data";
import type { Exercise, ExerciseArea, ExerciseOption } from "./types";
import { generateExercisesAction } from "./actions";

function normalizeOption(option: string | ExerciseOption): ExerciseOption {
  if (typeof option === "string") return { value: option, label: option };
  return option;
}

type Props = {
  age: string;
  lockAge?: boolean;
};

type Difficulty = "easy" | "medium" | "hard";

const AGE_OPTIONS = ["3", "4", "5"] as const;
const COUNT_OPTIONS = [4, 6, 8, 10] as const;
const AREA_OPTIONS: Array<ExerciseArea | "mixed"> = [
  "mixed",
  "phonological",
  "vocabulary",
  "comprehension",
  "memory",
  "morphosyntax",
  "alphabetic",
];
const DIFFICULTY_OPTIONS: Difficulty[] = ["easy", "medium", "hard"];

export function ExerciseRunner({ age, lockAge = false }: Props) {
  const t = useTranslations("Exercises");
  const locale = useLocale();

  const defaultAge = AGE_OPTIONS.includes(age as (typeof AGE_OPTIONS)[number])
    ? (age as "3" | "4" | "5")
    : "4";

  const [activeExercises, setActiveExercises] = useState<Exercise[]>(
    () => exercisesByAge[age] ?? exercisesByAge[defaultAge] ?? [],
  );
  const [customMode, setCustomMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showSequence, setShowSequence] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const [theme, setTheme] = useState("");
  const [selAge, setSelAge] = useState<"3" | "4" | "5">(defaultAge);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [count, setCount] = useState<number>(6);
  const [selArea, setSelArea] = useState<ExerciseArea | "mixed">("mixed");
  const [genError, setGenError] = useState<string | null>(null);
  const [isGenerating, startTransition] = useTransition();

  const hasExercises = activeExercises.length > 0;

  const exercise: Exercise | undefined = activeExercises[index];
  const content = exercise ? (locale === "en" ? exercise.en : exercise.es) : null;
  const options = useMemo(
    () => (content?.options ?? []).map(normalizeOption),
    [content],
  );
  const correctValues = useMemo(
    () =>
      content
        ? Array.isArray(content.correct)
          ? content.correct
          : [content.correct]
        : [],
    [content],
  );
  const isCorrect =
    checked && selected != null && correctValues.includes(selected);

  function resetPlayState() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setShowSequence(true);
    setCorrectCount(0);
    setFinished(false);
  }

  function startWith(exercises: Exercise[], asCustom: boolean) {
    if (exercises.length === 0) return;
    setActiveExercises(exercises);
    setCustomMode(asCustom);
    resetPlayState();
    setStarted(true);
  }

  function handleStartDefault() {
    const set = exercisesByAge[selAge] ?? exercisesByAge[age] ?? [];
    if (set.length === 0) return;
    setGenError(null);
    startWith(set, false);
  }

  function handleGenerate() {
    const topic = theme.trim();
    if (!topic) {
      setGenError(t("generator.errors.themeRequired"));
      return;
    }
    setGenError(null);
    startTransition(async () => {
      const result = await generateExercisesAction({
        theme: topic,
        age: selAge,
        difficulty,
        count,
        area: selArea,
      });
      if (!result.ok) {
        const key =
          result.error === "not_configured"
            ? "notConfigured"
            : result.error === "invalid_input"
              ? "invalidInput"
              : result.error === "timeout"
                ? "timeout"
                : result.error === "invalid_response"
                  ? "invalidResponse"
                  : result.error === "unauthorized"
                    ? "unauthorized"
                    : result.error === "rate_limit"
                      ? "rateLimit"
                      : result.error === "bad_request"
                        ? "badRequest"
                        : result.error === "request_failed"
                          ? "requestFailed"
                          : "generic";
        setGenError(t(`generator.errors.${key}`));
        return;
      }
      startWith(result.exercises, true);
    });
  }

  function handleCheck() {
    if (selected == null || checked) return;
    setChecked(true);
    if (correctValues.includes(selected)) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    const next = index + 1;
    if (next >= activeExercises.length) {
      setFinished(true);
      return;
    }
    setIndex(next);
    setSelected(null);
    setChecked(false);
    setShowSequence(true);
  }

  function handleRestartSet() {
    resetPlayState();
    setStarted(true);
  }

  function handleConfigure() {
    setStarted(false);
    setFinished(false);
    resetPlayState();
  }

  if (!started) {
    return (
      <Card className="space-y-5 border-accent/20 bg-surface p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{t("title")}</h3>
          <p className="text-sm text-muted">{t("intro")}</p>
        </div>

        <div className="space-y-4 rounded-xl border border-border bg-surface-sunken/40 p-4 sm:p-5">
          <div>
            <h4 className="text-base font-semibold">{t("generator.title")}</h4>
            <p className="mt-1 text-sm text-muted">{t("generator.subtitle")}</p>
          </div>

          <div className={cn("grid gap-2 sm:gap-3", lockAge ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
            <label className="col-span-full flex flex-col gap-1.5">
              <span className="text-sm font-medium">{t("generator.theme")}</span>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder={t("generator.themePlaceholder")}
                maxLength={120}
                className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>

            {!lockAge ? (
              <label className="flex min-w-0 flex-col gap-1.5">
                <span className="truncate text-xs font-medium sm:text-sm">{t("generator.age")}</span>
                <select
                  value={selAge}
                  onChange={(e) => setSelAge(e.target.value as "3" | "4" | "5")}
                  className="w-full min-w-0 rounded-md border border-border bg-surface px-2 py-2 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:px-3 sm:py-2.5 sm:text-sm"
                >
                  {AGE_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {t("generator.ageOption", { age: a })}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-xs font-medium sm:text-sm">{t("generator.difficulty")}</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full min-w-0 rounded-md border border-border bg-surface px-2 py-2 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {t(`generator.difficulties.${d}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-xs font-medium sm:text-sm">{t("generator.area")}</span>
              <select
                value={selArea}
                onChange={(e) => setSelArea(e.target.value as ExerciseArea | "mixed")}
                className="w-full min-w-0 rounded-md border border-border bg-surface px-2 py-2 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                {AREA_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a === "mixed" ? t("generator.areaMixed") : t(`areas.${a}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-xs font-medium sm:text-sm">{t("generator.count")}</span>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full min-w-0 rounded-md border border-border bg-surface px-2 py-2 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                {COUNT_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {t("generator.countOption", { count: n })}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {genError ? (
            <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-foreground">
              {genError}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className={cn(
                "inline-flex items-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                isGenerating
                  ? "cursor-wait bg-accent/60 text-on-accent"
                  : "bg-accent text-on-accent hover:bg-accent-strong",
              )}
            >
              {isGenerating ? t("generator.generating") : t("generator.generate")}
            </button>
            <button
              type="button"
              onClick={handleStartDefault}
              disabled={isGenerating}
              className="inline-flex items-center rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-sunken disabled:opacity-60"
            >
              {t("generator.useDefault")}
            </button>
          </div>
          <p className="text-xs text-muted">{t("generator.hint")}</p>
        </div>
      </Card>
    );
  }

  if (!hasExercises || !exercise || !content) return null;

  if (finished) {
    return (
      <Card className="space-y-5 border-accent/20 bg-surface p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold">{t("completedTitle")}</h3>
          <p className="text-lg text-muted">
            {t("completedBody", { correct: correctCount, total: activeExercises.length })}
          </p>
          <p className="text-xl font-semibold text-accent">
            {t("score")}: {correctCount} / {activeExercises.length}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleRestartSet}
            className="inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
          >
            {t("restart")}
          </button>
          <button
            type="button"
            onClick={handleConfigure}
            className="inline-flex rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-sunken"
          >
            {t("generator.newSet")}
          </button>
        </div>
      </Card>
    );
  }

  const canCheck =
    selected != null && !checked && (exercise.type !== "memory" || !showSequence);

  return (
    <Card className="space-y-6 border-accent/20 bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {t("area")}: {t(`areas.${exercise.area}`)}
          </span>
          {customMode ? (
            <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-medium text-muted">
              {t("generator.aiBadge")}
            </span>
          ) : null}
        </div>
        <span className="text-sm font-medium text-muted">
          {t("progress", { current: index + 1, total: activeExercises.length })}
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-xl font-semibold leading-snug sm:text-2xl">{content.prompt}</p>

        {content.stimulus ? (
          <div className="inline-flex min-w-32 flex-col items-center gap-2 rounded-2xl border border-accent/20 bg-surface-sunken/50 px-6 py-5">
            {content.stimulus.image ? (
              <Image
                src={content.stimulus.image}
                alt={content.stimulus.label}
                width={112}
                height={112}
                className="h-24 w-24 rounded-md object-contain sm:h-28 sm:w-28"
              />
            ) : content.stimulus.visual ? (
              <span className="text-6xl leading-none sm:text-7xl" aria-hidden="true">
                {content.stimulus.visual}
              </span>
            ) : null}
            <span className="text-lg font-semibold sm:text-xl">{content.stimulus.label}</span>
          </div>
        ) : null}

        {content.teacherNote ? (
          <p className="text-sm text-muted">
            <span className="font-medium text-foreground/80">{t("teacherNote")}:</span>{" "}
            {content.teacherNote}
          </p>
        ) : null}
      </div>

      {exercise.type === "memory" && content.sequence ? (
        <div className="space-y-4 rounded-xl border border-border bg-surface-sunken/50 p-5 sm:p-6">
          {showSequence ? (
            <>
              <div
                className="flex flex-wrap justify-center gap-4 text-7xl sm:gap-6 sm:text-8xl lg:text-9xl"
                aria-label="sequence"
              >
                {content.sequence.map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="flex h-28 w-28 items-center justify-center rounded-2xl bg-surface shadow-md sm:h-36 sm:w-36 lg:h-44 lg:w-44"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowSequence(false)}
                className="inline-flex rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-sunken"
              >
                {t("hideSequence")}
              </button>
            </>
          ) : (
            <p className="text-sm font-medium text-muted">{t("hideSequence")} ✓</p>
          )}
        </div>
      ) : null}

      {(exercise.type !== "memory" || !showSequence) && options.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const isSelected = selected === option.value;
            const isAnswer = correctValues.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                disabled={checked}
                onClick={() => setSelected(option.value)}
                className={cn(
                  "flex min-h-[7rem] flex-col items-center justify-center gap-3 rounded-xl border px-4 py-5 text-center transition-colors sm:min-h-[8rem]",
                  !checked && isSelected && "border-accent bg-accent/10 ring-2 ring-accent/20",
                  !checked && !isSelected && "border-border hover:bg-surface-sunken",
                  checked && isAnswer && "border-success/40 bg-success/10",
                  checked && isSelected && !isAnswer && "border-danger/40 bg-danger/10",
                  checked && !isSelected && !isAnswer && "border-border opacity-70",
                )}
              >
                {option.image ? (
                  <Image
                    src={option.image}
                    alt={option.label}
                    width={96}
                    height={96}
                    className="h-20 w-20 rounded-md object-contain sm:h-24 sm:w-24"
                  />
                ) : option.visual ? (
                  <span className="text-5xl leading-none sm:text-6xl" aria-hidden="true">
                    {option.visual}
                  </span>
                ) : null}
                <span className="text-base font-medium sm:text-lg">{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {checked ? (
        <div
          className={cn(
            "rounded-xl border px-4 py-4 text-base",
            isCorrect
              ? "border-success/30 bg-success/10 text-foreground"
              : "border-danger/30 bg-danger/10 text-foreground",
          )}
        >
          <p className="font-semibold">{isCorrect ? t("correct") : t("incorrect")}</p>
          {!isCorrect ? (
            <p className="mt-1">
              {correctValues
                .map((v) => options.find((o) => o.value === v)?.label ?? v)
                .join(", ")}
            </p>
          ) : null}
          {content.feedback ? <p className="mt-2 text-muted">{content.feedback}</p> : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-2">
        <button
          type="button"
          onClick={handleConfigure}
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          {t("generator.changeSetup")}
        </button>
        <div className="flex flex-wrap gap-3">
          {!checked ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!canCheck}
              className={cn(
                "rounded-md px-5 py-2.5 text-sm font-medium transition-colors",
                canCheck
                  ? "bg-accent text-on-accent hover:bg-accent-strong"
                  : "cursor-not-allowed border border-border text-muted",
              )}
            >
              {t("check")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              {index + 1 >= activeExercises.length ? t("completedTitle") : t("next")}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
