'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillsContext } from '../context/SkillsContext';
import Loader from './Loader';

interface JobRecommendation {
  title: string;
  industry: string;
  requiredSkills: string[];
  experienceLevel: string;
  description: string;
  matchReason: string;
}

export default function SkillBasedJobRecommendations() {
  const { skills } = useSkillsContext();
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    if (!skills || skills.length === 0) {
      setError('No skills found. Please complete ATS analysis first.');
      return;
    }
    console.log('skills', skills);
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/jobs/skill-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills }),
        
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError('Failed to get job recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch recommendations if skills are available
  useEffect(() => {
    if (skills && skills.length > 0) {
      getRecommendations();
    }
  }, [skills]);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-text">
          Job Recommendations Based on Your Skills
        </h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-content-muted">
            Based on {skills?.length || 0} skills
          </span>
          <button
            onClick={getRecommendations}
            disabled={loading || !skills || skills.length === 0}
            className="px-4 py-2 bg-[#9333EA] text-white rounded-lg text-sm
                     hover:bg-[#6821A8] disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-[#9333EA]/10 text-[#9333EA] text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader size="32" color="#9333EA" />
          <p className="mt-4 text-content-muted">Finding the perfect jobs for your skills...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {recommendations.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-light/10 backdrop-blur-sm p-6 rounded-xl 
                       border border-[#9333EA]/20 shadow-lg hover:shadow-xl
                       transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-content">{job.title}</h3>
                    <p className="text-[#9333EA]">{job.industry}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#9333EA]/10 text-[#9333EA] rounded-full text-sm">
                    {job.experienceLevel}
                  </span>
                </div>

                <p className="text-content-muted">{job.description}</p>

                <div className="space-y-2">
                  <h4 className="text-content font-medium">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm ${
                          skills.includes(skill)
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-[#9333EA]/10 text-[#9333EA]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#9333EA]/10">
                  <h4 className="text-content font-medium mb-2">Why This Job Matches You:</h4>
                  <p className="text-content-muted">{job.matchReason}</p>
                </div>
                
                <button 
                  className="w-full mt-4 px-4 py-2 bg-[#9333EA] text-white rounded-lg
                           hover:bg-[#6821A8] transition-colors duration-200"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {!loading && recommendations.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg className="w-16 h-16 text-[#9333EA]/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-content">No Recommendations Yet</h3>
          <p className="text-content-muted mt-2 max-w-md">
            Complete the ATS analysis of your resume to get personalized job recommendations based on your skills.
          </p>
        </div>
      )}
    </div>
  );
} 