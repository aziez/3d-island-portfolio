'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { PortfolioSection } from './Scene';
import { AboutScene } from '@/components/section/about';
import { ProjectsScene } from '@/components/section/project';
import { SkillsScene } from '@/components/section/skills';
import { ContactScene } from '@/components/section/contact';
import { ResumeScene } from '@/components/section/resume';

interface Modal3DProps {
  section: PortfolioSection;
  onClose: () => void;
  userName?: string;
}

const Modal3D: React.FC<Modal3DProps> = ({ section, onClose, userName }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderScene = () => {
    switch (section.type) {
      case 'about':
        return <AboutScene userName={userName} />;
      case 'projects':
        return <ProjectsScene />;
      case 'skills':
        return <SkillsScene />;
      case 'contact':
        return <ContactScene />;
      case 'resume':
        return <ResumeScene />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm ${
          isFullscreen ? 'p-0' : 'p-4'
        }`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`relative bg-gray-900 ${
            isFullscreen
              ? 'w-full h-full'
              : 'w-full max-w-6xl mx-auto h-[80vh] rounded-xl overflow-hidden'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl font-bold text-white"
            >
              {section.title} - 3D Experience
            </motion.h2>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* 3D Canvas */}
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight
                position={[-10, -10, -5]}
                intensity={0.5}
                color="#4f46e5"
              />

              {/* Environment */}
              <Environment preset="city" background={false} />

              {/* 3D Scene Content */}
              {renderScene()}

              {/* Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={20}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>

          {/* Bottom Info Panel */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4"
          >
            <p className="text-white/80 text-sm text-center">
              🎮 Drag to rotate • 🖱️ Scroll to zoom • 🖼️ Click objects to
              interact
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal3D;
