'use client';

import { useState, useEffect } from 'react';
import OpenAI from 'openai';

interface AIOptimizationsProps {
  resumeData: any;
  atsScore: number | null;
}

export default function AIOptimizations({ resumeData, atsScore }: AIOptimizationsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optimizedResume, setOptimizedResume] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateSuggestions = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error('OpenAI API key is not configured');
        }

        const openai = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true // Required for client-side usage
        });

        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a professional resume optimization expert. Analyze the resume and provide specific, actionable suggestions for improvement."
            },
            {
              role: "user",
              content: `Please analyze this resume and provide optimization suggestions. Current ATS score: ${atsScore}%. Resume data: ${JSON.stringify(resumeData)}`
            }
          ],
        });

        const suggestions = response.choices[0].message.content?.split('\n').filter(Boolean) || [];
        setSuggestions(suggestions);

        // Generate optimized version
        const optimizedResponse = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a professional resume writer. Rewrite the resume to optimize it for ATS systems while maintaining a professional tone."
            },
            {
              role: "user",
              content: `Please optimize this resume: ${JSON.stringify(resumeData)}`
            }
          ],
        });

        setOptimizedResume(optimizedResponse.choices[0].message.content || '');
        setError(null);
      } catch (error) {
        console.error('Error generating suggestions:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while generating suggestions');
      } finally {
        setIsLoading(false);
      }
    };

    generateSuggestions();
  }, [resumeData, atsScore]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([optimizedResume], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "optimized_resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">AI Optimization Analysis</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">AI Optimization Analysis</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <p className="text-red-500 mt-2">Please check your API key configuration and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">AI Optimization Analysis</h2>

      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Improvement Suggestions</h3>
          <ul className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <p className="text-gray-700">{suggestion}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Optimized Version</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {optimizedResume}
            </pre>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDownload}
            className="btn-primary"
            disabled={!optimizedResume}
          >
            Download Optimized Resume
          </button>
        </div>
      </div>
    </div>
  );
} 