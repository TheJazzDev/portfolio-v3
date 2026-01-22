import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Analytics, PageView, ProjectView } from '@/data/analytics';

const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

async function readAnalytics(): Promise<Analytics> {
  try {
    const data = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { pageViews: [], projectViews: [] };
  }
}

async function writeAnalytics(analytics: Analytics): Promise<void> {
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(analytics, null, 2), 'utf-8');
}

// GET /api/analytics - Get analytics data
export async function GET() {
  try {
    const analytics = await readAnalytics();

    // Calculate statistics
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Filter recent data
    const recentPageViews = analytics.pageViews.filter(
      (pv) => new Date(pv.timestamp) >= thirtyDaysAgo
    );
    const recentProjectViews = analytics.projectViews.filter(
      (pv) => new Date(pv.timestamp) >= thirtyDaysAgo
    );

    const lastWeekPageViews = analytics.pageViews.filter(
      (pv) => new Date(pv.timestamp) >= sevenDaysAgo
    );

    // Count project views
    const projectViewCounts: Record<string, { title: string; count: number }> = {};
    recentProjectViews.forEach((pv) => {
      if (!projectViewCounts[pv.projectId]) {
        projectViewCounts[pv.projectId] = {
          title: pv.projectTitle,
          count: 0,
        };
      }
      projectViewCounts[pv.projectId].count++;
    });

    const popularProjects = Object.entries(projectViewCounts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Page view counts
    const pageViewCounts: Record<string, number> = {};
    recentPageViews.forEach((pv) => {
      pageViewCounts[pv.path] = (pageViewCounts[pv.path] || 0) + 1;
    });

    const topPages = Object.entries(pageViewCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      totalPageViews: analytics.pageViews.length,
      totalProjectViews: analytics.projectViews.length,
      last30DaysPageViews: recentPageViews.length,
      last7DaysPageViews: lastWeekPageViews.length,
      popularProjects,
      topPages,
    });
  } catch (error) {
    console.error('Error reading analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

// POST /api/analytics - Track a new view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, path, projectId, projectTitle } = body;

    const analytics = await readAnalytics();

    if (type === 'page') {
      const pageView: PageView = {
        path: path || '/',
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || undefined,
      };
      analytics.pageViews.push(pageView);
    } else if (type === 'project') {
      const projectView: ProjectView = {
        projectId,
        projectTitle,
        timestamp: new Date().toISOString(),
      };
      analytics.projectViews.push(projectView);
    }

    await writeAnalytics(analytics);

    return NextResponse.json({ message: 'View tracked successfully' });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
