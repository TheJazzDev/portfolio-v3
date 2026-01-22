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
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

async function writeTestimonials(testimonials: Testimonial[]): Promise<void> {
  await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2), 'utf-8');
}

// GET /api/testimonials - Get all approved testimonials (most recent first)
export async function GET() {
  try {
    const testimonials = await readTestimonials();
    const approved = testimonials.filter((t) => t.approved);
    // Sort by createdAt date, newest first
    approved.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(approved);
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
    const newTestimonial: Testimonial = {
      id: `testimonial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      email: email?.trim(),
      project: project.trim(),
      message: message.trim(),
      approved: false,
      createdAt: new Date().toISOString(),
    };

    // Read existing testimonials
    const testimonials = await readTestimonials();

    // Add new testimonial
    testimonials.push(newTestimonial);

    // Write back to file
    await writeTestimonials(testimonials);

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
