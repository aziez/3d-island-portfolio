'use client';

import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { motion, useAnimation } from 'framer-motion';

interface FloatingLabelCardProps {
  position: [number, number, number];
  text: string;
  delay?: number;
  isModalOpen?: boolean;
}

const FloatingLabelCard: React.FC<FloatingLabelCardProps> = ({
  position = [0, 0, 0],
  text,
  delay = 0,
  isModalOpen = false,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!isModalOpen) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: [0, 4, 0],
        transition: {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 2,
          ease: 'easeInOut',
          delay,
        },
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.8,
        y: 10,
        transition: { duration: 0.3 },
      });
    }
  }, [isModalOpen, delay, controls]);

  return (
    <Html position={position} center>
      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        className="relative px-4 py-2 rounded-xl text-sm font-bold text-gray-800 bg-gradient-to-br from-white/80 to-white/50 border border-white/30 shadow-2xl backdrop-blur-xl whitespace-nowrap min-w-[110px] text-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1,
        }}
      >
        {text}
      </motion.div>
    </Html>
  );
};

export default FloatingLabelCard;
