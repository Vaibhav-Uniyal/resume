'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import ResumeUpload from '../components/ResumeUpload';
import ATSDashboard from '../components/ATSDashboard';
import JobOptimization from '../components/JobOptimization';
import InterviewQuestions from '../components/InterviewQuestions';
import DownloadOptions from '../components/DownloadOptions';
import { useResumeContext } from '../context/ResumeContext';

enum Step {
  UPLOAD = 'upload',
  SCORE = 'score',
  OPTIMIZE = 'optimize',
  CHOOSE_NEXT = 'choose_next',
  INTERVIEW = 'interview',
  DOWNLOAD = 'download'
}

export default function ResumeScorePage() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.UPLOAD);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resumeText, setResumeText, originalText, setOriginalText } = useResumeContext();
  
  // Check for direct navigation to interview questions
  useEffect(() => {
    // If the query parameter indicates interview questions
    if (searchParams?.get('step') === 'interview') {
      // If we already have resume text saved, go straight to interview questions
      if (resumeText) {
        setCurrentStep(Step.INTERVIEW);
      } 
      // Otherwise, still show the upload screen but will auto-navigate to interview after
      else {
        setCurrentStep(Step.UPLOAD);
      }
    }
  }, [searchParams, resumeText]);

  const handleUpload = (text: string) => {
    setResumeText(text);
    setOriginalText(text);
    
    // If directly navigating to interview questions, skip to that step
    if (searchParams?.get('step') === 'interview') {
      setCurrentStep(Step.INTERVIEW);
    } else {
      setCurrentStep(Step.SCORE);
    }
  };

  const handleOptimizeClick = (score: number) => {
    setAtsScore(score);
    setCurrentStep(Step.OPTIMIZE);
  };

  const handleOptimizationComplete = () => {
    setCurrentStep(Step.CHOOSE_NEXT);
  };

  const handleInterviewPrepClick = () => {
    setCurrentStep(Step.INTERVIEW);
  };

  const handleDownloadClick = () => {
    setCurrentStep(Step.DOWNLOAD);
  };

  const handleBackToScore = () => {
    setCurrentStep(Step.SCORE);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      <main className="w-full pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 gradient-text flex justify-center items-center">
              {currentStep === Step.UPLOAD && searchParams?.get('step') === 'interview' && (
                <>
                  <Logo /> 
                  <span className="ml-2">Upload Your Resume for Interview Prep</span>
                </>
              )}
              {currentStep === Step.UPLOAD && !searchParams?.get('step') && (
                <>
                  <Logo /> 
                  <span className="ml-2">Upload Your Resume</span>
                </>
              )}
              {currentStep === Step.SCORE && "Your Resume ATS Score"}
              {currentStep === Step.OPTIMIZE && "Optimize Your Resume"}
              {currentStep === Step.CHOOSE_NEXT && "What's Next?"}
              {currentStep === Step.INTERVIEW && "Prepare for Your Interview"}
              {currentStep === Step.DOWNLOAD && "Download Your Optimized Resume"}
            </h1>

            {currentStep === Step.UPLOAD && (
              <ResumeUpload onUpload={handleUpload} />
            )}

            {currentStep === Step.SCORE && resumeText && (
              <ATSDashboard 
                resumeText={resumeText} 
                onContinue={() => handleOptimizeClick(70)} // Example score, your component might calculate this
              />
            )}

            {currentStep === Step.OPTIMIZE && resumeText && (
              <JobOptimization 
                resumeData={resumeText} 
                onOptimize={() => handleOptimizationComplete()} 
              />
            )}

            {currentStep === Step.CHOOSE_NEXT && (
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Your resume has been optimized! What would you like to do next?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    onClick={handleInterviewPrepClick}
                    className="px-6 py-3 bg-[#9333EA] text-white rounded-lg font-medium hover:bg-[#7C22CE] transition-all duration-300"
                  >
                    Prepare for Interviews
                  </button>
                  <button
                    onClick={handleDownloadClick}
                    className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            )}

            {currentStep === Step.INTERVIEW && resumeText && (
              <InterviewQuestions 
                resumeText={resumeText} 
                onBack={handleBackToScore}
                onContinue={handleDownloadClick}
              />
            )}

            {currentStep === Step.DOWNLOAD && resumeText && (
              <DownloadOptions 
                resumeText={resumeText} 
                onBack={() => setCurrentStep(Step.CHOOSE_NEXT)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 