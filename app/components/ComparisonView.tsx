'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ComparisonViewProps {
  resumeData: {
    original: string;
    optimized: string;
    fileName: string;
  };
  atsScore: number;
  onBack: () => void;
}

export default function ComparisonView({ resumeData, atsScore, onBack }: ComparisonViewProps) {
  const [activeTab, setActiveTab] = useState<'original' | 'optimized'>('original');

  const downloadResume = (content: string, isOptimized: boolean) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.fileName.replace(/\.[^/.]+$/, '')}_${
      isOptimized ? 'optimized' : 'original'
    }.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Resume Comparison</h2>
          <p className="text-gray-600">Review your optimized resume</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{atsScore}%</div>
            <div className="text-sm text-gray-600">ATS Score</div>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Optimization
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('original')}
              className={`${
                activeTab === 'original'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Original Version
            </button>
            <button
              onClick={() => setActiveTab('optimized')}
              className={`${
                activeTab === 'optimized'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Optimized Version
            </button>
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="prose max-w-none"
            >
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {activeTab === 'original' ? resumeData.original : resumeData.optimized}
              </pre>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => downloadResume(
                activeTab === 'original' ? resumeData.original : resumeData.optimized,
                activeTab === 'optimized'
              )}
              className="btn-primary"
            >
              Download {activeTab === 'original' ? 'Original' : 'Optimized'} Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 