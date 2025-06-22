'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import Island from './Island';
import Ocean from './Ocean';
import Controls from './Controls';
import Shark from '@/models/Shark';
import Modal3D from '@/components/Modal3D';
import WelcomeScreen from '@/components/WelcomeScreen';
import Menu from '@/components/Menu';
import { AnimatePresence, motion } from 'framer-motion';
import UI from '@/components/UI';
import { useCameraAnimations } from '@/hooks/useCameraAnimations';

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [showSharkWelcome, setShowSharkWelcome] = useState(false);
  const [use3DModal, setUse3DModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowWelcome(false);
    setShowSharkWelcome(true);
    // Trigger camera fly-through animation here
  };

  const handleSectionClick = (section: PortfolioSection) => {
    if (use3DModal) {
      setActiveSection(section);
    } else {
      // Use existing 2D modal system
      setActiveSection(section);
    }
  };

  const handleSectionNavigate = (sectionId: string) => {
    const section = portfolioSections.find((s) => s.id === sectionId);
    if (section) {
      handleSectionClick(section);
    }
  };

  const CameraController = () => {
    const cameraAnimations = useCameraAnimations();

    // Trigger fly-through when name is submitted
    React.useEffect(() => {
      if (!showWelcome && userName && showSharkWelcome) {
        cameraAnimations.flyToIsland(userName, () => {
          setShowSharkWelcome(false);
        });
      }
    }, [showWelcome, userName, showSharkWelcome]);

    return null;
  };

  return (
    <div
      className={`w-full h-screen relative transition-all duration-500 ${
        currentTheme === 'light'
          ? 'bg-gradient-to-b from-sky-300 to-sky-500'
          : 'bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900'
      }`}
    >
      {/* Welcome Screen */}
      <WelcomeScreen isVisible={showWelcome} onNameSubmit={handleNameSubmit} />

      {/* Menu */}
      {!showWelcome && (
        <Menu
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onSectionNavigate={handleSectionNavigate}
          onResetCamera={() => {
            // Reset camera logic will be handled in CameraController
          }}
          userName={userName}
        />
      )}

      {/* Theme toggle for 3D Modal */}
      {!showWelcome && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setUse3DModal(!use3DModal)}
          className={`fixed top-6 right-6 z-40 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
            currentTheme === 'light'
              ? 'bg-white/80 text-gray-800 hover:bg-white/90'
              : 'bg-gray-800/80 text-white hover:bg-gray-800/90'
          }`}
        >
          {use3DModal ? '2D Mode' : '3D Mode'}
        </motion.button>
      )}

      {/* UI Overlay */}
      <AnimatePresence>
        {!isLoading && !showWelcome && !use3DModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            <UI
              activeSection={activeSection}
              onClose={() => setActiveSection(null)}
              sections={portfolioSections}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Modal */}
      <AnimatePresence>
        {use3DModal && activeSection && (
          <Modal3D
            section={activeSection}
            onClose={() => setActiveSection(null)}
            userName={userName}
          />
        )}
      </AnimatePresence>

      <Canvas
        ref={canvasRef}
        camera={{ position: [-2, -15, 10], fov: 60 }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Camera Controller */}
          <CameraController />

          {/* Dynamic Lighting based on theme */}
          <ambientLight intensity={currentTheme === 'light' ? 0.4 : 0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={currentTheme === 'light' ? 1 : 0.6}
            color={currentTheme === 'light' ? '#ffffff' : '#4a90e2'}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />

          {/* Night mode additional lighting */}
          {currentTheme === 'dark' && (
            <>
              <pointLight
                position={[0, 5, 0]}
                intensity={0.3}
                color="#6366f1"
                distance={20}
              />
              <pointLight
                position={[-10, 3, -10]}
                intensity={0.2}
                color="#8b5cf6"
                distance={15}
              />
            </>
          )}

          {/* Environment */}
          <Sky
            distance={450000}
            sunPosition={currentTheme === 'light' ? [0, 1, 0] : [0, -0.5, 0]}
            inclination={currentTheme === 'light' ? 0 : 0.8}
            azimuth={0.25}
            turbidity={currentTheme === 'light' ? 10 : 20}
            rayleigh={currentTheme === 'light' ? 3 : 1}
            mieCoefficient={currentTheme === 'light' ? 0.005 : 0.02}
            mieDirectionalG={currentTheme === 'light' ? 0.7 : 0.8}
          />

          <Environment
            files={
              currentTheme === 'light'
                ? '/venice_sunset_1k.hdr'
                : '/night_sky.jpg'
            }
            background={false}
          />

          {/* 3D Objects */}
          <Ocean theme={currentTheme} />
          <Island
            sections={portfolioSections}
            onSectionClick={handleSectionClick}
            onLoadComplete={() => setIsLoading(false)}
            isModalOpen={!!activeSection}
          />

          {/* Enhanced Shark with welcome functionality */}
          <Shark
            userName={userName}
            showWelcome={showSharkWelcome}
            onWelcomeComplete={() => setShowSharkWelcome(false)}
          />

          {/* Camera Controls */}
          <Controls target={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
