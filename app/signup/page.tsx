'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Redirect to login page on successful signup
      router.push('/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="max-w-md mx-auto bg-gradient-to-br from-[#320050]/90 to-[#1e0032]/80 rounded-2xl shadow-[0_0_20px_rgba(183,0,255,0.4),0_0_40px_rgba(100,0,255,0.2)] p-10 w-[360px] text-white backdrop-blur-md border border-white/10">
          <h1 className="text-2xl font-display font-bold gradient-text mb-6">Create Account</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded border border-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-3 bg-white/10 border-none rounded-lg text-white placeholder-white/60 focus:outline-none transition-colors duration-200"
                required
                minLength={2}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 bg-white/10 border-none rounded-lg text-white placeholder-white/60 focus:outline-none transition-colors duration-200"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-3 bg-white/10 border-none rounded-lg text-white placeholder-white/60 focus:outline-none transition-colors duration-200"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-xl font-bold 
                        hover:bg-green-500 transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader size="24" color="white" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#ff9f5a] hover:text-[#ff8c3b] transition-colors duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
} 