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

export async function optimizeResumeForJob({
  resumeText,
  jobTitle,
  jobDescription,
}: OptimizeResumeRequest): Promise<OptimizeResumeResponse> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    const prompt = `You are a professional resume optimization expert. Please optimize the following resume for the job position: ${jobTitle}

Job Description:
${jobDescription}

Original Resume:
${resumeText}

Please provide:
1. An optimized version of the resume in markdown format
2. An ATS compatibility score (0-100)

Format your response as a JSON object with two fields:
{
  "optimizedResume": "markdown formatted resume here",
  "score": number between 0-100
}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw API response:', text); // Log the raw response

      try {
        const parsedResponse = JSON.parse(text);
        if (!parsedResponse.optimizedResume || typeof parsedResponse.score !== 'number') {
          throw new Error('Invalid response format');
        }
        return {
          optimizedResume: parsedResponse.optimizedResume,
          score: parsedResponse.score,
        };
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        // If JSON parsing fails, return the raw text with a default score
        return {
          optimizedResume: text,
          score: 75,
        };
      }
    } catch (apiError) {
      console.error('API Error:', apiError);
      throw new Error('Failed to generate content from Gemini API');
    }
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw new Error('Failed to optimize resume. Please try again.');
  }
} 