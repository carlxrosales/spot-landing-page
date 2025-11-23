"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";

interface PerfectForItem {
  name: string;
  emoji: string;
}

interface PerfectForCarouselProps {
  items: PerfectForItem[];
}

export function PerfectForCarousel({ items }: PerfectForCarouselProps) {
  // Split items into 3 rows
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3, 6);
  const row3 = items.slice(6, 9);

  // Duplicate items 3 times for seamless infinite loop
  // When animation completes one cycle, it resets to show identical content
  const duplicateItems = useCallback((items: PerfectForItem[]) => [
    ...items,
    ...items,
    ...items,
  ], []);

  const row1Items = useMemo(() => duplicateItems(row1), [row1, duplicateItems]);
  const row2Items = useMemo(() => duplicateItems(row2), [row2, duplicateItems]);
  const row3Items = useMemo(() => duplicateItems(row3), [row3, duplicateItems]);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateAndSetDistance = (
      containerRef: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length < 9) return; // Need at least 3 sets (9 items)

      // Calculate width of first set (first 3 items + 2 gaps)
      let firstSetWidth = 0;
      const gap = 32; // gap-8 = 2rem = 32px

      for (let i = 0; i < 3; i++) {
        if (children[i]) {
          firstSetWidth += children[i].offsetWidth;
          if (i < 2) firstSetWidth += gap;
        }
      }

      // Set the animation distance to exactly one set's width
      container.style.setProperty("--set-width", `${firstSetWidth}px`);
    };

    const updateAll = () => {
      calculateAndSetDistance(row1Ref);
      calculateAndSetDistance(row2Ref);
      calculateAndSetDistance(row3Ref);
    };

    // Initial calculation - use requestAnimationFrame to ensure DOM is ready
    const initAnimation = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateAll();
        });
      });
    };

    const timer = setTimeout(initAnimation, 100);

    // Recalculate on window resize
    const handleResize = () => {
      updateAll();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ItemBox = ({ item }: { item: PerfectForItem }) => (
    <div className='bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-layered flex items-center justify-center flex-shrink-0 w-fit'>
      <p className='font-bold text-sm md:text-lg text-black text-center flex items-center gap-2 whitespace-nowrap'>
        <span className='text-base md:text-3xl'>{item.emoji}</span>
        <span>{item.name}</span>
      </p>
    </div>
  );

  return (
    <div className='space-y-8 overflow-hidden pb-4'>
      {/* Row 1 - Scrolls right */}
      <div className='relative px-0 md:px-6 pb-4'>
        <div
          className='absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to right, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div
          className='absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to left, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div ref={row1Ref} className='flex gap-8 animate-scroll-right'>
          {row1Items.map((item, index) => (
            <div key={`row1-${index}`} className='flex-shrink-0'>
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Scrolls left */}
      <div className='relative px-0 md:px-6 pb-4'>
        <div
          className='absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to right, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div
          className='absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to left, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div ref={row2Ref} className='flex gap-8 animate-scroll-left'>
          {row2Items.map((item, index) => (
            <div key={`row2-${index}`} className='flex-shrink-0'>
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Scrolls right */}
      <div className='relative px-0 md:px-6 pb-4'>
        <div
          className='absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to right, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div
          className='absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none'
          style={{
            background:
              "linear-gradient(to left, rgb(225, 255, 91), transparent)",
          }}
        ></div>
        <div ref={row3Ref} className='flex gap-8 animate-scroll-right'>
          {row3Items.map((item, index) => (
            <div key={`row3-${index}`} className='flex-shrink-0'>
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
