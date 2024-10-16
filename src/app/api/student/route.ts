import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      address,
      X_per,
      XII_per,
      father_name,
      pref_1,
      pref_2,
      pref_3,
      user_id,
    } = body;
    console.log('Received body:', body);

    // Validate required fields
    if (!name || !email || !address || !X_per || !XII_per || !father_name || !user_id) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Validate data types
    if (typeof X_per !== 'number' || typeof XII_per !== 'number') {
      return NextResponse.json({ success: false, message: 'X_per and XII_per must be numbers' }, { status: 400 });
    }

    // Create new student record
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        address,
        X_per,
        XII_per,
        father_name,
        pref_1,
        pref_2,
        pref_3,
        user_id,
      },
    });

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: `Failed to create student: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'An unknown error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}