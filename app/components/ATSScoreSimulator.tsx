'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_JOB_DESCRIPTION = `Senior Frontend Developer

About the Role:
We are looking for a skilled Senior Frontend Developer proficient in React.js, TypeScript, and modern JavaScript to join our growing team. The ideal candidate will have experience building responsive, user-friendly web applications and a passion for clean, maintainable code.

Requirements:
- 5+ years of experience in frontend development
- Strong proficiency in React.js, TypeScript, and JavaScript
- Experience with state management solutions (Redux, Context API)
- Knowledge of responsive design and CSS frameworks
- Experience with RESTful APIs and GraphQL
- Familiarity with testing frameworks (Jest, React Testing Library)
- Version control with Git
- Ability to work in an agile team environment

Preferred Qualifications:
- Experience with Next.js
- Knowledge of CI/CD pipelines
- UI/UX design experience
- Experience with performance optimization techniques
`;

const SAMPLE_RESUME = `JOHN SMITH
Frontend Developer | (123) 456-7890 | john.smith@email.com | github.com/johnsmith

PROFESSIONAL SUMMARY
Frontend developer with 3 years of experience building web applications using JavaScript and React.

WORK EXPERIENCE
Frontend Developer - Tech Solutions Inc.
August 2020 - Present
• Developed responsive web interfaces using HTML, CSS, and JavaScript
• Built reusable components with React.js for the company's main product
• Collaborated with backend developers to integrate REST APIs

Junior Developer - Digital Creations
June 2018 - July 2020
• Assisted in the development of client websites
• Fixed bugs and implemented minor features
• Participated in code reviews and team meetings

EDUCATION
Bachelor of Science in Computer Science
University Tech - Graduated 2018

SKILLS
• Languages: JavaScript, HTML, CSS
• Frameworks: React, Bootstrap
• Tools: Git, VS Code, Chrome DevTools
`;

interface Keyword {
  text: string;
  found: boolean;
  weight: number;
}

export default function ATSScoreSimulator() {
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [score, setScore] = useState(0);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedResume, setHighlightedResume] = useState('');
  const [activeTab, setActiveTab] = useState<'job' | 'resume'>('job');
  const [improvementTips, setImprovementTips] = useState<string[]>([]);
  const [lastScore, setLastScore] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);

  // Extract keywords from job description
  const extractKeywords = (text: string) => {
    // This is a simplified algorithm - in a real system this would be more sophisticated
    const importantTerms = [
      { text: 'React', weight: 10 },
      { text: 'JavaScript', weight: 10 },
      { text: 'TypeScript', weight: 9 },
      { text: 'frontend', weight: 8 },
      { text: 'responsive', weight: 7 },
      { text: 'Redux', weight: 7 },
      { text: 'CSS', weight: 6 },
      { text: 'HTML', weight: 6 },
      { text: 'testing', weight: 5 },
      { text: 'API', weight: 5 },
      { text: 'Git', weight: 4 },
      { text: 'agile', weight: 4 },
      { text: 'Next.js', weight: 8 },
      { text: 'performance', weight: 5 },
      { text: 'component', weight: 6 },
      { text: 'UI/UX', weight: 4 },
      { text: 'state management', weight: 7 },
      { text: '5+ years', weight: 9 },
    ];

    return importantTerms.map(term => ({
      ...term,
      found: false
    }));
  };

  // Generate improvement tips based on missing keywords
  const generateImprovementTips = (analyzedKeywords: Keyword[]) => {
    const missingKeywords = analyzedKeywords
      .filter(kw => !kw.found)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
    
    return missingKeywords.map(kw => {
      switch(kw.text) {
        case '5+ years':
          return `Clearly mention your years of experience (aim for 5+ years for this role)`;
        case 'React':
        case 'JavaScript':
        case 'TypeScript':
        case 'Redux':
        case 'Next.js':
          return `Add more details about your ${kw.text} experience and projects`;
        case 'responsive':
          return `Highlight your experience with responsive design and mobile-first development`;
        case 'testing':
          return `Include your experience with testing frameworks like Jest or React Testing Library`;
        default:
          return `Add "${kw.text}" to your resume (weight: ${kw.weight})`;
      }
    });
  };

  // Analyze resume against keywords
  const analyzeResume = () => {
    setLoading(true);
    setLastScore(score);
    
    setTimeout(() => {
      const extractedKeywords = extractKeywords(jobDescription);
      const resumeLower = resume.toLowerCase();
      
      const analyzedKeywords = extractedKeywords.map(keyword => ({
        ...keyword,
        found: resumeLower.includes(keyword.text.toLowerCase())
      }));
      
      setKeywords(analyzedKeywords);
      
      // Calculate score based on found keywords and their weights
      const totalWeight = analyzedKeywords.reduce((sum, kw) => sum + kw.weight, 0);
      const foundWeight = analyzedKeywords
        .filter(kw => kw.found)
        .reduce((sum, kw) => sum + kw.weight, 0);
      
      const calculatedScore = Math.round((foundWeight / totalWeight) * 100);
      
      // Create highlighted resume text
      let highlighted = resume;
      analyzedKeywords.forEach(keyword => {
        if (keyword.found) {
          const regex = new RegExp(keyword.text, 'gi');
          highlighted = highlighted.replace(
            regex, 
            match => `<span class="bg-green-100 text-green-800 px-1 rounded animate-pulse-once">${match}</span>`
          );
        }
      });
      setHighlightedResume(highlighted);
      
      // Generate improvement tips
      setImprovementTips(generateImprovementTips(analyzedKeywords));
      
      setScore(calculatedScore);
      setLoading(false);
      setAnalyzed(true);
    }, 1500); // Simulating processing time
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
            className="mr-3 text-[#9333EA]"
          >
            🔍
          </motion.div>
          ATS Scoring Simulator
        </h2>
        <p className="text-gray-600">
          See how your resume performs against a job description in real-time
        </p>
      </div>
      
      {/* Interactive tabs for job and resume */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <motion.button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'job' 
                ? 'border-[#9333EA] text-[#9333EA]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('job')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Job Description
          </motion.button>
          <motion.button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'resume' 
                ? 'border-[#9333EA] text-[#9333EA]' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('resume')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Your Resume
          </motion.button>
        </div>
      </div>
      
      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'job' ? (
          <motion.div
            key="job-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <label className="block text-gray-700 font-medium mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                       text-gray-800 focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
              placeholder="Paste a job description here..."
            />
            <div className="mt-2 flex justify-end">
              <motion.button
                onClick={() => setActiveTab('resume')}
                className="flex items-center px-4 py-2 bg-[#9333EA] text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white">Continue to Resume</span>
                <svg className="ml-2 w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resume-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <label className="block text-gray-700 font-medium mb-2">
              Your Resume
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                       text-gray-800 focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
              placeholder="Paste your resume text here..."
            />
            <div className="mt-2 flex justify-between">
              <motion.button
                onClick={() => setActiveTab('job')}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Job
              </motion.button>
              <motion.button
                onClick={() => analyzeResume()}
                className="px-6 py-2 bg-[#9333EA] text-white rounded-lg font-medium
                         hover:bg-[#7C22CE] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center text-white">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="text-white">Analyze Resume</span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Show analysis results only if analysis has been run */}
      {analyzed && (
        <div className="p-6 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              ATS Score Analysis
            </h3>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">
                ATS Compatibility Score
              </h4>
              
              <div className="flex items-center">
                <motion.div 
                  className={`text-3xl font-bold ${
                    score >= 80 ? 'text-green-600' : 
                    score >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: loading ? [1, 1.1, 1] : [1, 1.2, 1],
                    transition: { 
                      duration: 0.5,
                      repeat: loading ? Infinity : 0,
                      repeatType: "reverse"
                    }
                  }}
                  key={score}
                >
                  {score}%
                </motion.div>
                
                <motion.div 
                  className={`ml-3 text-sm px-2 py-1 rounded-full font-medium ${
                    score >= 80 ? 'bg-green-100 text-green-800' : 
                    score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}
                  animate={{ 
                    y: [0, -3, 0],
                    transition: { duration: 1, delay: 0.5 }
                  }}
                >
                  {score >= 80 ? 'Great Match! ✨' : 
                   score >= 60 ? 'Decent Match 👍' : 
                   'Needs Improvement 🔧'}
                </motion.div>
                
                {score > lastScore && lastScore > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-sm text-green-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +{score - lastScore}%
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
              <motion.div 
                className={`h-3 rounded-full ${
                  score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                  score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                  'bg-gradient-to-r from-red-500 to-red-600'
                }`}
                initial={{ width: '0%' }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
              ></motion.div>
            </div>
            
            <motion.button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-[#9333EA] hover:text-[#7C22CE] text-sm font-medium flex items-center"
              whileHover={{ x: 5 }}
              whileTap={{ x: 0 }}
            >
              <span>{showExplanation ? 'Hide' : 'Show'} score explanation</span>
              <motion.svg 
                className="ml-1 w-4 h-4"
                animate={{ rotate: showExplanation ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            
            <AnimatePresence>
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 overflow-hidden"
                >
                  <p className="mb-2">This score is calculated based on how well your resume matches key terms from the job description. Higher-weighted terms have more impact.</p>
                  <p>To improve your score:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Include more of the key skills and qualifications from the job description</li>
                    <li>Match terminology exactly (e.g., "React.js" vs just "React")</li>
                    <li>Tailor your experience section to highlight relevant achievements</li>
                    <li>Include years of experience that match the job requirements</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📋</span> Key Terms Analysis
              </h4>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {keywords.map((keyword, index) => (
                  <motion.div 
                    key={index} 
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-center">
                      {keyword.found ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.div>
                      )}
                      <span className="text-gray-700">{keyword.text}</span>
                    </div>
                    <div className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Weight: {keyword.weight}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Improvement tips */}
              {improvementTips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-4 border-t border-gray-100 pt-4"
                >
                  <h5 className="text-sm font-semibold text-[#9333EA] mb-2">
                    Top Improvement Tips
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-2">
                    {improvementTips.map((tip, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                      >
                        <span className="text-[#9333EA] mr-1">→</span> {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <span className="mr-2">✓</span> Highlighted Resume
              </h4>
              
              <div className="text-sm text-gray-700 h-64 overflow-y-auto pr-2 bg-gray-50 p-3 rounded-lg">
                <div 
                  dangerouslySetInnerHTML={{ __html: highlightedResume }} 
                  className="whitespace-pre-wrap font-mono" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Message when no analysis has been run yet */}
      {!analyzed && (
        <div className="p-10 text-center text-gray-500">
          <div className="mb-4 text-[#9333EA] text-5xl">🔍</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">Ready to Check Your Resume</h3>
          <p className="text-gray-500 mb-6">Enter your job description and resume text, then click "Analyze Resume" to see your ATS compatibility score</p>
        </div>
      )}
      
      {/* Interactive call to action with simpler color */}
      <motion.div 
        className="p-6 border-t border-gray-200 bg-gradient-to-r from-[#9333EA]/5 to-[#35C687]/5 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.button
          onClick={() => analyzed ? window.open('#optimize-resume', '_blank') : analyzeResume()}
          className="flex items-center px-6 py-3 bg-[#9333EA] text-white rounded-lg font-medium shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white">{analyzed ? "Optimize My Resume" : "Analyze My Resume"}</span>
          <svg className="ml-2 w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
      
      {/* Add CSS for animation */}
      <style jsx global>{`
        @keyframes pulse-once {
          0% { background-color: rgba(220, 252, 231, 0.7); }
          50% { background-color: rgba(74, 222, 128, 0.3); }
          100% { background-color: rgba(220, 252, 231, 0.7); }
        }
        .animate-pulse-once {
          animation: pulse-once 2s ease-in-out;
        }
      `}</style>
    </div>
  );
} 