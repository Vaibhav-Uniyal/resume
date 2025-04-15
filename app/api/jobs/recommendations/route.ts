import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze the following resume and provide 5 job recommendations that match the candidate's skills and experience. 
    For each recommendation, include:
    1. Job Title
    2. Industry
    3. Required Skills (matching with the resume)
    4. Experience Level
    5. Brief Description
    6. Why this job matches the candidate
    
    Resume:
    ${resumeText}

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
    
    // Parse the JSON response
    const recommendations = JSON.parse(text);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error generating job recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate job recommendations' },
      { status: 500 }
    );
  }
} 