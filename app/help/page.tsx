"use client";

import { PageLayout } from "@/components/page-layout";
import { Accordion } from "@/components/accordion";
import Link from "next/link";

export default function Help() {
  return (
    <PageLayout>
      <div className='max-w-4xl mx-auto space-y-12'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-black/80 hover:text-black transition-colors mb-4'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='text-base md:text-lg font-medium'>Back</span>
        </Link>
        <h1 className='text-5xl md:text-6xl text-black text-center font-groen'>
          Help Center
        </h1>

        <section className='space-y-6'>
          <h2 className='text-3xl text-black font-groen'>Contact Us</h2>
          <div
            className='bg-white/80 backdrop-blur-md rounded-3xl p-8 transition-all duration-500'
            style={{
              boxShadow:
                "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px",
            }}
          >
            <p className='text-lg text-black mb-6'>
              Got questions or need help? We're here for you! Hit us up: 👋
            </p>
            <a
              href='mailto:hey@carlrosales.com'
              className='group relative inline-flex items-center gap-3 px-6 py-3 bg-neon-pink text-white rounded-2xl font-bold text-lg hover:bg-black hover:text-neon-green transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-neon-pink/40 overflow-hidden'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-black/0 to-neon-green/0 group-hover:from-black/20 group-hover:to-neon-green/20 transition-all duration-500'></div>
              <svg
                className='relative w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              <span className='relative'>hey@carlrosales.com</span>
            </a>
          </div>
        </section>

        <section className='space-y-6'>
          <h2 className='text-4xl text-black font-groen'>WHAT THE FAQ?</h2>

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
