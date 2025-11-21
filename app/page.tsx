import { PageLayout } from "@/components/page-layout";
import { Accordion } from "@/components/accordion";
import Image from "next/image";

export default function Home() {
  return (
    <PageLayout>
      <div className='space-y-24 md:space-y-40'>
        {/* Hero Section */}
        <section className='text-center space-y-8'>
          <h1 className='text-7xl md:text-9xl text-black font-groen leading-tight'>
            spot
          </h1>
          <p className='text-3xl md:text-5xl text-black font-groen'>
            find places that match ur vibe
          </p>
          <p className='text-xl md:text-2xl text-black max-w-3xl mx-auto font-medium leading-relaxed'>
            spot makes it stupid easy to find exactly what you're in the mood
            for
          </p>
          <div className='flex flex-col items-center gap-10 pt-8'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Image
                src='/app-store-button.png'
                alt='Download on the App Store'
                width={180}
                height={60}
                className='h-auto'
              />
              <Image
                src='/google-play-button.png'
                alt='Get it on Google Play'
                width={180}
                height={60}
                className='h-auto'
              />
            </div>
            <Image
              src='/spot-iphone-graphic.png'
              alt='Preview of the spot app'
              width={520}
              height={1040}
              className='w-full max-w-sm sm:max-w-md md:max-w-lg h-auto'
              priority
            />
          </div>
        </section>

        {/* Why We Love Spot */}
        <section id='why-we-love-spot' className='space-y-8 -mt-12 md:-mt-20'>
          <h2 className='text-4xl md:text-6xl text-black text-center font-groen'>
            Why we love spot
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
            <div className='group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/30'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500'></div>
              <div className='relative'>
                <div className='text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300'>
                  👆
                </div>
                <h3 className='text-2xl text-black mb-3 font-groen'>
                  Swipe for places
                </h3>
                <p className='text-black/80 text-lg leading-relaxed'>
                  Right to go, left to skip
                </p>
              </div>
            </div>
            <div className='group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/30'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500'></div>
              <div className='relative'>
                <div className='text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300'>
                  ✨
                </div>
                <h3 className='text-2xl text-black mb-3 font-groen'>
                  Find by vibe
                </h3>
                <p className='text-black/80 text-lg leading-relaxed'>
                  Choose your mood, purpose, or aesthetic
                </p>
              </div>
            </div>
            <div className='group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/30'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500'></div>
              <div className='relative'>
                <div className='text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300'>
                  📍
                </div>
                <h3 className='text-2xl text-black mb-3 font-groen'>
                  Location-based picks
                </h3>
                <p className='text-black/80 text-lg leading-relaxed'>
                  Discover spots within your selected range
                </p>
              </div>
            </div>
            <div className='group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/30'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500'></div>
              <div className='relative'>
                <div className='text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300'>
                  🗺️
                </div>
                <h3 className='text-2xl text-black mb-3 font-groen'>
                  Instant directions
                </h3>
                <p className='text-black/80 text-lg leading-relaxed'>
                  Open in Maps or Waze with one tap
                </p>
              </div>
            </div>
            <div className='group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/30'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500'></div>
              <div className='relative'>
                <div className='text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300'>
                  💾
                </div>
                <h3 className='text-2xl text-black mb-3 font-groen'>
                  Save and share
                </h3>
                <p className='text-black/80 text-lg leading-relaxed'>
                  Keep your favorites and send them to friends
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className='space-y-8'>
          <div className='relative bg-white/85 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-xl hover:shadow-2xl hover:shadow-neon-pink/20 transition-all duration-500'>
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-green/5'></div>
            <div className='relative'>
              <h2 className='text-3xl md:text-5xl text-black mb-6 font-groen text-center'>
                Get a personalized stream
              </h2>
              <p className='text-xl md:text-2xl text-black/90 text-center max-w-4xl mx-auto leading-relaxed'>
                Get a personalized stream of cafés, restaurants, study spots,
                hangout places, and more — all based on what you actually like.
              </p>
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
              "Food trips",
              "Study sessions",
              "Remote work",
              "Coffee runs",
              "Night outs",
              "Date plans",
              "Solo days",
              "Exploring new areas",
            ].map((item) => (
              <div
                key={item}
                className='group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:bg-gradient-to-br hover:from-neon-pink hover:to-neon-pink/80 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/30'
              >
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-transparent transition-all duration-500'></div>
                <p className='relative font-bold text-lg md:text-xl'>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className='text-center space-y-8 py-12'>
          <h2 className='text-4xl md:text-6xl text-black font-groen'>
            Download spot and find places that match your vibe
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Image
              src='/app-store-button.png'
              alt='Download on the App Store'
              width={180}
              height={60}
              className='h-auto'
            />
            <Image
              src='/google-play-button.png'
              alt='Get it on Google Play'
              width={180}
              height={60}
              className='h-auto'
            />
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
