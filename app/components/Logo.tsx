import { motion } from 'framer-motion';

export default function Logo({ size = 'normal' }: { size?: 'normal' | 'large' }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className={`absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-600 to pink-700 rounded-lg opacity-75 blur-lg`}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className={`relative font-display font-bold ${size === 'large' ? 'text-6xl' : 'text-3xl'}`}>
          <span className="text-pink">Resu</span>
          <span className="text-pink">mate</span>
        </span>
      </div>
      {size === 'large' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg text-gray-200 font-medium"
        >
          Check, Optimize & Get Hired
        </motion.div>
      )}
      <motion.div
        className={`${size === 'large' ? 'mt-6' : 'mt-2'}`}
      >
        <motion.svg
          width={size === 'large' ? "120" : "60"}
          height={size === 'large' ? "40" : "20"}
          viewBox="0 0 120 40"
          className="transform rotate-0"
        >
          <motion.path
            d="M10 30 L50 30 L110 10"
            stroke="#00ff00"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.rect
              key={i}
              x={70 + i * 10}
              y={30 - i * 4}
              width="8"
              height={4 + i * 4}
              fill="#00ff00"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
} 