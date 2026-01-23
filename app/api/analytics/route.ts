import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/analytics - Get analytics data
export async function GET() {
  try {
    // Calculate statistics
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get counts
    const totalPageViews = await prisma.pageView.count();
    const totalProjectViews = await prisma.projectView.count();
    const last30DaysPageViews = await prisma.pageView.count({
      where: {
        timestamp: {
          gte: thirtyDaysAgo,
        },
      },
    });
    const last7DaysPageViews = await prisma.pageView.count({
      where: {
        timestamp: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get popular projects (last 30 days)
    const recentProjectViews = await prisma.projectView.findMany({
      where: {
        timestamp: {
          gte: thirtyDaysAgo,
        },
      },
    });

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

    // Get top pages (last 30 days)
    const recentPageViews = await prisma.pageView.findMany({
      where: {
        timestamp: {
          gte: thirtyDaysAgo,
        },
      },
    });

    const pageViewCounts: Record<string, number> = {};
    recentPageViews.forEach((pv) => {
      pageViewCounts[pv.path] = (pageViewCounts[pv.path] || 0) + 1;
    });

    const topPages = Object.entries(pageViewCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      totalPageViews,
      totalProjectViews,
      last30DaysPageViews,
      last7DaysPageViews,
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

    if (type === 'page') {
      await prisma.pageView.create({
        data: {
          path: path || '/',
          userAgent: request.headers.get('user-agent'),
        },
      });
    } else if (type === 'project') {
      await prisma.projectView.create({
        data: {
          projectId,
          projectTitle,
        },
      });
    }

    return NextResponse.json({ message: 'View tracked successfully' });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
