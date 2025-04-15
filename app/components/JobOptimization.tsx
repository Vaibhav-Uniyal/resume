'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeResumeForJob } from '../utils/aiService';

interface JobOptimizationProps {
  resumeData: string;
  onOptimize: (score: number) => void;
}

export default function JobOptimization({ resumeData, onOptimize }: JobOptimizationProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimizedResume, setOptimizedResume] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleOptimize = async () => {
    if (!jobTitle || !jobDescription) {
      setError('Please fill in both job title and description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await optimizeResumeForJob({
        resumeText: resumeData,
        jobTitle,
        jobDescription,
      });

      setOptimizedResume(result.optimizedResume);
      setShowPreview(true);
      onOptimize(result.score);
    } catch (err) {
      setError('Failed to optimize resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-text">Job-Specific Optimization</h2>
        <p className="text-content-muted mt-2">
          Enter the job details to optimize your resume for this specific position
        </p>
      </div>

      <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-content-primary mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2 bg-background-light/5 border border-background-light/20 
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-content-primary mb-2">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 bg-background-light/5 border border-background-light/20 
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste the full job description here..."
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="px-8 py-3 bg-gradient-primary text-white rounded-full
                     hover:shadow-button transform hover:scale-105 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Optimizing...</span>
              </div>
            ) : (
              'Optimize for Job'
            )}
          </button>
        </div>
      </div>

      {showPreview && optimizedResume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold">Preview of Optimized Resume</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">Original Resume</h4>
              <div className="bg-background-light/5 rounded-lg p-4 h-96 overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">{resumeData}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Optimized Resume</h4>
              <div className="bg-background-light/5 rounded-lg p-4 h-96 overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">{optimizedResume}</pre>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-2 bg-background-light/20 text-white rounded-full
                       hover:bg-background-light/30 transition-all duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => onOptimize(85)} // Replace with actual score
              className="px-6 py-2 bg-gradient-primary text-white rounded-full
                       hover:shadow-button transform hover:scale-105 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 