'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Mock data for previously uploaded resumes
const mockResumes = [
  {
    id: 1,
    title: 'Software Engineer Resume',
    date: '2024-03-15',
    atsScore: 85,
    jobTitle: 'Senior Software Engineer',
  },
  {
    id: 2,
    title: 'Product Manager Resume',
    date: '2024-03-10',
    atsScore: 92,
    jobTitle: 'Product Manager',
  },
  {
    id: 3,
    title: 'Data Analyst Resume',
    date: '2024-03-05',
    atsScore: 78,
    jobTitle: 'Data Analyst',
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate credentials here
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-white to-background-light">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto card p-8"
          >
            <h1 className="text-2xl font-display font-bold gradient-text mb-6">Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
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
                  className="input-field"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-display font-bold gradient-text">My Resumes</h1>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Logout
              </button>
            </div>

            <div className="grid gap-6">
              {mockResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-600">{resume.jobTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{resume.date}</div>
                      <div className="text-primary font-medium">
                        ATS Score: {resume.atsScore}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button className="btn-secondary text-sm">View</button>
                    <button className="btn-secondary text-sm">Download</button>
                    <button className="btn-secondary text-sm">Optimize Again</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
} 