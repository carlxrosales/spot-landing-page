import { PageLayout } from "@/components/page-layout";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="space-y-20 md:space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-7xl md:text-9xl text-black font-groen leading-tight">
            spot
          </h1>
          <p className="text-3xl md:text-5xl text-black font-groen">
            find places that match ur vibe
          </p>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto font-medium leading-relaxed">
            spot makes it stupid easy to find exactly what you're in the mood for
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="https://apps.apple.com"
              className="group relative px-10 py-5 bg-black text-neon-green rounded-2xl font-bold text-lg hover:bg-neon-pink hover:text-white transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-neon-pink/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 to-neon-green/0 group-hover:from-neon-pink/20 group-hover:to-neon-green/20 transition-all duration-500"></div>
              <span className="relative">Download on App Store</span>
            </Link>
            <Link
              href="https://play.google.com"
              className="group relative px-10 py-5 bg-black text-neon-green rounded-2xl font-bold text-lg hover:bg-neon-pink hover:text-white transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-neon-pink/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 to-neon-green/0 group-hover:from-neon-pink/20 group-hover:to-neon-green/20 transition-all duration-500"></div>
              <span className="relative">Get it on Google Play</span>
            </Link>
          </div>
        </section>

        {/* Why We Love Spot */}
        <section className="space-y-8">
          <h2 className="text-4xl md:text-6xl text-black text-center font-groen">
            Why we love spot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-black/20 hover:border-neon-pink transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative">
                <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">👆</div>
                <h3 className="text-2xl text-black mb-3 font-groen">Swipe for places</h3>
                <p className="text-black/80 text-lg leading-relaxed">Right to go, left to skip</p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-black/20 hover:border-neon-pink transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative">
                <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">✨</div>
                <h3 className="text-2xl text-black mb-3 font-groen">Find by vibe</h3>
                <p className="text-black/80 text-lg leading-relaxed">Choose your mood, purpose, or aesthetic</p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-black/20 hover:border-neon-pink transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative">
                <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">📍</div>
                <h3 className="text-2xl text-black mb-3 font-groen">Location-based picks</h3>
                <p className="text-black/80 text-lg leading-relaxed">Discover spots within your selected range</p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-black/20 hover:border-neon-pink transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative">
                <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">🗺️</div>
                <h3 className="text-2xl text-black mb-3 font-groen">Instant directions</h3>
                <p className="text-black/80 text-lg leading-relaxed">Open in Maps or Waze with one tap</p>
              </div>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-black/20 hover:border-neon-pink transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-neon-pink/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/0 to-neon-pink/0 group-hover:from-neon-pink/5 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative">
                <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">💾</div>
                <h3 className="text-2xl text-black mb-3 font-groen">Save and share</h3>
                <p className="text-black/80 text-lg leading-relaxed">Keep your favorites and send them to friends</p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="space-y-8">
          <div className="relative bg-white/85 backdrop-blur-md rounded-3xl p-10 md:p-16 border-2 border-black/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-neon-pink/30">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-green/5"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl text-black mb-6 font-groen text-center">
                Get a personalized stream
              </h2>
              <p className="text-xl md:text-2xl text-black/90 text-center max-w-4xl mx-auto leading-relaxed">
                Get a personalized stream of cafés, restaurants, study spots, hangout places, and more — all based on what you actually like.
              </p>
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className="space-y-8">
          <h2 className="text-4xl md:text-6xl text-black text-center font-groen">
            Perfect for
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
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
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border-2 border-black/20 text-center hover:bg-gradient-to-br hover:from-neon-pink hover:to-neon-pink/80 hover:text-white hover:border-neon-pink transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-neon-pink/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-transparent transition-all duration-500"></div>
                <p className="relative font-bold text-lg md:text-xl">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-8 py-12">
          <h2 className="text-4xl md:text-6xl text-black font-groen">
            Download spot and find places that match your vibe
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="https://apps.apple.com"
              className="group relative px-10 py-5 bg-neon-pink text-white rounded-2xl font-bold text-lg hover:bg-black hover:text-neon-green transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-neon-pink/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-neon-green/0 group-hover:from-black/20 group-hover:to-neon-green/20 transition-all duration-500"></div>
              <span className="relative">Download on App Store</span>
            </Link>
            <Link
              href="https://play.google.com"
              className="group relative px-10 py-5 bg-neon-pink text-white rounded-2xl font-bold text-lg hover:bg-black hover:text-neon-green transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-neon-pink/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-neon-green/0 group-hover:from-black/20 group-hover:to-neon-green/20 transition-all duration-500"></div>
              <span className="relative">Get it on Google Play</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
