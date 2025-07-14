export interface NewsStory {
  id: string;
  headline: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  publishedFormatted: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  relatedIncidents?: string[];
}
