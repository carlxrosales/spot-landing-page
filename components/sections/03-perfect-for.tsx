import { PerfectForCarousel } from "@/components/ui/perfect-for-carousel";

export function PerfectFor() {
  return (
    <section className='relative left-1/2 -translate-x-1/2 w-screen md:relative md:left-0 md:translate-x-0 md:w-full'>
      <div className='w-full md:max-w-4xl md:mx-auto space-y-8'>
        <h2 className='text-4xl md:text-6xl text-black text-center font-groen px-6 md:px-0'>
          Perfect for
        </h2>
        <div className='mt-12 -mx-6 md:mx-0'>
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
      </div>
    </section>
  );
}
