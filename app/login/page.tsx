'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Loader from '../components/Loader';

interface Resume {
  id: string;
  title: string;
  role: string;
  atsScore: number;
  createdAt: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userResumes, setUserResumes] = useState<Resume[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserResumes(session.user.email);
    }

    // Show success message if user just registered
    if (searchParams?.get('registered') === 'true') {
      setSuccess('Account created successfully! Please log in.');
    }
  }, [session, status, searchParams]);

  const fetchUserResumes = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/resumes?email=${userEmail}`);
      if (response.ok) {
        const resumes = await response.json();
        setUserResumes(resumes);
      } else {
        setError('Failed to fetch resumes');
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Error fetching resumes');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <Loader fullScreen color="#4F46E5" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f004d] via-[#2e0066] via-[#330033] to-[#00001a] animate-gradient-bg font-['Poppins']">
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          color: white;
        }
        .gradient-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          background: linear-gradient(to right, #ff00cc, #3333ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {!session ? (
          <div className="max-w-md mx-auto bg-gradient-to-br from-[#320050]/90 to-[#1e0032]/80 rounded-2xl shadow-[0_0_20px_rgba(183,0,255,0.4),0_0_40px_rgba(100,0,255,0.2)] p-10 w-[360px] text-white backdrop-blur-md border border-white/10">
            <h1 className="text-2xl font-display font-bold gradient-text mb-6">Login</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded border border-red-700">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-900/50 text-green-200 rounded border border-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 bg-white/10 border-none rounded-lg text-white placeholder-white/60 focus:outline-none transition-colors duration-200"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-white/10 border-none rounded-lg text-white placeholder-white/60 focus:outline-none transition-colors duration-200"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white rounded-xl font-bold 
                          hover:scale-105 transition-all duration-300 shadow-[0_0_10px_rgba(255,138,0,0.4),0_0_20px_rgba(229,46,113,0.3)]
                          disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? <Loader size="24" color="white" /> : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-300">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-[#ff9f5a] hover:text-[#ff8c3b] transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-display font-bold text-[#ff9f5a]">My Resumes</h1>
              <button
                onClick={() => signIn()}
                className="text-sm text-gray-300 hover:text-[#ff9f5a] transition-colors duration-200"
              >
                Logout
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded border border-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-6">
              {userResumes.length === 0 ? (
                <div className="text-center py-8 text-gray-300">
                  No resumes found. Upload a resume to get started.
                </div>
              ) : (
                userResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-[#1a0745]/50 backdrop-blur-sm p-6 rounded-xl border border-[#3d1c8f] shadow-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {resume.title}
                        </h3>
                        <p className="text-sm text-gray-300">{resume.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[#ff9f5a] font-medium">
                          ATS Score: {resume.atsScore}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button className="px-4 py-2 bg-[#1a0745] text-gray-300 rounded-lg border border-[#3d1c8f] hover:border-[#ff9f5a] transition-colors duration-200 text-sm">View</button>
                      <button className="px-4 py-2 bg-[#1a0745] text-gray-300 rounded-lg border border-[#3d1c8f] hover:border-[#ff9f5a] transition-colors duration-200 text-sm">Download</button>
                      <button className="px-4 py-2 bg-[#1a0745] text-gray-300 rounded-lg border border-[#3d1c8f] hover:border-[#ff9f5a] transition-colors duration-200 text-sm">Optimize Again</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 