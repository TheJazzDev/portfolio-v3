import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function verifyAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin_authenticated');
  if (!authCookie) {
    return false;
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  return authCookie.value === adminPassword;
}

// POST /api/testimonials/reorder - Reorder testimonials
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { orderedIds } = body; // Array of testimonial IDs in desired order

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 });
    }

    // Update order field for each testimonial
    await Promise.all(
      orderedIds.map((id, index) =>
        prisma.testimonial.updateMany({
          where: {
            id,
            approved: true,
          },
          data: {
            order: index,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error reordering testimonials:', error);
    return NextResponse.json({ error: 'Failed to reorder testimonials' }, { status: 500 });
  }
}
