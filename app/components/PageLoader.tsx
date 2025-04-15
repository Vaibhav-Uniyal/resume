'use client';

import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-white font-medium">Loading...</p>
      </motion.div>
    </div>
  );
} 