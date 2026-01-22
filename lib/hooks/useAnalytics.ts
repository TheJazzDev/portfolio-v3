import { useEffect } from 'react';

export function usePageView(path: string) {
  useEffect(() => {
    // Track page view
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'page',
        path,
      }),
    }).catch((error) => {
      console.error('Failed to track page view:', error);
    });
  }, [path]);
}

export function trackProjectView(projectId: string, projectTitle: string) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'project',
      projectId,
      projectTitle,
    }),
  }).catch((error) => {
    console.error('Failed to track project view:', error);
  });
}
