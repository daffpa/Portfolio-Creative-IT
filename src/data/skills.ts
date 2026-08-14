// ============================================================
// skills.ts — Multi-disciplinary skill groups based on CV
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
    category: "Desain Grafis & Branding",
    description: "Merancang identitas visual, layout, dan materi branding yang konsisten dan berdampak",
    color: "#2563ff",
    colorClass: "skill-card-blue",
    icon: "palette",
    skills: [
      { name: "Adobe Photoshop", level: 90 },
      { name: "Adobe Illustrator", level: 85 },
      { name: "Canva", level: 90 },
      { name: "Figma", level: 80 },
      { name: "Brand Identity Design", level: 85 },
      { name: "Poster & Print Design", level: 90 },
    ],
  },
  {
    category: "Social Media Strategy",
    description: "Membangun strategi konten digital untuk YouTube Shorts, TikTok, dan platform lainnya",
    color: "#ff2d87",
    colorClass: "skill-card-pink",
    icon: "trending_up",
    skills: [
      { name: "YouTube Shorts Strategy", level: 85 },
      { name: "TikTok Content", level: 85 },
      { name: "Content Planning", level: 80 },
      { name: "Copywriting", level: 75 },
      { name: "Social Media Analytics", level: 75 },
    ],
  },
  {
    category: "Leadership & Management",
    description: "Memimpin tim kreatif, mengelola proyek, dan berkolaborasi lintas divisi",
    color: "#ffc23a",
    colorClass: "skill-card-amber",
    icon: "groups",
    skills: [
      { name: "Art Direction", level: 90 },
      { name: "Team Leadership", level: 80 },
      { name: "Project Management", level: 80 },
      { name: "Client Collaboration", level: 85 },
      { name: "Public Relations", level: 75 },
    ],
  },
  {
    category: "Tools & Teknologi",
    description: "Perangkat pendukung untuk development, editing, dan kolaborasi digital",
    color: "#48ff91",
    colorClass: "skill-card-lime",
    icon: "code",
    skills: [
      { name: "Video Editing (Premiere/CapCut)", level: 85 },
      { name: "HTML & CSS", level: 75 },
      { name: "JavaScript / TypeScript", level: 70 },
      { name: "Microsoft Office Suite", level: 85 },
      { name: "Git & GitHub", level: 70 },
    ],
  },
];
