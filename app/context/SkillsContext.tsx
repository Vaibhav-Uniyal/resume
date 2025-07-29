'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SkillsContextType {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider = ({ children }: { children: ReactNode }) => {
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <SkillsContext.Provider value={{ skills, setSkills }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkillsContext = () => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkillsContext must be used within a SkillsProvider');
  }
  return context;
}; 