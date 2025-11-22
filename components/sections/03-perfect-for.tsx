import { PerfectForCarousel } from "@/components/ui/perfect-for-carousel";

export function PerfectFor() {
  return (
    <section className='space-y-8 w-[calc(100%+3rem)] md:w-full max-w-full md:max-w-4xl -ml-6 md:ml-auto md:mx-auto fade-in-on-scroll'>
      <h2 className='text-4xl md:text-6xl text-black text-center font-groen px-6 md:px-0'>
        Perfect for
      </h2>
      <div className='mt-12'>
        <PerfectForCarousel
          items={[
            { name: "Food trips", emoji: "🍔" },
            { name: "Study sessions", emoji: "📚" },
            { name: "Remote work", emoji: "💻" },
            { name: "Coffee runs", emoji: "☕" },
            { name: "Night outs", emoji: "🌙" },
            { name: "Date plans", emoji: "💕" },
            { name: "Solo days", emoji: "🧘" },
            { name: "Exploring new areas", emoji: "🗺️" },
            { name: "Weekend adventures", emoji: "🎒" },
          ]}
        />
      </div>
    </section>
  );
}

