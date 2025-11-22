import Image from "next/image";

export function DownloadApp() {
  return (
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
              <a
                href='https://apps.apple.com/app/id6755513021'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Download on the App Store'
              >
                <Image
                  src='/buttons/app-store-button.png'
                  alt='Download on the App Store'
                  width={180}
                  height={60}
                  className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                />
              </a>
              <a
                href='https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Get it on Google Play'
              >
                <Image
                  src='/buttons/google-play-button.png'
                  alt='Get it on Google Play'
                  width={180}
                  height={60}
                  className='h-auto w-[120px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
                />
              </a>
            </div>
          </div>

          {/* Right side - Phone image */}
          <div className='flex-shrink-0'>
            <Image
              src='/images/hero/spot.png?v=2'
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
  );
}

