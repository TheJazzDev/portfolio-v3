import { NextResponse } from 'next/server';
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

// GET /api/testimonials/pending - Get all pending testimonials (for admin)
export async function GET() {
  try {
    const testimonials = await readTestimonials();
    const pending = testimonials.filter((t) => !t.approved);
    return NextResponse.json(pending);
  } catch (error) {
    console.error('Error reading pending testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
  }
}
