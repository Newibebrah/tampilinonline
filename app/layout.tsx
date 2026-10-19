import type { Metadata, Viewport } from "next";
import { Inter, Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE, DEFAULT_KEYWORDS, BRAND_ICONS } from "@/lib/seo";
import { PALETTE } from "@/lib/colors";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CanvasTexture } from "@/components/decorative/CanvasTexture";
import { ScrollProgress } from "@/components/decorative/ScrollProgress";

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

// --font-press-start: font arcade 8-bit untuk halaman /about (H1 bait).
// Weight tunggal 400 — chunky by nature, TIDAK diberi font-black.
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
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
  themeColor: PALETTE.canvas,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} ${pressStart2P.variable}`}>
      <body>
        {/* Layer dekoratif global (fixed, pointer-events-none — prompt visionary):
            ScrollProgress di atas semuanya, CanvasTexture di bawah navbar. */}
        <ScrollProgress />
        <CanvasTexture />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
