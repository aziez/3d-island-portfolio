'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Environment, Sky } from '@react-three/drei';
import Island from './Island';
import Ocean from './Ocean';
import UI from './UI';
import Controls from './Controls';
import { motion, AnimatePresence } from 'framer-motion';
import Shark from '@/models/Shark';

export interface PortfolioSection {
  id: string;
  title: string;
  position: [number, number, number];
  type: 'about' | 'projects' | 'resume' | 'skills' | 'contact';
}

const Scene = () => {
  const [activeSection, setActiveSection] = useState<PortfolioSection | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const portfolioSections: PortfolioSection[] = [
    { id: 'house', title: 'About Me', position: [2, 0.5, 1], type: 'about' },
    {
      id: 'lighthouse',
      title: 'Projects',
      position: [-3, 1, -2],
      type: 'projects',
    },
    { id: 'terminal', title: 'Resume', position: [0, 0.2, 3], type: 'resume' },
    { id: 'workshop', title: 'Skills', position: [4, 0.3, -1], type: 'skills' },
    {
      id: 'postbox',
      title: 'Contact',
      position: [-2, 0.1, 2],
      type: 'contact',
    },
  ];

  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [10, 5, 10], fov: 60 }}
        shadows
        className="bg-gradient-to-b from-sky-300 to-sky-500"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />

          {/* Environment */}
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          {/* <Environment preset="sunset" /> */}

          <Environment
            files="https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/hdri/venice_sunset_1k.hdr"
            background={false}
          />

          {/* 3D Objects */}
          <Ocean />
          <Island
            sections={portfolioSections}
            onSectionClick={setActiveSection}
            onLoadComplete={() => setIsLoading(false)}
          />
          <Shark />

          {/* <AtmosphericEffects /> */}

          {/* Camera Controls */}
          <Controls target={[0, 0, 0]} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <UI
              activeSection={activeSection}
              onClose={() => setActiveSection(null)}
              sections={portfolioSections}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scene;
