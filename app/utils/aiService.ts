import { GoogleGenerativeAI } from '@google/generative-ai';

interface OptimizeResumeRequest {
  resumeText: string;
  jobTitle: string;
  jobDescription: string;
}

interface OptimizeResumeResponse {
  optimizedResume: string;
  score: number;
}

// Client-side optimization that uses the API route
export async function optimizeResumeForJob({
  resumeText,
  jobTitle,
  jobDescription,
}: OptimizeResumeRequest): Promise<OptimizeResumeResponse> {
  try {
    // Call the API route instead of calling Gemini directly
    const response = await fetch('/api/optimize-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobTitle,
        jobDescription,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to optimize resume');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw new Error('Failed to optimize resume. Please try again.');
  }
}

// Server-side optimization function that can be used directly in API routes
export async function optimizeResumeServerSide({
  resumeText,
  jobTitle,
  jobDescription,
}: OptimizeResumeRequest): Promise<OptimizeResumeResponse> {
  try {
    // API key and endpoint from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const apiEndpoint = process.env.NEXT_PUBLIC_GEMINI_API_ENDPOINT;
    
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use Gemini 2.0 Flash model
    const modelName = 'gemini-2.0-flash';
    
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Simplified prompt
    const prompt = `Optimize this resume for ATS compatibility for the job: ${jobTitle}.
Job Description: ${jobDescription.substring(0, 2000)}
Resume: ${resumeText.substring(0, 3000)}

Improve the resume by:
1. Adding relevant keywords from the job description
2. Formatting with clear sections and bullet points
3. Highlighting relevant experience
4. Using action verbs
5. Quantifying achievements where possible

Return ONLY the optimized resume text in markdown format with no explanations.`;

    try {
      console.log('Using Gemini model:', modelName);
      console.log('Prompt length:', prompt.length);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw API response length:', text.length);
      console.log('Response sample:', text.substring(0, 200));

      return {
        optimizedResume: text || "Could not generate optimized resume.",
        score: 85
      };
    } catch (apiError) {
      console.error('API Error:', apiError);
      throw new Error('Failed to generate content from Gemini API');
    }
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw new Error('Failed to optimize resume. Please try again.');
  }
} 