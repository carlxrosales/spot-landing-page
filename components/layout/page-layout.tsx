"use client";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navigation } from "./navigation";
import { usePathname } from "next/navigation";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavigation = ["/help", "/terms", "/privacy"].includes(pathname);

  return (
    <div className='min-h-screen relative' style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
      <AnimatedBackground />
      <div className='relative z-10' style={{ touchAction: 'pan-y' }}>
        {!hideNavigation && <Navigation />}
        <main id='main-content' className='w-screen mx-auto px-6 md:max-w-7xl md:px-8 py-8 md:py-16' style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
