// ============================================================
// constants.ts — Creative-Tech Portfolio Configuration
// ============================================================

export const SITE_CONFIG = {
  name: "Portfolio",
  title: "Creative Developer & IT Specialist",
  description:
    "Portofolio interaktif — perpaduan kreativitas desain dan keahlian teknikal. Sistem Informasi, Game Development, dan Visual Design.",
  url: "https://portfolio.dev",
} as const;

export const TYPEWRITER_ROLES = [
  "Creative Developer",
  "IT Specialist",
  "Visual Designer",
  "System Architect",
  "Game Developer",
] as const;

export const HERO_CONTENT = {
  greeting: "Halo, saya",
  name: "Daffa",
  headline: "Crafting Digital\nExperiences",
  subheadline:
    "Saya membangun solusi digital yang memadukan logika teknikal dengan kreativitas visual — dari sistem informasi hingga pengembangan game dan desain interaktif.",
  cta: { label: "Lihat Karya Saya", href: "#projects" },
  ctaSecondary: { label: "Hubungi Saya", href: "#contact" },
} as const;

export const ABOUT_CONTENT = {
  bio: `Saya seorang mahasiswa dan kreator digital yang passionate dalam membangun produk digital dari nol. Dengan latar belakang di Sistem Informasi, saya menggabungkan pemahaman teknikal (database, arsitektur sistem, scripting) dengan sensibilitas desain untuk menciptakan pengalaman yang fungsional sekaligus estetis.

Saya percaya bahwa teknologi terbaik adalah yang tidak hanya bekerja dengan baik, tapi juga terasa menyenangkan untuk digunakan.`,
  stats: [
    { value: 15, suffix: "+", label: "Proyek Selesai" },
    { value: 3, suffix: "+", label: "Tahun Pengalaman" },
    { value: 5, suffix: "+", label: "Tech Stack" },
    { value: 100, suffix: "%", label: "Passion" },
  ],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "MySQL",
    "Figma",
    "Roblox Studio",
    "Blender",
    "Photoshop",
    "Three.js",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "linkedin" },
  { label: "Email", href: "mailto:daffagyanza@gmail.com", icon: "email" },
] as const;

export const PARTICLE_CONFIG = {
  count: 120,
  spread: 20,
  colors: ["#8b5cf6", "#06b6d4", "#6366f1"] as const,
} as const;
