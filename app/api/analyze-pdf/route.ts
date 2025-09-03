import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumePDFWithGemini } from '../../utils/geminiApi';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const action = formData.get('action') as string; // 'analyze' or 'extract'
    
    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }
    
    if (!action || !['analyze', 'extract'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be either "analyze" or "extract"' },
        { status: 400 }
      );
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileExtension = fileName.toLowerCase().split('.').pop();
    
    if (fileExtension !== 'pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported for direct Gemini analysis' },
        { status: 400 }
      );
    }
    
    console.log(`Processing PDF file: ${fileName}, action: ${action}`);
    
    try {
      if (action === 'analyze') {
        // Analyze the PDF directly with Gemini
        const analysisResult = await analyzeResumePDFWithGemini(buffer);
        console.log('Successfully analyzed PDF with Gemini');
        
        return NextResponse.json({
          success: true,
          analysis: analysisResult,
          fileName: fileName
        });
      } else if (action === 'extract') {
        // Extract raw text from PDF using Gemini
        const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = await import('@google/generative-ai');
        
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        
        const prompt = `
Extract all the text content from this PDF resume. Return ONLY the raw text content without any formatting, explanations, or additional text. Preserve the structure and organization of the resume content exactly as it appears in the document.
`;

        const result = await model.generateContent({
          contents: [{
            role: "user",
            parts: [
              {
                inlineData: {
                  data: buffer.toString('base64'),
                  mimeType: 'application/pdf'
                }
              },
              {
                text: prompt
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 4096,
          },
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        });

        const response = await result.response;
        const extractedText = response.text();
        
        console.log(`Successfully extracted ${extractedText.length} characters from PDF using Gemini`);
        
        return NextResponse.json({
          success: true,
          text: extractedText.trim(),
          fileName: fileName
        });
      }
    } catch (error) {
      console.error(`Error processing PDF with Gemini (${action}):`, error);
      return NextResponse.json(
        { error: `Failed to ${action} PDF using Gemini API. The file may be corrupted or in an unsupported format.` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Unexpected error during PDF processing:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during PDF processing. Please try again with a different file.' },
      { status: 500 }
    );
  }
}
