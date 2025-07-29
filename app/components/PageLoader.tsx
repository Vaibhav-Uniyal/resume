'use client';

import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-[#FAF5FF] via-[#FAF5FF] to-[#FAF5FF] flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 border-4 border-[#9333EA]/20 border-t-[#9333EA] rounded-full animate-spin" />
        <p className="text-[#9333EA] font-medium">Loading...</p>
      </motion.div>
    </motion.div>
  );
} 