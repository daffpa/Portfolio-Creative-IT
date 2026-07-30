import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ============================================================
// Font Configuration
// ============================================================

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ============================================================
// SEO Metadata
// ============================================================

export const metadata: Metadata = {
  title: "Daffa — Creative Developer & IT Specialist",
  description:
    "Portofolio interaktif — perpaduan kreativitas desain dan keahlian teknikal. Sistem Informasi, Game Development, dan Visual Design.",
  keywords: [
    "portfolio",
    "creative developer",
    "IT specialist",
    "web developer",
    "game developer",
    "UI/UX designer",
    "sistem informasi",
  ],
  authors: [{ name: "Daffa" }],
  openGraph: {
    title: "Daffa — Creative Developer & IT Specialist",
    description:
      "Portofolio interaktif — kreativitas desain bertemu keahlian teknikal.",
    type: "website",
    locale: "id_ID",
  },
  robots: { index: true, follow: true },
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
