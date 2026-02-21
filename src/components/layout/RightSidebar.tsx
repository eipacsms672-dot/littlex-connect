import { TrendingTopics } from "@/components/feed/TrendingTopics";
import { AIAssistantPanel } from "@/components/ai/AIAssistantPanel";
import { SuggestedUsers } from "@/components/feed/SuggestedUsers";

export function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] flex-col gap-4 overflow-y-auto p-4 scrollbar-hide lg:flex">
      <AIAssistantPanel />
      <TrendingTopics />
      <SuggestedUsers />
    </aside>
  );
}
