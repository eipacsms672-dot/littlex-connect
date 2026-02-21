import { useState } from "react";
import { Heart, Repeat2, MessageCircle, Share, Eye, Sparkles, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Post, formatCount, timeAgo } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { SmartReplies } from "./SmartReplies";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reposted, setReposted] = useState(post.reposted);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [showReplies, setShowReplies] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const toggleRepost = () => {
    setReposted(!reposted);
    setRepostCount((c) => (reposted ? c - 1 : c + 1));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-border px-4 py-4 hover:bg-secondary/20 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        {post.author.avatar ? (
          <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
            {post.author.name[0]}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold truncate">{post.author.name}</span>
            {post.author.verified && (
              <span className="text-primary text-xs">✓</span>
            )}
            <span className="text-muted-foreground">{post.author.handle}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{timeAgo(post.timestamp)}</span>
            {post.aiGenerated && (
              <span className="ml-auto flex items-center gap-1 text-xs gradient-ai-text">
                <Sparkles className="h-3 w-3" />
                AI
              </span>
            )}
          </div>

          {/* Content */}
          <p className="mt-1 text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Hashtags */}
          {post.hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.hashtags.map((tag) => (
                <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between max-w-md">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group"
            >
              <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs">{formatCount(post.replies)}</span>
            </button>

            <button
              onClick={toggleRepost}
              className={cn(
                "flex items-center gap-1.5 transition-colors group",
                reposted ? "text-success" : "text-muted-foreground hover:text-success"
              )}
            >
              <Repeat2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs">{formatCount(repostCount)}</span>
            </button>

            <button
              onClick={toggleLike}
              className={cn(
                "flex items-center gap-1.5 transition-colors group",
                liked ? "text-engagement" : "text-muted-foreground hover:text-engagement"
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 group-hover:scale-110 transition-transform",
                  liked && "fill-current"
                )}
              />
              <span className="text-xs">{formatCount(likeCount)}</span>
            </button>

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{formatCount(post.views)}</span>
            </div>

            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Share className="h-4 w-4" />
            </button>
          </div>

          {/* Smart Replies */}
          {showReplies && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <SmartReplies />
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
