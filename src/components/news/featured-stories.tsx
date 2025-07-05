import { NewsStory } from "@/types/news";
import { NewsCard } from "./news-card";
import { Newspaper, TrendingUp, Clock } from "lucide-react";

interface FeaturedStoriesProps {
  stories: NewsStory[];
  onStoryClick?: (story: NewsStory) => void;
}

export function FeaturedStories({
  stories = [],
  onStoryClick,
}: FeaturedStoriesProps) {
  if (!stories.length) return null; // or show a fallback UI

  const featuredStory = stories
    .slice() // clone array to avoid mutating original
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )[0];

  // Get remaining stories for the sidebar
  const sidebarStories = stories
    .filter((story) => story.id !== featuredStory?.id)
    .slice(0, 4);

  const breakingNews = stories
    .filter(
      (story) => story.relatedIncidents && story.relatedIncidents.length > 0
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Newspaper className="w-6 h-6 text-gold" />
          <h2 className="text-2xl font-bold text-neutral-light">
            Featured Coverage
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-neutral-light/60">
          <Clock className="w-4 h-4" />
          <span>Updated continuously</span>
        </div>
      </div>

      {/* Breaking News Banner */}
      {breakingNews.length > 0 && (
        <div className="bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 font-bold text-sm">BREAKING</span>
            </div>
            <TrendingUp className="w-4 h-4 text-red-500" />
          </div>
          <div className="space-y-2">
            {breakingNews.map((story) => (
              <div
                key={story.id}
                className="cursor-pointer hover:text-amber-400 transition-colors"
                onClick={() => onStoryClick?.(story)}
              >
                <p className="text-sm font-medium text-neutral-100">
                  {story.headline}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {story.summary ? story.summary.substring(0, 100) + "..." : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Story */}
        {featuredStory && (
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  FEATURED
                </span>
              </div>
              <NewsCard
                story={featuredStory}
                onClick={() => onStoryClick?.(featuredStory)}
                variant="featured"
              />
            </div>
          </div>
        )}

        {/* Sidebar Stories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-100 border-b border-neutral-600 pb-2">
            Latest Stories
          </h3>
          <div className="space-y-4">
            {sidebarStories.map((story) => (
              <NewsCard
                key={story.id}
                story={story}
                onClick={() => onStoryClick?.(story)}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stories Grid */}
      {stories.length > 6 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">
            More Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(6, 12).map((story) => (
              <NewsCard
                key={story.id}
                story={story}
                onClick={() => onStoryClick?.(story)}
                variant="standard"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
