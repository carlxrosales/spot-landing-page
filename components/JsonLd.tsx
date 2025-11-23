import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

interface JsonLdProps {
  type?: "WebSite" | "WebPage" | "Organization" | "BreadcrumbList" | "Article";
  data?: Record<string, any>;
}

/**
 * JSON-LD structured data component for SEO.
 * Follows schema.org best practices.
 */
export function JsonLd({ type = "WebSite", data }: JsonLdProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "WebSite":
        const webSiteData = {
          ...baseData,
          "@type": "WebSite",
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          ...data,
        };
        // Only include SearchAction if search functionality exists
        if (data?.hasSearch) {
          webSiteData.potentialAction = {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          };
        }
        return webSiteData;

      case "WebPage":
        return {
          ...baseData,
          "@type": "WebPage",
          name: data?.name || SITE_NAME,
          description: data?.description || SITE_DESCRIPTION,
          url: data?.url || SITE_URL,
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
          ...data,
        };

      case "Organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/images/hero/spot.png`,
          description: SITE_DESCRIPTION,
          sameAs: data?.sameAs || [],
          ...data,
        };

      case "BreadcrumbList":
        return {
          ...baseData,
          "@type": "BreadcrumbList",
          itemListElement: data?.items || [],
        };

      case "Article":
        return {
          ...baseData,
          "@type": "Article",
          headline: data?.headline,
          description: data?.description,
          image: data?.image,
          datePublished: data?.datePublished,
          dateModified: data?.dateModified,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/images/hero/spot.png`,
            },
          },
          ...data,
        };

      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}

