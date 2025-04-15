'use client';

import { motion } from 'framer-motion';

interface ComparisonViewProps {
  originalResume: string;
  atsScore: number;
  onBack: () => void;
}

export default function ComparisonView({ originalResume, atsScore, onBack }: ComparisonViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold gradient-text">
          Resume Analysis
        </h2>
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          Back to Job Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-content-primary">
            Original Resume
          </h3>
          <div className="p-4 bg-background-light/10 rounded-lg">
            <pre className="whitespace-pre-wrap text-content-secondary text-sm font-mono">
              {originalResume}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-content-primary">
            ATS Score
          </h3>
          <div className="p-6 bg-background-light/10 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {atsScore}%
              </div>
              <p className="text-content-secondary">
                {atsScore >= 80 ? 'Excellent!' : 
                 atsScore >= 60 ? 'Good, but could be improved' : 
                 'Needs improvement'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-content-primary mb-4">
              Improvement Suggestions
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-accent-primary">•</span>
                <span className="text-content-secondary">Add more relevant keywords from the job description</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-primary">•</span>
                <span className="text-content-secondary">Use more action verbs to describe your experiences</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent-primary">•</span>
                <span className="text-content-secondary">Quantify your achievements with numbers and metrics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 