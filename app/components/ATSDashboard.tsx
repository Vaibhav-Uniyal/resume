'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useSkillsContext } from '../context/SkillsContext';
import SkillBasedJobRecommendations from './SkillBasedJobRecommendations';

interface ATSDashboardProps {
  resumeText: string;
  onContinue: () => void;
}

export default function ATSDashboard({ resumeText, onContinue }: ATSDashboardProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const { setSkills } = useSkillsContext();

  useEffect(() => {
    const analyzeResume = async () => {
      setLoading(true);
      try {
        // Call the API route for analysis
        const formData = new FormData();
        formData.append('text', resumeText);
        
        const response = await fetch('/api/resume', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        
        const analysisResult = await response.json();
        
        // Update state with the analysis results
        setScore(analysisResult.atsScore);
        setKeywords(analysisResult.keywords || []);
        setSuggestions(analysisResult.suggestions || []);
        setStrengths(analysisResult.strengths || []);
        setWeaknesses(analysisResult.weaknesses || []);
        
        // Save keywords (skills) to global context
        setSkills(analysisResult.keywords || []);
      } catch (error) {
        console.error('Error analyzing resume:', error);
        // Set fallback values in case of error
        setScore(70);
        setKeywords(['Error processing resume']);
        setSuggestions(['An error occurred while analyzing the resume. Please try again.']);
        setStrengths(['Could not analyze strengths']);
        setWeaknesses(['Could not analyze weaknesses']);
      } finally {
        setLoading(false);
      }
    };

    analyzeResume();
  }, [resumeText, setSkills]);

  // Calculate the circumference of the circle
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on the score
  const dashOffset = ((100 - (score || 0)) / 100) * circumference;

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
          AI-powered analysis of your resume's ATS compatibility
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-content-muted">Analyzing your resume with AI...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
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
                
                <h3 className="text-xl font-semibold mb-4">Key Strengths</h3>
                <ul className="space-y-2 mb-6">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-4">Areas for Improvement</h3>
                <ul className="space-y-2 mb-6">
                  {weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-yellow-400">⚠</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span className="text-black">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Job Recommendations Section */}
          <div className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Job Recommendations</h3>
            <p className="text-content-muted text-center mb-6">
              Based on your skills, here are personalized job recommendations with real opportunities
            </p>
            <SkillBasedJobRecommendations />
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