import Image from "next/image";

export function Hero() {
  return (
    <section className='text-center space-y-8'>
      <div className='space-y-0 mb-1'>
        <h1 className='text-7xl md:text-9xl text-black font-groen leading-tight animate-breathe'>
          spot
        </h1>
        <p className='text-3xl md:text-5xl text-black font-bold -mt-2 opacity-80 animate-breathe'>
          find places that match ur vibe
        </p>
      </div>
      <div className='flex flex-col items-center gap-10 pt-8'>
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
