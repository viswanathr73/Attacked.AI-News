"use client";


import { NewsStory } from "@/types/news";
import { formatDateTime } from "@/lib/utils";
import { Clock, User, Tag, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  story: NewsStory;
  variant?: "default" | "featured" | "compact";
  onClick?: (story: NewsStory) => void;
}

export function NewsCard({
  story,
  variant = "default",
  onClick,
}: NewsCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <article
      className={cn(
        "bg-neutral-dark/40 border border-neutral-light/20 rounded-lg overflow-hidden hover:bg-neutral-dark/60 transition-all duration-200 hover:border-gold/50 group",
        onClick && "cursor-pointer",
        isFeatured && "lg:col-span-2 lg:row-span-2"
      )}
      onClick={() => onClick?.(story)}
    >
      {story.imageUrl && (
        <div
          className={cn(
            "relative overflow-hidden",
            isFeatured ? "h-48 md:h-64" : isCompact ? "h-32" : "h-40"
          )}
        >
          <img
            src={story.imageUrl}
            alt={story.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-gold/90 text-white text-xs font-medium rounded">
              {story.category}
            </span>
          </div>
        </div>
      )}

      <div className={cn("p-4", isFeatured && "p-6")}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs text-neutral-light/60">
            <Clock className="w-3 h-3" />
            <span>{story.publishedFormatted}</span>
          </div>

          {story.relatedIncidents && story.relatedIncidents.length > 0 && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-adversary-red rounded-full animate-pulse"></div>
              <span className="text-xs text-adversary-red font-medium">
                Live
              </span>
            </div>
          )}
        </div>

        <h3
          className={cn(
            "font-bold text-neutral-light group-hover:text-gold transition-colors mb-2",
            isFeatured
              ? "text-xl md:text-2xl"
              : isCompact
              ? "text-sm"
              : "text-base"
          )}
        >
          {story.headline}
        </h3>

        {!isCompact && (
          <p
            className={cn(
              "text-neutral-light/80 mb-3",
              isFeatured ? "text-base" : "text-sm"
            )}
          >
            {story.summary}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-neutral-light/60">
            <User className="w-3 h-3" />
            <span>{story.author}</span>
          </div>

          {onClick && (
            <button className="flex items-center space-x-1 text-xs text-gold hover:text-gold/80 transition-colors">
              <span>Read more</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {story.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {story.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-neutral-light/10 rounded text-xs text-neutral-light/70"
              >
                <Tag className="w-2 h-2 mr-1" />
                {tag}
              </span>
            ))}
            {story.tags.length > (isFeatured ? 5 : 3) && (
              <span className="px-2 py-1 bg-neutral-light/10 rounded text-xs text-neutral-light/70">
                +{story.tags.length - (isFeatured ? 5 : 3)} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
