import Image from "next/image";

export function Hero() {
  return (
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
        <div className='flex flex-row gap-2 md:gap-4 justify-center items-center'>
          <Image
            src='/buttons/app-store-button.png'
            alt='Download on the App Store'
            width={180}
            height={60}
            className='h-auto w-[150px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
          />
          <Image
            src='/buttons/google-play-button.png'
            alt='Get it on Google Play'
            width={180}
            height={60}
            className='h-auto w-[150px] md:w-[180px] rounded-3xl bg-neon-green scale-on-hover'
          />
        </div>
        <Image
          src='/images/hero/spot.png?v=2'
          alt='Spot app preview'
          width={600}
          height={1200}
          className='h-auto w-full max-w-[300px] md:max-w-[600px]'
          priority
          unoptimized
        />
      </div>
    </section>
  );
}
