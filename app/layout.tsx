import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE, DEFAULT_KEYWORDS, BRAND_ICONS } from "@/lib/seo";

// Font via next/font — self-hosted otomatis & dioptimasi Next.
// --font-space-grotesk: display (heading), --font-inter: body.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | Tampilin.online",
  },
  description: SITE.description,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    // OG image statis pakai logo brand (1200×630, < 300KB) — WhatsApp/FB/LinkedIn friendly.
    // Update file di public/images/og/og-image.png saat logo berganti.
    images: [
      {
        url: SITE.ogImage, // /images/og/og-image.png → absolut via metadataBase
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Jasa pembuatan website mulai Rp499.000`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: BRAND_ICONS.favicon, sizes: "48x48" }],
    apple: BRAND_ICONS.appleTouchIcon,
    shortcut: BRAND_ICONS.favicon,
  },
  // GSC verification: JANGAN diisi sebelum verifikasi DNS selesai (Opsi A).
  // Setelah dapat kode, tambahkan:
  // verification: { google: "kode-dari-search-console" },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
