import { Sparkles } from "lucide-react";
import { smartReplies } from "@/lib/mockData";
import { useState } from "react";

export function SmartReplies() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium gradient-ai-text">Smart Replies</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {smartReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => setSelected(reply)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
              selected === reply
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
            }`}
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
