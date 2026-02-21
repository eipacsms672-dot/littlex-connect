import { TrendingUp, Flame, Minus } from "lucide-react";
import { trendingTopics, formatCount } from "@/lib/mockData";

const trendingIcons = {
  rising: TrendingUp,
  hot: Flame,
  stable: Minus,
};

const trendingColors = {
  rising: "text-success",
  hot: "text-engagement",
  stable: "text-muted-foreground",
};

export function TrendingTopics() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <h3 className="px-4 py-3 text-lg font-bold font-display">Trending</h3>
      {trendingTopics.map((topic) => {
        const Icon = trendingIcons[topic.trending];
        return (
          <div
            key={topic.id}
            className="px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{topic.category}</span>
              <Icon className={`h-3.5 w-3.5 ${trendingColors[topic.trending]}`} />
            </div>
            <p className="mt-0.5 font-semibold text-sm">#{topic.name}</p>
            <p className="text-xs text-muted-foreground">{formatCount(topic.postCount)} posts</p>
          </div>
        );
      })}
    </div>
  );
}
