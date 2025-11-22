import Image from "next/image";

export function HowItWorks() {
  return (
    <>
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
                  src='/images/screenshots/vibe.png'
                  alt='Find by vibe screen 1'
                  fill
                  className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                  sizes='(max-width: 768px) 140px, 320px'
                />
              </div>
              <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
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
                  src='/images/screenshots/finding.png'
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
                  src='/images/screenshots/swipe1.png'
                  alt='Swipe for places screen 1'
                  fill
                  className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                  sizes='(max-width: 768px) 140px, 320px'
                />
              </div>
              <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
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
                  src='/images/screenshots/distance.png'
                  alt='Location-based distance selection screen'
                  fill
                  className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                  sizes='(max-width: 768px) 140px, 320px'
                />
              </div>
              <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered scale-on-hover'>
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
      </section>
    </>
  );
}

