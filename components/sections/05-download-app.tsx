"use client";

import { useState } from "react";
import Image from "next/image";

import type { ReactElement } from "react";

export function DownloadApp(): ReactElement {
  const [appStoreError, setAppStoreError] = useState(false);
  const [googlePlayError, setGooglePlayError] = useState(false);
  const [phoneImageError, setPhoneImageError] = useState(false);
  return (
    <div id='download-app' className='pt-8 fade-in-on-scroll'>
      <div className='bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-white/20 max-w-4xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          {/* Left side - Text and buttons */}
          <div className='flex-1 space-y-6 text-center md:text-left'>
            <h3 className='text-3xl md:text-4xl font-bold text-black font-groen'>
              Ready to find your spot? Get the app now
            </h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-0 md:gap-1 justify-center md:justify-start'>
                <span className='text-2xl leading-none mt-1'>✓</span>
                <p className='text-lg text-black/80 ml-1 md:ml-1 flex-1'>
                  seamless place discovery experience
                </p>
              </div>
              <div className='flex items-start gap-0 md:gap-1 justify-center md:justify-start'>
                <span className='text-2xl leading-none mt-1'>✓</span>
                <p className='text-lg text-black/80 -ml-1 md:ml-1 flex-1'>
                  faster and more efficient
                </p>
              </div>
            </div>
            <div className='flex flex-row gap-2 md:gap-4 justify-center md:justify-start'>
              {appStoreError ? (
                <div
                  className='h-[60px] w-[120px] md:w-[180px] rounded-3xl bg-neon-green flex items-center justify-center text-xs text-black/60'
                  aria-label='Download on the App Store - Image failed to load'
                >
                  App Store
                </div>
              ) : (
                <Image
                  src='/buttons/app-store-button.png'
                  alt='Download on the App Store'
                  width={180}
                  height={60}
                  loading='lazy'
                  className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                  onError={() => setAppStoreError(true)}
                />
              )}
              {googlePlayError ? (
                <div
                  className='h-[60px] w-[120px] md:w-[180px] rounded-3xl bg-neon-green flex items-center justify-center text-xs text-black/60'
                  aria-label='Get it on Google Play - Image failed to load'
                >
                  Google Play
                </div>
              ) : (
                <Image
                  src='/buttons/google-play-button.png'
                  alt='Get it on Google Play'
                  width={180}
                  height={60}
                  loading='lazy'
                  className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                  onError={() => setGooglePlayError(true)}
                />
              )}
            </div>
          </div>

          {/* Right side - Phone image */}
          <div className='flex-shrink-0'>
            {phoneImageError ? (
              <div
                className='h-[600px] w-[250px] md:w-[400px] bg-gray-200 flex items-center justify-center text-gray-500'
                aria-label='Spot app preview - Image failed to load'
              >
                <span>Image unavailable</span>
              </div>
            ) : (
              <Image
                src='/images/hero/spot.png?v=2'
                alt='Spot app preview'
                width={300}
                height={600}
                className='h-auto max-w-[250px] md:max-w-[400px]'
                priority
                unoptimized
                onError={() => setPhoneImageError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
