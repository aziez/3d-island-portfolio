'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Waves, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
  isVisible: boolean;
}

const WelcomeScreen = ({ onNameSubmit, isVisible }: WelcomeScreenProps) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onNameSubmit(name.trim());
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-blue-900 via-blue-600 to-cyan-400 flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute top-20 left-20 text-blue-300/20"
            >
              <Sparkles size={60} />
            </motion.div>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-20 right-20 text-cyan-300/20"
            >
              <Waves size={80} />
            </motion.div>
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-10 text-blue-200/30"
            >
              <Sparkles size={100} />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-8 max-w-md w-full">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              {/* Shark Animation */}
              <motion.div
                animate={{
                  x: [-20, 20, -20],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block text-8xl mb-4"
              >
                🦈
              </motion.div>

              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
              >
                Welcome to My
              </motion.h1>

              <motion.h2
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-2xl md:text-3xl font-semibold text-cyan-100 mb-6"
              >
                3D Island Portfolio
              </motion.h2>
            </motion.div>

            <motion.form
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-6 py-4 text-lg text-gray-800 bg-white/90 backdrop-blur-sm rounded-full border-2 border-transparent focus:border-cyan-300 focus:outline-none transition-all duration-300 placeholder-gray-500"
                  disabled={isSubmitting}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-300"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: name.length > 0 ? 1 : 0,
                    opacity: name.length > 0 ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className={`w-full py-4 px-8 text-lg font-semibold rounded-full transition-all duration-300 ${
                  name.trim() && !isSubmitting
                    ? 'bg-white text-blue-600 hover:bg-cyan-50 shadow-lg hover:shadow-xl'
                    : 'bg-white/50 text-white/70 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
                  />
                ) : (
                  'Dive Into My World 🌊'
                )}
              </motion.button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-6 text-cyan-100/80 text-sm"
            >
              Get ready for an immersive 3D experience!
            </motion.p>
          </div>
          {/* Sun Animation */}
          <motion.div
            initial={{ y: -120, scale: 0.7, opacity: 0 }}
            animate={{ y: -80, scale: 1, opacity: 1 }}
            transition={{
              delay: 0.7,
              duration: 1.2,
              type: 'spring',
              bounce: 0.4,
            }}
            className="absolute left-1 top-10 -translate-x-1/2  z-20"
          >
            {/* Sun core */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 60px 20px #fef08a, 0 0 120px 40px #fde047',
                  '0 0 80px 30px #fde047, 0 0 160px 60px #facc15',
                  '0 0 60px 20px #fef08a, 0 0 120px 40px #fde047',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-28 h-28  rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-500 shadow-2xl flex items-center justify-center"
            >
              {/* Sun rays */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '8px',
                    height: '36px',
                    background:
                      'linear-gradient(to bottom, #fde047 70%, transparent 100%)',
                    borderRadius: '4px',
                    transform: `rotate(${i * 30}deg) translate(-50%, -90%)`,
                    transformOrigin: '50% 100%',
                    zIndex: 1,
                  }}
                  animate={{
                    scaleY: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + i * 0.1,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom Wave Animation */}
          <motion.div
            animate={{
              y: [0, 0, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-full h-60 bg-gradient-to-t from-cyan-500/30 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
