// ============================================================
// skills.ts — Multi-disciplinary skill groups
// ============================================================

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillGroup {
  category: string;
  description: string;
  color: string;       // accent color for the card
  colorClass: string;  // CSS class for border/glow
  icon: string;        // Material Symbols icon name
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Analisis Bisnis",
    description: "Memetakan, menganalisis, dan mengoptimalkan proses bisnis",
    color: "#2563ff",
    colorClass: "skill-card-blue",
    icon: "account_tree",
    skills: [
      { name: "BPMN Modeling", level: 85 },
      { name: "Process Mapping", level: 80 },
      { name: "Requirement Analysis", level: 75 },
      { name: "Bizagi Modeler", level: 80 },
      { name: "Flowchart & Diagram", level: 85 },
    ],
  },
  {
    category: "Analisis Data",
    description: "Mengolah data mentah menjadi insight yang actionable",
    color: "#48ff91",
    colorClass: "skill-card-lime",
    icon: "analytics",
    skills: [
      { name: "Excel / Google Sheets", level: 90 },
      { name: "Pivot Table & Charts", level: 85 },
      { name: "Data Cleaning", level: 80 },
      { name: "Statistik Deskriptif", level: 75 },
      { name: "SPSS", level: 65 },
    ],
  },
  {
    category: "Desain & Presentasi",
    description: "Merancang visual yang menarik dan presentasi yang efektif",
    color: "#ffc23a",
    colorClass: "skill-card-amber",
    icon: "palette",
    skills: [
      { name: "PowerPoint / Google Slides", level: 90 },
      { name: "Canva", level: 85 },
      { name: "Figma", level: 75 },
      { name: "Storytelling Visual", level: 80 },
      { name: "Infografis", level: 80 },
    ],
  },
  {
    category: "Tools & Teknologi",
    description: "Perangkat pendukung untuk development dan kolaborasi",
    color: "#ff4757",
    colorClass: "skill-card-coral",
    icon: "code",
    skills: [
      { name: "HTML & CSS", level: 85 },
      { name: "JavaScript / TypeScript", level: 75 },
      { name: "Next.js / React", level: 70 },
      { name: "MySQL / Database", level: 75 },
      { name: "Git & GitHub", level: 80 },
    ],
  },
];
