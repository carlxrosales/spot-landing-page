"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";

interface ImageCardProps {
  imageId: string;
  src: string;
  alt: string;
  enlargedImage: string | null;
  onImageClick: (imageId: string) => void;
  fullWidth?: boolean;
}

const ImageCard = memo(
  ({
    imageId,
    src,
    alt,
    enlargedImage,
    onImageClick,
    fullWidth = false,
  }: ImageCardProps) => {
    const isEnlarged = enlargedImage === imageId;
    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isEnlarged) {
          e.currentTarget.style.transform = "scale(1.05)";
        }
      },
      [isEnlarged]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isEnlarged) {
          e.currentTarget.style.transform = "scale(1)";
        }
      },
      [isEnlarged]
    );

    return (
      <div
        onClick={() => onImageClick(imageId)}
        className={`${
          fullWidth ? "w-full" : "w-1/2"
        } max-w-[140px] md:max-w-xs aspect-[9/19] relative rounded-[1.5rem] md:rounded-[4rem] cursor-pointer will-change-transform overflow-visible`}
        style={{
          transformOrigin: "center center",
          transform: isEnlarged ? "scale(1.5)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: isEnlarged ? 50 : 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
          <Image
            src={src}
            alt={alt}
            fill
            className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
            sizes='(max-width: 768px) 140px, 320px'
          />
        </div>
      </div>
    );
  }
);

ImageCard.displayName = "ImageCard";

export function HowItWorks() {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const handleImageClick = useCallback((imageId: string) => {
    setEnlargedImage((prev) => (prev === imageId ? null : imageId));
  }, []);

  return (
    <>
      {/* How It Works */}
      <section id='how-it-works' className='space-y-16 md:space-y-24 mb-25'>
        <div className='text-center space-y-4 fade-in-on-scroll '>
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
        {/* pick your mood */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-5xl md:text-6xl mb-4 animate-flip'>✅</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center mb-1'>
              vibe check
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              vibe how you wanna vibe
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto overflow-visible'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6 relative overflow-visible'>
              <ImageCard
                imageId='vibe1'
                src='/images/screenshots/vibe.png'
                alt='Find by vibe screen 1'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
              <ImageCard
                imageId='vibe2'
                src='/images/screenshots/vibe2.png'
                alt='Find by vibe screen 2'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>

        {/* spot got you */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-5xl md:text-6xl mb-2 animate-blink'>👀</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center mb-1'>
              spot got you
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              spot spots the spots for your vibe
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto overflow-visible'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6 relative overflow-visible'>
              <ImageCard
                imageId='finding'
                src='/images/screenshots/finding.png'
                alt='AI generates spots screen'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
              <ImageCard
                imageId='spot'
                src='/images/hero/spot.png'
                alt='Spot app preview'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>

        {/* nearby spot */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-6xl md:text-7xl mb-1 animate-location-bounce'>
              📍
            </div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center mb-1'>
              spot check
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              set your distance, peek the deets, and bounce there instantly
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto overflow-visible'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6 relative overflow-visible'>
              <ImageCard
                imageId='distance'
                src='/images/screenshots/distance.png'
                alt='Location-based distance selection screen'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
              <ImageCard
                imageId='description'
                src='/images/screenshots/description.png'
                alt='Place description and directions screen'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>

        {/*  swipe & decide */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-5xl md:text-6xl mb-4 animate-pendulum'>👆</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center mb-1'>
              swipe & decide
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              left = negats, right = bet
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto overflow-visible'>
            <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6 relative overflow-visible'>
              <ImageCard
                imageId='swipe1'
                src='/images/screenshots/swipe1.png'
                alt='Swipe for places screen 1'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
              <ImageCard
                imageId='swipe2'
                src='/images/screenshots/swipe2.png'
                alt='Swipe for places screen 2'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>

        {/* Save and share */}
        <div className='space-y-8 max-w-6xl mx-auto fade-in-on-scroll'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-6xl md:text-7xl mb-2 animate-flex'>💪</div>
            <h3 className='text-3xl md:text-4xl text-black font-groen text-center mb-1'>
              keep & flex
            </h3>
            <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
              save your faves & share with your peeps
            </p>
          </div>
          <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8 max-w-4xl mx-auto'>
            <div className='flex justify-center items-center pb-6'>
              <ImageCard
                imageId='share'
                src='/images/screenshots/share.png'
                alt='Save and share screen'
                enlargedImage={enlargedImage}
                onImageClick={handleImageClick}
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
