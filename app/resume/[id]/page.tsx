'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import JobRecommendations from '../../components/JobRecommendations';
import FlippingResume from '../../components/FlippingResume';

interface Resume {
  id: string;
  title: string;
  atsScore?: number;
  lastUpdated: string;
  originalResume: string;
  optimizedResume?: string;
}

export default function ResumePage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'flipping'>('standard');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        // In a real implementation, this would be a fetch to your backend API
        // For now, we're simulating it with localStorage
        const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        const foundResume = savedResumes.find((r: Resume) => r.id === params.id);
        
        if (foundResume) {
          setResume(foundResume);
        } else {
          setError('Resume not found');
        }
      } catch (err) {
        setError('Failed to load resume');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
        <Navbar />
        <main className="w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
        <Navbar />
        <main className="w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-lg p-6 rounded-xl border border-[#EBD5FF] text-center">
              <h2 className="text-2xl font-bold text-[#6821A8] mb-4">{error || 'Resume not found'}</h2>
              <p className="text-gray-600 mb-6">The resume you are looking for could not be found.</p>
              <Link href="/" className="btn-primary">
                Return to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      <main className="w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#6821A8]">{resume.title}</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('standard')} 
                className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'standard' 
                  ? 'bg-[#9333EA] text-white' 
                  : 'bg-white text-[#9333EA] border border-[#9333EA]'}`}
              >
                Standard View
              </button>
              <button 
                onClick={() => setViewMode('flipping')} 
                className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'flipping' 
                  ? 'bg-[#9333EA] text-white' 
                  : 'bg-white text-[#9333EA] border border-[#9333EA]'}`}
              >
                3D View
              </button>
            </div>
          </div>

          {viewMode === 'standard' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white shadow-lg p-6 rounded-xl border border-[#EBD5FF]">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#6821A8]">Resume Details</h2>
                    {resume.atsScore !== undefined && (
                      <div className="flex items-center">
                        <div className="bg-[#9333EA] text-white rounded-full h-12 w-12 flex items-center justify-center mr-2 font-bold">
                          {resume.atsScore}%
                        </div>
                        <span className="text-sm text-gray-600">ATS Score</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Last Updated: {new Date(resume.lastUpdated).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#6821A8] mb-2">Resume Content</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                        {resume.originalResume}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <JobRecommendations 
                  resumeText={resume.originalResume} 
                  onBack={() => {}} 
                  onContinue={() => {}}
                />
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <FlippingResume 
                resumeContent={resume.originalResume} 
                title={resume.title} 
              />
              <div className="mt-8">
                <JobRecommendations 
                  resumeText={resume.originalResume} 
                  onBack={() => {}} 
                  onContinue={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}