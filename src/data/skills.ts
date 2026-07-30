// ============================================================
// skills.ts — Skills data grouped by category
// ============================================================

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend & Web",
    description: "Membangun antarmuka web modern dan responsif",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML & CSS", level: 95 },
      { name: "Three.js", level: 60 },
    ],
  },
  {
    category: "Backend & Database",
    description: "Arsitektur sistem dan pengelolaan data",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "PHP", level: 70 },
      { name: "Node.js", level: 65 },
      { name: "Database Design", level: 85 },
      { name: "REST API", level: 70 },
    ],
  },
  {
    category: "Game Development",
    description: "Membuat pengalaman game yang imersif",
    skills: [
      { name: "Roblox Studio", level: 90 },
      { name: "Luau Scripting", level: 85 },
      { name: "Game Design", level: 80 },
      { name: "Level Design", level: 75 },
      { name: "Blender 3D", level: 55 },
    ],
  },
  {
    category: "Desain & Kreativitas",
    description: "Visual design dan identitas merek",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Adobe Photoshop", level: 80 },
      { name: "UI/UX Design", level: 75 },
      { name: "Branding", level: 70 },
      { name: "Motion Graphics", level: 50 },
    ],
  },
];
