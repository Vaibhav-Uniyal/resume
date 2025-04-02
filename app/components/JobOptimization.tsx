'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JobOptimizationProps {
  resumeData: string;
  onOptimize: (score: number) => void;
}

export default function JobOptimization({ resumeData, onOptimize }: JobOptimizationProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    setIsLoading(true);
    // Simulate API call - replace with actual OpenAI API call
    setTimeout(() => {
      setIsLoading(false);
      onOptimize(85); // Simulated ATS score
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card p-6 space-y-6"
    >
      <h2 className="text-2xl font-display font-bold gradient-text mb-4">
        Job-Specific Optimization
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-gray-200 font-medium mb-2">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter the job title you're applying for..."
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-gray-200 font-medium mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={6}
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleOptimize}
          disabled={isLoading || !jobTitle || !jobDescription}
          className={`btn-primary flex items-center space-x-2 ${
            isLoading || !jobTitle || !jobDescription
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105'
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Optimizing...</span>
            </>
          ) : (
            <>
              <span>Optimize for Job</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
} 