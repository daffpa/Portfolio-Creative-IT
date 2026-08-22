"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroBadge() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for tracking cursor relative to the card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the motion
  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform coordinates into rotation angles
  // For x (left/right), rotate around Y axis
  // For y (up/down), rotate around X axis
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Calculate glare position based on cursor
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="w-full h-full min-h-[400px] flex items-center justify-center perspective-[1000px] py-10"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[300px] sm:w-[350px] aspect-[2.5/3.5] rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl overflow-hidden cursor-crosshair group will-change-transform"
      >
        {/* Card Background / Blur */}
        <div className="absolute inset-0 bg-bg/40 backdrop-blur-md" />

        {/* Dynamic Glare Effect */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.2) 0%, transparent 60%)`
            )
          }}
        />

        {/* Photo Container */}
        <div className="absolute inset-[8px] rounded-[1.75rem] overflow-hidden z-10" style={{ transform: "translateZ(30px)" }}>
          <img
            src="/images/profile.png"
            alt="Daffa Gusti Yanza"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </div>

        {/* Badge Hole / Clip */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-bg z-30 shadow-inner border border-white/5" style={{ transform: "translateZ(40px)" }} />
        
        {/* Floating Text / Overlay Layer */}
        <div 
          className="absolute bottom-6 left-6 right-6 z-30 flex flex-col gap-1 p-4 rounded-2xl bg-bg/60 backdrop-blur-xl border border-white/10"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider font-bold">Open for Work</span>
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Daffa Gusti Yanza</h3>
          <p className="font-mono text-xs text-text-muted">Art Director & Business Analyst</p>
        </div>
      </motion.div>
    </div>
  );
}
