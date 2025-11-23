export function Footer() {
  return (
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
            <nav aria-label='Footer navigation'>
              <div className='flex flex-wrap gap-6 md:gap-8'>
                <a
                  href='/terms'
                  className='text-base md:text-lg text-black/80 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-1'
                >
                  Terms
                </a>
                <a
                  href='/privacy'
                  className='text-base md:text-lg text-black/80 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-1'
                >
                  Privacy
                </a>
                <a
                  href='/help'
                  className='text-base md:text-lg text-black/80 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-1'
                >
                  Help
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
