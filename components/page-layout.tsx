import { AnimatedBackground } from "./animated-background";
import { Navigation } from "./navigation";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main className="max-w-7xl mx-auto px-8 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}

