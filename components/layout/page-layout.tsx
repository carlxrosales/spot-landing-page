"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navigation } from "./navigation";
import { usePathname } from "next/navigation";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavigation = ["/help", "/terms", "/privacy"].includes(pathname);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {!hideNavigation && <Navigation />}
        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16">
          {children}
        </main>
      </div>
    </div>
  );
}

