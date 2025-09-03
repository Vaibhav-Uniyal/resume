'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillsContext } from '../context/SkillsContext';
import Loader from './Loader';

interface RealJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  url: string;
  postedDate: string;
  contractType: string;
  category: string;
  source: string;
}

interface SearchUrls {
  linkedin: string;
  indeed: string;
  glassdoor: string;
  ziprecruiter: string;
}

interface JobRecommendation {
  title: string;
  industry: string;
  requiredSkills: string[];
  experienceLevel: string;
  description: string;
  matchReason: string;
  realJobs?: RealJob[];
  searchUrls?: SearchUrls;
  realJobsCount?: number;
  hasRealJobs?: boolean;
}

export default function SkillBasedJobRecommendations() {
  const { skills } = useSkillsContext();
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

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
                
                <div className="flex flex-col space-y-2 mt-4">
                  <button 
                    className="w-full px-4 py-2 bg-[#9333EA] text-white rounded-lg
                             hover:bg-[#6821A8] transition-colors duration-200"
                  >
                    Apply Now
                  </button>
                  
                  {job.hasRealJobs && (
                    <button
                      onClick={() => setExpandedJob(expandedJob === job.title ? null : job.title)}
                      className="w-full px-4 py-2 bg-[#9333EA]/20 text-[#9333EA] rounded-lg
                               hover:bg-[#9333EA]/30 transition-colors duration-200 text-sm"
                    >
                      {expandedJob === job.title ? 'Hide' : 'Show'} Real Jobs ({job.realJobsCount})
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Real Jobs Display */}
      {expandedJob && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          <h3 className="text-xl font-semibold text-content">
            Real Jobs for "{expandedJob}" 
            {recommendations.find(rec => rec.title === expandedJob)?.realJobsCount && 
              ` (${recommendations.find(rec => rec.title === expandedJob)?.realJobsCount} found)`
            }
          </h3>
          
          {recommendations.find(rec => rec.title === expandedJob)?.realJobs?.length > 0 ? (
            <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
              {recommendations
                .find(rec => rec.title === expandedJob)
                ?.realJobs?.map((realJob, index) => (
                <motion.div
                  key={realJob.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background-light/5 backdrop-blur-sm p-4 rounded-lg border border-[#9333EA]/20"
                >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-medium text-content">{realJob.title}</h4>
                    <p className="text-[#9333EA]">{realJob.company}</p>
                    <p className="text-content-muted text-sm">{realJob.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-medium">{realJob.salary}</p>
                    <p className="text-content-muted text-xs">{realJob.postedDate}</p>
                  </div>
                </div>
                
                <p className="text-content-muted text-sm mb-3">{realJob.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-[#9333EA]/10 text-[#9333EA] rounded text-xs">
                      {realJob.contractType}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs">
                      {realJob.category}
                    </span>
                  </div>
                  <a
                    href={realJob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#9333EA] text-white rounded text-sm hover:bg-[#6821A8] transition-colors"
                  >
                    Apply
                  </a>
                </div>
                </motion.div>
                ))}
            </div>
          ) : (
            <div className="bg-background-light/5 backdrop-blur-sm p-4 rounded-lg border border-[#9333EA]/20 text-center">
              <p className="text-content-muted mb-2">No real jobs found from Adzuna API</p>
              <p className="text-sm text-content-muted">Use the search links below to find jobs on major job boards</p>
            </div>
          )}
          
          {/* Search Links */}
          {recommendations.find(rec => rec.title === expandedJob)?.searchUrls && (
            <div className="bg-background-light/5 backdrop-blur-sm p-4 rounded-lg border border-[#9333EA]/20">
              <h4 className="text-content font-medium mb-3">Search More Jobs:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(recommendations.find(rec => rec.title === expandedJob)?.searchUrls || {}).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-[#9333EA]/10 text-[#9333EA] rounded text-sm hover:bg-[#9333EA]/20 transition-colors text-center capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
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