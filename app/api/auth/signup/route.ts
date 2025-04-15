import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    try {
      const { db } = await connectToDatabase();

      // Check if user already exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      // Create user
      const result = await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return NextResponse.json({
        message: 'User created successfully',
        userId: result.insertedId,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 