"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { extend, useFrame, Canvas } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

function Band() {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleUp = () => { isDragging.current = false; };
    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, []);

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  // We use spherical joints to connect the segments
  useSphericalJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0.5, 0],
  ]);
  useSphericalJoint(j1, j2, [
    [0, -0.5, 0],
    [0, 0.5, 0],
  ]);
  useSphericalJoint(j2, j3, [
    [0, -0.5, 0],
    [0, 0.5, 0],
  ]);
  useSphericalJoint(j3, card, [
    [0, -0.5, 0],
    [0, 1.2, 0],
  ]);

  useEffect(() => {
    if (card.current) {
      card.current.applyImpulse({ x: 0, y: 0.5, z: 0.5 }, true);
    }
  }, []);

  useFrame((state, delta) => {
    if (!j1.current || !j2.current || !j3.current || !card.current || !band.current) return;
    const pts = [
      fixed.current.translation(),
      j1.current.translation(),
      j2.current.translation(),
      j3.current.translation(),
      card.current.translation(),
    ];
    // Create the curve from the physics nodes
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p.x, p.y, p.z)));
    if (band.current.geometry) {
      band.current.geometry.setPoints(curve.getPoints(32));
    }

    // Drag interaction - move card based on mouse pointer only if clicked
    if (isDragging.current) {
      vec.set(state.pointer.x * 2, state.pointer.y * 2, 0);
      dir.copy(vec).sub(card.current.translation()).normalize().multiplyScalar(40);
      card.current.applyImpulse(
        { x: dir.x * delta, y: dir.y * delta, z: dir.z * delta },
        true
      );
    }
  });

  const photoTexture = useTexture('/images/profile.png');
  photoTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[0, 3, 0]} />
      <RigidBody ref={j1} position={[0, 2.5, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j2} position={[0, 2, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j3} position={[0, 1.5, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={card} position={[0, 0, 0]} type="dynamic" colliders="cuboid" angularDamping={4} linearDamping={4}>
        <group 
          position={[0, -0.2, 0]}
          onPointerDown={(e) => { e.stopPropagation(); isDragging.current = true; }}
          onPointerUp={(e) => { e.stopPropagation(); isDragging.current = false; }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'grab'; }}
          onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
        >
          {/* Card Body (Glass/Plastic) */}
          <mesh castShadow receiveShadow geometry={new THREE.BoxGeometry(1.4, 2.0, 0.05)}>
            <meshPhysicalMaterial 
              color="#ffffff" 
              roughness={0.15} 
              metalness={0.1} 
              transparent 
              opacity={0.8} 
              transmission={0.9} 
              thickness={0.5} 
            />
          </mesh>
          {/* Photo */}
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[1.3, 1.9]} />
            <meshBasicMaterial map={photoTexture} />
          </mesh>
          {/* ID Hole */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1]} />
            <meshBasicMaterial color="#000" />
          </mesh>
        </group>
      </RigidBody>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#ff4757"
          depthTest={false}
          resolution={[window.innerWidth, window.innerHeight]}
          useMap={false}
          lineWidth={0.05}
        />
      </mesh>
    </>
  );
}

export default function Lanyard3D() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Band />
          </Physics>
          <Environment preset="city">
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
