'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface JobOptimizationProps {
  resumeData: string;
  onOptimize: (score: number, optimizedResume: string) => void;
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
      console.log('Starting resume optimization with data:', {
        resumeLength: resumeData.length,
        jobTitle,
        jobDescriptionLength: jobDescription.length
      });
      
      const response = await fetch('/api/optimize-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeData,
          jobTitle,
          jobDescription,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to optimize resume');
      }
      
      const result = await response.json();

      console.log('Optimization successful, received data:', {
        responseLength: result.optimizedResume.length,
        score: result.score
      });
      
      // Always set the optimized resume and show preview regardless of content
      setOptimizedResume(result.optimizedResume);
      setShowPreview(true);
      onOptimize(result.score, result.optimizedResume);
    } catch (err) {
      console.error('Optimization error details:', err);
      setError('Failed to optimize resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 w-full"
    >
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-text">Job-Specific Optimization</h2>
        <p className="text-sm sm:text-base text-content-muted mt-2">
          Enter the job details to optimize your resume for this specific position
        </p>
      </div>

      <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-6">
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
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-primary text-white rounded-full
                     hover:shadow-button transform hover:scale-105 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
          className="bg-background-light/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold">Preview of Optimized Resume</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-2">Original Resume</h4>
              <div className="bg-background-light/5 rounded-lg p-3 sm:p-4 h-64 sm:h-96 overflow-auto">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap">{resumeData}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-2">Optimized Resume</h4>
              <div className="bg-background-light/5 rounded-lg p-3 sm:p-4 h-64 sm:h-96 overflow-auto">
                <div className="text-xs sm:text-sm prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {optimizedResume}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:space-x-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 sm:px-6 py-2 bg-background-light/20 text-white rounded-full
                       hover:bg-background-light/30 transition-all duration-300 text-sm sm:text-base"
            >
              Edit
            </button>
            <button
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([optimizedResume], {type: 'text/markdown'});
                element.href = URL.createObjectURL(file);
                element.download = `optimized_resume_${new Date().toISOString().slice(0,10)}.md`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="px-4 sm:px-6 py-2 bg-background-light/20 text-white rounded-full
                       hover:bg-background-light/30 transition-all duration-300 text-sm sm:text-base"
            >
              Download
            </button>
            <button
              onClick={() => onOptimize(85, optimizedResume || '')}
              className="px-4 sm:px-6 py-2 bg-gradient-primary text-white rounded-full
                       hover:shadow-button transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 