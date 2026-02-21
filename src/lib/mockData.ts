export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  verified: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  reposts: number;
  replies: number;
  views: number;
  liked: boolean;
  reposted: boolean;
  hashtags: string[];
  aiGenerated?: boolean;
}

export interface TrendingTopic {
  id: string;
  name: string;
  postCount: number;
  category: string;
  trending: "rising" | "hot" | "stable";
}

export const currentUser: User = {
  id: "1",
  name: "Alex Chen",
  handle: "@alexchen",
  avatar: "",
  bio: "Building the future with AI 🤖 | Full-stack dev | Open source enthusiast",
  followers: 12400,
  following: 892,
  verified: true,
};

const users: User[] = [
  currentUser,
  { id: "2", name: "Maya Rodriguez", handle: "@mayabuilds", avatar: "", bio: "Design engineer", followers: 8200, following: 445, verified: true },
  { id: "3", name: "Ekal Ekiru", handle: "@jblake_ai", avatar: "", bio: "AI researcher @ DeepMind", followers: 45600, following: 312, verified: true },
  { id: "4", name: "Priya Sharma", handle: "@priyacodes", avatar: "", bio: "Rust & WebAssembly", followers: 3100, following: 678, verified: false },
  { id: "5", name: "Leo Thompson", handle: "@leo_designs", avatar: "", bio: "Product designer", followers: 19800, following: 234, verified: true },
];

export const mockPosts: Post[] = [
  {
    id: "p1",
    author: users[2],
    content: "Just published our new paper on multi-agent reasoning. The results are mind-blowing — agents collaborating on complex tasks outperform single models by 340%. The future of AI is cooperative, not competitive. 🧠\n\n#AI #Research #MultiAgent",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 2847,
    reposts: 892,
    replies: 234,
    views: 128000,
    liked: false,
    reposted: false,
    hashtags: ["AI", "Research", "MultiAgent"],
  },
  {
    id: "p2",
    author: users[1],
    content: "Hot take: The best design systems aren't the most comprehensive ones. They're the ones that get out of your way and let you build.\n\nSimplicity > Completeness",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 1203,
    reposts: 345,
    replies: 89,
    views: 56000,
    liked: true,
    reposted: false,
    hashtags: ["Design", "DesignSystems"],
  },
  {
    id: "p3",
    author: users[3],
    content: "Spent the weekend building a real-time collaborative editor in Rust + WASM. The performance difference is insane — 60fps even with 50 concurrent editors. Here's what I learned 🧵👇\n\n#Rust #WebAssembly #OpenSource",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 567,
    reposts: 123,
    replies: 45,
    views: 23000,
    liked: false,
    reposted: true,
    hashtags: ["Rust", "WebAssembly", "OpenSource"],
  },
  {
    id: "p4",
    author: users[4],
    content: "New trend in product design: AI-native interfaces. Instead of bolting AI onto existing patterns, we're designing from scratch around AI capabilities.\n\nThe shift from \"AI-enhanced\" to \"AI-native\" is the biggest design paradigm change since mobile-first.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 3421,
    reposts: 1100,
    replies: 312,
    views: 210000,
    liked: false,
    reposted: false,
    hashtags: ["Design", "AI", "ProductDesign"],
  },
  {
    id: "p5",
    author: users[0],
    content: "Excited to announce LittleX v2.0! 🚀\n\nNew features:\n✨ AI writing assistant\n📊 Smart analytics\n🔥 Trending topics engine\n🤝 Community discovery\n\nBuilt with love and a lot of coffee ☕",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    likes: 892,
    reposts: 234,
    replies: 67,
    views: 45000,
    liked: false,
    reposted: false,
    hashtags: ["LittleX", "Launch"],
    aiGenerated: true,
  },
];

export const trendingTopics: TrendingTopic[] = [
  { id: "t1", name: "Multi-Agent AI", postCount: 12400, category: "Technology", trending: "hot" },
  { id: "t2", name: "Rust 2025", postCount: 8900, category: "Programming", trending: "rising" },
  { id: "t3", name: "Design Systems", postCount: 5600, category: "Design", trending: "stable" },
  { id: "t4", name: "WebAssembly", postCount: 3200, category: "Technology", trending: "rising" },
  { id: "t5", name: "AI-Native UX", postCount: 15800, category: "Design", trending: "hot" },
  { id: "t6", name: "Open Source AI", postCount: 9400, category: "Technology", trending: "rising" },
];

export const aiSuggestions = [
  "Share your thoughts on the latest AI breakthroughs and how they impact development workflows.",
  "What's your hot take on the future of collaborative coding tools?",
  "Thread idea: Compare the performance of different frontend frameworks in 2025.",
  "Engage your audience: Ask about their favorite developer tools and why.",
];

export const smartReplies = [
  "Great insight! I've been thinking about this too.",
  "This is exactly the direction I think the industry is heading.",
  "Interesting perspective. Have you considered the implications for...",
  "100% agree. We built something similar and the results were amazing.",
];

export function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
