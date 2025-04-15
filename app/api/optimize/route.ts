import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = "AIzaSyCoRFO_sEpSyIZg11QaemgNhiVqjSpjz1o";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { resumeData, atsScore } = await req.json();

    // First call for suggestions
    const suggestionsResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a professional resume optimization expert. Analyze this resume and provide specific, actionable suggestions for improvement. Current ATS score: ${atsScore}%. Resume data: ${JSON.stringify(resumeData)}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!suggestionsResponse.ok) {
      const errorText = await suggestionsResponse.text();
      console.error('Suggestions API Error:', errorText);
      throw new Error(`API request failed: ${suggestionsResponse.status} - ${errorText}`);
    }

    const suggestionsData = await suggestionsResponse.json();
    console.log('Suggestions Response:', suggestionsData); // Debug log
    const suggestions = suggestionsData.candidates?.[0]?.content?.parts?.[0]?.text?.split('\n').filter(Boolean) || [];

    // Second call for optimization
    const optimizedResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a professional resume writer. Rewrite this resume to optimize it for ATS systems while maintaining a professional tone. Resume data: ${JSON.stringify(resumeData)}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!optimizedResponse.ok) {
      const errorText = await optimizedResponse.text();
      console.error('Optimization API Error:', errorText);
      throw new Error(`API request failed: ${optimizedResponse.status} - ${errorText}`);
    }

    const optimizedData = await optimizedResponse.json();
    console.log('Optimization Response:', optimizedData); // Debug log
    const optimizedResume = optimizedData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ suggestions, optimizedResume });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ 
      error: `Failed to optimize resume: ${error.message}`,
      details: error.stack
    }, { status: 500 });
  }
} 