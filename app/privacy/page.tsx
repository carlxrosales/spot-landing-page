"use client";

import { PageLayout } from "@/components/page-layout";
import Link from "next/link";

export default function Privacy() {
  return (
    <PageLayout>
      <div className='max-w-4xl mx-auto space-y-8'>
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
          Privacy Policy
        </h1>

        <div className='relative bg-white/85 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-xl space-y-8 text-black'>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-pink/5 via-transparent to-neon-green/5'></div>
          <div className='relative space-y-8'>
            <section>
              <p className='text-sm text-gray mb-6'>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>1. Introduction</h2>
              <p className='text-lg mb-4'>
                spot ("we", "our", or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we process your
                information when you use our mobile application.
                <strong className='block mt-2'>
                  Important: We do not collect or store any of your personal
                  information.
                </strong>{" "}
                We only process information temporarily to provide you with
                place recommendations.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                2. Information We Process
              </h2>
              <p className='text-lg mb-4'>
                spot processes the following information temporarily to provide
                you with recommendations.
                <strong> This information is not stored or collected:</strong>
              </p>

              <h3 className='text-xl mb-3 mt-4 font-bold'>
                2.1 Information You Provide
              </h3>
              <p className='text-lg mb-4'>
                We temporarily process information that you provide through the
                App, including:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  Survey responses and preferences (processed in real-time, not
                  stored)
                </li>
                <li>
                  Communications with us, such as support requests (only stored
                  if you contact us via email)
                </li>
              </ul>

              <h3 className='text-xl mb-3 mt-4 font-bold'>2.2 Location Data</h3>
              <p className='text-lg mb-4'>
                spot requires access to your location to provide relevant place
                recommendations. We process your location data temporarily (with
                your permission) to:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Find places near your current location</li>
                <li>Provide distance-based recommendations</li>
                <li>Generate personalized place matches</li>
              </ul>
              <p className='text-lg mt-4'>
                <strong>
                  Your location data is processed in real-time and is not
                  stored.
                </strong>{" "}
                You can revoke location permissions at any time through your
                device settings.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                3. How We Process Your Information
              </h2>
              <p className='text-lg mb-4'>
                We process your information temporarily to:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  Generate personalized place recommendations based on your
                  preferences
                </li>
                <li>Provide location-based place suggestions</li>
                <li>Process and respond to your inquiries and requests</li>
              </ul>
              <p className='text-lg mt-4'>
                All processing happens in real-time. Once the recommendation is
                generated, the processed information is discarded and not
                stored.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                4. Information Sharing
              </h2>
              <p className='text-lg mb-4'>
                Since we do not store your information, there is no stored data
                to share. We do not sell, trade, or share any personal
                information because we do not collect or store it.
              </p>
              <p className='text-lg mb-4'>
                The only exception is if you contact us via email at{" "}
                <a
                  href='mailto:hey@carlrosales.com'
                  className='text-neon-pink hover:underline'
                >
                  hey@carlrosales.com
                </a>
                , in which case we will have access to your email address and
                message content for the purpose of responding to your inquiry.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                5. Data Storage and Retention
              </h2>
              <p className='text-lg mb-4'>
                <strong>
                  We do not store any of your personal information.
                </strong>{" "}
                All information is processed temporarily in real-time to
                generate recommendations and is immediately discarded after
                processing. There is no data retention because there is no data
                stored.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>6. Your Rights</h2>
              <p className='text-lg mb-4'>
                Since we do not store your information, there is no stored data
                to access, correct, or delete. You have full control over the
                information you provide through the App, and you can stop using
                the App at any time.
              </p>
              <p className='text-lg mb-4'>
                If you have any questions or concerns about how we process your
                information, please contact us at{" "}
                <a
                  href='mailto:hey@carlrosales.com'
                  className='text-neon-pink hover:underline'
                >
                  hey@carlrosales.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>7. Children's Privacy</h2>
              <p className='text-lg mb-4'>
                spot is not intended for children under the age of 13. Since we
                do not collect or store information, we do not knowingly process
                information from children under 13. If you believe we have
                processed information from a child under 13, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                8. Changes to This Privacy Policy
              </h2>
              <p className='text-lg mb-4'>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>9. Contact Us</h2>
              <p className='text-lg mb-4'>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href='mailto:hey@carlrosales.com'
                  className='text-neon-pink hover:underline'
                >
                  hey@carlrosales.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
