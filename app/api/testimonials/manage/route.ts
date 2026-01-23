import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  return password === adminPassword;
}

function verifyAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin_authenticated');
  if (!authCookie) {
    return false;
  }
  const adminPassword = process.env.ADMIN_PASSWORD;
  return authCookie.value === adminPassword;
}

// PATCH /api/testimonials/manage - Approve a testimonial
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;

    // Verify authentication (cookie or password)
    const isAuthenticatedViaCookie = verifyAuth(request);
    const isAuthenticatedViaPassword = password && verifyPassword(password);

    if (!isAuthenticatedViaCookie && !isAuthenticatedViaPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    // Approve testimonial
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved: true },
    });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Testimonial approved successfully' });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return NextResponse.json({ error: 'Failed to approve testimonial' }, { status: 500 });
  }
}

// DELETE /api/testimonials/manage - Delete a testimonial
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;

    // Verify authentication (cookie or password)
    const isAuthenticatedViaCookie = verifyAuth(request);
    const isAuthenticatedViaPassword = password && verifyPassword(password);

    if (!isAuthenticatedViaCookie && !isAuthenticatedViaPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
