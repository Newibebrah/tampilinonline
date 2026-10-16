import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://tampilin.online"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Tampilin.online — Semua Usaha Harus Punya Website",
    template: "%s | Tampilin.online",
  },
  description:
    "Jasa pembuatan website untuk UMKM, fresh graduate, freelancer, sales, perusahaan, dan bisnis online. Mulai Rp499.000. Konsultasi gratis via WhatsApp.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Tampilin.online",
    title: "Tampilin.online — Semua Usaha Harus Punya Website",
    description:
      "Jasa pembuatan website untuk UMKM, profesional, dan bisnis online. Mulai Rp499.000.",
  },
  twitter: {
    card: "summary_large_image",
  },
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
