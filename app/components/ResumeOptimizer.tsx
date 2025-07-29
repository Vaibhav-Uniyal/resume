'use client';

import React, { useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';

interface ResumeOptimizerProps {
  jobDescription?: string;
}

const ResumeOptimizer: React.FC<ResumeOptimizerProps> = ({ jobDescription = '' }) => {
  const { resumeText, setResumeText, originalText } = useResumeContext();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDescText, setJobDescText] = useState(jobDescription);

  // Function to optimize the resume based on job description
  const optimizeResume = async () => {
    if (!originalText || !originalText.trim()) {
      setError('Please upload a resume first before optimizing');
      return;
    }

    if (!jobDescText || !jobDescText.trim()) {
      setError('Please enter a job description for better optimization');
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      // Here you would call your API to optimize the resume
      // For now we'll just simulate the API call with a timeout
      console.log("Optimizing resume with job description:", jobDescText.substring(0, 100) + "...");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demonstration, just append "Optimized" to the text
      // In a real implementation, you would replace this with your actual optimization logic
      const optimizedText = `${originalText}\n\nOptimized for the job based on AI analysis.`;
      
      // Update the resume text in context
      setResumeText(optimizedText);
      
      console.log("Resume optimization complete");
    } catch (error) {
      console.error("Error optimizing resume:", error);
      setError(error instanceof Error ? error.message : "Failed to optimize resume");
    } finally {
      setIsOptimizing(false);
    }
  };

  const resetToOriginal = () => {
    if (originalText) {
      setResumeText(originalText);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Resume Optimizer</h2>
      
      {error && (
        <div className="bg-red-800/30 border border-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescText}
            onChange={(e) => setJobDescText(e.target.value)}
            placeholder="Paste the job description here for better optimization..."
            className="w-full h-32 sm:h-40 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={optimizeResume}
            disabled={isOptimizing || !originalText || !jobDescText.trim()}
            className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm sm:text-base
                     hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
          >
            {isOptimizing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Optimizing...</span>
              </div>
            ) : (
              "Optimize Resume"
            )}
          </button>
          
          <button
            onClick={resetToOriginal}
            disabled={!originalText || originalText === resumeText}
            className="px-4 sm:px-6 py-2 bg-gray-700 text-white rounded-lg font-medium text-sm sm:text-base
                     hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
          >
            Reset to Original
          </button>
        </div>
      </div>
      
      {resumeText && (
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-2">Resume Preview</h3>
          <div className="p-3 sm:p-4 bg-gray-800 border border-gray-700 rounded-xl max-h-60 sm:max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-300">{resumeText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeOptimizer; 