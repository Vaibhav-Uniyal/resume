'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { signIn, signOut, useSession } from 'next-auth/react';
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
        setLoading(false);
      } else {
        // Wait briefly for the auth state to update
        setTimeout(() => {
          // Redirect to home page with success message
          router.push('/?login=success');
        }, 100);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <Loader fullScreen color="#9333EA" />;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      
      <main className="w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {!session ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 w-[360px] text-gray-900 border border-[#EBD5FF]">
              <h1 className="text-2xl font-display font-bold gradient-text mb-6">Login</h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-200">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded border border-green-200">
                  {success}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 bg-[#FAF5FF] border border-[#EBD5FF] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA] transition-colors duration-200"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 bg-[#FAF5FF] border border-[#EBD5FF] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA] transition-colors duration-200"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#9333EA] text-white rounded-xl font-bold 
                            hover:bg-[#7C22CE] transition-all duration-300 shadow-[0_0_10px_rgba(147,51,234,0.3)]
                            disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? <Loader size="24" color="white" /> : 'Login'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-700">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-[#9333EA] hover:text-[#7C22CE] transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-display font-bold text-[#9333EA]">My Resumes</h1>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-700 hover:text-[#9333EA] transition-colors duration-200"
                >
                  Logout
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid gap-6">
                {userResumes.length === 0 ? (
                  <div className="text-center py-8 text-gray-700">
                    No resumes found. Upload a resume to get started.
                  </div>
                ) : (
                  userResumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="bg-white p-6 rounded-xl border border-[#EBD5FF] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {resume.title}
                          </h3>
                          <p className="text-sm text-gray-700">{resume.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-700">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-[#9333EA] font-medium">
                            ATS Score: {resume.atsScore}%
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button className="px-4 py-2 bg-[#FAF5FF] text-gray-700 rounded-lg border border-[#EBD5FF] hover:border-[#9333EA] transition-colors duration-200 text-sm">View</button>
                        <button className="px-4 py-2 bg-[#FAF5FF] text-gray-700 rounded-lg border border-[#EBD5FF] hover:border-[#9333EA] transition-colors duration-200 text-sm">Download</button>
                        <button className="px-4 py-2 bg-[#FAF5FF] text-gray-700 rounded-lg border border-[#EBD5FF] hover:border-[#9333EA] transition-colors duration-200 text-sm">Optimize Again</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 