'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';
import SkillBasedJobRecommendations from './SkillBasedJobRecommendations';

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
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

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
              
              {job.hasRealJobs && (
                <div className="pt-4 border-t border-purple-500/20">
                  <button
                    onClick={() => setExpandedJob(expandedJob === job.title ? null : job.title)}
                    className="w-full px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg
                             hover:bg-purple-500/30 transition-colors duration-200 text-sm"
                  >
                    {expandedJob === job.title ? 'Hide' : 'Show'} Real Jobs ({job.realJobsCount})
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real Jobs Display */}
      {expandedJob && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          <h3 className="text-xl font-semibold text-white">
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
                  className="bg-[#1a0745]/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-medium text-white">{realJob.title}</h4>
                      <p className="text-purple-300">{realJob.company}</p>
                      <p className="text-gray-400 text-sm">{realJob.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-medium">{realJob.salary}</p>
                      <p className="text-gray-400 text-xs">{realJob.postedDate}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{realJob.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {realJob.contractType}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {realJob.category}
                      </span>
                    </div>
                    <a
                      href={realJob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                    >
                      Apply
                    </a>
                  </div>
                </motion.div>
                ))}
            </div>
          ) : (
            <div className="bg-[#1a0745]/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20 text-center">
              <p className="text-gray-300 mb-2">No real jobs found from Adzuna API</p>
              <p className="text-sm text-gray-400">Use the search links below to find jobs on major job boards</p>
            </div>
          )}
          
          {/* Search Links */}
          {recommendations.find(rec => rec.title === expandedJob)?.searchUrls && (
            <div className="bg-[#1a0745]/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
              <h4 className="text-white font-medium mb-3">Search More Jobs:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(recommendations.find(rec => rec.title === expandedJob)?.searchUrls || {}).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded text-sm hover:bg-purple-500/30 transition-colors text-center capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
        </>
      )}
    </motion.div>
  );
} 