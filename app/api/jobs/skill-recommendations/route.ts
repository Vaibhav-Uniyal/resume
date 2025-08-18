import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// API key and endpoint from environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const apiEndpoint = process.env.NEXT_PUBLIC_GEMINI_API_ENDPOINT;

if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set');
}

// Initialize with API key
const genAI = new GoogleGenerativeAI(apiKey);
const MODEL_NAME = 'gemini-2.0-flash';

export async function POST(request: Request) {
  try {
    const { skills } = await request.json();

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'Valid skills array is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `Based on the following skills, provide 5 job recommendations that would be suitable for someone with these skills.
    
    Skills: ${skills.join(', ')}
    
    For each recommendation, include:
    1. Job Title
    2. Industry
    3. Required Skills (especially those matching with the provided skills)
    4. Experience Level (Entry, Mid, Senior)
    5. Brief Job Description
    6. Why this job is a good match for someone with these skills
    
    Format the response as a JSON array with these fields:
    {
      "recommendations": [
        {
          "title": "string",
          "industry": "string",
          "requiredSkills": ["string"],
          "experienceLevel": "string",
          "description": "string",
          "matchReason": "string"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Attempt to parse the JSON response
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (jsonError) {
      console.error('Error parsing JSON from Gemini:', jsonError);
      
      // Fallback: If JSON parsing fails, create a structured response
      const fallbackRecommendations = {
        recommendations: [
          {
            title: "Data Analysis Specialist",
            industry: "Data & Analytics",
            requiredSkills: skills.slice(0, 5),
            experienceLevel: "Mid-Level",
            description: "Analyze and interpret complex data sets to drive business decisions.",
            matchReason: "Your technical skills align well with data analysis requirements."
          }
        ]
      };
      
      return NextResponse.json(fallbackRecommendations);
    }
  } catch (error) {
    console.error('Error generating job recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate job recommendations' },
      { status: 500 }
    );
  }
} 