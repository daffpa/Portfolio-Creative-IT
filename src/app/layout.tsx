import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ============================================================
// Font Configuration — Bold & Eksperimental
// ============================================================

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  title: "Daffa — Multidisciplinary Problem Solver",
  description:
    "Portfolio Daffa — analisis proses bisnis, analisis data, desain presentasi, dan solusi digital lintas bidang. Bold, colorful, eksperimental.",
  icons: {
    icon: "/favicon.ico",
  },
};

// ============================================================
// Root Layout
// ============================================================

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative bg-bg text-text transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="bg-noise"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
