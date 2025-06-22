// AboutScene.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

function About() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
          AZ
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Aziz Avatar</h2>
        <p className="text-xl text-gray-600 mb-4">Full Stack Developer</p>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          Passionate full-stack developer with expertise in modern web
          technologies. I love creating beautiful, functional, and user-friendly
          applications that solve real-world problems.
        </p>
        <p>
          When Im not coding, you can find me exploring new technologies,
          contributing to open-source projects, or enjoying the great outdoors.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
          <p className="text-gray-600">Available Worldwide</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
          <p className="text-gray-600">5+ Years</p>
        </div>
      </div>
    </div>
  );
}

export const AboutScene = ({ userName }: { userName?: string }) => {
  const fishRef = useRef<THREE.Group>(null);
  const bubblesRef = useRef<THREE.Group>(null);
  const waterTexture = useTexture('/waternormals.jpg');
  // const { scene: fishModel } = useGLTF('/models/fish.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (fishRef.current) {
      fishRef.current.position.x = Math.sin(t) * 2;
      fishRef.current.rotation.y = Math.cos(t * 0.5) * 0.3;
    }

    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y += 0.01 + Math.sin(t + i) * 0.002;
        if (bubble.position.y > 3) bubble.position.y = -1;
      });
    }
  });

  useEffect(() => {
    gsap.to(waterTexture.offset, {
      x: '+=1',
      duration: 10,
      repeat: -1,
      ease: 'none',
    });
  }, [waterTexture]);

  return (
    <group>
      {/* Ocean floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial map={waterTexture} transparent opacity={0.9} />
      </mesh>

      {/* Fish */}
      {/* <group ref={fishRef} scale={0.5} position={[0, 0.5, 0]}>
        <primitive object={fishModel} />
      </group> */}

      {/* Bubbles */}
      <group ref={bubblesRef}>
        {[...Array(10)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.random() * 4 - 2, -1, Math.random() * 4 - 2]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#b3e5fc" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Info Panel */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html position={[2, 1, 0]} transform>
          <div className="bg-white/80 p-4 rounded-xl shadow-xl text-sm text-gray-700 max-w-xs">
            <h3 className="font-bold text-lg">
              Hi, im {userName || 'Aziz'} 🌊
            </h3>
            <p>
              I’m a passionate developer who loves building interactive 3D and
              web experiences. I enjoy blending creativity with code!
            </p>
          </div>
        </Html>
      </Float>
    </group>
  );
};

export default About;
