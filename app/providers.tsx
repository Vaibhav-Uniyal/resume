'use client';

import { SessionProvider } from 'next-auth/react';
import { ResumeProvider } from './context/ResumeContext';
import { SkillsProvider } from './context/SkillsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ResumeProvider>
        <SkillsProvider>
        {children}
        </SkillsProvider>
      </ResumeProvider>
    </SessionProvider>
  );
} 