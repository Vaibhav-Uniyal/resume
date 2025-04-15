'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileCode, FaDownload } from 'react-icons/fa';

interface DownloadOptionsProps {
  resumeText: string;
  onBack: () => void;
}

export default function DownloadOptions({ resumeText, onBack }: DownloadOptionsProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (format: string) => {
    setDownloading(format);
    try {
      // Mock download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a Blob with the resume text
      const blob = new Blob([resumeText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `optimized-resume.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(null);
    }
  };

  const downloadOptions = [
    {
      format: 'PDF',
      icon: FaFilePdf,
      description: 'Best for sending to employers',
      color: 'from-red-500 to-red-600'
    },
    {
      format: 'DOCX',
      icon: FaFileWord,
      description: 'Editable Word document',
      color: 'from-blue-500 to-blue-600'
    },
    {
      format: 'TXT',
      icon: FaFileCode,
      description: 'Plain text format',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-text">Download Your Resume</h2>
        <p className="text-content-muted mt-2">
          Choose your preferred format to download the optimized resume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {downloadOptions.map((option) => (
          <motion.div
            key={option.format}
            whileHover={{ scale: 1.05 }}
            className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer"
            onClick={() => handleDownload(option.format)}
          >
            <div className="text-center space-y-4">
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${option.color}`}>
                <option.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">{option.format}</h3>
              <p className="text-content-muted text-sm">{option.description}</p>
              <button
                className="w-full px-4 py-2 bg-gradient-primary text-white rounded-full
                         hover:shadow-button transform transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={downloading === option.format}
              >
                {downloading === option.format ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaDownload size={16} />
                    <span>Download</span>
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-background-light/10 text-white rounded-full
                   hover:bg-background-light/20 transition-all duration-300"
        >
          Back to Interview Questions
        </button>
      </div>
    </motion.div>
  );
} 