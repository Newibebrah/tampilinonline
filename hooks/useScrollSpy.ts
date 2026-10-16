"use client";

import { useEffect, useState } from "react";

/**
 * Lacak section aktif saat scroll untuk highlight nav.
 * Pakai IntersectionObserver (hemat event listener, tidak jank).
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Ambil section pertama yang sedang terlihat di viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // "Tengah layar" sebagai garis deteksi spy.
      { rootMargin: "-20% 0px -70% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
