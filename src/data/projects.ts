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
  | "analisis-bisnis"
  | "analisis-data"
  | "presentasi"
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
//   category: "analisis-bisnis",
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
  { value: "analisis-bisnis", label: "Analisis Bisnis", color: "#2563ff" },
  { value: "analisis-data", label: "Analisis Data", color: "#48ff91" },
  { value: "presentasi", label: "Presentasi", color: "#ffc23a" },
  { value: "lainnya", label: "Lainnya", color: "#ff2d87" },
];

export const projects: Project[] = [
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
    featured: true,
    year: "2026",
  },
  {
    id: "dashboard-penjualan",
    title: "Dashboard Analisis Penjualan",
    description:
      "Dashboard interaktif untuk menganalisis tren penjualan, segmentasi pelanggan, dan performa produk dari data raw perusahaan retail.",
    category: "analisis-data",
    image: "",
    tags: ["Excel", "Google Sheets", "Data Visualization", "Pivot Table"],
    context: "Data penjualan tersedia dalam spreadsheet mentah tanpa visualisasi, sulit bagi manajemen untuk mengambil keputusan.",
    role: "Data Analyst — membersihkan data, membuat pivot table, dan merancang dashboard visual.",
    process: "Data cleaning → Pivot analysis → Membuat chart/visualisasi → Menyusun laporan insight.",
    result: "Dashboard mengungkap bahwa 3 produk tertentu menyumbang 60% revenue — insight yang sebelumnya tidak terlihat.",
    featured: true,
    year: "2026",
  },
  {
    id: "presentasi-proposal",
    title: "Desain Presentasi Proposal Bisnis",
    description:
      "Desain slide deck profesional untuk proposal bisnis dengan storytelling visual yang kuat, digunakan dalam pitch ke investor.",
    category: "presentasi",
    image: "",
    tags: ["PowerPoint", "Canva", "Storytelling", "Visual Design"],
    context: "Tim membutuhkan presentasi yang meyakinkan untuk mempresentasikan ide bisnis ke panel juri kompetisi.",
    role: "Presentation Designer — merancang narasi visual, layout slide, dan infografis pendukung.",
    process: "Brief content → Susun storyline → Desain master slide → Infografis data → Review & revisi.",
    result: "Presentasi berhasil menarik perhatian juri dan tim lolos ke babak final kompetisi.",
    featured: true,
    year: "2025",
  },
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
    featured: true,
    year: "2026",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website Eksperimental",
    description:
      "Website portofolio pribadi dengan desain bold, colorful, dan eksperimental. Dibangun sebagai ekspresi identitas digital.",
    category: "lainnya",
    image: "",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    repoUrl: "https://github.com/daffpa/Portfolio-Creative-IT",
    year: "2026",
  },
  {
    id: "analisis-survei",
    title: "Analisis Hasil Survei Kepuasan",
    description:
      "Pengolahan dan analisis data survei kepuasan pengguna layanan kampus menggunakan teknik statistik deskriptif dan visualisasi.",
    category: "analisis-data",
    image: "",
    tags: ["SPSS", "Google Forms", "Statistik", "Data Cleaning"],
    context: "Kampus mengumpulkan data survei tapi belum pernah dianalisis secara sistematis.",
    role: "Data Analyst — merancang kuesioner, mengolah data, dan menyajikan temuan.",
    result: "Menemukan bahwa aspek 'kecepatan respon' memiliki skor terendah — menjadi rekomendasi prioritas perbaikan.",
    year: "2025",
  },
];
