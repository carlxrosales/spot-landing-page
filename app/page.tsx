"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/page-layout";
import { PerfectForCarousel } from "@/components/perfect-for-carousel";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { City } from "@/components/philippines-map";
import { getCitiesWithCounts } from "@/lib/cities";

// Dynamically import the map component to avoid SSR issues with mapbox-gl
const PhilippinesMap = dynamic(
  () =>
    import("@/components/philippines-map").then((mod) => ({
      default: mod.PhilippinesMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-[600px] flex items-center justify-center'>
        Loading map...
      </div>
    ),
  }
);

export default function Home() {
  const [philippineCities, setPhilippineCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  // Fetch cities data
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoadingCities(true);
        const cities = await getCitiesWithCounts();
        console.log("Fetched cities with counts:", cities);
        // Log Marikina specifically for debugging
        const marikina = cities.find((c) => c.id === "marikina");
        if (marikina) {
          console.log("Marikina data:", marikina);
        }
        setPhilippineCities(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Wait for next tick to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <PageLayout>
      <div className='space-y-24 md:space-y-40'>
        {/* Hero Section */}
        <section className='text-center space-y-8'>
          <div className='space-y-0'>
            <h1 className='text-7xl md:text-9xl text-black font-groen leading-tight animate-breathe'>
              spot
            </h1>
            <p className='text-3xl md:text-5xl text-black font-bold -mt-2 opacity-80 animate-breathe'>
              find places that match ur vibe
            </p>
          </div>
          <div className='flex flex-col items-center gap-10 pt-8'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Image
                src='/app-store-button.png'
                alt='Download on the App Store'
                width={180}
                height={60}
                className='h-auto rounded-3xl bg-neon-green scale-on-hover'
              />
              <Image
                src='/google-play-button.png'
                alt='Get it on Google Play'
                width={180}
                height={60}
                className='h-auto rounded-3xl bg-neon-green scale-on-hover'
              />
            </div>
            <Image
              src='/spot.png?v=2'
              alt='Spot app preview'
              width={300}
              height={600}
              className='h-auto max-w-[300px] md:max-w-[800px]'
              priority
              unoptimized
            />
          </div>
        </section>

        {/* How It Works */}
        <section
          id='how-it-works'
          className='space-y-16 md:space-y-24 fade-in-on-scroll'
        >
          <div className='text-center space-y-4'>
            <h2 className='text-5xl md:text-6xl text-black font-groen'>
              How it works
            </h2>
            <p className='text-2xl md:text-2xl text-black/80 max-w-3xl mx-auto'>
              spot makes it stupid easy to find exactly what you're in the mood
              for
            </p>
          </div>
        </section>

        <section
          id='why-we-love-spot'
          className='space-y-16 md:space-y-24 -mt-12 md:-mt-20'
        >
          {/* Find by vibe */}
          <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2 animate-floating'>
                ✨
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Find by vibe
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Choose your mood, purpose, or aesthetic
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
              <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/vibe.png'
                    alt='Find by vibe screen 1'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/vibe2.png'
                    alt='Find by vibe screen 2'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI generates */}
          <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2 animate-floating'>
                🤖
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                AI generates
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                AI analyzes your preferences and finds perfect spots that match
                your vibe
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
              <div className='flex justify-center items-center pb-6'>
                <div className='w-full max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/finding.png'
                    alt='AI generates spots screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swipe for places */}
          <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2 animate-floating'>
                👆
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Swipe for places
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Right to go, left to skip
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
              <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/swipe1.png'
                    alt='Swipe for places screen 1'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/swipe2.png'
                    alt='Swipe for places screen 2'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location-based picks & Instant directions */}
          <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2 animate-floating'>
                🗺️
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Location-based picks
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Discover spots within your selected range and open in Maps or
                Waze with one tap
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
              <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/distance.png'
                    alt='Location-based distance selection screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/description.png'
                    alt='Place description and directions screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save and share */}
          <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2 animate-floating'>
                💾
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Save and share
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Keep your favorites and send them to friends
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
              <div className='flex justify-center items-center pb-6'>
                <div className='w-full max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
                  <Image
                    src='/share.png'
                    alt='Save and share screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className='space-y-8 max-w-4xl mx-auto fade-in-on-scroll'>
          <h2 className='text-4xl md:text-6xl text-black text-center font-groen'>
            Perfect for
          </h2>
          <div className='mt-12'>
            <PerfectForCarousel
              items={[
                { name: "Food trips", emoji: "🍔" },
                { name: "Study sessions", emoji: "📚" },
                { name: "Remote work", emoji: "💻" },
                { name: "Coffee runs", emoji: "☕" },
                { name: "Night outs", emoji: "🌙" },
                { name: "Date plans", emoji: "💕" },
                { name: "Solo days", emoji: "🧘" },
                { name: "Exploring new areas", emoji: "🗺️" },
                { name: "Weekend adventures", emoji: "🎒" },
              ]}
            />
          </div>
        </section>

        {/* Zones */}
        <section id='zones' className='space-y-8 fade-in-on-scroll'>
          <div className='text-center'>
            <h2 className='text-4xl md:text-6xl text-black font-groen mb-4'>
              Zones
            </h2>
            <p className='text-xl md:text-2xl text-black/80 max-w-3xl mx-auto mb-8'>
              Explore cities in the Philippines that have been searched by spot.
            </p>
          </div>
          <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg max-w-7xl mx-auto'>
            {isLoadingCities ? (
              <div className='h-[600px] flex items-center justify-center'>
                <p className='text-xl text-gray'>Loading cities data...</p>
              </div>
            ) : process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
              <PhilippinesMap
                cities={philippineCities}
                mapboxToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              />
            ) : (
              <div className='h-[600px] flex items-center justify-center'>
                <p className='text-xl text-gray'>
                  Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment
                  variables
                </p>
              </div>
            )}
          </div>
          <div className='text-center'>
            <p className='text-lg text-black/70'>
              Click on the markers to learn more about each city
            </p>
          </div>
        </section>

        <div id='download-app' className='pt-8 fade-in-on-scroll'>
          <div className='bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-white/20 max-w-6xl mx-auto'>
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
              {/* Left side - Text and buttons */}
              <div className='flex-1 space-y-6 text-center md:text-left'>
                <h3 className='text-3xl md:text-4xl font-bold text-black'>
                  Ready to Find Your Spot? Get the app now
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 justify-center md:justify-start'>
                    <span className='text-2xl'>✓</span>
                    <p className='text-lg text-black/80'>
                      Seamless place discovery experience
                    </p>
                  </div>
                  <div className='flex items-center gap-3 justify-center md:justify-start'>
                    <span className='text-2xl'>✓</span>
                    <p className='text-lg text-black/80'>
                      Faster and more efficient
                    </p>
                  </div>
                </div>
                <div className='flex flex-row gap-2 md:gap-4 justify-center md:justify-start'>
                  <Image
                    src='/app-store-button.png'
                    alt='Download on the App Store'
                    width={180}
                    height={60}
                    className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                  />
                  <Image
                    src='/google-play-button.png'
                    alt='Get it on Google Play'
                    width={180}
                    height={60}
                    className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                  />
                </div>
              </div>

              {/* Right side - Phone image */}
              <div className='flex-shrink-0'>
                <Image
                  src='/spot.png?v=2'
                  alt='Spot app preview'
                  width={300}
                  height={600}
                  className='h-auto max-w-[250px] md:max-w-[400px]'
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='pt-8 pb-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-8'>
            <div className='bg-white/70 backdrop-blur-xl rounded-3xl px-6 md:px-8 py-6 md:py-8 shadow-lg border border-white/20'>
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
                {/* Logo and Copyright */}
                <div className='flex flex-col'>
                  <h1 className='text-4xl md:text-5xl text-black font-groen leading-tight'>
                    spot
                  </h1>
                  <p className='text-sm text-black/60 mt-2'>
                    © All rights reserved
                  </p>
                </div>

                {/* Links */}
                <div className='flex flex-wrap gap-6 md:gap-8'>
                  <a
                    href='/terms'
                    className='text-base md:text-lg text-black/80 hover:text-black transition-colors'
                  >
                    Terms
                  </a>
                  <a
                    href='/help'
                    className='text-base md:text-lg text-black/80 hover:text-black transition-colors'
                  >
                    Help
                  </a>
                  <a
                    href='/privacy'
                    className='text-base md:text-lg text-black/80 hover:text-black transition-colors'
                  >
                    Privacy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
}
