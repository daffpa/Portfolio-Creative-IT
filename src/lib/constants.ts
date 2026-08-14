// ============================================================
// constants.ts — Bold & Colorful Portfolio Configuration
// ============================================================

export const SITE_CONFIG = {
  name: "Daffa Gusti Yanza",
  title: "Creative Multidisciplinary — Design, Branding & Digital Strategy",
  description:
    "Portfolio Daffa Gusti Yanza — Art Director, Desain Grafis & Branding, Social Media Strategy, dan solusi kreatif lintas bidang.",
  url: "https://daffa.dev",
} as const;

export const TYPEWRITER_ROLES = [
  "Art Director",
  "Graphic Designer",
  "Brand Strategist",
  "Social Media Specialist",
  "Creative Problem Solver",
  "Digital Creator",
] as const;

export const HERO_CONTENT = {
  greeting: "Halo, saya",
  name: "Daffa",
  headline: "Mengubah ide kreatif\nmenjadi visual\nyang bercerita",
  subheadline:
    "Saya menggabungkan desain grafis, branding, dan strategi media sosial untuk menciptakan karya visual yang tidak hanya menarik — tapi juga menyampaikan pesan dengan kuat dan berkesan.",
  cta: { label: "Lihat Karya Saya", href: "#projects" },
  ctaSecondary: { label: "Hubungi Saya", href: "#contact" },
} as const;

export const ABOUT_CONTENT = {
  bio: `Saya, Daffa Gusti Yanza, adalah Mahasiswa Sistem Informasi di Universitas Bakrie yang penuh semangat dan siap membawa energi positif ke dunia profesional.

Dengan latar belakang pendidikan Multimedia dari SMK 47 Jakarta dan pengalaman sebagai Art Director di beberapa perusahaan, saya telah mengasah kemampuan dalam desain grafis, branding, dan strategi konten digital.

Dari merancang identitas visual sebuah brand, mengarahkan produksi iklan dan poster, hingga membangun strategi konten untuk YouTube Shorts dan TikTok — saya menikmati setiap proses kreatif yang menghasilkan dampak nyata.

Saya bukan hanya seorang desainer atau analis. Saya adalah penghubung antara kreativitas visual dan strategi bisnis yang terukur.`,
  stats: [
    { value: 10, suffix: "+", label: "Proyek Selesai" },
    { value: 4, suffix: "+", label: "Tahun Eksplorasi" },
    { value: 3, suffix: "", label: "Pengalaman Kerja" },
    { value: 100, suffix: "%", label: "Passion & Energi" },
  ],
} as const;

export const EDUCATION = [
  {
    period: "2024 - Sekarang",
    institution: "Universitas Bakrie",
    degree: "Program Studi Sistem Informasi",
    description:
      "Mempelajari kemampuan dalam mengelola berbagai aspek programming dan bisnis, seperti pengelolaan data, program, produksi, operasi, dan strategi bisnis.",
  },
  {
    period: "2021 - 2024",
    institution: "SMK 47 JKT",
    degree: "Jurusan Multimedia",
    description:
      "Mengasah kemampuan dalam mengelola berbagai aspek desain, seperti pengelolaan poster, editing video, desain grafis, dan produksi konten multimedia.",
  },
] as const;

export const EXPERIENCE = [
  {
    period: "2025 - 2026",
    organization: "Himpunan Mahasiswa",
    role: "Humas",
    description:
      "Bertanggung jawab dalam mengelola komunikasi, relasi publik, dan branding organisasi kampus. Merancang materi publikasi dan konten sosial media.",
    type: "organisasi" as const,
  },
  {
    period: "Jan 2023 - Apr 2023",
    organization: "PT. Perwira Media Kreatif",
    role: "Art Director",
    description:
      "Bertanggung jawab atas aspek visual iklan — mengarahkan elemen desain, gambar, foto, dan tata letak yang selaras dengan visi branding perusahaan.",
    type: "kerja" as const,
  },
  {
    period: "Sep 2022 - Nov 2022",
    organization: "PT. FunWorld Prima",
    role: "Art Director",
    description:
      "Bertanggung jawab atas aspek visual poster dan kampanye — mengarahkan elemen desain, gambar, foto, dan tata letak untuk kepentingan branding perusahaan.",
    type: "kerja" as const,
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/daffpa", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/daffagyanza", icon: "linkedin" },
  { label: "Email", href: "mailto:daffagyanza@gmail.com", icon: "email" },
] as const;
