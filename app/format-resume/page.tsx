'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';

type FormatType = 'pdf' | 'docx' | 'txt';

export default function FormatResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setConvertedUrl(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is a valid resume format (PDF, DOCX, or TXT)
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOCX, or TXT file.');
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview URL for the file
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  const handleFormatChange = (format: FormatType) => {
    setSelectedFormat(format);
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }
    
    // Check if we're converting from PDF to another format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    setIsConverting(true);
    setError(null);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', selectedFormat);
      
      // Send the file to our API for conversion
      const response = await fetch('/api/converted-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        // Try to parse error message from JSON response
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error converting file');
        } catch (e) {
          if (fileExtension === 'pdf' && selectedFormat === 'docx') {
            throw new Error('PDF to DOCX conversion is challenging for complex PDFs. Try a simpler PDF or convert to TXT first.');
          } else {
            throw new Error('Error converting file. Please try a different format or file.');
          }
        }
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF5FF] font-['Poppins']">
      <Navbar />
      
      <main className="w-full pt-24 pb-12">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-[#EBD5FF]">
            <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#6821A8]">
              Format Resume
            </h1>
            
            <p className="text-center text-gray-700 mb-8">
              Convert your resume between different formats. Upload your resume file and select your desired output format.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Upload section */}
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-[#EBD5FF] rounded-lg p-8 text-center cursor-pointer hover:border-[#9333EA] transition-colors duration-200"
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                  />
                  
                  {!file ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-[#FAF5FF] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Upload your resume</p>
                        <p className="text-gray-500 text-sm mt-1">PDF, DOCX, or TXT</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-[#FAF5FF] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium truncate max-w-xs mx-auto">{file.name}</p>
                        <button 
                          className="text-[#9333EA] text-sm hover:underline mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          Change file
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}
                
                {/* Format Options */}
                <div className="bg-[#FAF5FF]/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Choose Format</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormatOption 
                      format="pdf"
                      selected={selectedFormat === 'pdf'}
                      onClick={() => handleFormatChange('pdf')}
                    />
                    <FormatOption 
                      format="docx"
                      selected={selectedFormat === 'docx'}
                      onClick={() => handleFormatChange('docx')}
                    />
                    <FormatOption 
                      format="txt"
                      selected={selectedFormat === 'txt'}
                      onClick={() => handleFormatChange('txt')}
                    />
                  </div>
                  
                  <button
                    className={`mt-6 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 
                      ${file 
                        ? 'bg-[#9333EA] text-white hover:bg-[#7C22CE] shadow-[0_0_10px_rgba(147,51,234,0.3)]' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    onClick={handleConvert}
                    disabled={!file || isConverting}
                  >
                    {isConverting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Converting...
                      </div>
                    ) : (
                      `Convert to ${selectedFormat.toUpperCase()}`
                    )}
                  </button>
                </div>
              </div>
              
              {/* Right side - Preview and download */}
              <div>
                <div className="bg-white border border-[#EBD5FF] rounded-lg h-80 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 mb-4">
                        <svg className="w-full h-full text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium text-center">Resume Preview</p>
                      <p className="text-gray-500 text-sm truncate max-w-xs">{file?.name}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center p-6">Upload a resume to see preview</p>
                  )}
                </div>
                
                {convertedUrl && (
                  <motion.div 
                    className="mt-6 bg-green-50 p-6 rounded-lg border border-green-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-medium">Conversion Complete</p>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      Your resume has been successfully converted to {selectedFormat.toUpperCase()} format and is ready for download.
                    </p>
                    
                    <a
                      href={convertedUrl}
                      download={`resume.${selectedFormat}`}
                      className="inline-flex items-center px-4 py-2 bg-[#35C687] text-white rounded-lg hover:bg-[#2DAD75] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download {selectedFormat.toUpperCase()}
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface FormatOptionProps {
  format: FormatType;
  selected: boolean;
  onClick: () => void;
}

function FormatOption({ format, selected, onClick }: FormatOptionProps) {
  return (
    <button
      className={`rounded-lg border p-4 transition-all duration-200 flex flex-col items-center justify-center gap-2
        ${selected ? 'border-[#9333EA] bg-[#FAF5FF]' : 'border-gray-200 hover:border-[#9333EA]/50'}`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selected ? 'bg-[#9333EA]' : 'bg-gray-100'}`}>
        <span className={`font-bold ${selected ? 'text-white' : 'text-gray-700'}`}>
          {format === 'pdf' ? 'PDF' : format === 'docx' ? 'DOC' : 'TXT'}
        </span>
      </div>
      <span className="text-sm font-medium text-gray-700">
        .{format}
      </span>
    </button>
  );
} 