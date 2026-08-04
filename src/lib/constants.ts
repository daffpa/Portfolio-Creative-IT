// ============================================================
// constants.ts — Bold & Colorful Portfolio Configuration
// ============================================================

export const SITE_CONFIG = {
  name: "Daffa",
  title: "Multidisciplinary Problem Solver",
  description:
    "Portfolio Daffa — analisis proses bisnis, analisis data, desain presentasi, dan solusi digital lintas bidang.",
  url: "https://daffa.dev",
} as const;

export const TYPEWRITER_ROLES = [
  "Business Analyst",
  "Data Explorer",
  "Presentation Designer",
  "Digital Creator",
  "Problem Solver",
] as const;

export const HERO_CONTENT = {
  greeting: "Halo, saya",
  name: "Daffa",
  headline: "Mengubah masalah\nkompleks menjadi\nsolusi yang jelas",
  subheadline:
    "Saya menggabungkan analisis bisnis, eksplorasi data, dan desain visual untuk menciptakan solusi yang tidak hanya bekerja — tapi juga mudah dipahami dan menyenangkan untuk dilihat.",
  cta: { label: "Lihat Karya Saya", href: "#projects" },
  ctaSecondary: { label: "Hubungi Saya", href: "#contact" },
} as const;

export const ABOUT_CONTENT = {
  bio: `Saya seorang mahasiswa Sistem Informasi yang percaya bahwa setiap masalah punya cerita — dan cerita itu bisa disampaikan dengan lebih baik lewat data, proses yang jelas, dan visual yang menarik.

Dari memetakan alur bisnis menggunakan BPMN, mengolah data mentah menjadi insight yang actionable, hingga merancang presentasi yang membuat audiens tetap fokus — saya menikmati setiap tahap proses pemecahan masalah.

Saya bukan hanya seorang analis atau desainer. Saya adalah jembatan antara keduanya.`,
  stats: [
    { value: 10, suffix: "+", label: "Proyek Selesai" },
    { value: 3, suffix: "+", label: "Tahun Eksplorasi" },
    { value: 4, suffix: "", label: "Bidang Keahlian" },
    { value: 100, suffix: "%", label: "Rasa Ingin Tahu" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/daffpa", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/daffagyanza", icon: "linkedin" },
  { label: "Email", href: "mailto:daffagyanza@gmail.com", icon: "email" },
] as const;
