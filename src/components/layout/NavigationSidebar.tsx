import { Home, Search, Bell, Mail, User, BarChart3, Sparkles, Hash, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mockData";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Hash, label: "Trending", path: "/trending" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: Sparkles, label: "AI Assistant", path: "/ai" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function NavigationSidebar() {
  const location = useLocation();

  return (
    <aside className="sticky top-0 flex h-screen w-[68px] flex-col items-center py-4 xl:w-[260px] xl:items-start xl:px-4">
      {/* Logo */}
      <NavLink to="/" className="mb-6 flex items-center gap-2 px-3 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ai">
          <span className="text-lg font-bold text-primary-foreground font-display">X</span>
        </div>
        <span className="hidden text-xl font-bold font-display gradient-ai-text xl:block">
          LittleX
        </span>
      </NavLink>

      {/* Nav Items */}
      <nav className="flex flex-1 flex-col gap-1 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 group",
                isActive
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 shrink-0 transition-colors",
                  isActive && "text-primary"
                )}
              />
              <span className="hidden xl:block text-[15px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto flex w-full items-center gap-3 rounded-xl p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
        <div className="h-10 w-10 rounded-full gradient-ai flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
          {currentUser.name[0]}
        </div>
        <div className="hidden xl:block min-w-0">
          <p className="text-sm font-semibold truncate">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground truncate">{currentUser.handle}</p>
        </div>
      </div>
    </aside>
  );
}
