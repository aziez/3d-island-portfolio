'use client';

import React, { useRef } from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingLabelCardProps {
  position: [number, number, number];
  text: string;
  delay?: number;
}

const FloatingLabelCard: React.FC<FloatingLabelCardProps> = ({
  position = [0, 0, 0],
  text,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Html position={position} center>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="relative px-3 py-2 bg-white/80 backdrop-blur-md rounded-lg text-xs text-gray-900 font-semibold shadow-xl border border-white/30 min-w-[100px] text-center"
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
