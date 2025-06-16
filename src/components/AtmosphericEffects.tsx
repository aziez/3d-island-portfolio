"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const AtmosphericEffects = () => {
  const cloudsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate cloud particles
  const cloudPositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 10 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  // Generate floating particles
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  useFrame((state) => {
    // Animate clouds
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005;
      const positions = cloudsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.005; // Move clouds slowly
        if (positions[i] > 25) positions[i] = -25; // Reset position
      }
      cloudsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001; // Gentle floating motion
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Clouds */}
      <Points ref={cloudsRef} positions={cloudPositions}>
        <PointMaterial
          size={3}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </Points>

      {/* Floating particles */}
      <Points ref={particlesRef} positions={particlePositions}>
        <PointMaterial
          size={0.5}
          color="#87CEEB"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </Points>

      {/* Ambient fog effect */}
      <fog attach="fog" args={['#87CEEB', 20, 50]} />
    </group>
  );
};

export default AtmosphericEffects;

