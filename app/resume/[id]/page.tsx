import JobRecommendations from '@/app/components/JobRecommendations';

export default function ResumePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] animate-gradient-bg font-['Poppins']">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-[#1a0745]/50 backdrop-blur-sm p-6 rounded-xl border border-[#3d1c8f] shadow-xl">
              {/* ... existing resume content ... */}
            </div>
          </div>
          
          <div>
            <JobRecommendations resumeText={resume.originalResume} />
          </div>
        </div>
      </main>
    </div>
  );
} 