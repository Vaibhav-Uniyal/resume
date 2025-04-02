'use client';

interface ATSScoreProps {
  score: number | null;
  onNext: () => void;
}

export default function ATSScore({ score, onNext }: ATSScoreProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">ATS Score Analysis</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Overall Score</span>
          <span className="text-2xl font-bold text-primary">
            {score ? `${score}%` : 'Calculating...'}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-1000"
            style={{ width: `${score || 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Keyword Optimization</h3>
          <p className="text-gray-600">
            Your resume contains relevant industry keywords that ATS systems are looking for.
            Consider adding more specific technical skills and industry terminology.
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Format Analysis</h3>
          <p className="text-gray-600">
            Your resume format is ATS-friendly. The clear section headings and
            standard formatting will ensure proper parsing by ATS systems.
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Content Structure</h3>
          <p className="text-gray-600">
            Work experience and education sections are well-structured. Consider
            adding more quantifiable achievements to strengthen your impact.
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="btn-primary w-full mt-8"
      >
        View Detailed Analytics
      </button>
    </div>
  );
} 