'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';
import SkillBasedJobRecommendations from './SkillBasedJobRecommendations';

interface JobRecommendation {
  title: string;
  industry: string;
  requiredSkills: string[];
  experienceLevel: string;
  description: string;
  matchReason: string;
}

interface JobRecommendationsProps {
  resumeText: string;
  onBack: () => void;
  onContinue: () => void;
}

export default function JobRecommendations({ resumeText, onBack, onContinue }: JobRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'resume-based' | 'skill-based'>('skill-based');

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      console.log("Requesting job recommendations for resume...");
      const response = await fetch('/api/jobs/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`Failed to get recommendations: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received recommendations:", data);
      
      if (!data.recommendations || !Array.isArray(data.recommendations) || data.recommendations.length === 0) {
        console.warn("No recommendations returned from API");
        setError('No job recommendations found for this resume. Please try again.');
        setRecommendations([]);
      } else {
      setRecommendations(data.recommendations);
      }
    } catch (err) {
      setError('Failed to get job recommendations. Please try again.');
      console.error('Error:', err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Job Recommendations</h2>
        <div className="flex space-x-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-purple-500/20 text-white rounded-lg font-medium
                     hover:bg-purple-500/30 transition-all duration-300"
          >
            Back to Interview Prep
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium
                     hover:bg-purple-600 transition-all duration-300"
          >
            Continue to Download
          </button>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-purple-500/10 rounded-lg p-1">
        <div className="flex">
          <button
            onClick={() => setActiveTab('skill-based')}
            className={`px-4 py-2 rounded-md font-medium flex-1 transition-all duration-200 ${
              activeTab === 'skill-based'
                ? 'bg-purple-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            AI Skill Matching
          </button>
          <button
            onClick={() => setActiveTab('resume-based')}
            className={`px-4 py-2 rounded-md font-medium flex-1 transition-all duration-200 ${
              activeTab === 'resume-based'
                ? 'bg-purple-500 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Full Resume Analysis
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'skill-based' ? (
        <SkillBasedJobRecommendations />
      ) : (
        <>
      <div className="flex justify-center">
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium
                   hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300"
        >
              {loading ? <Loader size="24" color="white" /> : 'Analyze Full Resume'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {recommendations.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a0745]/50 backdrop-blur-sm p-6 rounded-xl border border-[#3d1c8f] 
                     shadow-xl hover:shadow-lg transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-purple-300">{job.industry}</p>
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {job.experienceLevel}
                </span>
              </div>

              <p className="text-gray-300">{job.description}</p>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 text-[#9333EA] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <h4 className="text-white font-medium mb-2">Why This Job Matches You:</h4>
                <p className="text-gray-300">{job.matchReason}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
        </>
      )}
    </motion.div>
  );
} 