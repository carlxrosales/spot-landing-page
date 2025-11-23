import type { Metadata } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SkipToContent } from "@/components/SkipToContent";
import { RouteProgress } from "@/components/RouteProgress";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "spot: discover & share places",
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "spot: discover & share places",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/images/hero/spot.png`,
        width: 1200,
        height: 630,
        alt: "spot app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "spot: discover & share places",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/hero/spot.png`],
  },
  manifest: "/manifest.json",
  themeColor: "#39ff14",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <JsonLd type="WebSite" />
        <JsonLd
          type="Organization"
          data={{
            logo: `${SITE_URL}/images/hero/spot.png`,
          }}
        />
        <SkipToContent />
        <RouteProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
