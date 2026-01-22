import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Contact } from '@/data/contacts';

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');

async function readContacts(): Promise<Contact[]> {
  try {
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeContacts(contacts: Contact[]): Promise<void> {
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
}

// GET /api/contacts - Get all contact submissions
export async function GET() {
  try {
    const contacts = await readContacts();
    // Return in reverse chronological order (newest first)
    return NextResponse.json(contacts.reverse());
  } catch (error) {
    console.error('Error reading contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

// POST /api/contacts - Save a new contact submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newContact: Contact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    const contacts = await readContacts();
    contacts.push(newContact);
    await writeContacts(contacts);

    return NextResponse.json(
      { message: 'Contact saved successfully', id: newContact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Failed to save contact' },
      { status: 500 }
    );
  }
}

// PATCH /api/contacts - Mark contact as read or delete
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action, password } = body;

    // Verify password
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await readContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    if (action === 'read') {
      contacts[index].read = true;
      await writeContacts(contacts);
      return NextResponse.json({ message: 'Contact marked as read' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// DELETE /api/contacts - Delete a contact
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password } = body;

    // Verify password
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contacts = await readContacts();
    const filtered = contacts.filter((c) => c.id !== id);

    if (filtered.length === contacts.length) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    await writeContacts(filtered);
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
