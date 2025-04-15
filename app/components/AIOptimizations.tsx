'use client';

import { useState, useEffect } from 'react';

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
        const response = await fetch('/api/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeData, atsScore }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to optimize resume');
        }

        const data = await response.json();
        setSuggestions(data.suggestions);
        setOptimizedResume(data.optimizedResume);
        setError(null);
      } catch (error) {
        console.error('Error generating suggestions:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while generating suggestions');
      } finally {
        setIsLoading(false);
      }
    };

    if (resumeData && atsScore !== null) {
      generateSuggestions();
    }
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
          <p className="text-red-500 mt-2">Please try again.</p>
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