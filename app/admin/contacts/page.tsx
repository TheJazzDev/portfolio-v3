'use client';

import { useState, useEffect } from 'react';
import { Mail, Trash2, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Contact } from '@/data/contacts';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const password = prompt('Enter admin password:');
    if (!password) return;

    setActionLoading(id);
    try {
      const response = await fetch('/api/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'read', password }),
      });

      if (response.ok) {
        await fetchContacts();
      } else {
        alert('Failed to mark as read. Check your password.');
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      alert('Failed to mark as read.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    const password = prompt('Enter admin password:');
    if (!password) return;

    setActionLoading(id);
    try {
      const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        await fetchContacts();
      } else {
        alert('Failed to delete contact. Check your password.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact.');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'unread') return !contact.read;
    if (filter === 'read') return contact.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span className="text-primary-500 text-base md:text-lg font-semibold">
              &gt; ADMIN PANEL
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
CONTACT <span className="text-primary-500">SUBMISSIONS</span>
            </h1>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={fetchContacts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base text-gray-400 hover:text-primary-500 border-2 border-white/20 hover:border-primary-500 transition-all btn-rounded disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base text-gray-400 hover:text-primary-500 border-2 border-white/20 hover:border-primary-500 transition-all btn-rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold transition-all btn-rounded ${
              filter === 'all'
                ? 'bg-primary-500 text-white border-2 border-primary-500'
                : 'border-2 border-white/20 hover:border-primary-500'
            }`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold transition-all btn-rounded ${
              filter === 'unread'
                ? 'bg-primary-500 text-white border-2 border-primary-500'
                : 'border-2 border-white/20 hover:border-primary-500'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold transition-all btn-rounded ${
              filter === 'read'
                ? 'bg-primary-500 text-white border-2 border-primary-500'
                : 'border-2 border-white/20 hover:border-primary-500'
            }`}
          >
            Read ({contacts.length - unreadCount})
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-8 md:py-12">Loading contacts...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
            No contact submissions found
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                actionLoading={actionLoading}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ContactCard({
  contact,
  onMarkAsRead,
  onDelete,
  actionLoading,
}: {
  contact: Contact;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  actionLoading: string | null;
}) {
  const isLoading = actionLoading === contact.id;

  return (
    <div
      className={`border-2 ${
        contact.read
          ? 'border-white/20 bg-white/5'
          : 'border-primary-500/50 bg-primary-500/5'
      } card-rounded p-4 md:p-5`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Mail className={`w-4 h-4 shrink-0 ${contact.read ? 'text-gray-500' : 'text-primary-500'}`} />
            <h3 className="text-base md:text-lg font-bold truncate">{contact.name}</h3>
            {!contact.read && (
              <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-semibold rounded shrink-0">
                NEW
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-400 mb-1">
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contact.email}`} className="hover:text-primary-500">
              {contact.email}
            </a>
          </p>
          <p className="text-xs md:text-sm text-gray-400 mb-2">
            <strong>Subject:</strong> {contact.subject}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(contact.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {!contact.read && (
            <button
              onClick={() => onMarkAsRead(contact.id)}
              disabled={isLoading}
              className="px-3 py-2 md:px-4 md:py-2.5 border-2 border-neon-500 bg-neon-500 text-white font-bold text-xs md:text-sm hover:bg-transparent hover:text-neon-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Mark Read</span>
            </button>
          )}
          <button
            onClick={() => onDelete(contact.id)}
            disabled={isLoading}
            className="px-3 py-2 md:px-4 md:py-2.5 border-2 border-red-500 bg-red-500 text-white font-bold text-xs md:text-sm hover:bg-transparent hover:text-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isLoading ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3 md:pt-4">
        <p className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
          {contact.message}
        </p>
      </div>
    </div>
  );
}
