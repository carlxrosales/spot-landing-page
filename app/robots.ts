import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt generation.
 * Controls search engine crawling behavior.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/test-db/",
          "/_next/",
          "/admin/",
        ],
      },
      // Allow specific bots more access if needed
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/test-db/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Optional: Add host for canonical URL
    host: SITE_URL,
  };
}

