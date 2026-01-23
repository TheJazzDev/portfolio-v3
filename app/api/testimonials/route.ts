import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/testimonials - Get all approved testimonials (custom order or most recent first)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
      },
      orderBy: [
        {
          order: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST /api/testimonials - Submit a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, company, email, project, message } = body;

    // Validate required fields
    if (!name || !role || !company || !project || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new testimonial
    const newTestimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        company: company.trim(),
        email: email?.trim() || null,
        project: project.trim(),
        message: message.trim(),
        approved: false,
      },
    });

    return NextResponse.json(
      { message: 'Testimonial submitted successfully', id: newTestimonial.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
