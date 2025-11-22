"use client";

import { PageLayout } from "@/components/layout/page-layout";
import Link from "next/link";

export default function Terms() {
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
          Terms of Service
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
              <h2 className='text-2xl mb-4 font-bold'>
                1. Acceptance of Terms
              </h2>
              <p className='text-lg mb-4'>
                By accessing and using spot ("the App"), you accept and agree to
                be bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>2. Use License</h2>
              <p className='text-lg mb-4'>
                Permission is granted to temporarily download one copy of spot
                for personal, non-commercial transitory viewing only. This is
                the grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose or for any public
                  display;
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained in spot;
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials; or
                </li>
                <li>
                  transfer the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>3. User Accounts</h2>
              <p className='text-lg mb-4'>
                spot does not require user accounts. You can use the App without
                creating an account. If you choose to contact us via email, you
                are responsible for maintaining the confidentiality of your
                email communications.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>4. Location Services</h2>
              <p className='text-lg mb-4'>
                spot uses location services to provide you with relevant place
                recommendations. By using the App, you consent to the processing
                of your location data as described in our Privacy Policy.{" "}
                <strong>
                  Your location data is processed temporarily and is not stored.
                </strong>
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>5. Content and Data</h2>
              <p className='text-lg mb-4'>
                The App provides information about places, including reviews and
                descriptions sourced from third-party services. We do not
                guarantee the accuracy, completeness, or timeliness of this
                information. You use this information at your own risk.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>6. Prohibited Uses</h2>
              <p className='text-lg mb-4'>You may not use spot:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  in any way that violates any applicable national or
                  international law or regulation;
                </li>
                <li>
                  to transmit, or procure the sending of, any advertising or
                  promotional material;
                </li>
                <li>
                  to impersonate or attempt to impersonate the company, a
                  company employee, another user, or any other person or entity;
                </li>
                <li>
                  in any way that infringes upon the rights of others, or in any
                  way is illegal, threatening, fraudulent, or harmful.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>7. Disclaimer</h2>
              <p className='text-lg mb-4'>
                The materials on spot are provided on an 'as is' basis. spot
                makes no warranties, expressed or implied, and hereby disclaims
                and negates all other warranties including without limitation,
                implied warranties or conditions of merchantability, fitness for
                a particular purpose, or non-infringement of intellectual
                property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>8. Limitations</h2>
              <p className='text-lg mb-4'>
                In no event shall spot or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on spot, even if spot or a
                spot authorized representative has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>9. Revisions</h2>
              <p className='text-lg mb-4'>
                spot may revise these terms of service at any time without
                notice. By using this App you are agreeing to be bound by the
                then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className='text-2xl mb-4 font-bold'>
                10. Contact Information
              </h2>
              <p className='text-lg mb-4'>
                If you have any questions about these Terms of Service, please
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
