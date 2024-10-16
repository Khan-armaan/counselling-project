import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { NEXT_AUTH_CONFIG } from '../auth/[...nextauth]/options';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get session information
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch user by email from the session
    const user = await prisma.user_login.findUnique({
      where: { email: session.user.email },
      include: { students: true }, // Include related students
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user information:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user information' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
