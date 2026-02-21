import { useState, useRef } from "react";
import { Image, Smile, BarChart2, MapPin, Sparkles, Loader2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiSuggestions, currentUser } from "@/lib/mockData";
import { toast } from "sonner";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const AI_PROMPTS = [
  { label: "Viral tech post", prompt: "Write a single viral tweet about the latest in tech. Keep it under 280 characters, punchy, with 2-3 relevant hashtags." },
  { label: "Hot take", prompt: "Write a single bold hot take tweet about software development or AI. Be opinionated and engaging. Under 280 characters with hashtags." },
  { label: "Thread starter", prompt: "Write an engaging first tweet of a thread about an interesting tech topic. Include 🧵👇 at the end. Under 280 characters." },
  { label: "Announcement", prompt: "Write an exciting product launch or milestone announcement tweet. Use emojis, bullet points with ✨, and under 280 characters." },
];

async function generatePost(prompt: string, onDelta: (text: string) => void): Promise<void> {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt + "\n\nRespond with ONLY the tweet text, no explanations or meta-commentary." }],
    }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `Error ${resp.status}`);
  }

  if (!resp.body) throw new Error("No response");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") return;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
}

export function CreatePost() {
  const [content, setContent] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAIGenerate, setShowAIGenerate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setContent("");
    setShowAIGenerate(false);

    try {
      let result = "";
      await generatePost(prompt, (chunk) => {
        result += chunk;
        setContent(result);
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate post");
    } finally {
      setIsGenerating(false);
      textareaRef.current?.focus();
    }
  };

  const handleCustomGenerate = () => {
    if (!customPrompt.trim()) return;
    handleGenerate(customPrompt.trim());
    setCustomPrompt("");
  };

  return (
    <div className="border-b border-border p-4">
      <div className="flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full gradient-ai flex items-center justify-center text-sm font-bold text-primary-foreground">
          {currentUser.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full resize-none bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none min-h-[60px]"
              rows={2}
            />
            {isGenerating && (
              <div className="absolute top-1 right-1 flex items-center gap-1.5 text-primary">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="text-xs font-medium gradient-ai-text">Writing...</span>
              </div>
            )}
          </div>

          {/* AI Generate Panel */}
          <AnimatePresence>
            {showAIGenerate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 rounded-xl border border-primary/20 bg-primary/5 p-3 overflow-hidden"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Wand2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium gradient-ai-text">AI Post Generator</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                  {AI_PROMPTS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handleGenerate(p.prompt)}
                      disabled={isGenerating}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors disabled:opacity-40"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCustomGenerate()}
                    placeholder="Or describe what to write..."
                    disabled={isGenerating}
                    className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
                  />
                  <button
                    onClick={handleCustomGenerate}
                    disabled={!customPrompt.trim() || isGenerating}
                    className="px-3 py-2 rounded-lg gradient-ai text-xs font-medium text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Generate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Suggestions (existing) */}
          <AnimatePresence>
            {showSuggestions && !showAIGenerate && (
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
                onClick={() => {
                  setShowAIGenerate(!showAIGenerate);
                  setShowSuggestions(false);
                }}
                className={`rounded-full p-2 transition-colors ${showAIGenerate ? "bg-primary/20 text-primary" : "text-primary hover:bg-primary/10"}`}
                title="AI Post Generator"
              >
                <Wand2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setShowSuggestions(!showSuggestions);
                  setShowAIGenerate(false);
                }}
                className="rounded-full p-2 text-primary hover:bg-primary/10 transition-colors"
                title="AI Writing Suggestions"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>

            <button
              disabled={!content.trim() || isGenerating}
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
