// ============================================================
// projects.ts — Multi-disciplinary project showcase
// ============================================================
// CARA MENAMBAH PROYEK BARU:
// 1. Copy template di bawah
// 2. Isi data proyek Anda
// 3. Simpan file — proyek otomatis muncul di website
// ============================================================

export type ProjectCategory =
  | "all"
  | "desain-branding"
  | "social-media"
  | "analisis-bisnis"
  | "lainnya";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  image: string;
  tags: string[];
  context?: string;       // Konteks/masalah yang diselesaikan
  role?: string;           // Peran Daffa dalam proyek
  process?: string;        // Proses/pendekatan
  result?: string;         // Hasil/insight/dampak
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year: string;
}

// ============================================================
// TEMPLATE — Copy ini untuk menambah proyek baru:
// ============================================================
// {
//   id: "project-unique-id",
//   title: "Nama Proyek",
//   description: "Deskripsi singkat proyek Anda...",
//   category: "desain-branding",
//   image: "",
//   tags: ["Tool1", "Tool2"],
//   context: "Masalah yang dihadapi...",
//   role: "Peran Daffa...",
//   process: "Langkah-langkah yang dilakukan...",
//   result: "Hasil yang dicapai...",
//   featured: false,
//   year: "2026",
// },
// ============================================================

export const PROJECT_CATEGORIES: {
  value: ProjectCategory;
  label: string;
  color: string;
}[] = [
  { value: "all", label: "Semua", color: "#f0f0f5" },
  { value: "desain-branding", label: "Desain & Branding", color: "#2563ff" },
  { value: "social-media", label: "Social Media", color: "#ff2d87" },
  { value: "analisis-bisnis", label: "Analisis Bisnis", color: "#ffc23a" },
  { value: "lainnya", label: "Lainnya", color: "#48ff91" },
];

export const projects: Project[] = [
  // ── Pengalaman Kerja sebagai Art Director ──────────────────
  {
    id: "perwira-media-art-director",
    title: "Art Direction — PT. Perwira Media Kreatif",
    description:
      "Mengarahkan aspek visual seluruh kampanye iklan perusahaan — mulai dari konsep kreatif, pemilihan elemen desain, fotografi, hingga tata letak final yang selaras dengan identitas brand.",
    category: "desain-branding",
    image: "",
    tags: ["Art Direction", "Advertising", "Branding", "Layout Design", "Photography"],
    context: "Perusahaan media kreatif membutuhkan arahan visual yang kuat dan konsisten untuk kampanye iklan multi-platform.",
    role: "Art Director — memimpin tim kreatif dalam menentukan visual direction, menyetujui desain akhir, dan memastikan kualitas output.",
    process: "Brief klien → Riset visual & moodboard → Konsep kreatif → Supervisi produksi → Quality control → Delivery.",
    result: "Menghasilkan materi iklan dengan konsistensi visual yang tinggi, meningkatkan engagement brand di berbagai platform.",
    featured: true,
    year: "2023",
  },
  {
    id: "funworld-art-director",
    title: "Art Direction — PT. FunWorld Prima",
    description:
      "Merancang dan mengarahkan seluruh aspek visual kampanye poster dan promosi perusahaan hiburan — menciptakan identitas visual yang playful dan memorable.",
    category: "desain-branding",
    image: "",
    tags: ["Art Direction", "Poster Design", "Visual Campaign", "Branding"],
    context: "Perusahaan entertainment membutuhkan materi promosi yang eye-catching dan konsisten dengan brand personality yang fun dan energik.",
    role: "Art Director — mengonsep dan mengarahkan desain poster, campaign visual, dan materi promosi lainnya.",
    process: "Analisis brand → Konsep visual → Sketch & layout → Produksi desain → Review & iterasi.",
    result: "Berhasil menciptakan serangkaian poster dan materi promosi yang meningkatkan brand awareness dan traffic pengunjung.",
    featured: true,
    year: "2022",
  },

  // ── Proyek Desain & Branding ──────────────────────────────
  {
    id: "brand-identity-project",
    title: "Brand Identity Design System",
    description:
      "Perancangan sistem identitas visual lengkap untuk sebuah brand — termasuk logo, palet warna, tipografi, dan brand guidelines yang komprehensif.",
    category: "desain-branding",
    image: "",
    tags: ["Branding", "Logo Design", "Figma", "Adobe Illustrator", "Guidelines"],
    context: "Klien membutuhkan identitas visual baru yang modern dan dapat diterapkan secara konsisten di semua touchpoint.",
    role: "Brand Designer — merancang seluruh elemen identitas visual dari nol.",
    process: "Brand discovery → Moodboard & referensi → Eksplorasi logo → Palet & tipografi → Brand book final.",
    result: "Identitas visual baru yang koheren dan mudah diaplikasikan, meningkatkan profesionalisme brand di mata konsumen.",
    featured: true,
    year: "2024",
  },

  // ── Social Media ──────────────────────────────────────────
  {
    id: "social-media-strategy",
    title: "Strategi Konten YouTube Shorts & TikTok",
    description:
      "Merancang dan mengeksekusi strategi konten video pendek untuk platform YouTube Shorts dan TikTok — dari ideasi hingga analisis performa.",
    category: "social-media",
    image: "",
    tags: ["YouTube Shorts", "TikTok", "Content Strategy", "Video Editing", "Analytics"],
    context: "Brand ingin meningkatkan awareness dan engagement di platform video pendek yang sedang trending.",
    role: "Social Media Strategist — merancang content pillar, kalender konten, dan menganalisis metrics.",
    process: "Riset tren → Content pillar → Produksi batch → Scheduling → Analisis & optimasi.",
    result: "Peningkatan signifikan dalam views dan followers melalui konten yang relevan dan konsisten.",
    featured: true,
    year: "2024",
  },

  // ── Analisis Bisnis ───────────────────────────────────────
  {
    id: "bpmn-morowali",
    title: "Analisis Proses Bisnis Morowali",
    description:
      "Pemetaan dan analisis proses bisnis menggunakan notasi BPMN untuk mengoptimalkan alur kerja di instansi pemerintahan daerah Morowali.",
    category: "analisis-bisnis",
    image: "",
    tags: ["BPMN", "Bizagi", "Process Mapping", "Analisis"],
    context: "Instansi memiliki alur kerja manual yang tidak terdokumentasi, menyebabkan inefisiensi dan duplikasi tugas.",
    role: "Business Process Analyst — memetakan proses AS-IS, mengidentifikasi bottleneck, dan merancang proses TO-BE.",
    process: "Wawancara stakeholder → Dokumentasi AS-IS → Analisis gap → Rancang TO-BE → Validasi dengan tim.",
    result: "Berhasil mengidentifikasi 5 bottleneck utama dan mengusulkan alur baru yang memangkas waktu proses hingga 30%.",
    year: "2026",
  },

  // ── Proyek Lainnya ────────────────────────────────────────
  {
    id: "webgis-morowali",
    title: "WebGIS Morowali",
    description:
      "Aplikasi pemetaan geospasial interaktif untuk analisis data wilayah Morowali menggunakan teknologi GeoAI dan visualisasi peta modern.",
    category: "lainnya",
    image: "",
    tags: ["Next.js", "Leaflet", "TypeScript", "GeoAI"],
    context: "Data geospasial wilayah tidak terintegrasi dan sulit diakses oleh publik maupun pemerintah daerah.",
    role: "Full-stack Developer — membangun frontend peta interaktif dan integrasi data geospasial.",
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website Eksperimental",
    description:
      "Website portofolio pribadi dengan desain bold, colorful, dan eksperimental. Dibangun sebagai ekspresi identitas digital dan personal branding.",
    category: "lainnya",
    image: "",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Creative Design"],
    repoUrl: "https://github.com/daffpa/Portfolio-Creative-IT",
    year: "2026",
  },
  {
    id: "himpunan-humas",
    title: "Publikasi & Branding Himpunan Mahasiswa",
    description:
      "Mengelola komunikasi, relasi publik, dan identitas visual organisasi mahasiswa — merancang materi publikasi untuk event dan kegiatan kampus.",
    category: "desain-branding",
    image: "",
    tags: ["Public Relations", "Event Branding", "Social Media", "Canva"],
    context: "Himpunan membutuhkan strategi komunikasi dan branding yang lebih profesional untuk meningkatkan engagement mahasiswa.",
    role: "Humas — mengelola seluruh materi komunikasi, desain publikasi, dan strategi branding organisasi.",
    result: "Meningkatkan partisipasi mahasiswa dalam kegiatan himpunan melalui branding dan komunikasi yang lebih menarik.",
    year: "2025",
  },
];
