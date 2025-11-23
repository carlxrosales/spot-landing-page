"use client";

import { useState } from "react";
import Image from "next/image";

export function HowItWorks() {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    if (enlargedImage === imageId) {
      setEnlargedImage(null);
    } else {
      setEnlargedImage(imageId);
    }
  };

  return (
    <>
      {/* How It Works */}
      <section id='how-it-works' className='space-y-16 md:space-y-24'>
        <div className='text-center space-y-4'>
          <h2 className='text-5xl md:text-6xl text-black font-groen'>
            how it works
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
        <div className='space-y-8 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-5xl md:text-6xl mb-2'>👀</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
              pick your mood
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              your vibe, your rules
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
              <div
                onClick={() => handleImageClick("vibe1")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "vibe1" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "vibe1" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "vibe1") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "vibe1") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/vibe.png'
                    alt='Find by vibe screen 1'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
              <div
                onClick={() => handleImageClick("vibe2")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "vibe2" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "vibe2" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "vibe2") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "vibe2") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/vibe2.png'
                    alt='Find by vibe screen 2'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI generates */}
        <div className='space-y-8 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-6xl md:text-5xl mb-4 animate-breathe'>✅</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
              spot got you
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              spot scouts places that match your energy
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
              <div
                onClick={() => handleImageClick("finding")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "finding" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "finding" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "finding") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "finding") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/finding.png'
                    alt='AI generates spots screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
              <div
                onClick={() => handleImageClick("spot")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "spot" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "spot" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "spot") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "spot") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/hero/spot.png'
                    alt='Spot app preview'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe for places */}
        <div className='space-y-8 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-5xl md:text-6xl mb-4 animate-pendulum'>👆</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
              swipe & decide
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              left = next, right = yes
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
              <div
                onClick={() => handleImageClick("swipe1")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "swipe1" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "swipe1" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "swipe1") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "swipe1") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/swipe1.png'
                    alt='Swipe for places screen 1'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
              <div
                onClick={() => handleImageClick("swipe2")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "swipe2" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "swipe2" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "swipe2") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "swipe2") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/swipe2.png'
                    alt='Swipe for places screen 2'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location-based picks & Instant directions */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-6xl md:text-7xl mb-2'>💎</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
              nearby gems
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              find spots near you & jump in with one tap
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
              <div
                onClick={() => handleImageClick("distance")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "distance" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "distance" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "distance") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "distance") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/distance.png'
                    alt='Location-based distance selection screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
              <div
                onClick={() => handleImageClick("description")}
                className={`w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "description" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "description" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "description") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "description") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/description.png'
                    alt='Place description and directions screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save and share */}
        <div className='space-y-8 max-w-6xl mx-auto'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-6xl md:text-7xl mb-2'>💪</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
              Keep & flex
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              Save your faves & share with your crew
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex justify-center items-center pb-6'>
              <div
                onClick={() => handleImageClick("share")}
                className={`w-full max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-visible rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform ${
                  enlargedImage === "share" ? "z-50" : ""
                }`}
                style={{
                  transform:
                    enlargedImage === "share" ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (enlargedImage !== "share") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (enlargedImage !== "share") {
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/images/screenshots/share.png'
                    alt='Save and share screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
