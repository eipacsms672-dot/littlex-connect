import { ReactNode } from "react";
import { NavigationSidebar } from "./NavigationSidebar";
import { RightSidebar } from "./RightSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-background">
      <div className="flex w-full max-w-[1280px]">
        {/* Left Nav */}
        <NavigationSidebar />

        {/* Main Feed */}
        <main className="flex-1 min-w-0 border-x border-border">
          {children}
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
