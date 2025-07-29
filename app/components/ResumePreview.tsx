'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './Container';

interface ResumePreviewProps {
  originalResume: string;
  optimizedResume: string;
}

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  style: {
    container: string;
    name: string;
    contact: string;
    section: string;
    bullet: string;
  };
}

const layoutOptions: LayoutOption[] = [
  {
    id: 'modern',
    name: 'Modern Layout',
    description: 'Clean, contemporary design with emphasis on whitespace',
    style: {
      container: 'max-w-3xl mx-auto p-8 space-y-6',
      name: 'text-3xl font-bold text-center mb-4 text-gray-900',
      contact: 'flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6',
      section: 'space-y-2',
      bullet: 'flex items-start gap-2 my-1'
    }
  },
  {
    id: 'professional',
    name: 'Professional Layout',
    description: 'Traditional format with clear hierarchy and structure',
    style: {
      container: 'max-w-3xl mx-auto p-8 space-y-8',
      name: 'text-2xl font-bold mb-2 text-gray-900',
      contact: 'flex flex-col gap-1 text-sm text-gray-600 mb-6',
      section: 'space-y-3',
      bullet: 'flex items-start gap-2 my-1.5'
    }
  },
  {
    id: 'creative',
    name: 'Creative Layout',
    description: 'Innovative design with visual elements and dynamic spacing',
    style: {
      container: 'max-w-3xl mx-auto p-8 space-y-6',
      name: 'text-3xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200 pb-4',
      contact: 'grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6',
      section: 'space-y-3 bg-gray-50 p-4 rounded-lg',
      bullet: 'flex items-start gap-2 my-1.5 pl-4 border-l-2 border-gray-200'
    }
  }
];

export default function ResumePreview({ originalResume, optimizedResume }: ResumePreviewProps) {
  const [showOptimized, setShowOptimized] = useState(true);
  const [highlightChanges, setHighlightChanges] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[0]);
  
  // Format resume text with enhanced styling
  const formatResumeText = (text: string, isOptimized: boolean = false, layout: LayoutOption = selectedLayout) => {
    return text.split('\n').map((line, index) => {
      // Style section headings
      if (line.trim().endsWith(':') || line.toUpperCase() === line && line.trim().length > 0) {
        return (
          <h3 key={index} className={`text-lg font-bold mt-4 mb-2 text-gray-800 ${layout.style.section}`}>
            {line}
          </h3>
        );
      }
      
      // Style bullet points
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <div key={index} className={layout.style.bullet}>
            <span className="text-gray-600">•</span>
            <p className="text-gray-700">{line.replace(/^[-•]\s*/, '')}</p>
          </div>
        );
      }
      
      // Look for name at the top
      if (index === 0 || index === 1) {
        if (!line.includes('@') && !line.includes('http') && line.trim().length > 0) {
          return (
            <h2 key={index} className={layout.style.name}>
              {line}
            </h2>
          );
        }
      }
      
      // Look for contact info
      if (line.includes('@') || line.includes('http') || line.includes('linkedin') || 
          line.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) {
        return (
          <p key={index} className={layout.style.contact}>
            {line}
          </p>
        );
      }
      
      // Default paragraph styling
      return line.trim() ? <p key={index} className="my-1 text-gray-700">{line}</p> : <div key={index} className="h-2"></div>;
    });
  };

  // Calculate differences between original and optimized resumes
  const getDifferences = () => {
    const originalLines = originalResume.split('\n');
    const optimizedLines = optimizedResume.split('\n');
    const differences = [];

    for (let i = 0; i < Math.max(originalLines.length, optimizedLines.length); i++) {
      if (originalLines[i] !== optimizedLines[i]) {
        differences.push({
          original: originalLines[i] || '',
          optimized: optimizedLines[i] || '',
          lineNumber: i + 1
        });
      }
    }

    return differences;
  };

  const differences = getDifferences();
  
  return (
    <div className="mt-12 mb-20">
      <Container>
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                Resume Comparison
              </h2>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="highlightChanges"
                    checked={highlightChanges}
                    onChange={() => setHighlightChanges(!highlightChanges)}
                    className="mr-2"
                  />
                  <label htmlFor="highlightChanges" className="text-sm text-gray-600">
                    Highlight Changes
                  </label>
                </div>
                
                <div className="bg-gray-100 rounded-full p-1 flex">
                  <button
                    onClick={() => setShowOptimized(false)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      !showOptimized 
                        ? 'bg-[#9333EA] text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Original
                  </button>
                  <button
                    onClick={() => setShowOptimized(true)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      showOptimized 
                        ? 'bg-[#35C687] text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Optimized
                  </button>
                </div>
              </div>
            </div>
            
            {/* Layout Selection */}
            {showOptimized && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Layout Style:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {layoutOptions.map((layout) => (
                    <motion.button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedLayout.id === layout.id
                          ? 'border-[#35C687] bg-[#35C687]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-medium text-gray-800 mb-2">{layout.name}</h4>
                      <p className="text-sm text-gray-600">{layout.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: !showOptimized ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative ${showOptimized ? 'lg:border-r lg:border-gray-200 lg:pr-6' : ''}`}
              >
                <div className={`p-6 bg-white rounded-lg border ${!showOptimized ? 'border-[#9333EA]' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Original Resume</h3>
                    <span className="text-sm text-gray-500">Before Optimization</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm max-h-[600px] overflow-y-auto">
                    {formatResumeText(originalResume)}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showOptimized ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className={`p-6 bg-white rounded-lg border ${showOptimized ? 'border-[#35C687]' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Optimized Resume</h3>
                    <span className="text-sm text-gray-500">After Optimization</span>
                  </div>
                  <div className={`bg-gray-50 p-4 rounded-lg text-sm max-h-[600px] overflow-y-auto ${selectedLayout.style.container}`}>
                    {formatResumeText(optimizedResume, true, selectedLayout)}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Changes Summary */}
            {highlightChanges && differences.length > 0 && (
              <motion.div 
                className="mt-8 p-6 bg-[#35C687]/10 rounded-lg border border-[#35C687]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-semibold text-[#35C687] mb-4">Key Improvements Made:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {differences.slice(0, 6).map((diff, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#35C687] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Line {diff.lineNumber}</p>
                          <p className="text-gray-700">{diff.optimized}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Download buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const resumeText = showOptimized ? optimizedResume : originalResume;
                  const blob = new Blob([resumeText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `resume_${showOptimized ? 'optimized' : 'original'}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-6 py-3 bg-[#9333EA] text-white rounded-lg font-medium hover:bg-[#6821A8] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download as Text
              </button>
              
              <button
                onClick={() => {
                  const resumeText = showOptimized ? optimizedResume : originalResume;
                  const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Resume</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 30px; line-height: 1.6; }
                        h1, h2, h3 { color: #333; }
                        .resume-container { ${selectedLayout.style.container} }
                        .resume-name { ${selectedLayout.style.name} }
                        .resume-contact { ${selectedLayout.style.contact} }
                        .resume-section { ${selectedLayout.style.section} }
                        .resume-bullet { ${selectedLayout.style.bullet} }
                      </style>
                    </head>
                    <body>
                      <div class="resume-container">
                        ${resumeText.replace(/\n/g, '<br>')}
                      </div>
                    </body>
                    </html>
                  `;
                  const blob = new Blob([htmlContent], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `resume_${showOptimized ? 'optimized' : 'original'}_${selectedLayout.id}.html`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-6 py-3 bg-[#35C687] text-white rounded-lg font-medium hover:bg-[#2DAD75] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download as HTML
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
} 