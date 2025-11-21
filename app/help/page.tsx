import { PageLayout } from "@/components/page-layout";

export default function Help() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center font-groen">
          Help & Support
        </h1>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-black font-groen">Contact Us</h2>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
            <p className="text-lg text-black mb-4">
              Have a question or need assistance? Reach out to us:
            </p>
            <a
              href="mailto:hey@carlrosales.com"
              className="inline-block px-6 py-3 bg-neon-pink text-white rounded-lg font-bold text-lg hover:bg-black hover:text-neon-green transition-colors"
            >
              hey@carlrosales.com
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-black font-groen">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                How does spot match me with places?
              </h3>
              <p className="text-lg text-black">
                spot uses AI-powered vector embeddings and similarity search to match your
                preferences with places based on their reviews and descriptions. You answer
                a few questions about your preferences, and we find places that align with
                your vibe.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                How do I use the swipe interface?
              </h3>
              <p className="text-lg text-black">
                Swipe left to skip a place, or swipe right to save it. You can then share
                saved places or open them in Maps or Waze for directions.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                How often is the place data updated?
              </h3>
              <p className="text-lg text-black">
                We update our place database monthly to ensure you have access to the latest
                information, reviews, and new venues.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                What locations does spot cover?
              </h3>
              <p className="text-lg text-black">
                spot uses your location to find places near you. We cover restaurants, cafes,
                venues, and other establishments that have at least 2 reviews and a 2.5+
                star rating.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                Is spot free to use?
              </h3>
              <p className="text-lg text-black">
                Yes, spot is free to download and use. We help you discover amazing places
                that match your preferences at no cost.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-2 font-groen">
                How do I share a place I like?
              </h3>
              <p className="text-lg text-black">
                After swiping right on a place, you can share it with friends through the
                built-in sharing feature, which includes spot branding for easy discovery.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

