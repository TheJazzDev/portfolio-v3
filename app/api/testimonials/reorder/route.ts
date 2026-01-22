import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Testimonial } from '@/data/testimonials';

const TESTIMONIALS_FILE = path.join(process.cwd(), 'data', 'testimonials.json');

async function readTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeTestimonials(testimonials: Testimonial[]): Promise<void> {
  await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2), 'utf-8');
}

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

    // Read all testimonials
    const testimonials = await readTestimonials();

    // Create a map of id to testimonial for quick lookup
    const testimonialMap = new Map(testimonials.map(t => [t.id, t]));

    // Update order field for approved testimonials based on orderedIds
    orderedIds.forEach((id, index) => {
      const testimonial = testimonialMap.get(id);
      if (testimonial && testimonial.approved) {
        testimonial.order = index;
      }
    });

    // Write back to file
    await writeTestimonials(testimonials);

    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error reordering testimonials:', error);
    return NextResponse.json({ error: 'Failed to reorder testimonials' }, { status: 500 });
  }
}
