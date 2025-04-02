'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './components/Logo';
import ResumeUpload from './components/ResumeUpload';
import JobOptimization from './components/JobOptimization';
import ComparisonView from './components/ComparisonView';
import Navbar from './components/Navbar';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const steps = [
    { number: 1, title: 'Upload Resume' },
    { number: 2, title: 'Job Details' },
    { number: 3, title: 'Review & Compare' },
  ];

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a4f] via-[#1e1b4b] to-[#2d1b69]">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <Logo size="large" />
            </div>
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white rounded-full 
                         text-lg font-semibold hover:from-[#6366f1] hover:to-[#8b5cf6] 
                         transform hover:scale-105 transition-all duration-300
                         shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a4f] via-[#1e1b4b] to-[#2d1b69]">
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
                        ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white'
                        : 'bg-[#2d1b69]/30 text-gray-400'
                    }`}
                  >
                    {s.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-20 h-1 mx-2 bg-[#2d1b69]/30">
                      <div
                        className="h-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] transition-all duration-300"
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
              <JobOptimization
                resumeData={resumeData}
                onOptimize={(score) => {
                  setAtsScore(score);
                  setStep(3);
                }}
              />
            )}
            {step === 3 && resumeData && atsScore !== null && (
              <ComparisonView
                originalResume={resumeData}
                atsScore={atsScore}
                onBack={() => setStep(2)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
} 