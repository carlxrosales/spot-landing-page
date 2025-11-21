"use client";

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

  // Duplicate items for seamless infinite loop
  const duplicateItems = (items: PerfectForItem[]) => [
    ...items,
    ...items,
    ...items,
  ];

  const row1Items = duplicateItems(row1);
  const row2Items = duplicateItems(row2);
  const row3Items = duplicateItems(row3);

  const ItemBox = ({ item }: { item: PerfectForItem }) => (
    <div className='bg-white/80 backdrop-blur-md rounded-full p-4 shadow-layered transition-all duration-500 transform hover:scale-105 flex items-center justify-center min-h-[60px] md:min-h-[80px] flex-shrink-0 min-w-[180px] md:min-w-0'>
      <p className='font-bold text-xs md:text-lg text-black text-center flex items-center gap-2 whitespace-nowrap'>
        <span className='text-base md:text-3xl'>{item.emoji}</span>
        <span>{item.name}</span>
      </p>
    </div>
  );

  return (
    <div className='space-y-6 overflow-hidden'>
      {/* Row 1 - Scrolls right */}
      <div className='overflow-hidden px-6'>
        <div className='flex gap-6 animate-scroll-right'>
          {row1Items.map((item, index) => (
            <div
              key={`row1-${index}`}
              className='flex-shrink-0'
              style={{ width: "max(140px, calc((100% - 3rem) / 3))" }}
            >
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Scrolls left */}
      <div className='overflow-hidden px-6'>
        <div className='flex gap-6 animate-scroll-left'>
          {row2Items.map((item, index) => (
            <div
              key={`row2-${index}`}
              className='flex-shrink-0'
              style={{ width: "max(140px, calc((100% - 3rem) / 3))" }}
            >
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Scrolls right */}
      <div className='overflow-hidden px-6'>
        <div className='flex gap-6 animate-scroll-right'>
          {row3Items.map((item, index) => (
            <div
              key={`row3-${index}`}
              className='flex-shrink-0'
              style={{ width: "max(140px, calc((100% - 3rem) / 3))" }}
            >
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
