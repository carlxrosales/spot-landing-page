"use client";

import { lazy, Suspense } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Hero } from "@/components/sections/01-hero";
import { JsonLd } from "@/components/JsonLd";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { SITE_URL } from "@/lib/constants";
import { ImageSkeleton } from "@/components/ImageSkeleton";
import { Skeleton } from "@/components/Skeleton";

const HowItWorks = lazy(() =>
  import("@/components/sections/02-how-it-works").then((mod) => ({
    default: mod.HowItWorks,
  }))
);

const PerfectFor = lazy(() =>
  import("@/components/sections/03-perfect-for").then((mod) => ({
    default: mod.PerfectFor,
  }))
);

const Zones = lazy(() =>
  import("@/components/sections/04-zones").then((mod) => ({
    default: mod.Zones,
  }))
);

const DownloadApp = lazy(() =>
  import("@/components/sections/05-download-app").then((mod) => ({
    default: mod.DownloadApp,
  }))
);

const Footer = lazy(() =>
  import("@/components/sections/06-footer").then((mod) => ({
    default: mod.Footer,
  }))
);

const LoadingFallback = () => (
  <div className='space-y-4'>
    <ImageSkeleton aspectRatio="16/9" width="100%" height={256} />
    <Skeleton lines={3} />
  </div>
);

export default function Home(): JSX.Element {
  useScrollAnimations();
  return (
    <>
      <JsonLd
        type="WebPage"
        data={{
          name: "spot: discover & share places",
          description: "find places that match ur vibe",
          url: SITE_URL,
        }}
      />
      <PageLayout>
        <ErrorBoundary>
          <div className='space-y-24 md:space-y-40'>
            <Hero />

            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary componentName="HowItWorks">
                <HowItWorks />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary componentName="PerfectFor">
                <PerfectFor />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary componentName="Zones">
                <Zones />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary componentName="DownloadApp">
                <DownloadApp />
              </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary componentName="Footer">
                <Footer />
              </ErrorBoundary>
            </Suspense>
          </div>
        </ErrorBoundary>
      </PageLayout>
    </>
  );
}
