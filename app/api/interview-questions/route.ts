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
    
    // Create more realistic, tailored question examples
    const technicalQuestions = [
      `What specific ${jobTitle} tools or technologies are you most proficient with, and how have you applied them in your previous work?`,
      `Describe a complex technical problem you encountered as a ${jobTitle} and how you approached solving it.`,
      `How do you stay updated with the latest advancements relevant to the ${jobTitle} role?`
    ];
    
    const projectQuestions = [
      `Tell me about a project that best demonstrates your capabilities as a ${jobTitle}. What was your specific contribution?`,
      `Describe a situation where you had to overcome significant challenges on a project. What strategies did you implement?`,
      `How do you prioritize tasks and manage deadlines when working on multiple ${jobTitle.toLowerCase()} projects simultaneously?`
    ];
    
    const culturalQuestions = [
      `Our company values collaborative problem-solving. Can you share an example of how you've contributed to a team-based solution?`,
      `How do you adapt your communication style when explaining complex ${jobTitle.toLowerCase()} concepts to non-technical stakeholders?`,
      `What type of work environment brings out your best performance as a ${jobTitle}?`
    ];
    
    const challengeQuestions = [
      `What do you consider the most challenging aspect of being a ${jobTitle}, and how do you address it?`,
      `Describe a time when you received critical feedback about your work. How did you respond and what did you learn?`,
      `How do you handle tight deadlines or sudden changes in project requirements?`
    ];
    
    const categories = [
      { 
        category: `${jobTitle} Technical Skills`, 
        questions: technicalQuestions 
      },
      { 
        category: 'Project Experience', 
        questions: projectQuestions 
      },
      { 
        category: 'Company Cultural Fit', 
        questions: culturalQuestions 
      },
      { 
        category: 'Role Challenges', 
        questions: challengeQuestions 
      }
    ];

    // Tailored interview tips
    const tips = [
      `Research the company's recent projects related to ${jobTitle} roles and be prepared to discuss how your experience aligns`,
      'Prepare 2-3 specific examples for each key skill mentioned in the job description',
      'Practice the STAR method (Situation, Task, Action, Result) for behavioral questions',
      `Prepare thoughtful questions about the team structure, daily responsibilities, and growth opportunities for ${jobTitle}s`
    ];

    return NextResponse.json({
      categories,
      tips
    });
  } catch (error) {
    console.error('Interview questions generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
} 