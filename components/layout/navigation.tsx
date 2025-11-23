"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationLink, ActiveId } from "@/types";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { scrollToId } from "@/utils/scroll";
import { debounce } from "@/utils/timer";
import { DEBOUNCE_DELAY } from "@/lib/constants";

export function Navigation(): ReactElement {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const links: NavigationLink[] = [
    { href: "/#how-it-works", label: "how it works", isScroll: true },
    { href: "/#zones", label: "zones", isScroll: true },
  ];

  const {
    scrollToId: scrollToSection,
    activeId,
    scrollToTop,
  } = useScrollToSection({
    links,
    enableActiveTracking: true,
  });

  const updateIndicator = useCallback((linkHref: string) => {
    const linkElement = linkRefs.current[linkHref];
    if (linkElement) {
      const parent = linkElement.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const linkRect = linkElement.getBoundingClientRect();
        setIndicatorStyle({
          left: linkRect.left - parentRect.left,
          width: linkRect.width,
        });
      }
    }
  }, []);

  const debouncedUpdateIndicator = useMemo(
    () => debounce((linkHref: string) => {
      updateIndicator(linkHref);
    }, DEBOUNCE_DELAY),
    [updateIndicator]
  );

  useEffect(() => {
    if (activeId) {
      requestAnimationFrame(() => {
        updateIndicator(activeId);
      });
    }
  }, [activeId, updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      if (activeId) {
        debouncedUpdateIndicator(activeId);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId, debouncedUpdateIndicator]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavigationLink) => {
      setIsMobileMenuOpen(false);

      if (link.isScroll && link.href.startsWith("/#")) {
        e.preventDefault();
        const id = link.href.replace("/#", "");
        scrollToSection(id);
      }
    },
    [scrollToSection]
  );

  const handleScrollToDownload = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    scrollToId("download-app");
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMobileMenuOpen(false);
      hamburgerButtonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      aria-label='Main navigation'
      className='w-full fixed top-4 md:top-6 left-0 z-30 pt-2 pb-2 md:py-3 px-4 md:px-8'
    >
      <div className='max-w-7xl mx-auto flex flex-col items-center relative'>
        {/* Mobile Menu Button - Upper Left */}
        <button
          ref={hamburgerButtonRef}
          type='button'
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls='mobile-menu'
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className='md:hidden absolute left-0 top-0 inline-flex items-center justify-center py-2 md:py-3 px-4 md:px-12 rounded-full bg-white/70 backdrop-blur-xl shadow-lg border border-white/20 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors h-full'
        >
          <span className='sr-only'>
            {isMobileMenuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            className={`w-6 h-6 text-black transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-90" : ""
            }`}
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            {isMobileMenuOpen ? (
              <path d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>

        <div className='bg-white/70 backdrop-blur-xl rounded-full pl-6 pr-3 md:pl-12 md:pr-6 py-2 md:py-3 shadow-lg border border-white/20 flex items-center gap-2 md:gap-6 max-w-full md:max-w-fit pointer-events-auto touch-manipulation'>
          <Link
            href='/'
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              scrollToTop();
              if (pathname !== "/") {
                window.location.href = "/";
              }
            }}
            className='text-2xl md:text-4xl text-black transition-colors font-groen flex-shrink-0 ml-2 cursor-pointer touch-manipulation pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full'
            style={{ cursor: "pointer", touchAction: "manipulation" }}
            aria-label='Spot home page'
          >
            spot
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-3 md:gap-8 ml-2 md:ml-4 relative'>
            <div
              className='absolute bg-black/10 rounded-full h-9 md:h-10 transition-all duration-300 ease-out z-0'
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: activeId ? 1 : 0,
              }}
              aria-hidden='true'
            />
            {links.map((link) => (
              <Link
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                aria-current={activeId === link.href ? "page" : undefined}
                className={`text-base md:text-xl font-medium transition-all whitespace-nowrap relative px-4 md:px-5 py-2 md:py-2 rounded-full z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  activeId === link.href ? "text-black font-bold" : "text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Download Button */}
          <button
            type='button'
            onClick={handleScrollToDownload}
            className='inline-flex items-center rounded-full bg-black px-3 md:px-4 py-2 md:py-2 text-sm md:text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-neon-green hover:text-black hover:shadow-neon-green/40 active:bg-neon-green active:text-black active:shadow-neon-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent flex-shrink-0 ml-8 mr-1 cursor-pointer touch-manipulation pointer-events-auto'
            style={{ cursor: "pointer", touchAction: "manipulation" }}
          >
            Download
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id='mobile-menu'
          ref={mobileMenuRef}
          onKeyDown={handleMobileMenuKeyDown}
          className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 py-4 z-50 transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
          role='menu'
          aria-label='Mobile navigation menu'
        >
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              aria-current={activeId === link.href ? "page" : undefined}
              role='menuitem'
              className={`block px-6 py-3 text-lg font-medium text-black hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset transition-all ${
                isMobileMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
