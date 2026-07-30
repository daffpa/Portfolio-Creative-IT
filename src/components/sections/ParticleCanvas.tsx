"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PARTICLE_CONFIG } from "@/lib/constants";

// ============================================================
// Subtle particle system for hero background
// ============================================================

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const { count, spread, colors } = PARTICLE_CONFIG;

  const [positions, particleColors, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const colorOptions = colors.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * (spread * 0.5);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;
    }

    return [pos, cols, base];
  }, [count, spread, colors]);

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      mousePos.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      mousePos.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
    },
    [viewport]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] = basePositions[i3] + Math.sin(time * 0.12 + i * 0.08) * 0.5;
      posArray[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.1 + i * 0.12) * 0.4;
      posArray[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.08 + i * 0.05) * 0.2;

      const dx = posArray[i3] - mousePos.current.x;
      const dy = posArray[i3 + 1] - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.06;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[particleColors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Lines connecting nearby particles
function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { count, spread, colors } = PARTICLE_CONFIG;

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.5);
    }

    const linePositions: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.5) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    return geo;
  }, [count, spread]);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <lineSegments ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial color={colors[0]} transparent opacity={0.04} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// ============================================================
// ParticleCanvas — Exported for dynamic import
// ============================================================

export default function ParticleCanvas() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
