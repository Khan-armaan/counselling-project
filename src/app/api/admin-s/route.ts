// app/api/students/route.ts (Next.js 13) OR pages/api/students.ts (Next.js <13)
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all students along with selected fields
    const students = await prisma.student.findMany({
      select: {
        reg_id: true,
        name: true,
        email: true,
        address: true,
        X_per: true,
        XII_per: true,
        branch_assign: true,
        father_name: true,
        pref_1: true,
        pref_2: true,
        pref_3: true,
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Error retrieving students:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
