"use client";

import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h1 className="text-2xl font-bold mb-2">Loading Island Portfolio</h1>
        <p className="text-lg opacity-80">Preparing your 3D experience...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;

