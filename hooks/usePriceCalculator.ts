"use client";

import { useMemo, useState } from "react";
import {
  ADDON_PRICES,
  BASE_PRICES,
  INCLUDED_PRODUCTS,
  SINGLE_PAGE_PACKAGES,
  type PackageId,
} from "@/lib/pricing";

/** State kalkulator harga — sesuai README 13.1. */
export type CalculatorState = {
  packageId: PackageId;
  additionalPages: number;
  additionalProducts: number;
  copywriting: boolean;
  seoAdvanced: boolean;
  customIntegration: boolean;
  maintenance: boolean;
  domainHosting: boolean;
  urgency: boolean;
};

/** Hasil kalkulasi + rincian untuk breakdown UI dan pesan WhatsApp. */
export type PriceResult = {
  base: number;
  pagesCost: number;
  productsCost: number;
  extrasCost: number;
  subtotal: number;
  urgencyFee: number;
  domainHostingFee: number;
  total: number;
  maintenanceMonthly: number;
};

const initialState: CalculatorState = {
  packageId: "umkm",
  additionalPages: 0,
  additionalProducts: 0,
  copywriting: false,
  seoAdvanced: false,
  customIntegration: false,
  maintenance: false,
  domainHosting: false,
  urgency: false,
};

/**
 * Logic harga sesuai README 13.2:
 * subtotal = paket + halaman*150rb + produk*10rb + addon boolean
 * total    = subtotal + (urgency ? 25% : 0) + (hosting ? 300rb : 0)
 */
export function usePriceCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const update = <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K],
  ) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };

      // Reset halaman tambahan kalau paketnya single-page (sales / portfolio).
      if (key === "packageId" && SINGLE_PAGE_PACKAGES.includes(value as PackageId)) {
        next.additionalPages = 0;
      }
      // Reset produk tambahan kalau paketnya bukan katalog / e-commerce.
      if (
        key === "packageId" &&
        value !== "catalog" &&
        value !== "ecommerce"
      ) {
        next.additionalProducts = 0;
      }
      return next;
    });
  };

  const result = useMemo<PriceResult>(() => {
    const base = BASE_PRICES[state.packageId];

    // Halaman tambahan tidak berlaku untuk paket single-page.
    const pages = SINGLE_PAGE_PACKAGES.includes(state.packageId)
      ? 0
      : Math.max(0, Math.floor(state.additionalPages));

    // Produk pertama 20 sudah termasuk; input hanya untuk kelebihannya.
    const products =
      state.packageId === "catalog" || state.packageId === "ecommerce"
        ? Math.max(0, Math.floor(state.additionalProducts))
        : 0;

    const pagesCost = pages * ADDON_PRICES.additionalPage;
    const productsCost = products * ADDON_PRICES.additionalProduct;
    const extras =
      (state.copywriting ? ADDON_PRICES.copywriting : 0) +
      (state.seoAdvanced ? ADDON_PRICES.seoAdvanced : 0) +
      (state.customIntegration ? ADDON_PRICES.customIntegration : 0);

    const subtotal = base + pagesCost + productsCost + extras;

    const urgencyFee = state.urgency ? subtotal * ADDON_PRICES.urgencyMultiplier : 0;
    const domainHostingFee = state.domainHosting ? ADDON_PRICES.domainHosting : 0;

    return {
      base,
      pagesCost,
      productsCost,
      extrasCost: extras,
      subtotal,
      urgencyFee,
      domainHostingFee,
      total: subtotal + urgencyFee + domainHostingFee,
      maintenanceMonthly: state.maintenance ? ADDON_PRICES.maintenance : 0,
    };
  }, [state]);

  const includedProducts =
    state.packageId === "catalog" || state.packageId === "ecommerce"
      ? INCLUDED_PRODUCTS[state.packageId]
      : 0;

  return { state, update, result, includedProducts };
}
