import { PageLayout } from "@/components/page-layout";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-black mb-4 font-groen">
          spot
        </h1>
        <p className="text-2xl md:text-3xl text-black font-medium font-groen">
          find places that match your vibe
        </p>
        <p className="text-lg md:text-xl text-gray max-w-2xl mx-auto mt-8">
          Discover restaurants, cafes, and venues that align with your preferences
          through an AI-powered matching system and an intuitive swipe interface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            href="https://apps.apple.com"
            className="px-8 py-4 bg-black text-neon-green rounded-lg font-bold text-lg hover:bg-neon-pink hover:text-white transition-colors"
          >
            Download on App Store
          </Link>
          <Link
            href="https://play.google.com"
            className="px-8 py-4 bg-black text-neon-green rounded-lg font-bold text-lg hover:bg-neon-pink hover:text-white transition-colors"
          >
            Get it on Google Play
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
