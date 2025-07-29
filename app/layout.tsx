import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ResumeProvider } from './context/ResumeContext';
import { Providers } from './providers';
import MouseTrail from './components/MouseTrail';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResuMate - Resume Builder with AI',
  description: 'Build, optimize and track your resume with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>
          <Providers>
            <MouseTrail />
            {children}
          </Providers>
        </ResumeProvider>
      </body>
    </html>
  );
} 