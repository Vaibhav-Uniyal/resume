"use client";

import { Container } from "../components/Container";
import InterviewQuestions from "../components/InterviewQuestions";

export default function InterviewQuestionsPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <h1 className="text-4xl font-bold mb-2 text-[#9333EA] text-center">Mock Interview Questions</h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl">
          Prepare for your interview with AI-generated questions tailored to your resume and job description
        </p>
        <div className="w-full max-w-4xl">
          <InterviewQuestions standalone={true} />
        </div>
      </div>
    </Container>
  );
} 