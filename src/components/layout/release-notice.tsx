"use client";

import { useEffect, useState } from "react";
import { CURRENT_RELEASE } from "@/lib/releases/current";

const STORAGE_KEY = "leeduca:release-seen";

export function ReleaseNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen !== CURRENT_RELEASE.version) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- show once per new release
        setOpen(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  function close() {
    try {
      localStorage.setItem(STORAGE_KEY, CURRENT_RELEASE.version);
    } catch {
      // ignore
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Novedades de la versión ${CURRENT_RELEASE.version}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-border/70 bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Actualización</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
              Novedades v{CURRENT_RELEASE.version}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:bg-surface-sunken hover:text-foreground"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {CURRENT_RELEASE.changes.map((change, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{change}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={close}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
