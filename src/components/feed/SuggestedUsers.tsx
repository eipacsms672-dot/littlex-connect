import { UserPlus } from "lucide-react";
import { useState } from "react";

const suggestions = [
  { name: "Sarah Kim", handle: "@sarahk_dev", reason: "Based on your interests in AI" },
  { name: "Dev Community", handle: "@devcomm", reason: "Popular in your network" },
  { name: "Ava Patel", handle: "@ava_ml", reason: "AI & Machine Learning" },
];

export function SuggestedUsers() {
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  const toggleFollow = (handle: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  };

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <h3 className="px-4 py-3 text-lg font-bold font-display">Who to follow</h3>
      {suggestions.map((user) => (
        <div
          key={user.handle}
          className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground shrink-0">
            {user.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.reason}</p>
          </div>
          <button
            onClick={() => toggleFollow(user.handle)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              followed.has(user.handle)
                ? "bg-transparent border border-border text-foreground"
                : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            {followed.has(user.handle) ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}
