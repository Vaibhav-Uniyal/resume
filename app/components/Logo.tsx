import { motion } from 'framer-motion';

export default function Logo({ size = 'normal' }: { size?: 'normal' | 'large' }) {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg 
        width={size === 'large' ? "40" : "30"} 
        height={size === 'large' ? "40" : "30"} 
        viewBox="0 0 24 24" 
        fill="none" 
        className="mr-2"
      >
        {/* Graph/Chart Icon */}
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="#9333EA"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M8 16L8 12"
          stroke="#9333EA"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M12 16L12 8"
          stroke="#9333EA"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.path
          d="M16 16L16 10"
          stroke="#9333EA"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
      <span className={`font-medium ${size === 'large' ? 'text-4xl' : 'text-xl'} text-gray-900`}>
        <span className="text-[#9333EA] font-bold">Resu</span>Mate
      </span>
    </motion.div>
  );
} 