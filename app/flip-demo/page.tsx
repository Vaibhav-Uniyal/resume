'use client';

import { useState, useEffect } from 'react';
import FlippingResume from '../components/FlippingResume';

// Sample resume content
const sampleResume = `JOHN DOE
123 Main Street, Anytown, USA | (555) 123-4567 | john.doe@email.com | linkedin.com/in/johndoe

SUMMARY:
Results-driven software engineer with 5+ years of experience developing web applications. Proficient in JavaScript, TypeScript, and React.js, with a strong focus on creating responsive and user-friendly interfaces.

WORK EXPERIENCE:
Senior Frontend Developer - Tech Solutions Inc.
January 2021 - Present
• Led development of the company's flagship SaaS product, resulting in a 35% increase in user engagement
• Implemented state management using Redux, improving application performance by 40%
• Mentored junior developers and conducted code reviews to maintain code quality

Software Engineer - Digital Innovations LLC
June 2018 - December 2020
• Developed responsive web applications using React.js and Node.js
• Created RESTful APIs to facilitate communication between front-end and back-end systems
• Collaborated with UI/UX designers to implement user-friendly interfaces

EDUCATION:
Bachelor of Science in Computer Science
University of Technology - Graduated May 2018
• GPA: 3.8/4.0
• Dean's List: 2015-2018

SKILLS:
• Programming Languages: JavaScript, TypeScript, HTML, CSS, Python
• Frameworks & Libraries: React.js, Redux, Node.js, Express.js
• Tools: Git, Webpack, Jest, Docker, AWS
• Methodologies: Agile, Scrum, Test-Driven Development`;

export default function FlipDemoPage() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by rendering only on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Flipping Resume Demo
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Hover over the resume card below to see the flipping effect. The same resume content 
          is displayed on both sides of the card with different colored headers.
        </p>
        
        <FlippingResume 
          resumeContent={sampleResume} 
          title="Interactive Resume" 
        />
      </div>
    </div>
  );
} 