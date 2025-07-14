'use client';

import { NewsStory } from "@/types/news";
import { NewsCard } from "./news-card";
import { useClientDateTime } from "@/lib/client-hooks";
import { Grid, List, SortAsc, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StoryGridProps {
  stories: NewsStory[];
  onStoryClick?: (story: NewsStory) => void;
  title?: string;
  showControls?: boolean;
  maxItems?: number;
}

export function StoryGrid({
  stories,
  onStoryClick,
  title = "Latest Stories",
  showControls = true,
  maxItems,
}: StoryGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "category">("date");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = Array.from(
    new Set(stories.map((story) => story.category))
  );

  const filteredStories = stories
    .filter(
      (story) => filterCategory === "all" || story.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      } else {
        return a.category.localeCompare(b.category);
      }
    })
    .slice(0, maxItems);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-light">{title}</h2>

        {showControls && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 bg-neutral-dark border border-neutral-light/20 rounded-md text-sm text-neutral-light focus:outline-none focus:border-gold"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "category")
                }
                className="px-3 py-1 bg-neutral-dark border border-neutral-light/20 rounded-md text-sm text-neutral-light focus:outline-none focus:border-gold"
              >
                <option value="date">Latest First</option>
                <option value="category">By Category</option>
              </select>
            </div>

            <div className="flex items-center border border-neutral-light/20 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-gold text-white"
                    : "text-neutral-light/60 hover:text-neutral-light"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-gold text-white"
                    : "text-neutral-light/60 hover:text-neutral-light"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-neutral-light/60 mb-4">
        Showing {filteredStories.length} of {stories.length} stories
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <NewsCard
              key={story.id}
              story={story}
              onClick={onStoryClick}
              variant="default"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStories.map((story) => {
            const formattedDate = useClientDateTime(story.publishedAt);
            
            return (
              <div
                key={story.id}
                className="flex gap-4 bg-neutral-dark/40 border border-neutral-light/20 rounded-lg p-4 hover:bg-neutral-dark/60 transition-all duration-200 hover:border-gold/50"
              >
                {story.imageUrl && (
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={story.imageUrl}
                      alt={story.headline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-gold/20 text-gold text-xs font-medium rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-neutral-light/60">
                      {formattedDate}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-light hover:text-gold transition-colors mb-2 cursor-pointer">
                    {story.headline}
                  </h3>
                  <p className="text-sm text-neutral-light/80 mb-2 line-clamp-2">
                    {story.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-light/60">
                      By {story.author}
                    </span>
                    {onStoryClick && (
                      <button
                        onClick={() => onStoryClick(story)}
                        className="text-xs text-gold hover:text-gold/80 transition-colors"
                      >
                        Read more →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredStories.length === 0 && (
        <div className="text-center py-12 text-neutral-light/60">
          <p>No stories found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}