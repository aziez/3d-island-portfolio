'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { PortfolioSection } from './Scene';
import { Text, Box, Cylinder, Cone, useGLTF } from '@react-three/drei';
import Island3D from '@/models/Island-3d';

interface IslandProps {
  sections: PortfolioSection[];
  onSectionClick: (section: PortfolioSection) => void;
  onLoadComplete: () => void;
}

const Island = ({ sections, onSectionClick, onLoadComplete }: IslandProps) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  useFrame((state) => {
    // Gentle floating animation for the island
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const InteractiveElement = ({
    section,
    children,
  }: {
    section: PortfolioSection;
    children: React.ReactNode;
  }) => {
    return (
      <group
        position={section.position}
        onClick={(e) => {
          e.stopPropagation();
          onSectionClick(section);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        {children}
      </group>
    );
  };

  return (
    <group ref={groupRef}>
      <Island3D />

      <Box args={[2, 2, 2]} position={[0, 1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#ff6b35" metalness={0.3} roughness={0.4} />
      </Box>

      {/* Interactive Elements */}

      {/* House - About Me */}
      <InteractiveElement section={sections[0]}>
        <group>
          {/* House Base */}
          <Box args={[1.5, 1, 1.2]} castShadow>
            <meshLambertMaterial color="#8B4513" />
          </Box>
          {/* Roof */}
          <Cone args={[1.2, 0.8, 4]} position={[0, 0.9, 0]} castShadow>
            <meshLambertMaterial color="#654321" />
          </Cone>
          {/* Door */}
          <Box args={[0.3, 0.6, 0.02]} position={[0, -0.2, 0.61]} castShadow>
            <meshLambertMaterial color="#4a2c17" />
          </Box>
        </group>
      </InteractiveElement>

      {/* Lighthouse - Projects */}
      <InteractiveElement section={sections[1]}>
        <group>
          <Cylinder args={[0.3, 0.4, 2, 8]} castShadow>
            <meshLambertMaterial color="#ffffff" />
          </Cylinder>
          <Cylinder
            args={[0.4, 0.4, 0.3, 8]}
            position={[0, 1.15, 0]}
            castShadow
          >
            <meshLambertMaterial color="#ff4444" />
          </Cylinder>
          {/* Light beam effect */}
          <Cylinder args={[0.1, 0.8, 0.1, 8]} position={[0, 1.4, 0]} castShadow>
            <meshBasicMaterial color="#ffff88" transparent opacity={0.3} />
          </Cylinder>
        </group>
      </InteractiveElement>

      {/* Terminal - Resume */}
      <InteractiveElement section={sections[2]}>
        <group>
          <Box args={[1, 0.8, 0.1]} castShadow>
            <meshLambertMaterial color="#2a2a2a" />
          </Box>
          <Box args={[0.8, 0.6, 0.02]} position={[0, 0, 0.06]} castShadow>
            <meshBasicMaterial color="#000000" />
          </Box>
          {/* Screen glow */}
          <Box args={[0.82, 0.62, 0.01]} position={[0, 0, 0.07]} castShadow>
            <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
          </Box>
        </group>
      </InteractiveElement>

      {/* Workshop - Skills */}
      <InteractiveElement section={sections[3]}>
        <group>
          {/* Workbench */}
          <Box args={[1.5, 0.1, 0.8]} position={[0, 0.5, 0]} castShadow>
            <meshLambertMaterial color="#8B4513" />
          </Box>
          {/* Legs */}
          <Box args={[0.1, 1, 0.1]} position={[-0.6, 0, -0.3]} castShadow>
            <meshLambertMaterial color="#654321" />
          </Box>
          <Box args={[0.1, 1, 0.1]} position={[0.6, 0, -0.3]} castShadow>
            <meshLambertMaterial color="#654321" />
          </Box>
          <Box args={[0.1, 1, 0.1]} position={[-0.6, 0, 0.3]} castShadow>
            <meshLambertMaterial color="#654321" />
          </Box>
          <Box args={[0.1, 1, 0.1]} position={[0.6, 0, 0.3]} castShadow>
            <meshLambertMaterial color="#654321" />
          </Box>
          {/* Tools */}
          <Cylinder
            args={[0.02, 0.02, 0.6, 8]}
            position={[-0.3, 0.8, 0]}
            rotation={[0, 0, Math.PI / 4]}
            castShadow
          >
            <meshLambertMaterial color="#C0C0C0" />
          </Cylinder>
        </group>
      </InteractiveElement>

      {/* Postbox - Contact */}
      <InteractiveElement section={sections[4]}>
        <group>
          <Cylinder args={[0.3, 0.3, 1.2, 8]} castShadow>
            <meshLambertMaterial color="#ff6b6b" />
          </Cylinder>
          <Box args={[0.4, 0.3, 0.02]} position={[0, 0.2, 0.31]} castShadow>
            <meshLambertMaterial color="#4a4a4a" />
          </Box>
          {/* Post */}
          <Cylinder
            args={[0.05, 0.05, 1.5, 8]}
            position={[0, -0.75, 0]}
            castShadow
          >
            <meshLambertMaterial color="#8B4513" />
          </Cylinder>
        </group>
      </InteractiveElement>

      <group position={[-1.5, 0.6, -1]}>
        <Cylinder args={[0.08, 0.12, 0.8, 8]} castShadow>
          <meshLambertMaterial color="#8B4513" />
        </Cylinder>
        <Cone args={[0.5, 1, 8]} position={[0, 0.9, 0]} castShadow>
          <meshLambertMaterial color="#228B22" />
        </Cone>
      </group>

      {/* Path markers */}
      {sections.map((section, index) => (
        <Text
          key={section.id || index}
          position={[
            section.position[0],
            section.position[1] + 1,
            section.position[2],
          ]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {section.title}
        </Text>
      ))}
    </group>
  );
};

// Preload the GLB model
useGLTF.preload('/island.glb');

export default Island;
