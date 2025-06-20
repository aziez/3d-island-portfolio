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
import Modal3D from '@/components/Modal';

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
    {
      id: 'avatar',
      title: 'About Me',
      position: [-1, -0.38, 6.5],
      type: 'about',
    },
    {
      id: 'lighthouse',
      title: 'Projects',
      position: [-3, 0.5, -0.5],
      type: 'projects',
    },
    { id: 'terminal', title: 'Resume', position: [2, 0.5, 4], type: 'resume' },
    {
      id: 'workshop',
      title: 'Skills',
      position: [-0.75, 0.5, -2],
      type: 'skills',
    },
    {
      id: 'postbox',
      title: 'Contact',
      position: [2.4, 0.5, 0.75],
      type: 'contact',
    },
  ];

  return (
    <div className="w-full h-screen relative">
      {/* UI Overlay */}
      {/* <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none z-9999"
          >
            <UI
              activeSection={activeSection}
              onClose={() => setActiveSection(null)}
              sections={portfolioSections}
            />
          </motion.div>
        )}
      </AnimatePresence> */}

      <Canvas
        camera={{ position: [-2, -15, 10], fov: 60 }}
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

          <Environment files="/venice_sunset_1k.hdr" background={false} />
          {activeSection && (
            <Modal3D
              section={activeSection}
              onClose={() => setActiveSection(null)}
            />
          )}

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
    </div>
  );
};

export default Scene;
