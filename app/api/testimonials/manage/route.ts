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

    // Read testimonials
    const testimonials = await readTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    // Approve testimonial
    testimonials[index].approved = true;

    // Write back to file
    await writeTestimonials(testimonials);

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

    // Read testimonials
    const testimonials = await readTestimonials();
    const filtered = testimonials.filter((t) => t.id !== id);

    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    // Write back to file
    await writeTestimonials(filtered);

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
