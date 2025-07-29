'use client';

import { motion } from 'framer-motion';
import ResumePreview from './ResumePreview';
import { originalResume, optimizedResume } from '../utils/sampleResumes';
import { Container } from './Container';

export default function AnimatedHeadline() {
  return (
    <>
      <Container>
        <div className="mt-20 mb-12 py-10 px-6 bg-white rounded-xl shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-8"
            >
              The resume builder that's right for your job and experience
            </motion.h2>
          </div>
        </div>
      </Container>
      
      <ResumePreview 
        originalResume={originalResume} 
        optimizedResume={optimizedResume} 
      />
    </>
  );
} 