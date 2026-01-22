'use client';

import { useState, useEffect } from 'react';
import { Lock, MessageSquareQuote, ArrowRight, ArrowLeft, LogOut, TrendingUp, CheckCircle, Clock, Mail, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [stats, setStats] = useState({
    totalTestimonials: 0,
    approvedTestimonials: 0,
    pendingTestimonials: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalPageViews: 0,
  });
  const router = useRouter();

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      // Check authentication via proper auth endpoint
      const response = await fetch('/api/admin/auth');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [approvedRes, pendingRes, contactsRes, analyticsRes] = await Promise.all([
        fetch('/api/testimonials'),
        fetch('/api/testimonials/pending'),
        fetch('/api/contacts'),
        fetch('/api/analytics'),
      ]);

      const approved = approvedRes.ok ? await approvedRes.json() : [];
      const pending = pendingRes.ok ? await pendingRes.json() : [];
      const contacts = contactsRes.ok ? await contactsRes.json() : [];
      const analytics = analyticsRes.ok ? await analyticsRes.json() : { totalPageViews: 0 };

      setStats({
        totalTestimonials: approved.length + pending.length,
        approvedTestimonials: approved.length,
        pendingTestimonials: pending.length,
        totalContacts: contacts.length,
        unreadContacts: contacts.filter((c: any) => !c.read).length,
        totalPageViews: analytics.totalPageViews || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setAuthError(false);
      } else {
        setAuthError(true);
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setAuthError(true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm md:text-base">Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-linear-to-br from-black/95 to-primary-900/20 border-2 border-primary-500/30 p-6 md:p-8 card-rounded">
            <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-primary-500 to-electric-500 card-rounded mb-4 md:mb-6 mx-auto">
              <Lock className="w-7 h-7 md:w-8 md:h-8" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Admin Dashboard
            </h1>
            <p className="text-sm md:text-base text-gray-400 text-center mb-6 md:mb-8">
              Enter admin password to access management tools
            </p>

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm md:text-base text-gray-400 mb-1.5 md:mb-2"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-2 border-white/30 focus:border-primary-500 px-3 md:px-4 py-3 md:py-3.5 outline-none transition-colors text-sm md:text-base input-rounded"
                  placeholder="Enter admin password"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-red-500 text-sm md:text-base">
                  <Lock className="w-4 h-4" />
                  Invalid password
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 md:py-3.5 border-4 border-primary-500 bg-primary-500 text-white font-bold text-base md:text-lg hover:bg-transparent hover:text-primary-500 transition-all duration-300 flex items-center justify-center gap-2 btn-rounded"
              >
                ACCESS DASHBOARD
              </button>
            </form>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-primary-500 transition-colors mt-6 mx-auto justify-center w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 md:py-16 lg:py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <div>
            <span className="text-primary-500 text-base md:text-lg font-semibold">
              &gt; PORTFOLIO ADMIN
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
  ADMIN <span className="text-primary-500">DASHBOARD</span>
            </h1>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base text-gray-400 hover:text-primary-500 border-2 border-white/20 hover:border-primary-500 transition-all btn-rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base text-red-500 hover:text-white border-2 border-red-500 hover:bg-red-500 transition-all btn-rounded"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-12">
          <div className="border-2 border-electric-500/50 bg-linear-to-br from-electric-500/10 to-transparent card-rounded p-4 md:p-6">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-electric-500 to-cyber-500 flex items-center justify-center card-rounded">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xs md:text-sm text-gray-400">Total</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-electric-500 mb-1">
              {stats.totalTestimonials}
            </div>
            <p className="text-xs md:text-sm text-gray-400">Total Testimonials</p>
          </div>

          <div className="border-2 border-neon-500/50 bg-linear-to-br from-neon-500/10 to-transparent card-rounded p-4 md:p-6">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-neon-500 to-neon-600 flex items-center justify-center card-rounded">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xs md:text-sm text-gray-400">Live</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-neon-500 mb-1">
              {stats.approvedTestimonials}
            </div>
            <p className="text-xs md:text-sm text-gray-400">Approved</p>
          </div>

          <div className="border-2 border-primary-500/50 bg-linear-to-br from-primary-500/10 to-transparent card-rounded p-4 md:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center card-rounded">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xs md:text-sm text-gray-400">Pending</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-1">
              {stats.pendingTestimonials}
            </div>
            <p className="text-xs md:text-sm text-gray-400">Awaiting Review</p>
          </div>
        </div>

        {/* Management Cards */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Management Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {/* Testimonials Management Card */}
            <Link
              href="/admin/testimonials"
              className="group border-2 border-white/20 hover:border-primary-500 transition-all duration-300 bg-black card-rounded p-6 md:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-primary-500 to-electric-500 flex items-center justify-center card-rounded mb-4 md:mb-5 group-hover:scale-110 transition-transform">
                  <MessageSquareQuote className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors">
                  Testimonials
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                  Review, approve, and manage client testimonials submitted through the portfolio.
                </p>

                {stats.pendingTestimonials > 0 && (
                  <div className="mb-4 px-2.5 py-1 bg-primary-500/20 border border-primary-500 text-primary-500 text-xs md:text-sm font-semibold inline-block rounded-md">
                    {stats.pendingTestimonials} pending review
                  </div>
                )}

                <div className="flex items-center gap-2 text-primary-500 font-semibold text-sm md:text-base mt-auto">
                  Manage Testimonials
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Contact Submissions Card */}
            <Link
              href="/admin/contacts"
              className="group border-2 border-white/20 hover:border-electric-500 transition-all duration-300 bg-black card-rounded p-6 md:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-electric-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-electric-500 to-cyber-500 flex items-center justify-center card-rounded mb-4 md:mb-5 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors">
                  Contact Submissions
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                  View and manage contact form submissions from visitors and potential clients.
                </p>

                {stats.unreadContacts > 0 && (
                  <div className="mb-4 px-2.5 py-1 bg-electric-500/20 border border-electric-500 text-electric-500 text-xs md:text-sm font-semibold inline-block rounded-md">
                    {stats.unreadContacts} unread message{stats.unreadContacts !== 1 ? 's' : ''}
                  </div>
                )}

                <div className="flex items-center gap-2 text-electric-500 font-semibold text-sm md:text-base mt-auto">
                  View Messages
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Analytics Card */}
            <Link
              href="/admin/analytics"
              className="group border-2 border-white/20 hover:border-neon-500 transition-all duration-300 bg-black card-rounded p-6 md:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-neon-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-neon-500 to-neon-600 flex items-center justify-center card-rounded mb-4 md:mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 transition-colors">
                  Analytics
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                  Track page views, popular projects, and visitor engagement metrics.
                </p>

                <div className="mb-4 px-2.5 py-1 bg-neon-500/20 border border-neon-500 text-neon-500 text-xs md:text-sm font-semibold inline-block rounded-md">
                  {stats.totalPageViews.toLocaleString()} total views
                </div>

                <div className="flex items-center gap-2 text-neon-500 font-semibold text-sm md:text-base mt-auto">
                  View Analytics
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
