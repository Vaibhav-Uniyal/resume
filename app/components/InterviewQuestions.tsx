'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InterviewQuestionsProps {
  resumeText?: string;
  onBack?: () => void;
  onContinue?: () => void;
  standalone?: boolean;
}

export default function InterviewQuestions({ resumeText = '', onBack, onContinue, standalone = false }: InterviewQuestionsProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  // Default dummy text in case no resume is provided
  const [dummyResumeText] = useState('This is a placeholder resume for users accessing interview questions directly.');
  
  // Initial static questions
  const [questions, setQuestions] = useState([
    {
      category: 'Technical Skills',
      questions: [
        'Can you explain your experience with the technologies mentioned in your resume?',
        'What was the most challenging technical problem you\'ve solved?',
        'How do you keep your technical skills up-to-date?'
      ]
    },
    {
      category: 'Project Experience',
      questions: [
        'Tell me about a project where you had to overcome significant challenges',
        'How do you handle project deadlines and prioritize tasks?',
        'Describe a situation where you had to lead a team to achieve project goals'
      ]
    },
    {
      category: 'Behavioral',
      questions: [
        'How do you handle conflicts in the workplace?',
        'Describe a situation where you had to adapt to a significant change',
        'Tell me about a time when you failed and what you learned from it'
      ]
    },
    {
      category: 'Role-Specific',
      questions: [
        'What interests you about this role?',
        'How does your experience align with this position?',
        'Where do you see yourself in 5 years?'
      ]
    }
  ]);

  const generateQuestions = async () => {
    if (!jobDescription || !jobTitle) {
      alert('Please enter both job title and description');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/interview-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Use actual resume if available, otherwise use dummy text
          resumeText: resumeText || dummyResumeText,
          jobTitle,
          jobDescription,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate interview questions');
      }
      
      const result = await response.json();
      
      // Update questions with API response
      setQuestions(result.categories);
      setHasGenerated(true);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate interview questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to download the interview questions as PDF
  const downloadInterviewQuestions = () => {
    setIsDownloading(true);

    try {
      // Generate HTML content for the PDF with proper styling
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Interview Questions for ${jobTitle}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              color: #9333EA;
              text-align: center;
              font-size: 24px;
              margin-bottom: 20px;
              border-bottom: 2px solid #EBD5FF;
              padding-bottom: 10px;
            }
            h2 {
              color: #9333EA;
              font-size: 18px;
              margin-top: 25px;
              margin-bottom: 15px;
              border-bottom: 1px solid #EBD5FF;
              padding-bottom: 5px;
            }
            .question {
              margin-bottom: 12px;
              padding-left: 20px;
              position: relative;
            }
            .question::before {
              content: "•";
              color: #35C687;
              font-size: 18px;
              position: absolute;
              left: 0;
              top: -2px;
            }
            .section {
              margin-bottom: 30px;
            }
            .tips-section {
              background-color: #FAF5FF;
              padding: 15px;
              border-radius: 5px;
              margin-top: 30px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            @page {
              margin: 0.5in;
            }
          </style>
        </head>
        <body>
          <h1>Interview Questions for ${jobTitle} Position</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          
          ${questions.map(category => `
            <div class="section">
              <h2>${category.category}</h2>
              ${category.questions.map(question => `
                <div class="question">${question}</div>
              `).join('')}
            </div>
          `).join('')}
          
          <div class="tips-section">
            <h2>Interview Preparation Tips</h2>
            <div class="question">Research the company's recent projects and initiatives related to this role</div>
            <div class="question">Prepare specific examples from your experience that align with the job requirements</div>
            <div class="question">Practice the STAR method (Situation, Task, Action, Result) for behavioral questions</div>
          </div>
          
          <div class="footer">
            Generated by ResuMate - Your Resume Builder Assistant
          </div>
        </body>
        </html>
      `;

      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);

      // Create an anchor element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `interview_questions_${jobTitle.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().slice(0, 10)}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success notification
      setTimeout(() => {
        alert('Interview questions downloaded successfully!');
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Error downloading interview questions:', error);
      alert('Failed to download interview questions. Please try again.');
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-lg p-6 space-y-6 ${standalone ? 'max-w-4xl mx-auto mt-8' : ''}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#9333EA]">
          {hasGenerated ? 'Your Tailored Interview Questions' : 'Prepare for Your Interview'}
        </h2>
        {!standalone && (
          <div className="flex space-x-4">
            {onBack && (
              <button onClick={onBack} className="px-6 py-2 bg-[#F4E8FF] text-[#9333EA] rounded-lg font-medium hover:bg-[#EBD5FF] transition-all duration-200">
                Back
              </button>
            )}
            {onContinue && (
              <button onClick={onContinue} className="px-6 py-2 bg-[#9333EA] text-white rounded-lg font-medium hover:bg-[#7C22CE] transition-all duration-200">
                Continue
              </button>
            )}
          </div>
        )}
      </div>

      {!hasGenerated ? (
        <div className="bg-[#FAF5FF] rounded-lg p-6 border border-[#EBD5FF]">
          <h3 className="text-xl font-semibold mb-4 text-[#9333EA]">
            Generate Job-Specific Interview Questions
          </h3>
          <p className="text-gray-800 font-medium text-base mb-4">
            Enter a job title and description to generate tailored interview questions that will help you prepare effectively.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-800 mb-2">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-[#EBD5FF] 
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA]"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-800 mb-2">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 bg-white border border-[#EBD5FF]
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA]"
                placeholder="Paste the job description here..."
              />
            </div>
            
            <div className="flex justify-center pt-2">
              <button
                onClick={generateQuestions}
                disabled={isGenerating}
                className="px-6 py-3 bg-[#35C687] text-white rounded-lg shadow-md font-medium
                         hover:bg-[#2DAD75] transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Questions...</span>
                  </div>
                ) : (
                  'Generate Interview Questions'
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800 font-medium text-lg">
            Here are tailored interview questions based on the <span className="text-[#9333EA] font-semibold">{jobTitle}</span> position:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FAF5FF] rounded-lg p-6 border border-[#EBD5FF]"
              >
                <h3 className="text-xl font-semibold mb-4 text-[#9333EA]">
                  {category.category}
                </h3>
                <ul className="space-y-4">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start space-x-3">
                      <span className="text-[#35C687] text-xl">•</span>
                      <span className="text-gray-800 font-medium">{question}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#FAF5FF] rounded-lg p-6 mt-6 border border-[#EBD5FF]">
            <h3 className="text-xl font-semibold mb-4 text-[#9333EA]">
              Interview Tips for {jobTitle} Position
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-[#35C687] text-xl">•</span>
                <span className="text-gray-800 font-medium">
                  Research the company's recent projects and initiatives related to this role
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#35C687] text-xl">•</span>
                <span className="text-gray-800 font-medium">
                  Prepare specific examples from your experience that align with the job requirements
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#35C687] text-xl">•</span>
                <span className="text-gray-800 font-medium">
                  Practice the STAR method (Situation, Task, Action, Result) for behavioral questions
                </span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={downloadInterviewQuestions}
              disabled={isDownloading}
              className="px-6 py-3 bg-[#35C687] text-white rounded-lg shadow-md font-medium
                        flex items-center justify-center hover:bg-[#2DAD75] transition-all duration-200 w-full sm:w-auto"
            >
              {isDownloading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Downloading...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Questions
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setHasGenerated(false);
                setJobTitle('');
                setJobDescription('');
              }}
              className="px-6 py-3 bg-[#9333EA] text-white rounded-lg shadow-md font-medium
                        hover:bg-[#7C22CE] transition-all duration-200 w-full sm:w-auto"
            >
              Generate New Questions
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
} 