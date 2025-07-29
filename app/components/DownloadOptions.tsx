'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileCode, FaDownload } from 'react-icons/fa';
import AnimatedDownloadButton from './AnimatedDownloadButton';

interface DownloadOptionsProps {
  resumeText: string;
  onBack: () => void;
}

export default function DownloadOptions({ resumeText, onBack }: DownloadOptionsProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async (format: string) => {
    setDownloading(format);
    setSelectedFormat(format);
    try {
      // Mock download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (format === 'PDF') {
        // Create a styled version of the text for better formatting
        const formattedText = resumeText.replace(/\n/g, '<br>');
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Optimized Resume</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 30px; line-height: 1.6; }
              h1, h2, h3 { color: #333; }
              .resume-container { max-width: 800px; margin: 0 auto; }
            </style>
          </head>
          <body>
            <div class="resume-container">
              ${formattedText}
            </div>
          </body>
          </html>
        `;
        
        // Create blob with HTML content
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `optimized_resume_${new Date().toISOString().slice(0,10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (format === 'DOCX') {
        // Create an HTML document that Word can open
        const htmlContent = `
          <!DOCTYPE html>
          <html xmlns:o='urn:schemas-microsoft-com:office:office' 
                xmlns:w='urn:schemas-microsoft-com:office:word'
                xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset="utf-8">
            <title>Resume</title>
            <!--[if gte mso 9]>
            <xml>
              <w:WordDocument>
                <w:View>Print</w:View>
                <w:Zoom>90</w:Zoom>
                <w:DoNotOptimizeForBrowser/>
              </w:WordDocument>
            </xml>
            <![endif]-->
            <style>
              /* Style for Word document */
              body {
                font-family: Calibri, sans-serif;
                font-size: 11pt;
                line-height: 1.5;
              }
              h1, h2, h3, h4, h5, h6 {
                font-family: Calibri, sans-serif;
                font-weight: bold;
                margin-top: 12pt;
                margin-bottom: 6pt;
              }
              h1 { font-size: 16pt; }
              h2 { font-size: 14pt; }
              h3 { font-size: 12pt; }
              p { margin: 6pt 0; }
              .section { margin-top: 12pt; }
            </style>
          </head>
          <body>
            ${resumeText.split('\n').map(line => {
              // Style section headings
              if (line.trim().endsWith(':') || (line.toUpperCase() === line && line.trim().length > 0)) {
                return `<h2 class="section">${line}</h2>`;
              }
              
              // Style bullet points
              if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                return `<p style="margin-left: 20px;">• ${line.replace(/^[-•]\s*/, '')}</p>`;
              }
              
              // Look for name at the top
              if (line === resumeText.split('\n')[0] || line === resumeText.split('\n')[1]) {
                if (!line.includes('@') && !line.includes('http') && line.trim().length > 0) {
                  return `<h1>${line}</h1>`;
                }
              }
              
              // Default paragraph styling
              return line.trim() ? `<p>${line}</p>` : '<p>&nbsp;</p>';
            }).join('')}
          </body>
          </html>
        `;
        
        // Create blob with the HTML content
        const blob = new Blob([htmlContent], {
          type: 'application/msword'
        });
        const url = URL.createObjectURL(blob);
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `optimized_resume_${new Date().toISOString().slice(0,10)}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Default TXT format - plain text
        const blob = new Blob([resumeText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `optimized_resume_${new Date().toISOString().slice(0,10)}.${format.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      
      // Show success indicator
      setDownloadSuccess(true);
      
      // Hide after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
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
        <h2 className="text-3xl font-bold text-black">Download Your Resume</h2>
        <p className="text-l text-black mt-2">
          Choose your preferred format to download the optimized resume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {downloadOptions.map((option) => (
          <motion.div
            key={option.format}
            whileHover={{ scale: 1.05 }}
            className="bg-background-light/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="text-center space-y-4">
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${option.color}`}>
                <option.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">{option.format}</h3>
              <p className="text-content-muted text-sm">{option.description}</p>
              
              {selectedFormat === option.format && downloading ? (
                <div className="w-full px-4 py-2 bg-background-light/10 text-black rounded-full flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Downloading...</span>
                </div>
              ) : (
                <AnimatedDownloadButton 
                  onClick={() => handleDownload(option.format)} 
                  text={`Download ${option.format}`}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {downloadSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Resume downloaded successfully!</span>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-background-light/10 text-black rounded-full
                   hover:bg-background-light/20 transition-all duration-300"
        >
          Back to Interview Questions
        </button>
      </div>
    </motion.div>
  );
} 