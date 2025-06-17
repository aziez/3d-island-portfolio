'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { PortfolioSection } from './Scene';
import { Text, Box, Cylinder, Cone, useGLTF } from '@react-three/drei';
// import Island3D from '@/models/Island-3d';
import IslandModel from '@/models/Island';
import Avatar from '@/models/Avatar';
import { GemBlue } from '@/models/GemBlue';
import { GemGreen } from '@/models/GemGreen';
import { GemPink } from '@/models/GemPink';

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
      <IslandModel />

      {/* Interactive Elements */}

      {/* House - About Me */}
      <InteractiveElement section={sections[0]}>
        <Avatar />
      </InteractiveElement>

      {/* Lighthouse - Projects */}
      <InteractiveElement section={sections[1]}>
        <GemBlue />
      </InteractiveElement>

      {/* Terminal - Resume */}
      <InteractiveElement section={sections[2]}>
        <GemPink />
      </InteractiveElement>

      {/* Workshop - Skills */}
      <InteractiveElement section={sections[3]}>
        <GemGreen />
      </InteractiveElement>

      {/* Postbox - Contact */}
      <InteractiveElement section={sections[4]}>
        <GemPink />
      </InteractiveElement>

      {/* Path markers */}
      {sections.map((section, index) => (
        <Text
          key={section.id || index}
          position={[
            section.position[0],
            section.position[1],
            section.position[2] + 0.4,
          ]}
          fontSize={0.1}
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
