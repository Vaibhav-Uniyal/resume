'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chip } from '@mui/material';

interface ATSDashboardProps {
  resumeText: string;
  onContinue: () => void;
}

export default function ATSDashboard({ resumeText, onContinue }: ATSDashboardProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const analyzeResume = async () => {
      setLoading(true);
      try {
        // Mock analysis - replace with actual analysis logic
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock analysis results
        const mockScore = Math.floor(Math.random() * 30) + 70; // Score between 70-100
        const mockKeywords = [
          'React', 'TypeScript', 'Node.js', 'API Development',
          'Project Management', 'Team Leadership', 'Agile',
          'Problem Solving', 'Communication'
        ];
        const mockSuggestions = [
          'Add more quantifiable achievements to highlight impact',
          'Include specific technologies and versions used in projects',
          'Enhance description of leadership experiences',
          'Add certifications and professional development activities',
          'Improve formatting for better ATS readability'
        ];

        setScore(mockScore);
        setKeywords(mockKeywords);
        setSuggestions(mockSuggestions);
      } catch (error) {
        console.error('Error analyzing resume:', error);
      } finally {
        setLoading(false);
      }
    };

    analyzeResume();
  }, [resumeText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-text">ATS Score Analysis</h2>
        <p className="text-content-muted mt-2">
          Here's how your resume performs against Applicant Tracking Systems
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-content-muted">Analyzing your resume...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      strokeDasharray={`${(score || 0) * 3.64} 364`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{score}</div>
                      <div className="text-sm text-content-muted">ATS Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Detected Keywords</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Suggestions for Improvement</h3>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span className="text-content-muted">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-gradient-primary text-white rounded-full
                       hover:shadow-button transform hover:scale-105 transition-all duration-300"
            >
              Continue to Optimization
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
} 