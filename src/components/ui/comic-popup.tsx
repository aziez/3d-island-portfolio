'use client';

import { cn } from '@/lib/utils';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface ComicPopupProps {
  show: boolean;
  position?: [number, number, number];
  children: React.ReactNode;
  variant?: 'speech' | 'note' | 'info' | 'warning' | 'chat';
}

const ComicPopup: React.FC<ComicPopupProps> = ({
  show,
  position = [0, 2.5, 0],
  children,
  variant = 'speech',
}) => {
  const baseStyle =
    'relative max-w-[240px] text-sm px-4 py-2 rounded-xl border-2 shadow-md';

  const variantClasses = {
    speech: 'bg-white border-black text-black',
    note: 'bg-yellow-100 border-yellow-600 text-yellow-800 italic',
    info: 'bg-blue-100 border-blue-500 text-blue-900',
    warning: 'bg-red-100 border-red-500 text-red-700 font-bold',
    chat: 'bg-green-100 border-green-500 text-green-800',
  };

  const tailStyle =
    variant === 'speech'
      ? 'absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-black'
      : '';

  return (
    <Html position={position} center>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className={cn(baseStyle, variantClasses[variant])}
          >
            {children}
            {variant === 'speech' && <div className={tailStyle} />}
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
};

export default ComicPopup;
