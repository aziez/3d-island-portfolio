'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { PortfolioSection } from './Scene';
import { useGLTF } from '@react-three/drei';
// import Island3D from '@/models/Island-3d';
import IslandModel from '@/models/Island';
import Avatar from '@/models/Avatar';
import PropBottle from '@/models/PropBottle';
import FloatingLabelCard from '@/components/ui/floating-label';

interface IslandProps {
  sections: PortfolioSection[];
  onSectionClick: (section: PortfolioSection) => void;
  onLoadComplete: () => void;
  isModalOpen?: boolean;
}

const Island = ({
  sections,
  onSectionClick,
  onLoadComplete,
  isModalOpen = false,
}: IslandProps) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.2;
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
        <PropBottle />
      </InteractiveElement>

      {/* Terminal - Resume */}
      <InteractiveElement section={sections[2]}>
        <PropBottle />
      </InteractiveElement>

      {/* Workshop - Skills */}
      <InteractiveElement section={sections[3]}>
        <PropBottle />
      </InteractiveElement>

      {/* Postbox - Contact */}
      <InteractiveElement section={sections[4]}>
        <PropBottle />
      </InteractiveElement>

      {/* Path markers */}
      {sections.map((section, index) => (
        <FloatingLabelCard
          key={section.id}
          position={[
            section.position[0],
            section.position[1] + 0.75,
            section.position[2],
          ]}
          text={section.title}
          delay={index * 0.2}
          isModalOpen={isModalOpen}
        />
      ))}
    </group>
  );
};

// Preload the GLB model
useGLTF.preload('/island.glb');

export default Island;
