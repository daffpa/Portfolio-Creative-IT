// ============================================================
// projects.ts — Data-driven project showcase
// ============================================================
// CARA MENAMBAH PROYEK BARU:
// 1. Copy template di bawah
// 2. Isi data proyek Anda
// 3. Simpan file — proyek otomatis muncul di website
// ============================================================

export type ProjectCategory =
  | "all"
  | "sistem-informasi"
  | "game-dev"
  | "desain-visual";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  image: string; // path relatif di /public/projects/ atau URL
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean; // featured = tampil di card besar
  year: string;
}

// ============================================================
// TEMPLATE — Copy ini untuk menambah proyek baru:
// ============================================================
// {
//   id: "project-unique-id",
//   title: "Nama Proyek",
//   description: "Deskripsi singkat proyek Anda...",
//   category: "sistem-informasi",
//   image: "/projects/nama-file.png",
//   tags: ["Tech1", "Tech2"],
//   liveUrl: "https://...",
//   repoUrl: "https://github.com/...",
//   featured: false,
//   year: "2026",
// },
// ============================================================

export const PROJECT_CATEGORIES: {
  value: ProjectCategory;
  label: string;
}[] = [
  { value: "all", label: "Semua" },
  { value: "sistem-informasi", label: "Sistem Informasi" },
  { value: "game-dev", label: "Game Dev" },
  { value: "desain-visual", label: "Desain Visual" },
];

export const projects: Project[] = [
  {
    id: "webgis-morowali",
    title: "WebGIS Morowali",
    description:
      "Aplikasi pemetaan geospasial interaktif untuk analisis data wilayah Morowali menggunakan teknologi GeoAI dan visualisasi peta modern.",
    category: "sistem-informasi",
    image: "",
    tags: ["Next.js", "Leaflet", "TypeScript", "GeoAI"],
    featured: true,
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Futuristik",
    description:
      "Website portofolio interaktif dengan efek partikel 3D, animasi mikro, dan desain Creative-Tech. Dibangun sebagai showcase kemampuan frontend.",
    category: "desain-visual",
    image: "",
    tags: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    featured: true,
    year: "2026",
  },
  {
    id: "db-perpustakaan",
    title: "Sistem Perpustakaan Digital",
    description:
      "Rancangan arsitektur database relasional untuk sistem manajemen perpustakaan dengan fitur peminjaman, katalog, dan laporan.",
    category: "sistem-informasi",
    image: "",
    tags: ["MySQL", "ERD", "Database Design", "PHP"],
    year: "2025",
  },
  {
    id: "horror-game",
    title: "Horror Escape Room",
    description:
      "Game horor multiplayer dengan mekanik puzzle dan obstacle course. Dibangun di Roblox Studio dengan scripting Luau yang kompleks.",
    category: "game-dev",
    image: "",
    tags: ["Roblox Studio", "Luau", "Game Design", "3D"],
    featured: true,
    year: "2025",
  },
  {
    id: "brand-identity",
    title: "Brand Identity Package",
    description:
      "Desain identitas visual lengkap termasuk logo, color palette, typography system, dan guidelines untuk media sosial.",
    category: "desain-visual",
    image: "",
    tags: ["Figma", "Photoshop", "Branding", "UI Design"],
    year: "2025",
  },
  {
    id: "obstacle-course",
    title: "Obstacle Course Adventure",
    description:
      "Game obstacle course dengan level design progresif, sistem checkpoint, dan leaderboard. Mekanik platformer yang challenging namun adil.",
    category: "game-dev",
    image: "",
    tags: ["Roblox Studio", "Luau", "Level Design"],
    year: "2024",
  },
];
