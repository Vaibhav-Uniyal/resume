'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Logo from './components/Logo';
import ResumeUpload from './components/ResumeUpload';
import ATSDashboard from './components/ATSDashboard';
import JobOptimization from './components/JobOptimization';
import InterviewQuestions from './components/InterviewQuestions';
import DownloadOptions from './components/DownloadOptions';
import JobRecommendations from './components/JobRecommendations';
import Navbar from './components/Navbar';
import RevolvingResume from './components/RevolvingResume';
import AnimatedHeadline from './components/AnimatedHeadline';
import './components/animations.css'; // Import the animations CSS
import ResumePreview from './components/ResumePreview';
import { Container } from './components/Container';
import ATSScoreSimulator from './components/ATSScoreSimulator';

// Define interfaces for resume data types
interface ResumeObject {
  originalResume: string;
  optimizedResume: string;
}

type ResumeData = string | ResumeObject;

// Add creative animation variants
const creativeCardVariants = {
  initial: { 
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  tap: { 
    rotateX: -15,
    rotateY: -15,
    scale: 0.95,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const creativeButtonVariants = {
  initial: { 
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    rotateX: 10,
    rotateY: 10,
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  tap: { 
    rotateX: -20,
    rotateY: -20,
    scale: 0.9,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};

const featureCardVariants = {
  initial: { 
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  tap: { 
    rotateX: -10,
    rotateY: -10,
    scale: 0.98,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

// Add decorative elements and enhanced styles
const decorativeElements = {
  background: {
    gradient: "bg-gradient-to-br from-[#FAF5FF] via-white to-[#F4E8FF]",
    pattern: "bg-[url('/pattern.svg')] bg-repeat opacity-10",
  },
  shapes: {
    blob: "absolute w-96 h-96 bg-[#9333EA]/10 rounded-full filter blur-3xl",
    circle: "absolute w-64 h-64 bg-[#35C687]/10 rounded-full filter blur-2xl",
  },
};

// Add floating animation variants
const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Add statistics data
const statistics = [
  { number: "98%", label: "ATS Score Improvement", icon: "📈" },
  { number: "10k+", label: "Resumes Created", icon: "📝" },
  { number: "85%", label: "Interview Success Rate", icon: "🎯" },
  { number: "24/7", label: "AI Support", icon: "🤖" }
];

// Add process steps
const processSteps = [
  {
    title: "Upload",
    description: "Upload your existing resume or start from scratch",
    icon: "📤"
  },
  {
    title: "Analyze",
    description: "Get instant ATS score and improvement suggestions",
    icon: "🔍"
  },
  {
    title: "Optimize",
    description: "AI-powered optimization for maximum impact",
    icon: "⚡"
  },
  {
    title: "Download",
    description: "Download in multiple formats and share instantly",
    icon: "📥"
  }
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  useEffect(() => {
    // Check if user just logged in
    if (searchParams?.get('login') === 'success') {
      setShowLoginMessage(true);
      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowLoginMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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

  // For animation repeats
  const handleRepeat = (className: string) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.classList.remove(className);
      // Trigger reflow (using type assertion since TypeScript doesn't recognize offsetWidth on generic Element)
      void (element as HTMLElement).offsetWidth;
      element.classList.add(className);
    }
  };

  // Helper function to safely access resume text
  const getOriginalResumeText = (): string => {
    if (!resumeData) return '';
    if (typeof resumeData === 'string') return resumeData;
    return resumeData.originalResume;
  };
  
  const getOptimizedResumeText = (): string => {
    if (!resumeData) return '';
    if (typeof resumeData === 'string') return resumeData;
    return resumeData.optimizedResume;
  };
  
  const isResumeObject = (): boolean => {
    return resumeData !== null && typeof resumeData !== 'string';
  };

  if (!started) {
    return (
      <div className={`min-h-screen w-full ${decorativeElements.background.gradient} font-['Poppins'] relative overflow-hidden`}>
        {/* Decorative Background Elements */}
        <div className={`absolute inset-0 ${decorativeElements.background.pattern}`}></div>
        <div className={`${decorativeElements.shapes.blob} -top-48 -right-48`}></div>
        <div className={`${decorativeElements.shapes.blob} -bottom-48 -left-48`}></div>
        <div className={`${decorativeElements.shapes.circle} top-1/4 left-1/4`}></div>
        <div className={`${decorativeElements.shapes.circle} bottom-1/4 right-1/4`}></div>

        <Navbar />
        
        {/* Login success message */}
        {showLoginMessage && (
          <div className="fixed top-20 right-4 z-50 bg-green-900/70 text-green-100 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-green-700/50 animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Logged in successfully! Welcome{session?.user?.name ? `, ${session.user.name}` : ''}!</span>
            </div>
          </div>
        )}
        
        <main className="w-full pt-24 pb-12 relative z-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section with Enhanced Visuals */}
            <div className="flex flex-col lg:flex-row items-center mb-20">
              <div className="w-full lg:w-1/2 text-left mb-10 lg:mb-0 lg:pr-12 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                    <Logo size="large" />
                    <span className="text-[#9333EA] ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#6821A8]">
                      Resume Builder
                    </span>
                  </h1>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
                    helps you get hired at top companies
                  </h2>

                  <div className="flex flex-wrap gap-4 mb-12">
                    <motion.button
                      onClick={() => setStarted(true)}
                      className="px-6 py-3 bg-gradient-to-r from-[#35C687] to-[#2DAD75] text-white rounded-lg text-base sm:text-lg font-semibold
                              hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Build Your Resume</span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </motion.button>
                    <motion.button
                      onClick={() => router.push('/resume-score')}
                      className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg text-base sm:text-lg font-semibold
                              hover:bg-gray-50 shadow-sm transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Get Your Resume Score</span>
                      <div className="absolute inset-0 bg-gray-100/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </motion.button>
                  </div>
                  
                  {/* Trusted by logos with enhanced styling */}
                  <div className="mb-12">
                    <p className="text-xl text-gray-700 mb-3">Loved by</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <motion.div 
                        className="text-l text-gray-700 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Students
                      </motion.div>
                      <motion.div 
                        className="text-l text-gray-700 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        Recruiters
                      </motion.div>
                      <motion.div 
                        className="text-l text-gray-700 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L12 14.197l-4.418 2.617A1 1 0 016 16V4z" clipRule="evenodd" />
                        </svg>
                        Companies
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Column: 3D Resume with enhanced styling */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <motion.div 
                  className="w-full max-w-md relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#9333EA]/20 to-[#35C687]/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                    <RevolvingResume />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Feature Cards with Enhanced Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-12">
              {[
                {
                  icon: <rect width="18" height="18" x="3" y="3" rx="2" />,
                  title: "ATS Score Analysis",
                  description: "Get detailed insights on how well your resume matches job requirements"
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  title: "Smart Optimization",
                  description: "AI-powered suggestions to enhance your resume's impact"
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  title: "Interview Prep",
                  description: "Get tailored interview questions based on your experience"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white shadow-lg p-6 rounded-xl border border-[#C384FC]/20 relative overflow-hidden group"
                  variants={creativeCardVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  style={{ perspective: 1000 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/5 to-[#35C687]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#9333EA]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <motion.svg 
                        className="w-6 h-6 text-[#9333EA]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      >
                        {feature.icon}
                      </motion.svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#9333EA] mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-700 text-center">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ATS Scoring Demonstration Section */}
            <motion.div 
              className="my-24 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  ATS Scoring Demonstration
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  See how Applicant Tracking Systems evaluate your resume in real-time. Try modifying the resume text to see your score improve instantly.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#9333EA]/10 to-[#35C687]/10 p-3 rounded-2xl">
                <ATSScoreSimulator />
              </div>
            </motion.div>

            {/* Optimization Explanation Section - MOVED HERE */}
            <motion.section 
              className="py-16 bg-gradient-to-br from-[#35C687]/5 to-[#9333EA]/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Container>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Smart Resume Optimization
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Transform your resume into a powerful tool that stands out to both ATS systems and hiring managers
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#35C687]/10 rounded-lg">
                        <svg className="w-6 h-6 text-[#35C687]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">ATS-Friendly Formatting</h3>
                    </div>
                    <p className="text-gray-600">
                      Our system ensures your resume is perfectly formatted for Applicant Tracking Systems, increasing your chances of getting past automated screening.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#9333EA]/10 rounded-lg">
                        <svg className="w-6 h-6 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">Keyword Optimization</h3>
                    </div>
                    <p className="text-gray-600">
                      We analyze job descriptions and optimize your resume with relevant keywords that match your target positions, making you more discoverable.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#35C687]/10 rounded-lg">
                        <svg className="w-6 h-6 text-[#35C687]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">Multiple Layout Options</h3>
                    </div>
                    <p className="text-gray-600">
                      Choose from three professionally designed layouts - Modern, Professional, or Creative - to match your industry and personal style.
                    </p>
                  </motion.div>
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#35C687]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#35C687] font-semibold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Upload Your Resume</h4>
                            <p className="text-gray-600">Simply upload your current resume in any common format.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#35C687]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#35C687] font-semibold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Smart Analysis</h4>
                            <p className="text-gray-600">Our AI analyzes your resume and suggests improvements for ATS compatibility.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#35C687]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#35C687] font-semibold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Choose Your Style</h4>
                            <p className="text-gray-600">Select from three professional layouts that best suit your needs.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#35C687]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#35C687] font-semibold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Download & Apply</h4>
                            <p className="text-gray-600">Download your optimized resume and start applying with confidence.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#35C687]/20 to-[#9333EA]/20 rounded-xl"></div>
                      <div className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Optimization Benefits</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#35C687] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Increased ATS compatibility score</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#35C687] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Better keyword optimization for job matches</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#35C687] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Professional formatting and layout options</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#35C687] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Improved readability and visual appeal</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </motion.section>

            {/* Animated Headline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedHeadline />
            </motion.div>
            
            {/* Motion Graphics Section */}
            

            {/* Statistics Section */}
            <motion.div 
              className="mt-32 mb-20 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/5 to-[#35C687]/5 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {statistics.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-lg text-center"
                      variants={floatingVariants}
                      initial="initial"
                      animate="animate"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="text-4xl mb-4">{stat.icon}</div>
                      <div className="text-4xl font-bold text-[#9333EA] mb-2">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Process Timeline */}
            <motion.div 
              className="mt-20 mb-32 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/5 to-[#35C687]/5 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-white p-6 rounded-xl shadow-lg text-center relative z-10">
                        <div className="text-4xl mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold text-[#9333EA] mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-[#9333EA] to-[#35C687] transform -translate-y-1/2"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 bg-[#9333EA]/10 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            <motion.div 
              className="mt-20 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="motion-graphics-section">
                {/* Decorative elements */}
                <div className="motion-graphics-decoration"></div>
                <div className="motion-graphics-decoration"></div>
                <div className="motion-graphics-decoration"></div>
                
                {/* Content */}
                <div className="motion-graphics-content">
                  <h2>Our Vision</h2>
                  <p>
                  At ResuMate, our vision is to empower every individual to unlock their full professional 
                  potential by transforming the way resumes are built, enhanced, and presented. 
                  We aim to bridge the gap between talent and opportunity by providing intelligent, intuitive, and impactful tools that 
                  help users craft standout resumes, prepare for interviews, and showcase their skills with confidence.

                  We envision a future where AI-driven personalization and design excellence work hand-in-hand 
                  to democratize career success, making it accessible to everyone — from fresh graduates to experienced professionals.
                  </p>
                </div>
                
                {/* Interactive Vision Element */}
                <div className="motion-graphics-image-container">
                  <div className="motion-graphics-circle"></div>
                  
                  {/* Animated Resume Elements */}
                  <motion.div 
                    className="relative w-64 h-64 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Interactive 3D Resume */}
                    <motion.div
                      className="absolute top-0 left-0 w-48 h-64 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#9333EA]/20"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: [0, 8, 0, -8, 0] }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      whileHover={{ scale: 1.05, rotateY: 15 }}
                    >
                      {/* Resume Header */}
                      <div className="h-8 bg-gradient-to-r from-[#9333EA] to-[#6821A8] mb-2"></div>
                      
                      {/* Resume Content Lines */}
                      <div className="px-3 space-y-2">
                        <motion.div 
                          className="h-3 w-3/4 bg-gray-200 rounded"
                          animate={{ width: ["70%", "80%", "70%"] }}
                          transition={{ duration: 5, repeat: Infinity }}
                        ></motion.div>
                        <motion.div 
                          className="h-3 w-1/2 bg-gray-200 rounded"
                          animate={{ width: ["50%", "60%", "50%"] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        ></motion.div>
                        <motion.div 
                          className="h-3 w-5/6 bg-gray-200 rounded"
                          animate={{ width: ["80%", "90%", "80%"] }}
                          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        ></motion.div>
                        
                        <div className="h-0.5 bg-gray-100 my-3"></div>
                        
                        <motion.div 
                          className="h-3 w-4/5 bg-gray-200 rounded"
                          animate={{ width: ["80%", "70%", "80%"] }}
                          transition={{ duration: 7, repeat: Infinity, delay: 0.2 }}
                        ></motion.div>
                        <motion.div 
                          className="h-3 w-3/5 bg-gray-200 rounded"
                          animate={{ width: ["60%", "65%", "60%"] }}
                          transition={{ duration: 5, repeat: Infinity, delay: 0.7 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                    
                    {/* AI Enhancement Dots */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`enhancement-dot-${i}`}
                        className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-[#35C687] to-[#2DAD75] flex items-center justify-center"
                        style={{
                          left: `${30 + (i * 10)}%`,
                          top: `${20 + (i * 15)}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1], 
                          opacity: [0, 0.8, 1]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.2 * i,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                      >
                        <span className="text-white text-xs font-bold">+</span>
                      </motion.div>
                    ))}
                    
                    {/* ATS Score Indicator */}
                    <motion.div
                      className="absolute bottom-10 right-0 px-3 py-2 bg-white rounded-lg shadow-lg border border-[#9333EA]/30"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-xs font-semibold text-gray-700">ATS Score</div>
                      <motion.div 
                        className="flex items-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-lg font-bold text-[#35C687]">98</span>
                        <span className="text-sm text-[#35C687]">%</span>
                      </motion.div>
                    </motion.div>
                    
                    {/* Floating Job Icons */}
                    {["💼", "🚀", "📊", "🏆", "🌟"].map((emoji, i) => (
                      <motion.div
                        key={`job-emoji-${i}`}
                        className="absolute p-2 bg-white rounded-full shadow-lg flex items-center justify-center text-lg"
                        style={{
                          right: `${10 + (i * 15)}%`,
                          top: `${70 - (i * 12)}%`,
                          zIndex: 5 - i,
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.8 + (i * 0.2) 
                        }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            
            {/* Call to Action Section with Enhanced Animation */}
            <motion.div 
              className="mt-20 mb-12 bg-transparent backdrop-blur-sm border border-[#9333EA]/20 rounded-2xl p-8 text-center"
              variants={creativeCardVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{ perspective: 1000 }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#6821A8]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ready to Build Your Perfect Resume?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 text-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join thousands of successful professionals who found their dream jobs with ResuMate
              </motion.p>
              <motion.button
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#9333EA] to-[#6821A8] text-white rounded-lg text-lg font-semibold shadow-lg"
                variants={creativeButtonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ perspective: 1000 }}
              >
                Get Started Now
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    );
    
  }
  

  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      
      {/* Login success message */}
      {showLoginMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-900/70 text-green-100 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-green-700/50 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Logged in successfully! Welcome{session?.user?.name ? `, ${session.user.name}` : ''}!</span>
          </div>
        </div>
      )}
      
      <main className="w-full pt-24 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Step indicator */}
            <div className="mb-8 overflow-x-auto pb-4">
              <div className="flex items-center justify-start md:justify-center min-w-max space-x-2 md:space-x-4">
                {steps.map((s, i) => (
                  <div key={s.number} className="flex flex-col md:flex-row items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= s.number
                          ? 'bg-gradient-to-r from-[#9333EA] to-[#7C22CE] text-white'
                          : 'bg-[#EBD5FF] text-gray-600'
                      }`}
                    >
                      {s.number}
                    </div>
                    <div className="flex flex-col items-center md:items-start md:ml-2">
                      <span className="text-xs md:text-sm text-gray-700 mt-1">{s.title}</span>
                      <span className="hidden md:block text-xs text-gray-600">{s.description}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block w-16 h-1 mx-2 bg-[#F4E8FF]">
                        <div
                          className="h-full bg-[#9333EA] transition-all duration-300"
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
                    resumeText={getOriginalResumeText()}
                    onContinue={() => setStep(3)}
                  />
                )}
                {step === 3 && resumeData && (
                  <JobOptimization
                    resumeData={getOriginalResumeText()}
                    onOptimize={(score: number, optimizedText: string) => {
                      setAtsScore(score);
                      // Store optimized resume text
                      const originalText = getOriginalResumeText();
                      setResumeData({
                        originalResume: originalText,
                        optimizedResume: optimizedText
                      });
                      setStep(4);
                    }}
                  />
                )}
                {step === 4 && resumeData && atsScore !== null && (
                  <>
                    {/* If optimized resume exists, show comparison */}
                    {isResumeObject() && (
                      <ResumePreview
                        originalResume={getOriginalResumeText()}
                        optimizedResume={getOptimizedResumeText()}
                      />
                    )}
                    <InterviewQuestions
                      resumeText={getOriginalResumeText()}
                      onBack={() => setStep(3)}
                      onContinue={() => setStep(5)}
                    />
                  </>
                )}
                {step === 5 && resumeData && (
                  <JobRecommendations
                    resumeText={getOriginalResumeText()}
                    onBack={() => setStep(4)}
                    onContinue={() => setStep(6)}
                  />
                )}
                {step === 6 && resumeData && (
                  <DownloadOptions
                    resumeText={getOptimizedResumeText()}
                    onBack={() => setStep(5)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 