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
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      
      <main className="w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-10 w-[360px] text-gray-900 border border-[#EBD5FF]">
            <h1 className="text-2xl font-display font-bold gradient-text mb-6">Create Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-[#FAF5FF] border border-[#EBD5FF] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA] transition-colors duration-200"
                  required
                  minLength={2}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-[#FAF5FF] border border-[#EBD5FF] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA] transition-colors duration-200"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-[#FAF5FF] border border-[#EBD5FF] rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 focus:border-[#9333EA] transition-colors duration-200"
                  required
                  minLength={6}
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
                {loading ? (
                  <Loader size="24" color="white" />
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-700">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#9333EA] hover:text-[#7C22CE] transition-colors duration-200"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 