import { useState } from "react";
import { Image, Smile, BarChart2, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiSuggestions, currentUser } from "@/lib/mockData";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="border-b border-border p-4">
      <div className="flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full gradient-ai flex items-center justify-center text-sm font-bold text-primary-foreground">
          {currentUser.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none min-h-[60px]"
            rows={2}
          />

          {/* AI Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 rounded-xl border border-primary/20 bg-primary/5 p-3"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium gradient-ai-text">AI Suggestions</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {aiSuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setContent(suggestion);
                        setShowSuggestions(false);
                      }}
                      className="text-left text-sm px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-1">
              <button className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors">
                <Image className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors">
                <Smile className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors">
                <BarChart2 className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors">
                <MapPin className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors"
                title="AI Writing Assistant"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>

            <button
              disabled={!content.trim()}
              className="rounded-full gradient-ai px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
