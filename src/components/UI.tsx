'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioSection } from './Scene';
import { X, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import Contact from '@/components/section/contact';
import Resume from '@/components/section/resume';
import Projects from '@/components/section/project';
import About from '@/components/section/about';
import Skills from '@/components/section/skills';

interface UIProps {
  activeSection: PortfolioSection | null;
  onClose: () => void;
  sections: PortfolioSection[];
}

const UI = ({ activeSection, onClose, sections }: UIProps) => {
  const renderContent = () => {
    if (!activeSection) return null;

    switch (activeSection.type) {
      case 'about':
        return <About />;

      case 'projects':
        return <Projects />;

      case 'resume':
        return <Resume />;

      case 'skills':
        return <Skills />;

      case 'contact':
        return <Contact />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {/* Navigation Dots */}
      <div className="absolute top-8 right-8 pointer-events-auto">
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() =>
                activeSection?.id === section.id ? onClose() : {}
              }
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                activeSection?.id === section.id
                  ? 'bg-white border-white'
                  : 'bg-transparent border-white/60 hover:border-white'
              }`}
              whileHover={{ scale: 1.2 }}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      {!activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        >
          <div className="bg-black/70 text-white px-4 py-3 rounded-full backdrop-blur-sm max-w-md mx-auto">
            <p className="text-xs sm:text-sm text-center">
              <span className="hidden sm:inline">
                Click elements to explore • Drag to rotate • Scroll to zoom •
                WASD to move
              </span>
              <span className="sm:hidden">
                Tap elements • Drag to rotate • Pinch to zoom
              </span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation Helper */}
      <div className="absolute top-8 left-8 pointer-events-auto sm:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
        >
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">
                📱
              </div>
              <div>Tap</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">
                🔄
              </div>
              <div>Drag</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">
                🤏
              </div>
              <div>Pinch</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 pointer-events-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl p-8 max-w-4xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
              {renderContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UI;
