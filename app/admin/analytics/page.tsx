'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsData {
  totalPageViews: number;
  totalProjectViews: number;
  last30DaysPageViews: number;
  last7DaysPageViews: number;
  popularProjects: Array<{ id: string; title: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
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
ANALYTICS <span className="text-primary-500">DASHBOARD</span>
            </h1>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={fetchAnalytics}
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
          <div className="text-center text-gray-400 py-8 md:py-12">Loading analytics...</div>
        ) : !analytics ? (
          <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
            Failed to load analytics
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Statistics Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <StatCard
                icon={<Eye className="w-5 h-5 md:w-6 md:h-6" />}
                title="Total Page Views"
                value={analytics.totalPageViews}
                color="electric"
              />
              <StatCard
                icon={<BarChart3 className="w-5 h-5 md:w-6 md:h-6" />}
                title="Last 30 Days"
                value={analytics.last30DaysPageViews}
                color="primary"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />}
                title="Last 7 Days"
                value={analytics.last7DaysPageViews}
                color="neon"
              />
              <StatCard
                icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />}
                title="Project Views"
                value={analytics.totalProjectViews}
                color="cyber"
              />
            </div>

            {/* Popular Projects */}
            <section>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
                Popular Projects (Last 30 Days)
              </h2>
              {analytics.popularProjects.length === 0 ? (
                <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
                  No project views yet
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {analytics.popularProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="border-2 border-white/20 hover:border-primary-500 bg-black card-rounded p-4 md:p-5 transition-all"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center card-rounded font-bold text-sm md:text-base ${
                            index === 0
                              ? 'bg-linear-to-br from-primary-500 to-electric-500 text-white'
                              : 'bg-white/10 text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-bold truncate mb-1">
                            {project.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-400">
                            {project.count} view{project.count !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <div className="w-16 h-16 md:w-20 md:h-20">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                              <circle
                                className="circle-bg"
                                stroke="#1a1a1a"
                                strokeWidth="3"
                                fill="none"
                                cx="18"
                                cy="18"
                                r="15.9"
                              />
                              <circle
                                className="circle"
                                stroke="#f97316"
                                strokeWidth="3"
                                strokeDasharray={`${
                                  (project.count / analytics.popularProjects[0].count) * 100
                                }, 100`}
                                strokeLinecap="round"
                                fill="none"
                                cx="18"
                                cy="18"
                                r="15.9"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Pages */}
            <section>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
                Top Pages (Last 30 Days)
              </h2>
              {analytics.topPages.length === 0 ? (
                <div className="border-2 border-white/20 p-6 md:p-8 card-rounded text-center text-gray-400">
                  No page views yet
                </div>
              ) : (
                <div className="border-2 border-white/20 card-rounded overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-400">
                            Rank
                          </th>
                          <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-400">
                            Page
                          </th>
                          <th className="text-right px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-400">
                            Views
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.topPages.map((page, index) => (
                          <tr
                            key={page.path}
                            className="border-t border-white/10 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold ${
                                  index === 0
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white/10 text-gray-400'
                                }`}
                              >
                                {index + 1}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-mono">
                              {page.path}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-right font-bold text-primary-500">
                              {page.count.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            <div className="p-4 md:p-6 bg-linear-to-br from-primary-500/10 to-electric-500/10 border border-primary-500/30 card-rounded">
              <p className="text-sm md:text-base text-gray-300">
                <strong className="text-primary-500">Note:</strong> Analytics data is tracked
                automatically when users visit pages and view projects. Data retention is
                unlimited and stored locally in JSON format.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: 'electric' | 'primary' | 'neon' | 'cyber';
}) {
  const colorClasses = {
    electric: 'border-electric-500/50 bg-linear-to-br from-electric-500/10 to-transparent',
    primary: 'border-primary-500/50 bg-linear-to-br from-primary-500/10 to-transparent',
    neon: 'border-neon-500/50 bg-linear-to-br from-neon-500/10 to-transparent',
    cyber: 'border-cyber-500/50 bg-linear-to-br from-cyber-500/10 to-transparent',
  };

  const iconColorClasses = {
    electric: 'bg-linear-to-br from-electric-500 to-cyber-500',
    primary: 'bg-linear-to-br from-primary-500 to-primary-600',
    neon: 'bg-linear-to-br from-neon-500 to-neon-600',
    cyber: 'bg-linear-to-br from-cyber-500 to-cyber-600',
  };

  const textColorClasses = {
    electric: 'text-electric-500',
    primary: 'text-primary-500',
    neon: 'text-neon-500',
    cyber: 'text-cyber-500',
  };

  return (
    <div className={`border-2 ${colorClasses[color]} card-rounded p-4 md:p-6`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 ${iconColorClasses[color]} flex items-center justify-center card-rounded text-white`}
        >
          {icon}
        </div>
      </div>
      <div className={`text-3xl md:text-4xl font-bold ${textColorClasses[color]} mb-1`}>
        {value.toLocaleString()}
      </div>
      <p className="text-xs md:text-sm text-gray-400">{title}</p>
    </div>
  );
}
