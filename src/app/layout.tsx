import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ============================================================
// Font Configuration — Midnight Gradient
// ============================================================

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

// ============================================================
// SEO Metadata
// ============================================================

export const metadata: Metadata = {
  title: "Daffa — Creative Developer & IT Specialist",
  description:
    "Portfolio interaktif Daffa — perpaduan kreativitas desain dan keahlian teknikal. Sistem Informasi, Game Development, dan Visual Design.",
  icons: {
    icon: "/favicon.ico",
  },
};

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative bg-bg text-text">
        <div className="bg-noise"></div>
        {children}
      </body>
    </html>
  );
}
