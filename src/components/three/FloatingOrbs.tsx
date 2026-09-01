"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "@/lib/theme";

/**
 * Three floating liquid-metal orbs — dark theme only.
 * Hidden in light theme so the cream UI stays clean.
 */
export default function FloatingOrbs() {
  const { theme } = useTheme();

  if (theme === "light") return null;

  const colors = { a: "#d9a273", b: "#e8a6b8", c: "#f0d060" };

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-3.2, 1.2, -2.2]}>
          <sphereGeometry args={[1.15, 64, 64]} />
          <MeshDistortMaterial
            color={colors.a}
            roughness={0.15}
            metalness={0.85}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3.4, -1.0, -3]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color={colors.b}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={1.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[0.5, 2.2, -3.8]}>
          <sphereGeometry args={[0.7, 48, 48]} />
          <MeshDistortMaterial
            color={colors.c}
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
