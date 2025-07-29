'use client';

import React, { useState, useEffect, useRef } from 'react';
import './download-button.css';

interface AnimatedDownloadButtonProps {
  onClick: () => void;
  text?: string;
}

const AnimatedDownloadButton: React.FC<AnimatedDownloadButtonProps> = ({ 
  onClick, 
  text = 'Download' 
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    if (!isChecked) {
      setIsChecked(true);
      createParticles();
      
      // Wait for animation to complete before calling onClick
      setTimeout(() => {
        onClick();
        
        // Reset after some time
        setTimeout(() => {
          setIsChecked(false);
        }, 2000);
      }, 1000);
    }
  };
  
  const createParticles = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const colors = ['#35C687', '#9333EA', '#1E40AF', '#7C3AED'];
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      container.appendChild(particle);
      
      // Animate the particle
      setTimeout(() => {
        particle.style.opacity = '0.8';
        particle.style.transform = `translateY(${Math.random() * 60 - 30}px) translateX(${Math.random() * 60 - 30}px)`;
        
        // Remove after animation
        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        }, 800);
      }, 10);
    }
  };

  return (
    <div className="download-button-container" ref={containerRef}>
      <input 
        type="checkbox" 
        id="download-button-checkbox" 
        className="download-button-checkbox" 
        checked={isChecked} 
        onChange={() => {}}
      />
      <button 
        className="download-button" 
        onClick={handleClick}
      >
        <span className="text">{text}</span>
        <span className="icon">↓</span>
        <span className="tick">✓</span>
      </button>
    </div>
  );
};

export default AnimatedDownloadButton; 