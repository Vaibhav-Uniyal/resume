'use client';

import { useState } from 'react';
import FingerprintButton from './FingerprintButton';

const AuthExample = () => {
  const [authenticated, setAuthenticated] = useState(false);
  
  const handleSuccess = () => {
    setAuthenticated(true);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Fingerprint Authentication
      </h2>
      
      {authenticated ? (
        <div className="text-center">
          <div className="text-green-600 font-medium text-xl mb-4">
            Authentication Successful!
          </div>
          <p className="text-gray-600">
            You have been securely authenticated using fingerprint recognition.
          </p>
          <button
            onClick={() => setAuthenticated(false)}
            className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-600 text-center mb-4">
            Use fingerprint authentication to securely access your account.
          </p>
          <FingerprintButton 
            onSuccess={handleSuccess}
            text="Authenticate with fingerprint"
          />
        </div>
      )}
    </div>
  );
};

export default AuthExample; 