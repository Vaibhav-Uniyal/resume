'use client';

import { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

interface PowerBIInsightsProps {
  resumeData: any;
  onNext: () => void;
}

export default function PowerBIInsights({ resumeData, onNext }: PowerBIInsightsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Resume Analytics Dashboard</h2>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <PowerBIEmbed
              embedConfig={{
                type: 'report',
                id: process.env.POWERBI_REPORT_ID,
                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${process.env.POWERBI_REPORT_ID}&groupId=${process.env.POWERBI_WORKSPACE_ID}`,
                accessToken: 'YOUR_ACCESS_TOKEN', // This should be generated on the backend
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                  background: models.BackgroundType.Transparent,
                }
              }}
              cssClassName="h-full w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Industry Comparison</h3>
              <p className="text-gray-600">
                Your resume is compared against successful profiles in your target industry.
                The analysis shows areas where you align well and opportunities for improvement.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Skill Gap Analysis</h3>
              <p className="text-gray-600">
                Based on current market demands, we've identified key skills that
                could enhance your profile for your target roles.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Experience Impact</h3>
              <p className="text-gray-600">
                Visual breakdown of your experience and its relevance to your
                target positions. Includes recommendations for highlighting key achievements.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Market Trends</h3>
              <p className="text-gray-600">
                Real-time analysis of job market trends and how your profile
                aligns with current industry demands.
              </p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="btn-primary w-full"
          >
            Get AI Optimization Suggestions
          </button>
        </div>
      )}
    </div>
  );
} 