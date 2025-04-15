'use client';

import { motion } from 'framer-motion';

interface InterviewQuestionsProps {
  resumeText: string;
  onBack: () => void;
  onContinue: () => void;
}

export default function InterviewQuestions({ resumeText, onBack, onContinue }: InterviewQuestionsProps) {
  // Mock questions - in a real app, these would be generated based on resume content
  const questions = [
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold gradient-text">
          Prepare for Your Interview
        </h2>
        <div className="flex space-x-4">
          <button onClick={onBack} className="btn-secondary">
            Back to Analysis
          </button>
          <button onClick={onContinue} className="btn-primary">
            Continue to Download
          </button>
        </div>
      </div>

      <p className="text-content-secondary">
        Based on your resume, here are some potential interview questions you should prepare for:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-light/10 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-content-primary mb-4 gradient-text">
              {category.category}
            </h3>
            <ul className="space-y-4">
              {category.questions.map((question, qIndex) => (
                <li key={qIndex} className="flex items-start space-x-3">
                  <span className="text-accent-primary text-xl">•</span>
                  <span className="text-content-secondary">{question}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="bg-background-light/10 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-content-primary mb-4 gradient-text">
          Interview Tips
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="text-accent-primary text-xl">•</span>
            <span className="text-content-secondary">
              Research the company thoroughly before the interview
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-accent-primary text-xl">•</span>
            <span className="text-content-secondary">
              Prepare specific examples from your experience for each question
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-accent-primary text-xl">•</span>
            <span className="text-content-secondary">
              Practice the STAR method (Situation, Task, Action, Result) for behavioral questions
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
} 