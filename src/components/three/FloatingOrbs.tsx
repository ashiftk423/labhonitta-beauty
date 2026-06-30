"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";

/**
 * Soft, liquid-metal rose-gold orbs floating in depth. They read as abstract
 * "beauty bubbles" and give the bloom something luscious to glow on.
 */
export default function FloatingOrbs() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-3.4, 1.2, -2]}>
          <sphereGeometry args={[1.1, 64, 64]} />
          <MeshDistortMaterial
            color="#d9a273"
            roughness={0.15}
            metalness={0.9}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3.6, -1.1, -3]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#e8a6b8"
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={1.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[0.6, 2.3, -4]}>
          <sphereGeometry args={[0.6, 48, 48]} />
          <MeshDistortMaterial
            color="#f6e3b8"
            roughness={0.1}
            metalness={1}
            distort={0.45}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
}
