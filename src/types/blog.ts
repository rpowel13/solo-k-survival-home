
// Blog post type definition
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  author?: string;
  author_title?: string;
  published_at: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  pdf_url?: string;
}
