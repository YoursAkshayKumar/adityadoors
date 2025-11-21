export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  content: string;
  tags: string[];
  status: string;
  author?: string;
  metaTitle?: string;
  metaKeywords?: string[];
  metaDescription?: string;
}

export interface BlogResponse {
  success: boolean;
  result: IBlog[];
}

export interface IAddBlog {
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  content: string;
  tags: string[];
  status?: string;
  author?: string;
  metaTitle?: string;
  metaKeywords?: string[];
  metaDescription?: string;
}