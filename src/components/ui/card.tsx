import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

export function Card({ children, className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/70 bg-surface/90 p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
