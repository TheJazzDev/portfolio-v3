export interface PageView {
  path: string;
  timestamp: string;
  userAgent?: string;
}

export interface ProjectView {
  projectId: string;
  projectTitle: string;
  timestamp: string;
}

export interface Analytics {
  pageViews: PageView[];
  projectViews: ProjectView[];
}
