'use client';

import { useState, useEffect } from 'react';

interface ResumeEntry {
  id: string;
  title: string;
  role: string;
  atsScore: number;
  date: string;
  originalResume: string;
  optimizedResume: string;
}

export default function ResumeHistory() {
  const [resumes, setResumes] = useState<ResumeEntry[]>([]);

  useEffect(() => {
    // Load resumes from localStorage
    const savedResumes = localStorage.getItem('resumeHistory');
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
  }, []);

  const handleView = (resume: ResumeEntry) => {
    // Implement view logic
    console.log('Viewing resume:', resume);
  };

  const handleDownload = (resume: ResumeEntry) => {
    const element = document.createElement('a');
    const file = new Blob([resume.optimizedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resume.title.toLowerCase().replace(/\s+/g, '_')}_optimized.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleOptimizeAgain = (resume: ResumeEntry) => {
    // Implement optimize again logic
    console.log('Optimizing resume again:', resume);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold mb-6">Resume History</h2>
      
      {resumes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No resumes found. Upload a resume to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{resume.title}</h3>
                  <p className="text-gray-600">{resume.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    ATS Score: {resume.atsScore}%
                  </p>
                  <p className="text-sm text-gray-500">{resume.date}</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleView(resume)}
                  className="btn-secondary"
                >
                  View
                </button>
                <button
                  onClick={() => handleDownload(resume)}
                  className="btn-secondary"
                >
                  Download
                </button>
                <button
                  onClick={() => handleOptimizeAgain(resume)}
                  className="btn-primary"
                >
                  Optimize Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 