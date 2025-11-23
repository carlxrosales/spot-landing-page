import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Dynamic sitemap.xml generation.
 * Automatically includes all routes and updates lastmod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString();

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/zones`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // If you have dynamic routes (e.g., blog posts, cities), add them here:
  // Example:
  // const dynamicRoutes = await getDynamicRoutes();
  // routes.push(...dynamicRoutes.map(route => ({
  //   url: `${baseUrl}${route.path}`,
  //   lastModified: route.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // })));

  return routes;
}

