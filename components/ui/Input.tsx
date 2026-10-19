"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
};

/**
 * Input neo-brutalist. Label WAJIB (a11y). Font 16px+ agar iOS tidak zoom otomatis.
 * `hint` untuk keterangan harga tambahan di simulator.
 */
export function Input({ label, hint, id, className, ...rest }: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-display text-sm font-bold"
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full rounded-card border-2 border-ink bg-surface px-4 py-2.5 text-base text-ink",
          "placeholder:text-ink/40 disabled:cursor-not-allowed disabled:bg-ink/10 disabled:text-ink/40",
          "focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/50",
        )}
        {...rest}
      />
      {hint ? <p className="text-sm text-ink/60">{hint}</p> : null}
    </div>
  );
}
