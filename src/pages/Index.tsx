import { AppLayout } from "@/components/layout/AppLayout";
import { CreatePost } from "@/components/feed/CreatePost";
import { PostCard } from "@/components/feed/PostCard";
import { mockPosts } from "@/lib/mockData";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold font-display">Home</h1>
          <button className="rounded-full p-2 hover:bg-secondary/50 transition-colors">
            <Sparkles className="h-5 w-5 text-primary" />
          </button>
        </div>
        <div className="flex border-b border-border">
          <button className="flex-1 py-3 text-sm font-semibold text-foreground relative">
            For you
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full gradient-ai" />
          </button>
          <button className="flex-1 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Following
          </button>
          <button className="flex-1 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            AI Curated
          </button>
        </div>
      </div>

      {/* Create Post */}
      <CreatePost />

      {/* Feed */}
      <div>
        {mockPosts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Index;
