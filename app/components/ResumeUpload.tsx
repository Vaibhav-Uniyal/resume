'use client';

import React, { useState } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

interface ResumeUploadProps {
  onUpload: (text: string) => void;
}

const animations: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pasteText, setPasteText] = useState('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const text = await file.text();
      onUpload(text);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handlePasteSubmit = () => {
    if (pasteText.trim()) {
      onUpload(pasteText);
    }
  };

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'upload'
              ? 'bg-purple-500 text-black'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'paste'
              ? 'bg-purple-500 text-black'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          Paste Text
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer
                     ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg text-gray-300 mb-2">Upload your resume</p>
              <p className="text-sm text-gray-500">PDF, DOCX, or TXT files</p>
            </div>
            <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
              Select File
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                       hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResumeUpload; 