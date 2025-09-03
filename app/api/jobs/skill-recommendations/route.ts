import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { enhanceJobRecommendations } from '../../../utils/jobSearchService';

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
    const { skills, location = 'us' } = await request.json();

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'Valid skills array is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `You are a career advisor. Based on the following skills, provide 5 specific job recommendations that would be suitable for someone with these skills.

SKILLS: ${skills.join(', ')}

TASK:
Provide 5 job recommendations with the following details for each:
1. Job Title (specific and realistic)
2. Industry (specific sector)
3. Required Skills (mix of provided skills + related skills)
4. Experience Level (Entry, Mid, Senior)
5. Brief Job Description (2-3 sentences)
6. Match Reason (why this job fits these skills)

RESPONSE FORMAT:
Return ONLY a JSON object in this exact structure:

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

STRICT RULES:
- Return exactly 5 job recommendations
- Use realistic job titles and industries
- Include a mix of the provided skills in requiredSkills
- Make descriptions specific and professional
- DO NOT include any text outside the JSON structure
- Ensure all fields are properly filled`;

    // Configure generation parameters for more reliable responses
    const generationConfig = {
      temperature: 0.3, // Lower temperature for more consistent output
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    };
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw response from Gemini for skill recommendations:", text.substring(0, 300));
    
    try {
      // Clean the response to ensure it's valid JSON
      let cleanedText = text.trim();
      
      // Try to extract JSON from markdown code blocks
      const jsonMatch = cleanedText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleanedText = jsonMatch[1];
      } else {
        // Try to extract JSON from the text
        const jsonStart = cleanedText.indexOf('{');
        const jsonEnd = cleanedText.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
        }
      }
      
      console.log("Cleaned JSON text:", cleanedText.substring(0, 200));
      
      // Attempt to parse the JSON response
      const data = JSON.parse(cleanedText);
      console.log("Successfully parsed job recommendations:", data);
      
      // Enhance recommendations with real jobs from Adzuna
      if (data.recommendations && Array.isArray(data.recommendations)) {
        console.log("Enhancing recommendations with real jobs...");
        console.log("Original recommendations count:", data.recommendations.length);
        try {
          const enhancedRecommendations = await enhanceJobRecommendations(data.recommendations, location);
          console.log("Enhanced recommendations count:", enhancedRecommendations.length);
          console.log("First enhanced recommendation:", enhancedRecommendations[0]);
          return NextResponse.json({
            ...data,
            recommendations: enhancedRecommendations,
            enhanced: true,
            location
          });
        } catch (enhanceError) {
          console.error("Error enhancing recommendations:", enhanceError);
          return NextResponse.json({
            ...data,
            enhanced: false,
            location,
            enhanceError: enhanceError instanceof Error ? enhanceError.message : 'Unknown error'
          });
        }
      }
      
      return NextResponse.json(data);
    } catch (jsonError) {
      console.error('Error parsing JSON from Gemini:', jsonError);
      console.log('Raw text that failed to parse:', text);
      
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
      
      console.log("Using fallback recommendations due to JSON parsing error");
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