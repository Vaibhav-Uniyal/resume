import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Resume from '@/app/models/Resume';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Only allow users to fetch their own resumes
    if (email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await Resume.find({ userId: email })
      .sort({ createdAt: -1 })
      .select('id title role atsScore createdAt');

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, role, atsScore, originalResume, optimizedResume, userId } = body;

    // Validate that the user is saving their own resume
    if (userId !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = new Resume({
      userId,
      title,
      role,
      atsScore,
      originalResume,
      optimizedResume,
    });

    await resume.save();

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 