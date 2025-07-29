'use client';

import { useState, useEffect } from 'react';
import './fingerprint-animation.css';
import { useRouter } from 'next/navigation';

interface FingerprintButtonProps {
  onSuccess?: () => void;
  className?: string;
  redirectPath?: string;
  text?: string;
}

const FingerprintButton = ({
  onSuccess,
  className = '',
  redirectPath,
  text = 'Login with fingerprint'
}: FingerprintButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const router = useRouter();

  const handleClick = async () => {
    if (status !== 'idle') return;
    
    setStatus('loading');
    
    // Simulate fingerprint authentication
    setTimeout(() => {
      setStatus('success');
      
      // After successful authentication
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        
        if (redirectPath) {
          router.push(redirectPath);
        }
      }, 1000);
    }, 2000);
  };

  useEffect(() => {
    // Reset to idle if there was an error
    if (status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <button
      onClick={handleClick}
      disabled={status !== 'idle'}
      className={`
        fingerprint-button 
        relative w-full flex items-center justify-center 
        py-2 px-4 rounded-md bg-purple-600 hover:bg-purple-700 
        text-white font-medium transition-all duration-200 
        disabled:opacity-70 ${status !== 'idle' ? status : ''} ${className}
      `}
    >
      <div className="fingerprint-container">
        <span className="fingerprint-text">{text}</span>
        <div className="fingerprint-sensor">
          <div className="fingerprint-lines"></div>
          <div className="fingerprint-success"></div>
        </div>
      </div>
    </button>
  );
};

export default FingerprintButton; 