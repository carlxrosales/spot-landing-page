import { PageLayout } from "@/components/page-layout";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center font-groen">
          Privacy Policy
        </h1>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 border-2 border-black space-y-6 text-black">
          <section>
            <p className="text-sm text-gray mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">1. Introduction</h2>
            <p className="text-lg mb-4">
              spot ("we", "our", or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when
              you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">2. Information We Collect</h2>
            
            <h3 className="text-xl font-bold mb-3 mt-4 font-groen">2.1 Information You Provide</h3>
            <p className="text-lg mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Survey responses and preferences you share through the App</li>
              <li>Account information if you create an account</li>
              <li>Communications with us, such as support requests</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 mt-4 font-groen">2.2 Automatically Collected Information</h3>
            <p className="text-lg mb-4">
              When you use spot, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Location data (with your permission) to provide location-based recommendations</li>
              <li>Device information, such as device type and operating system</li>
              <li>Usage data, such as how you interact with the App</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">3. How We Use Your Information</h2>
            <p className="text-lg mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Generate personalized place recommendations based on your preferences</li>
              <li>Process and respond to your inquiries and requests</li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">4. How We Share Your Information</h2>
            <p className="text-lg mb-4">
              We do not sell your personal information. We may share your information in the
              following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>With your consent or at your direction</li>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations or respond to legal requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">5. Location Data</h2>
            <p className="text-lg mb-4">
              spot requires access to your location to provide relevant place recommendations.
              We collect location data only when you grant permission and use it solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Find places near your current location</li>
              <li>Provide distance-based recommendations</li>
              <li>Improve the accuracy of our matching algorithm</li>
            </ul>
            <p className="text-lg mt-4">
              You can revoke location permissions at any time through your device settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">6. Data Security</h2>
            <p className="text-lg mb-4">
              We implement appropriate technical and organizational measures to protect your
              personal information. However, no method of transmission over the internet or
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">7. Data Retention</h2>
            <p className="text-lg mb-4">
              We retain your information for as long as necessary to provide our services and
              fulfill the purposes described in this Privacy Policy, unless a longer retention
              period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">8. Your Rights</h2>
            <p className="text-lg mb-4">
              Depending on your location, you may have certain rights regarding your personal
              information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-lg mt-4">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:hey@carlrosales.com" className="text-neon-pink hover:underline">
                hey@carlrosales.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">9. Children's Privacy</h2>
            <p className="text-lg mb-4">
              spot is not intended for children under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe we have collected
              information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">10. Changes to This Privacy Policy</h2>
            <p className="text-lg mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last
              updated" date. You are advised to review this Privacy Policy periodically for
              any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 font-groen">11. Contact Us</h2>
            <p className="text-lg mb-4">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hey@carlrosales.com" className="text-neon-pink hover:underline">
                hey@carlrosales.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

