import { PageLayout } from "@/components/page-layout";
import { Accordion } from "@/components/accordion";
import Image from "next/image";

export default function Home() {
  return (
    <PageLayout>
      <div className='space-y-24 md:space-y-40'>
        {/* Hero Section */}
        <section className='text-center space-y-8'>
          <div className='space-y-0'>
            <h1 className='text-7xl md:text-9xl text-black font-groen leading-tight'>
              spot
            </h1>
            <p className='text-3xl md:text-5xl text-black font-bold -mt-2'>
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
                className='h-auto rounded-3xl bg-neon-green'
              />
              <Image
                src='/google-play-button.png'
                alt='Get it on Google Play'
                width={180}
                height={60}
                className='h-auto rounded-3xl bg-neon-green'
              />
            </div>
            <Image
              src='/spot.png'
              alt='Spot app preview'
              width={300}
              height={600}
              className='h-auto max-w-[300px] md:max-w-[400px]'
              priority
              unoptimized
            />
          </div>
        </section>

        {/* How It Works */}
        <section id='how-it-works' className='space-y-16 md:space-y-24'>
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
          <div className='space-y-8 max-w-6xl mx-auto'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2'>✨</div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Find by vibe
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Choose your mood, purpose, or aesthetic
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8'>
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
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
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
          <div className='space-y-8 max-w-6xl mx-auto'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2'>🤖</div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                AI generates
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                AI analyzes your preferences and finds perfect spots that match
                your vibe
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8'>
              <div className='flex justify-center items-center pb-6'>
                <div className='w-full max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
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
          <div className='space-y-8 max-w-6xl mx-auto'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2'>👆</div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Swipe for places
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Right to go, left to skip
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8'>
              <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/swipe1.png'
                    alt='Swipe for places screen 1'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
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
          <div className='space-y-8 max-w-6xl mx-auto'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='text-6xl md:text-7xl mb-2'>📍</div>
                <div className='text-6xl md:text-7xl mb-2'>🗺️</div>
              </div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Location-based picks & Instant directions
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Discover spots within your selected range and open in Maps or
                Waze with one tap
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8'>
              <div className='flex flex-row gap-3 md:gap-6 justify-center items-center pb-6'>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
                  <Image
                    src='/distance.png'
                    alt='Location-based distance selection screen'
                    fill
                    className='object-cover absolute inset-0 rounded-[1.5rem] md:rounded-[4rem]'
                    sizes='(max-width: 768px) 140px, 320px'
                  />
                </div>
                <div className='w-1/2 max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
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
          <div className='space-y-8 max-w-6xl mx-auto'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='text-6xl md:text-7xl mb-2'>💾</div>
              <h3 className='text-3xl md:text-4xl text-black font-groen text-center'>
                Save and share
              </h3>
              <p className='text-xl md:text-2xl text-black/80 text-center max-w-2xl'>
                Keep your favorites and send them to friends
              </p>
            </div>
            <div className='bg-white/70 backdrop-blur-xl rounded-[2rem] px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 mt-8'>
              <div className='flex justify-center items-center pb-6'>
                <div className='w-full max-w-[140px] md:max-w-xs aspect-[9/19] relative overflow-hidden rounded-[1.5rem] md:rounded-[4rem] shadow-layered'>
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
        <section className='space-y-8'>
          <h2 className='text-4xl md:text-6xl text-black text-center font-groen'>
            Perfect for
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-12'>
            {[
              { name: "Food trips", image: "/food-trips.jpeg" },
              { name: "Study sessions", image: "/study-sessions.jpeg" },
              { name: "Remote work", image: "/remote-work.jpeg" },
              { name: "Coffee runs", image: "/coffee-runs.jpeg" },
              { name: "Night outs", image: "/night-outs.jpeg" },
              { name: "Date plans", image: "/date-plans.jpeg" },
              { name: "Solo days", image: "/solo-days.jpeg" },
              {
                name: "Exploring new areas",
                image: "/exploring-new-areas.jpeg",
              },
            ].map((item) => (
              <div
                key={item.name}
                className='group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-neon-pink/30 transition-all duration-500 transform hover:scale-105 aspect-square'
              >
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-transparent transition-all duration-500 z-10'></div>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover rounded-2xl'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
                <div className='absolute inset-0 flex items-center justify-center z-20'>
                  <p className='relative font-bold text-lg md:text-xl text-white drop-shadow-lg'>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zones */}
        <section id='zones' className='space-y-8'>
          <h2 className='text-4xl md:text-6xl text-black text-center font-groen'>
            Zones
          </h2>
          <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg max-w-4xl mx-auto'>
            <p className='text-xl md:text-2xl text-black/90 text-center leading-relaxed'>
              Coming soon...
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id='faq' className='space-y-6 max-w-4xl mx-auto'>
          <h2 className='text-4xl text-black font-groen text-center'>
            What the FAQ?
          </h2>
          <Accordion
            items={[
              {
                question: "How does spot match me with places?",
                answer:
                  "spot uses AI-powered vector embeddings and similarity search to match your preferences with places based on their reviews and descriptions. You answer a few questions about your preferences, and we find places that align with your vibe. It's basically like having a friend who knows exactly what you're looking for! 🎯",
              },
              {
                question: "How do I use the swipe interface?",
                answer:
                  "Swipe left to skip a place, or swipe right to save it. You can then share saved places or open them in Maps or Waze for directions. It's super intuitive - just like swiping through stories! 👆",
              },
              {
                question: "How often is the place data updated?",
                answer:
                  "We update our place database monthly to ensure you have access to the latest information, reviews, and new venues. So you'll always be in the loop about what's new and trending! 🔄",
              },
              {
                question: "What locations does spot cover?",
                answer:
                  "spot uses your location to find places near you. We cover restaurants, cafes, venues, and other establishments that have at least 2 reviews and a 2.5+ star rating. Basically anywhere that's worth checking out! 📍",
              },
              {
                question: "Is spot free to use?",
                answer:
                  "Yes, spot is completely free to download and use - no cap! We help you discover amazing places that match your preferences at no cost. Zero hidden fees, just good vibes. ✨",
              },
              {
                question: "How do I share a place I like?",
                answer:
                  "After swiping right on a place, you can share it with friends through the built-in sharing feature, which includes spot branding for easy discovery. Perfect for when you find a spot that absolutely slaps! 🔥",
              },
            ]}
          />
        </section>
      </div>
    </PageLayout>
  );
}
