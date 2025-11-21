"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const links = [
    { href: "/#why-we-love-spot", label: "How it works", isScroll: true },
    { href: "/#zones", label: "Zones", isScroll: true },
  ];

  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateIndicator = (linkHref: string) => {
    setTimeout(() => {
      const linkElement = linkRefs.current[linkHref];
      if (linkElement) {
        const parent = linkElement.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const linkRect = linkElement.getBoundingClientRect();
          const left = linkRect.left - parentRect.left;
          const width = linkRect.width;
          setIndicatorStyle({ left, width });
        }
      }
    }, 10);
  };

  useEffect(() => {
    if (activeLink) {
      updateIndicator(activeLink);
    }
  }, [activeLink]);

  useEffect(() => {
    const handleResize = () => {
      if (activeLink) {
        updateIndicator(activeLink);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeLink]);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        const matchingLink = links.find((link) => link.href === `/${hash}`);
        if (matchingLink) {
          setActiveLink(matchingLink.href);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; isScroll?: boolean }
  ) => {
    setActiveLink(link.href);

    if (link.isScroll && link.href.startsWith("/#")) {
      e.preventDefault();
      const id = link.href.replace("/#", "");

      if (pathname !== "/") {
        window.location.href = `/#${id}`;
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav className='w-full sticky top-0 z-30 py-3 md:py-4 px-4'>
      <div className='max-w-7xl mx-auto flex justify-center'>
        <div className='bg-white/70 backdrop-blur-xl rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg border border-white/20 flex items-center gap-3 md:gap-4 max-w-fit'>
          <Link
            href='/'
            onClick={(e) => {
              e.preventDefault();
              setActiveLink(null);
              handleScrollToTop();
              if (pathname !== "/") {
                window.location.href = "/";
              }
            }}
            className='text-2xl md:text-3xl text-black transition-colors font-groen flex-shrink-0'
          >
            spot
          </Link>
          <div className='flex items-center gap-4 md:gap-6 ml-6 md:ml-8 relative'>
            <div
              className='absolute bg-black/10 rounded-full h-8 transition-all duration-300 ease-out z-0'
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: activeLink ? 1 : 0,
              }}
            />
            {links.map((link) => (
              <Link
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-sm md:text-base font-medium transition-all whitespace-nowrap relative px-3 py-1.5 rounded-full z-10 ${
                  activeLink === link.href
                    ? "text-black font-bold"
                    : "text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            type='button'
            onClick={handleScrollToTop}
            className='hidden sm:inline-flex items-center rounded-full bg-black px-5 py-2 text-sm md:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-neon-green hover:text-black hover:shadow-neon-green/40 flex-shrink-0 ml-2'
          >
            Download app
          </button>
        </div>
      </div>
    </nav>
  );
}
