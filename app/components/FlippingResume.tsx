'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlippingResumeProps {
  resumeContent: string;
  title?: string;
}

export default function FlippingResume({ resumeContent, title = 'My Resume' }: FlippingResumeProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  // Prevent flipping during animation
  const handleFlip = () => {
    if (animationComplete) {
      setAnimationComplete(false);
      setIsFlipped(!isFlipped);
      setTimeout(() => setAnimationComplete(true), 700); // Match transition duration
    }
  };

  // Format resume text with styling, optional color parameter for back side
  const formatResumeText = (text: string, isBack = false) => {
    return text.split('\n').map((line, index) => {
      // Style section headings
      if (line.trim().endsWith(':') || line.toUpperCase() === line && line.trim().length > 0) {
        return (
          <h3 
            key={index} 
            className={`text-lg font-bold mt-4 mb-2 ${isBack ? 'text-green-700' : 'text-blue-700'}`}
          >
            {line}
          </h3>
        );
      }
      
      // Style bullet points
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <div key={index} className="flex items-start gap-2 my-1">
            <span className={isBack ? 'text-green-500' : 'text-blue-500'}>•</span>
            <p className="text-gray-700">{line.replace(/^[-•]\s*/, '')}</p>
          </div>
        );
      }
      
      // Look for name at the top
      if (index === 0 || index === 1) {
        if (!line.includes('@') && !line.includes('http') && line.trim().length > 0) {
          return (
            <h2 
              key={index} 
              className={`text-2xl font-bold text-center mb-4 ${isBack ? 'text-green-600' : 'text-blue-600'}`}
            >
              {line}
            </h2>
          );
        }
      }
      
      // Look for contact info
      if (line.includes('@') || line.includes('http') || line.includes('linkedin') || 
          line.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) {
        return (
          <p key={index} className="text-sm text-gray-600 mb-1">
            {line}
          </p>
        );
      }
      
      // Default paragraph styling
      return line.trim() ? <p key={index} className="my-1 text-gray-700">{line}</p> : <div key={index} className="h-2"></div>;
    });
  };

  // Add a decorative element to the back side
  const BackDecoration = () => (
    <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-green-500/20 to-green-200/30 rounded-tl-3xl z-0" />
  );

  // Add a decorative element to the front side
  const FrontDecoration = () => (
    <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-200/30 rounded-br-3xl z-0" />
  );

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto my-8 relative">
      {/* Click instructions */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">
        {isFlipped ? 'Click to flip back' : 'Click to flip card'}
      </div>
      
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d cursor-pointer`}
        style={{ 
          height: '600px',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={handleFlip}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden border-2 border-blue-100 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <FrontDecoration />
          <div className="h-full overflow-y-auto relative z-10">
            <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Front
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 relative z-10">{title}</h2>
            <div className="font-sans relative z-10">
              {formatResumeText(resumeContent)}
            </div>
          </div>
        </div>

        {/* Back side (slightly modified content & styling) */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 backface-hidden border-2 border-green-100 overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <BackDecoration />
          <div className="h-full overflow-y-auto relative z-10">
            <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Back
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600 relative z-10">{title}</h2>
            <div className="font-sans relative z-10">
              {formatResumeText(resumeContent, true)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4 flex justify-center gap-3">
        <button 
          onClick={() => setIsFlipped(false)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${!isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Show Front
        </button>
        <button 
          onClick={() => setIsFlipped(true)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${isFlipped ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Show Back
        </button>
      </div>
    </div>
  );
} 