'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Menu as MenuIcon,
  X,
  Sun,
  Moon,
  User,
  Briefcase,
  Code,
  Mail,
  FileText,
  Volume2,
  VolumeX,
  RotateCcw,
  Info,
} from 'lucide-react';

interface MenuProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
  onSectionNavigate: (sectionId: string) => void;
  onResetCamera: () => void;
  currentTheme: 'light' | 'dark';
  userName?: string;
}

const Menu = ({
  onThemeChange,
  onSectionNavigate,
  onResetCamera,
  currentTheme,
  userName,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const menuItems = [
    { id: 'avatar', label: 'About Me', icon: User, color: 'bg-blue-500' },
    {
      id: 'lighthouse',
      label: 'Projects',
      icon: Briefcase,
      color: 'bg-green-500',
    },
    { id: 'terminal', label: 'Resume', icon: FileText, color: 'bg-purple-500' },
    { id: 'workshop', label: 'Skills', icon: Code, color: 'bg-orange-500' },
    { id: 'postbox', label: 'Contact', icon: Mail, color: 'bg-red-500' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () =>
    onThemeChange(currentTheme === 'light' ? 'dark' : 'light');
  const toggleSound = () => setSoundEnabled(!soundEnabled);

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className={`fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
          currentTheme === 'light'
            ? 'bg-white/80 text-gray-800 hover:bg-white/90'
            : 'bg-gray-800/80 text-white hover:bg-gray-800/90'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </motion.div>
      </motion.button>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed top-0 left-0 z-40 w-80 h-full shadow-2xl backdrop-blur-md ${
              currentTheme === 'light'
                ? 'bg-white/90 text-gray-800'
                : 'bg-gray-900/90 text-white'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200/20">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold mb-2"
              >
                Welcome{userName ? `, ${userName}` : ''}!
              </motion.h2>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm opacity-70"
              >
                Navigate through my 3D portfolio
              </motion.p>
            </div>

            {/* Navigation Items */}
            <div className="p-6 space-y-3">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold mb-4"
              >
                Sections
              </motion.h3>

              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 4) }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSectionNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === 'light'
                      ? 'hover:bg-gray-100 hover:shadow-md'
                      : 'hover:bg-gray-800 hover:shadow-lg'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${item.color} text-white`}>
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-gray-200/20">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg font-semibold mb-4"
              >
                Controls
              </motion.h3>

              <div className="space-y-3">
                {/* Theme Toggle */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleTheme}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === 'light'
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      currentTheme === 'light'
                        ? 'bg-yellow-500'
                        : 'bg-indigo-500'
                    } text-white`}
                  >
                    {currentTheme === 'light' ? (
                      <Moon size={18} />
                    ) : (
                      <Sun size={18} />
                    )}
                  </div>
                  <span className="font-medium">
                    {currentTheme === 'light' ? 'Night Mode' : 'Light Mode'}
                  </span>
                </motion.button>

                {/* Sound Toggle */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleSound}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === 'light'
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      soundEnabled ? 'bg-green-500' : 'bg-gray-500'
                    } text-white`}
                  >
                    {soundEnabled ? (
                      <Volume2 size={18} />
                    ) : (
                      <VolumeX size={18} />
                    )}
                  </div>
                  <span className="font-medium">
                    Sound {soundEnabled ? 'On' : 'Off'}
                  </span>
                </motion.button>

                {/* Reset Camera */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onResetCamera();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === 'light'
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-blue-500 text-white">
                    <RotateCcw size={18} />
                  </div>
                  <span className="font-medium">Reset Camera</span>
                </motion.button>

                {/* Help Button */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowHelp(true)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === 'light'
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Info size={18} />
                  </div>
                  <span className="font-medium">Help & Controls</span>
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="p-6 mt-auto border-t border-gray-200/20"
            >
              <p className="text-xs opacity-60 text-center">
                3D Interactive Portfolio
              </p>
              <p className="text-xs opacity-40 text-center mt-1">
                Built with React Three Fiber
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`max-w-md w-full rounded-xl p-6 ${
                currentTheme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Controls & Navigation</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium">Desktop:</span>
                  <span className="opacity-80">
                    WASD to move, Mouse to rotate, Scroll to zoom
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium">Mobile:</span>
                  <span className="opacity-80">
                    Tap to interact, Drag to rotate, Pinch to zoom
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium">Elements:</span>
                  <span className="opacity-80">
                    Click on island objects to open 3D experiences
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 font-medium">Shark:</span>
                  <span className="opacity-80">
                    Click for helpful messages and animations
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
