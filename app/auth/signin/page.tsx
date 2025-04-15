'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to ResuMate</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            <span>Sign in with Google</span>
          </button>
          
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
} 