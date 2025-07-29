'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResumeContextType {
  resumeText: string;
  setResumeText: (text: string) => void;
  originalText: string;
  setOriginalText: (text: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeText, setResumeText] = useState('');
  const [originalText, setOriginalText] = useState('');

  return (
    <ResumeContext.Provider value={{ resumeText, setResumeText, originalText, setOriginalText }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}; 