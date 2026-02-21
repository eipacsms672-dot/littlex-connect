import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatCount } from "@/lib/mockData";

const stats = [
  { label: "Impressions", value: 128400, change: "+23%", icon: Eye, positive: true },
  { label: "Engagements", value: 8920, change: "+18%", icon: Heart, positive: true },
  { label: "Followers", value: 12400, change: "+156", icon: Users, positive: true },
  { label: "Replies", value: 1240, change: "-5%", icon: MessageCircle, positive: false },
];

const weeklyData = [
  { day: "Mon", posts: 3, engagement: 78 },
  { day: "Tue", posts: 5, engagement: 92 },
  { day: "Wed", posts: 2, engagement: 45 },
  { day: "Thu", posts: 7, engagement: 120 },
  { day: "Fri", posts: 4, engagement: 88 },
  { day: "Sat", posts: 1, engagement: 34 },
  { day: "Sun", posts: 6, engagement: 105 },
];

const maxEngagement = Math.max(...weeklyData.map((d) => d.engagement));

export default function Analytics() {
  return (
    <AppLayout>
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3">
        <h1 className="text-xl font-bold font-display">Analytics</h1>
        <p className="text-sm text-muted-foreground">Last 28 days</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className={`text-xs font-medium ${stat.positive ? "text-success" : "text-engagement"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold font-display">{formatCount(stat.value)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <h3 className="font-bold font-display mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Weekly Engagement
          </h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.engagement / maxEngagement) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-full rounded-t-lg gradient-ai min-h-[4px]"
                />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-primary/20 bg-card p-4 glow-sm"
        >
          <h3 className="font-bold font-display mb-3 gradient-ai-text flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            AI Insights
          </h3>
          <ul className="space-y-2 text-sm text-secondary-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Your posts about AI get 3.2x more engagement than average
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Thursday is your best day for posting — consider increasing output
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Posts with threads get 2.8x more replies than standalone posts
            </li>
          </ul>
        </motion.div>
      </div>
    </AppLayout>
  );
}
