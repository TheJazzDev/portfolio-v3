import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials/pending - Get all pending testimonials (for admin)
export async function GET() {
  try {
    const pending = await prisma.testimonial.findMany({
      where: {
        approved: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(pending);
  } catch (error) {
    console.error('Error reading pending testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
  }
}
