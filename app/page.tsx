"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { Hero } from "@/components/sections/01-hero";
import { HowItWorks } from "@/components/sections/02-how-it-works";
import { PerfectFor } from "@/components/sections/03-perfect-for";
import { Zones } from "@/components/sections/04-zones";
import { DownloadApp } from "@/components/sections/05-download-app";
import { Footer } from "@/components/sections/06-footer";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";

export default function Home() {
  useScrollAnimations();
  return (
    <PageLayout>
      <div className='space-y-24 md:space-y-40'>
        <Hero />

        <HowItWorks />

        <PerfectFor />

        <Zones />

        <DownloadApp />

        <Footer />
      </div>
    </PageLayout>
  );
}
