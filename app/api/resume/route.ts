import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const text = formData.get('text') as string;

    let resumeText = "";

    if (file) {
      // Handle file upload
      const buffer = await file.arrayBuffer();
      resumeText = `File uploaded: ${file.name}`;
    } else if (text) {
      resumeText = text;
    } else {
      return NextResponse.json(
        { error: "No resume text or file provided" },
        { status: 400 }
      );
    }

    // Sample logic for ATS score calculation
    const atsScore = Math.floor(Math.random() * 100); // Random ATS score for testing
    const suggestions = [
      "Add more relevant keywords.",
      "Use measurable results in your experience section.",
      "Keep the formatting simple and ATS-friendly."
    ];

    return NextResponse.json({
      atsScore,
      suggestions
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Internal server error while analyzing resume" },
      { status: 500 }
    );
  }
} 