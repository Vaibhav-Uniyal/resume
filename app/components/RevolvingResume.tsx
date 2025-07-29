'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function RevolvingResume() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <div className="relative w-full h-full">
      <motion.div
        ref={ref}
        className="w-full"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hired badge */}
        <div className="absolute top-4 right-8 z-10">
          <div className="bg-[#35C687] text-white text-xs font-bold px-4 py-1 rounded-full">
            HIRED
          </div>
        </div>

        {/* Shadow effect */}
        <div className="absolute -bottom-6 left-0 right-0 mx-auto w-[90%] h-[20px] bg-black/10 blur-xl rounded-full"></div>
        
        {/* 3D Resume UI Components */}
        <div className="absolute right-5 top-28 transform rotate-12 z-10">
          <div className="bg-white rounded-lg shadow-md p-3 w-40">
            <div className="flex items-end">
              <div className="w-16 bg-[#9333EA] rounded-full">
                <div className="h-16 w-16 rounded-full bg-[#9333EA] flex items-center justify-center text-white text-xl font-bold">75%</div>
              </div>
              <div className="ml-3">
                <div className="h-2 w-16 bg-gray-200 rounded-full mb-1.5"></div>
                <div className="h-2 w-12 bg-gray-200 rounded-full mb-1.5"></div>
                <div className="h-2 w-14 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute left-0 bottom-32 transform -rotate-6 z-10">
          <div className="bg-white rounded-lg shadow-md p-3 w-40">
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded-full"></div>
              <div className="flex items-center justify-between">
                <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                <div className="h-5 w-5 rounded-full bg-[#9333EA]"></div>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume container with 3D effect */}
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden mx-auto max-w-md"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          animate={{ 
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, -5, 0, 5, 0],
            z: [0, 20, 0, 20, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        >
          {/* Mock Resume Content - Made smaller with tighter spacing */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#6821A8]">Vaibhav Uniyal</h2>
                <p className="text-xs text-gray-600">AIML Engineer</p>
              </div>
              <div className="flex flex-col items-end text-xs text-gray-600">
                <p className="text-xs">vaibhavuniyal@example.com</p>
                <p className="text-xs">linkedin.com/in/vaibhav</p>
              </div>
            </div>
            
            {/* Experience Section */}
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 border-b border-gray-200 pb-1 mb-2">Experience</h3>
              <div className="mb-3">
                <div className="flex justify-between">
                  <p className="font-medium text-xs">AIML Engineer</p>
                  <p className="text-xs text-gray-600">2020 - Present</p>
                </div>
                <p className="text-xs text-gray-700">Tech, Inc.</p>
                <ul className="text-xs text-gray-700 mt-1 list-disc list-inside space-y-0.5">
                  <li>Led cross-functional teams to develop ML products</li>
                  <li>Increased model accuracy by 45% through optimization</li>
                  <li>Designed and implemented NLP-based customer service solution</li>
                </ul>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <p className="font-medium text-xs">Junior Developer</p>
                  <p className="text-xs text-gray-600">2018 - 2020</p>
                </div>
                <p className="text-xs text-gray-700">StartupCo</p>
                <ul className="text-xs text-gray-700 mt-1 list-disc list-inside space-y-0.5">
                  <li>Developed and maintained web applications</li>
                  <li>Collaborated with UX team on interface improvements</li>
                </ul>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 border-b border-gray-200 pb-1 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Python', 'TensorFlow', 'PyTorch', 'NLP', 
                  'Computer Vision', 'Data Analysis', 'UI/UX Design', 'Web Development'
                ].map((skill) => (
                  <span key={skill} className="text-xs px-2 py-0.5 bg-[#F4E8FF] text-[#6821A8] rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Education Section */}
            <div className="mb-4">
              <h3 className="text-xs font-bold uppercase text-gray-800 border-b border-gray-200 pb-1 mb-2">Education</h3>
              <div className="flex justify-between">
                <p className="font-medium text-xs">B.Tech in Computer Science</p>
                <p className="text-xs text-gray-600">2018</p>
              </div>
              <p className="text-xs text-gray-700">SIT Pune</p>
            </div>
            
            {/* Achievement Badges */}
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-800 border-b border-gray-200 pb-1 mb-2">Achievements</h3>
              <div className="flex gap-3">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[#9333EA]/20 flex items-center justify-center mr-1.5">
                    <svg className="w-3 h-3 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs">Published 2 research papers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[#9333EA]/20 flex items-center justify-center mr-1.5">
                    <svg className="w-3 h-3 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs">Hackathon winner</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 