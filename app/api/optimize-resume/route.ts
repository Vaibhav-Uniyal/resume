import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobTitle, jobDescription } = await req.json();

    // Validate inputs
    if (!resumeText || !jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would call your AI service here
    // For now, we'll simulate a response with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a mock optimized resume by adding a summary section
    // In a real implementation, this would be AI-generated
    const optimizedResume = `# ${jobTitle} Resume

## Professional Summary
A dedicated professional with extensive experience in the technology sector, specially tailored for the ${jobTitle} role. Proven track record of delivering results and addressing challenges similar to those outlined in the job description.

${resumeText}

*This resume has been optimized for the ${jobTitle} position as requested.*
`;

    // Generate a random score between 85-95 to simulate improvement
    const score = Math.floor(Math.random() * 11) + 85;

    return NextResponse.json({
      optimizedResume,
      score,
      message: 'Resume optimized successfully'
    });
  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to optimize resume' },
      { status: 500 }
    );
  }
} 