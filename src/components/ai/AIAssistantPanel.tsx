import { Sparkles, Lightbulb, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  { icon: Lightbulb, text: "Post about trending AI topics to boost engagement by 3x", color: "text-warning" },
  { icon: Zap, text: "Best time to post: 2-4 PM for maximum reach", color: "text-primary" },
  { icon: TrendingUp, text: "Your #AI posts get 40% more interactions", color: "text-success" },
];

export function AIAssistantPanel() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-primary/20 bg-card overflow-hidden glow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3"
      >
        <div className="h-7 w-7 rounded-lg gradient-ai flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold font-display text-sm gradient-ai-text">AI Assistant</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-2">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl bg-secondary/50 p-3"
                >
                  <tip.icon className={`h-4 w-4 mt-0.5 shrink-0 ${tip.color}`} />
                  <p className="text-xs text-secondary-foreground leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
