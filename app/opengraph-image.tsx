import { ImageResponse } from "next/og";

export const alt =
  "Tampilin.online — Jasa pembuatan website untuk UMKM, profesional, dan bisnis online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image dibuat saat build (README 12.11): latar editorial krem,
 * bentuk geometris hitam, aksen kuning — teks overlay langsung di sini
 * supaya tidak perlu edit di Figma/Canva.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F5F0E8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* bentuk geometris kanan */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 420,
            height: 420,
            background: "#1A1A1A",
            borderRadius: 48,
            transform: "rotate(12deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 180,
            width: 240,
            height: 240,
            background: "#FFD23F",
            border: "10px solid #1A1A1A",
            borderRadius: 32,
            transform: "rotate(-6deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 120,
            width: 160,
            height: 160,
            background: "#FF6B35",
            border: "10px solid #1A1A1A",
            borderRadius: 999,
            display: "flex",
          }}
        />
        {/* teks kiri */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
            width: 700,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: -2,
            }}
          >
            Tampilin.online
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#1A1A1A",
              marginTop: 24,
              lineHeight: 1.3,
            }}
          >
            Semua usaha harus punya website.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#1A1A1A",
              marginTop: 20,
            }}
          >
            Mulai Rp499.000 — konsultasi via WhatsApp
          </div>
        </div>
        {/* bar kuning bawah */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: "#FFD23F",
            borderTop: "6px solid #1A1A1A",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
