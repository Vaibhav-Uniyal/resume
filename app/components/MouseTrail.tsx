'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Mouse trail dot properties
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  id: number;
}

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Define professional, subtle colors
  const trailColors = [
    'rgba(59, 130, 246, 0.3)',  // Light blue
    'rgba(75, 85, 99, 0.2)',    // Gray
    'rgba(17, 24, 39, 0.15)',   // Dark gray
  ];
  
  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add a new particle when the mouse moves
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 2, // Smaller size between 2-8px
        color: trailColors[Math.floor(Math.random() * trailColors.length)],
        id: Date.now()
      };
      
      setParticles(prevParticles => {
        // Keep only the most recent 15 particles (fewer than before)
        const updatedParticles = [...prevParticles, newParticle];
        if (updatedParticles.length > 15) {
          return updatedParticles.slice(updatedParticles.length - 15);
        }
        return updatedParticles;
      });
    };
    
    // Throttle the mouse move event to avoid too many particles
    let lastMoveTime = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime > 30) { // Add particle every 30ms (less frequent)
        handleMouseMove(e);
        lastMoveTime = now;
      }
    };
    
    window.addEventListener('mousemove', throttledMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: 'blur(0.5px)',
            opacity: 0.6,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: 0,
            opacity: 0,
            x: (Math.random() - 0.5) * 20, // Less movement
            y: (Math.random() - 0.5) * 20,
          }}
          transition={{
            duration: 0.7 + Math.random() * 0.3, // Shorter duration
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Smaller, more subtle cursor dot */}
      <motion.div
        className="absolute w-5 h-5 rounded-full"
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.2)', // Subtle blue
          filter: 'blur(1px)',
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
        animate={{
          scale: [1, 1.1, 1], // Less dramatic pulsing
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 