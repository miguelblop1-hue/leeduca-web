"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth/client";

export function UserMenu({ name }: { name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      await authClient.signOut();
      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-[140px] truncate text-sm text-muted sm:block" title={name}>
        {name}
      </span>
      <button
        type="button"
        onClick={logout}
        disabled={pending}
        className="rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-sunken hover:text-foreground disabled:opacity-50"
      >
        {pending ? "Saliendo..." : "Salir"}
      </button>
    </div>
  );
}
