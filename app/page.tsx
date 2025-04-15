'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './components/Logo';
import ResumeUpload from './components/ResumeUpload';
import ATSDashboard from './components/ATSDashboard';
import JobOptimization from './components/JobOptimization';
import InterviewQuestions from './components/InterviewQuestions';
import DownloadOptions from './components/DownloadOptions';
import JobRecommendations from './components/JobRecommendations';
import Navbar from './components/Navbar';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const steps = [
    { 
      number: 1, 
      title: 'Upload Resume',
      description: 'Upload your resume file or paste your resume text'
    },
    { 
      number: 2, 
      title: 'ATS Score', 
      description: 'Get your resume analyzed by ATS scanner'
    },
    { 
      number: 3, 
      title: 'Optimization',
      description: 'Receive AI suggestions to improve your resume'
    },
    { 
      number: 4, 
      title: 'Interview Prep',
      description: 'Practice with tailored interview questions'
    },
    { 
      number: 5, 
      title: 'Job Recommendations',
      description: 'Get personalized job recommendations'
    },
    { 
      number: 6, 
      title: 'Download',
      description: 'Download your optimized resume'
    }
  ];

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] animate-gradient-bg font-['Poppins']">
        <style jsx global>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-bg {
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            margin: 0;
            font-family: 'Poppins', sans-serif;
            color: white;
          }
          .gradient-text {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            background: linear-gradient(to right, #ff00cc, #3333ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-6xl font-bold gradient-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ResuMate
            </motion.h1>

            <motion.p
              className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Your AI-powered resume optimization companion. Get personalized
              feedback, improve your ATS score, and land your dream job.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-[#ff9f5a]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#ff9f5a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold gradient-text mb-2">ATS Score Analysis</h3>
                <p className="text-gray-300">
                  Get detailed insights on how well your resume matches job requirements
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-[#ff9f5a]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#ff9f5a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold gradient-text mb-2">Smart Optimization</h3>
                <p className="text-gray-300">
                  AI-powered suggestions to enhance your resume's impact
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-[#ff9f5a]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#ff9f5a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold gradient-text mb-2">Interview Prep</h3>
                <p className="text-gray-300">
                  Get tailored interview questions based on your experience
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                onClick={() => setStarted(true)}
                className="relative px-8 py-4 bg-[#ff9f5a] text-white rounded-full text-lg font-semibold
                          overflow-hidden transition-all duration-300 ease-out
                          hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:scale-105
                          before:absolute before:inset-0 before:bg-green-600
                          before:translate-x-[-100%] hover:before:translate-x-0
                          before:transition-transform before:duration-300
                          before:rounded-full before:z-[-1]"
              >
                <span className="relative z-10">Get Started</span>
              </button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] animate-gradient-bg font-['Poppins']">
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          color: white;
        }
        .gradient-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          background: linear-gradient(to right, #ff00cc, #3333ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Step indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s.number
                        ? 'bg-gradient-to-r from-[#ff9f5a] to-[#ff8c3b] text-white'
                        : 'bg-[#1a0745]/50 text-gray-400'
                    }`}
                  >
                    {s.number}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-300 mt-2">{s.title}</span>
                    <span className="text-xs text-gray-400 mt-1">{s.description}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-20 h-1 mx-2 bg-background-light/30">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-300"
                        style={{
                          width: step > s.number ? '100%' : '0%',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <ResumeUpload
                  onUpload={(data) => {
                    setResumeData(data);
                    setStep(2);
                  }}
                />
              )}
              {step === 2 && resumeData && (
                <ATSDashboard
                  resumeText={resumeData}
                  onContinue={() => setStep(3)}
                />
              )}
              {step === 3 && resumeData && (
                <JobOptimization
                  resumeData={resumeData}
                  onOptimize={(score) => {
                    setAtsScore(score);
                    setStep(4);
                  }}
                />
              )}
              {step === 4 && resumeData && atsScore !== null && (
                <InterviewQuestions
                  resumeText={resumeData}
                  onBack={() => setStep(3)}
                  onContinue={() => setStep(5)}
                />
              )}
              {step === 5 && resumeData && (
                <JobRecommendations
                  resumeText={resumeData}
                  onBack={() => setStep(4)}
                  onContinue={() => setStep(6)}
                />
              )}
              {step === 6 && resumeData && (
                <DownloadOptions
                  resumeText={resumeData}
                  onBack={() => setStep(5)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
} 