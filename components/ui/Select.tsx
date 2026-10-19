import type { SelectHTMLAttributes, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: ReactNode;
};

/** Select native neo-brutalist (dropdown native = mobile friendly). */
export function Select({ label, hint, id, className, children, ...rest }: SelectProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-display text-sm font-bold">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={cn(
            "w-full appearance-none rounded-card border-2 border-ink bg-surface px-4 py-2.5 pr-10 text-base font-medium text-ink",
            "disabled:cursor-not-allowed disabled:bg-ink/10",
            "focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/50",
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
        />
      </div>
      {hint ? <p className="text-sm text-ink/60">{hint}</p> : null}
    </div>
  );
}
