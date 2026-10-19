"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * SwipeCarousel — carousel horizontal native CSS scroll-snap (README 8: ringan,
 * tanpa library). Card berukuran identik, snap mandatory, peek effect dari
 * card width 85vw. Hanya dirender di mobile via wrapper `block md:hidden`
 * di section pemakai (CSS breakpoint, BUKAN JS media query — bebas hydration
 * mismatch).
 *
 * Keyboard: track bisa di-focus (tabIndex 0), Arrow keys native scroll.
 * Reduced motion: scroll instan + hint tanpa pulse + dot tanpa transisi.
 */

type SwipeCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Aksesibel: "Masalah yang kami selesaikan", dll. */
  ariaLabel: string;
  /** Class lebar card per slide. */
  cardWidthClass?: string;
  showDots?: boolean;
  showSwipeHint?: boolean;
  /** Panah besar diperuntukkan pemakaian desktop/tablet (default off —
   * carousel ini mobile-only, tapi prop disediakan supaya reusable). */
  showArrows?: boolean;
  className?: string;
};

export function SwipeCarousel<T>({
  items,
  renderItem,
  ariaLabel,
  cardWidthClass = "w-[85vw] max-w-[420px]",
  showDots = true,
  showSwipeHint = true,
  showArrows = false,
  className,
}: SwipeCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  // Guard rAF: onScroll bisa fire banyak kali per frame (scroll event high-frequency).
  const rafRef = useRef<number | null>(null);

  /**
   * Hitung index card yang "aktif" = card yang tengahnya paling dekat dengan
   * tengah viewport track (menyamai logika snap-center CSS).
   */
  const computeActiveIndex = useCallback((track: HTMLDivElement) => {
    const children = Array.from(track.children) as HTMLElement[];
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    children.forEach((el, i) => {
      const center = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setHasScrolled(true);
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const current = trackRef.current;
      if (current) setActiveIndex(computeActiveIndex(current));
    });
  }, [computeActiveIndex]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /** Scroll ke slide index i — posisi dihitung agar card snap-center. */
  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = track.children[index] as HTMLElement | undefined;
      if (!target) return;
      // Center card di tengah viewport track, di-clamp ke rentang scroll valid.
      const left = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
      track.scrollTo({
        left: Math.max(0, Math.min(left, track.scrollWidth - track.clientWidth)),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const activeArrow = (delta: number) => scrollToIndex(activeIndex + delta);
  const finalIndex = Math.min(activeIndex, items.length - 1);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cn("relative", className)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-smooth px-4 pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-2 focus-visible:outline-yellow focus-visible:outline-offset-2",
          // Reduced motion: scroll instan, bukan smooth (guard aturan README).
          reducedMotion && "scroll-auto",
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("snap-center shrink-0", cardWidthClass)}
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${items.length}`}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Swipe hint — hilang permanen begitu user menggeser pertama kali. */}
      {showSwipeHint && !hasScrolled ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-pill border-2 border-ink bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-brutal-sm",
            !reducedMotion && "animate-pulse",
          )}
        >
          Geser
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      ) : null}

      {/* Panah desktop/tablet — hanya jika diminta (default off; carousel
          section ini mobile-only). */}
      {showArrows ? (
        <>
          <button
            type="button"
            aria-label="Slide sebelumnya"
            onClick={() => activeArrow(-1)}
            disabled={finalIndex === 0}
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-pill border-2 border-ink bg-surface shadow-brutal-sm transition-transform hover:translate-x-[1px] hover:translate-y-1 hover:shadow-none md:flex disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Slide berikutnya"
            onClick={() => activeArrow(1)}
            disabled={finalIndex === items.length - 1}
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-pill border-2 border-ink bg-surface shadow-brutal-sm transition-transform hover:translate-x-[1px] hover:translate-y-1 hover:shadow-none md:flex disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      {/* Dot indicators */}
      {showDots ? (
        <div
          role="tablist"
          aria-label="Navigasi slide"
          className="mt-4 flex justify-center gap-2"
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={finalIndex === index}
              aria-label={`Ke slide ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-2 rounded-pill border border-ink",
                !reducedMotion && "transition-all duration-200",
                finalIndex === index
                  ? "w-6 bg-ink"
                  : "w-2 bg-transparent hover:bg-ink/20",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
