"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import SkillRing from "../ui/SkillRing";
import { skillGroups } from "@/data/skills";

// ============================================================
// SkillsSection — Category-grouped skill cards with ring charts
// ============================================================

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 section-padding bg-bg-primary">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="// keahlian"
          title="Skills & Tools"
          description="Teknologi dan alat yang saya gunakan untuk mewujudkan ide menjadi produk digital."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, groupIdx) => (
            <GlassCard key={group.category} padding="lg">
              {/* Category header */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {group.category}
                </h3>
                <p className="text-text-muted text-xs font-mono">
                  {group.description}
                </p>
              </div>

              {/* Skill rings */}
              <div className="space-y-4">
                {group.skills.map((skill, skillIdx) => (
                  <SkillRing
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={skillIdx}
                  />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
