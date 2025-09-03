import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeWithGemini, analyzeResumePDFWithGemini } from '@/app/utils/geminiApi';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const text = formData.get('text') as string;

    let analysisResult;

    if (file) {
      // Handle file upload - analyze PDF directly
      const buffer = await file.arrayBuffer();
      const pdfBuffer = Buffer.from(buffer);
      
      try {
        analysisResult = await analyzeResumePDFWithGemini(pdfBuffer);
      } catch (error) {
        console.error("Error analyzing PDF with Gemini:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        if (errorMessage.includes('API_KEY')) {
          return NextResponse.json(
            { error: "API configuration error. Please check your Gemini API key." },
            { status: 500 }
          );
        } else if (errorMessage.includes('PDF')) {
          return NextResponse.json(
            { error: "Failed to process PDF. Please ensure the file is a valid PDF and try again." },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { error: `Analysis failed: ${errorMessage}` },
            { status: 500 }
          );
        }
      }
    } else if (text) {
      // Handle text input
      try {
        analysisResult = await analyzeResumeWithGemini(text);
      } catch (error) {
        console.error("Error analyzing text with Gemini:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        if (errorMessage.includes('API_KEY')) {
          return NextResponse.json(
            { error: "API configuration error. Please check your Gemini API key." },
            { status: 500 }
          );
        } else {
          return NextResponse.json(
            { error: `Analysis failed: ${errorMessage}` },
            { status: 500 }
          );
        }
      }
    } else {
      return NextResponse.json(
        { error: "No resume text or file provided" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      atsScore: analysisResult.score,
      suggestions: analysisResult.suggestions,
      keywords: analysisResult.keywords,
      strengths: analysisResult.strengths,
      weaknesses: analysisResult.weaknesses
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Internal server error while analyzing resume" },
      { status: 500 }
    );
  }
} 