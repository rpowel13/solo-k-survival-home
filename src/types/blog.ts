
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorTitle: string;
  publishedAt: string;
  tags: string[];
  pdfUrl?: string;
}
