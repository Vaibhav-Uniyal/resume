'use client';

import React, { useState, useEffect } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import mammoth from 'mammoth';
import { useResumeContext } from '../context/ResumeContext';

// Import types but not the actual library on server
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import type { PDFDocumentProxy } from 'pdfjs-dist';

// Define variables to store PDF.js modules
let pdfjs: any;
let GlobalWorkerOptions: any;

// Function to initialize PDF.js only on client side
const initPdfJS = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Dynamically import PDF.js only on client-side
    const pdfJsModule = await import('pdfjs-dist');
    pdfjs = pdfJsModule;
    GlobalWorkerOptions = pdfJsModule.GlobalWorkerOptions;
    
    // Set the worker source
    const workerSrc = `/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = workerSrc;
    
    // Disable canvas dependencies that cause webpack issues
    // @ts-ignore - The property exists at runtime but not in TypeScript definitions
    if (typeof pdfJsModule.disableWorker !== 'undefined') {
      // @ts-ignore - Force disable worker to avoid canvas dependencies
      pdfJsModule.disableWorker = true;
    }
    
    console.log('PDF.js initialized successfully with worker path:', workerSrc);
  } catch (error) {
    console.error('Error initializing PDF.js:', error);
  }
};

interface ResumeUploadProps {
  onUpload: (text: string) => void;
}

const animations: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pasteText, setPasteText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setResumeText, setOriginalText } = useResumeContext();
  const [isPdfJsReady, setIsPdfJsReady] = useState(false);

  // Initialize PDF.js on component mount
  useEffect(() => {
    initPdfJS().then(() => setIsPdfJsReady(true));
  }, []);

  // Function to extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (!isPdfJsReady) {
      await initPdfJS();
      setIsPdfJsReady(true);
    }
    
    try {
      const data = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ 
        data, 
        disableWorker: true,
        disableAutoFetch: true,
        disableStream: true
      }).promise;
      
      let allTextContent: string[] = [];
      const numPages = pdf.numPages;
      
      // Process pages in parallel with concurrency limit
      const pagePromises: Promise<string>[] = [];
      const CONCURRENCY_LIMIT = 5; // Process 5 pages at a time
      
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        // Process pages with concurrency limit
        if (pagePromises.length >= CONCURRENCY_LIMIT) {
          allTextContent.push(await pagePromises.shift()!);
        }
        
        const pagePromise = processPage(pdf, pageNum);
        pagePromises.push(pagePromise);
      }
      
      // Process any remaining pages
      while (pagePromises.length > 0) {
        allTextContent.push(await pagePromises.shift()!);
      }
      
      const fullText = allTextContent.join("\n\n");
      console.log(`Extracted ${fullText.length} characters from PDF (${numPages} pages)`);
      return fullText.trim();
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error("Failed to extract text from PDF. Please try another file or paste text directly.");
    }
  };

  // Helper function to process a single PDF page
  const processPage = async (pdf: any, pageNum: number): Promise<string> => {
    try {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Simple approach to reduce dependencies
      const pageText = textContent.items
        .filter((item: any) => "str" in item)
        .map((item: any) => item.str)
        .join(" ");
      
      return pageText;
    } catch (error) {
      console.error(`Error processing page ${pageNum}:`, error);
      return ""; // Return empty string for failed pages rather than breaking entire process
    }
  };

  // Function to extract text from DOCX files
  const extractTextFromDOCX = async (file: File): Promise<string> => {
    try {
      // Using mammoth.js to extract text from DOCX
      const data = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: data });
      
      if (!result.value) {
        throw new Error("No text content found in the document");
      }
      
      console.log(`Extracted ${result.value.length} characters from DOCX`);
      return result.value.trim();
    } catch (error) {
      console.error("Error extracting text from DOCX:", error);
      throw new Error("Failed to extract text from DOCX. Please try another file or paste text directly.");
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    // Add file size validation - 10MB limit
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    try {
      console.log(`Processing ${file.name}, type: ${file.type}, size: ${(file.size / 1024).toFixed(2)}KB`);
      
      let text = '';
      
      // Extract text based on file type
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDOCX(file);
      } else if (file.type === 'text/plain') {
        text = await file.text();
        console.log(`Extracted ${text.length} characters from text file`);
      } else {
        // Try to read as text for unknown types
        console.log(`Unknown file type: ${file.type}, attempting to read as text`);
        text = await file.text();
      }
      
      if (!text || !text.trim()) {
        throw new Error("No text could be extracted from this file. Please try another file or paste text directly.");
      }
      
      console.log(`Processing complete. Extracted ${text.length} characters.`);
      console.log("Text sample:", text.substring(0, 200) + (text.length > 200 ? "..." : ""));
      
      // Store the original text in context
      setOriginalText(text);
      setResumeText(text);
      
      // Also call the onUpload prop to maintain compatibility
      onUpload(text);
    } catch (error) {
      console.error("Error processing file:", error);
      setError(error instanceof Error ? error.message : "Failed to process file");
    } finally {
      setProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handlePasteSubmit = () => {
    if (pasteText.trim()) {
      // Store the pasted text in context
      setOriginalText(pasteText);
      setResumeText(pasteText);
      
      // Also call the onUpload prop to maintain compatibility
      onUpload(pasteText);
    }
  };

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 w-full"
    >
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center ${
            activeTab === 'upload'
              ? 'bg-purple-500 text-black'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 text-center ${
            activeTab === 'paste'
              ? 'bg-purple-500 text-black'
              : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          Paste Text
        </button>
      </div>

      {error && (
        <div className="bg-red-800/30 border border-red-600 text-white px-4 py-3 rounded">
          {error}
        </div>
      )}

      {activeTab === 'upload' ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-12 transition-all duration-300 cursor-pointer
                     ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} disabled={processing} />
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="text-base sm:text-lg text-gray-300 mb-2">Upload your resume</p>
              <p className="text-xs sm:text-sm text-gray-500">PDF, DOCX, or TXT files</p>
            </div>
            {processing ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing file...</span>
              </div>
            ) : (
              <button className="px-4 sm:px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
                Select File
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-48 sm:h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl 
                     text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim()}
              className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                       hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResumeUpload; 