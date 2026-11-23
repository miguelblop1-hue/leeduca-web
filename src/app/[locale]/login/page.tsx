import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getOptionalUser } from "@/lib/auth/guard";
import { APP_NAME } from "@/lib/app-name";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const [user, locale] = await Promise.all([getOptionalUser(), getLocale()]);
  if (user) {
    redirect({ href: "/leeduca", locale });
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sky-500 text-base font-bold text-white shadow-[var(--shadow-glow)]">
            L
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Acceso</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{APP_NAME}</h1>
          <p className="mt-2 text-sm text-muted">Inicia sesión para acceder al seguimiento del alumnado.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
