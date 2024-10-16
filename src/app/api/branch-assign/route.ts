// /app/api/student/assign-branch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reg_id, branch_assign } = body;

    // Validate required fields
    if (!reg_id || !branch_assign) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Update branch_assign for the specified student
    const updatedStudent = await prisma.student.update({
      where: { reg_id },
      data: { branch_assign },
    });

    return NextResponse.json({ success: true, data: updatedStudent }, { status: 200 });
  } catch (error) {
    console.error('Error assigning branch:', error);
    return NextResponse.json({ success: false, message: 'Failed to assign branch' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
