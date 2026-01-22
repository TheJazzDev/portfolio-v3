'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Trash2, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import type { Testimonial } from '@/data/testimonials';

export default function AdminTestimonialsPage() {
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>([]);
  const [approvedTestimonials, setApprovedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch('/api/testimonials/pending'),
        fetch('/api/testimonials'),
      ]);

      if (pendingRes.ok) {
        const pendingData = await pendingRes.json();
        setPendingTestimonials(pendingData);
      }

      if (approvedRes.ok) {
        const approvedData = await approvedRes.json();
        setApprovedTestimonials(approvedData);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const response = await fetch('/api/testimonials/manage', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchTestimonials();
      } else {
        alert('Failed to approve testimonial.');
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Failed to approve testimonial.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    setActionLoading(id);
    try {
      const response = await fetch('/api/testimonials/manage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchTestimonials();
      } else {
        alert('Failed to delete testimonial.');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span className="text-primary-500 text-base md:text-lg font-semibold">
              &gt; ADMIN PANEL
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
MANAGE <span className="text-primary-500">TESTIMONIALS</span>
            </h1>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={fetchTestimonials}
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

        {loading ? (
          <div className="text-center text-gray-400 py-8 md:py-12">Loading testimonials...</div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {/* Pending Testimonials */}
            <section>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Pending Testimonials
                </h2>
                <span className="px-3 py-1 bg-primary-500/20 border border-primary-500 text-primary-500 text-sm md:text-base font-semibold rounded-md">
                  {pendingTestimonials.length}
                </span>
              </div>

              {pendingTestimonials.length === 0 ? (
                <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
                  No pending testimonials
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                  {pendingTestimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      onApprove={handleApprove}
                      onDelete={handleDelete}
                      actionLoading={actionLoading}
                      isPending
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Approved Testimonials */}
            <section>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Approved Testimonials
                </h2>
                <span className="px-3 py-1 bg-neon-500/20 border border-neon-500 text-neon-500 text-sm md:text-base font-semibold rounded-md">
                  {approvedTestimonials.length}
                </span>
              </div>

              {approvedTestimonials.length === 0 ? (
                <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
                  No approved testimonials
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                  {approvedTestimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      onApprove={handleApprove}
                      onDelete={handleDelete}
                      actionLoading={actionLoading}
                      isPending={false}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function TestimonialCard({
  testimonial,
  onApprove,
  onDelete,
  actionLoading,
  isPending,
}: {
  testimonial: Testimonial;
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
  actionLoading: string | null;
  isPending: boolean;
}) {
  const isLoading = actionLoading === testimonial.id;

  return (
    <div
      className={`border-2 ${
        isPending ? 'border-electric-500/50 bg-electric-500/5' : 'border-neon-500/50 bg-neon-500/5'
      } card-rounded p-4 md:p-5 flex flex-col`}
    >
      <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-bold truncate">
            {testimonial.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 truncate">
            {testimonial.role} at {testimonial.company}
          </p>
          {testimonial.email && (
            <p className="text-xs text-gray-500 truncate">{testimonial.email}</p>
          )}
        </div>
        <div
          className={`px-2 md:px-2.5 py-1 text-xs font-semibold rounded shrink-0 ${
            isPending
              ? 'bg-electric-500/20 text-electric-500'
              : 'bg-neon-500/20 text-neon-500'
          }`}
        >
          {isPending ? 'PENDING' : 'APPROVED'}
        </div>
      </div>

      <div className="mb-3 md:mb-4">
        <p className="text-xs md:text-sm text-primary-500 font-semibold mb-2">
          Project: {testimonial.project}
        </p>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          &quot;{testimonial.message}&quot;
        </p>
      </div>

      <p className="text-xs text-gray-500 mb-3 md:mb-4">
        Submitted: {new Date(testimonial.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-2 md:gap-3 mt-auto">
        {isPending && (
          <button
            onClick={() => onApprove(testimonial.id)}
            disabled={isLoading}
            className="flex-1 py-2 md:py-2.5 border-2 border-neon-500 bg-neon-500 text-white font-bold text-sm md:text-base hover:bg-transparent hover:text-neon-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded"
          >
            <CheckCircle className="w-4 h-4" />
            {isLoading ? 'Approving...' : 'Approve'}
          </button>
        )}
        <button
          onClick={() => onDelete(testimonial.id)}
          disabled={isLoading}
          className={`${
            isPending ? 'flex-1' : 'w-full'
          } py-2 md:py-2.5 border-2 border-red-500 bg-red-500 text-white font-bold text-sm md:text-base hover:bg-transparent hover:text-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-rounded`}
        >
          <Trash2 className="w-4 h-4" />
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
