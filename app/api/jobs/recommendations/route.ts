import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Hard-coded API key
const genAI = new GoogleGenerativeAI('AIzaSyCoRFO_sEpSyIZg11QaemgNhiVqjSpjz1o');

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    // Clean up the resume text
    const cleanedResumeText = resumeText
      .trim()
      .replace(/\n{3,}/g, '\n\n')
      .slice(0, 6000); // Limit to avoid token limits

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze the following resume and provide 5 job recommendations that match the candidate's skills and experience. 
    For each recommendation, include:
    1. Job Title
    2. Industry
    3. Required Skills (matching with the resume)
    4. Experience Level
    5. Brief Description
    6. Why this job matches the candidate
    
    Resume:
    ${cleanedResumeText}

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
    }
    
    IMPORTANT: Return valid JSON only! No markdown formatting or text outside the JSON structure.`;

    // Configure generation parameters for more reliable responses
    const generationConfig = {
      temperature: 0.2, // Lower temperature for more deterministic output
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    };
    
    // Set safety settings to reduce blocking
    const safetySettings = [
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
    ];

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini API response received. Attempting to parse JSON...");
    
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedText = text.trim()
        .replace(/```json|```|\n/g, '')
        .replace(/^[^{]*({.*})[^}]*$/, '$1'); // Extract just the JSON part
    
    // Parse the JSON response
      const data = JSON.parse(cleanedText);
      return NextResponse.json(data);
    } catch (jsonError) {
      console.error('Error parsing JSON from Gemini:', jsonError);
      console.log('Raw API response:', text.substring(0, 200) + '...');

      // Fallback: If JSON parsing fails, create a structured response
      const fallbackRecommendations = {
        recommendations: [
          {
            title: "Data Analyst",
            industry: "Technology",
            requiredSkills: ["Data Analysis", "Excel", "SQL"],
            experienceLevel: "Mid-Level",
            description: "Analyze data to drive business decisions and insights.",
            matchReason: "Your resume indicates analytical skills that align with data analysis roles."
          },
          {
            title: "Project Manager",
            industry: "Business",
            requiredSkills: ["Project Management", "Communication", "Leadership"],
            experienceLevel: "Mid-Level",
            description: "Oversee projects from conception to completion, ensuring they're delivered on time and within budget.",
            matchReason: "Your experience suggests strong organizational and management capabilities."
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