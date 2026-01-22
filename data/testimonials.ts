export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  project: string;
  message: string;
  approved: boolean;
  createdAt: string;
  order?: number;
}
