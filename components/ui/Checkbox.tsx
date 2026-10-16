import type { InputHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "onChange" | "disabled" | "id"
> & {
  label: string;
  hint?: ReactNode;
  className?: string;
};

/**
 * Checkbox neo-brutalist: box kuning + ikon centang saat checked.
 * Input asli tetap jadi elemen interaktif (keyboard & screen reader aman).
 * State dikontrol parent sehingga ikon bisa dirender kondisional tanpa CSS hack.
 */
export function Checkbox({ label, hint, id, className, checked, ...rest }: CheckboxProps) {
  const isChecked = Boolean(checked);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-card border-2 border-ink bg-white p-3",
          "transition-colors hover:bg-yellow/20",
          isChecked && "bg-yellow/30",
          rest.disabled && "cursor-not-allowed opacity-50 hover:bg-white",
        )}
      >
        <input id={id} type="checkbox" className="sr-only" checked={checked} {...rest} />
        <span
          aria-hidden="true"
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-2 border-ink bg-white",
            isChecked && "bg-yellow",
          )}
        >
          {isChecked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </label>
      {hint ? <p className="pl-1 text-sm text-ink/60">{hint}</p> : null}
    </div>
  );
}
