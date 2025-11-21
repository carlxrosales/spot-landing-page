import { PageLayout } from "@/components/page-layout";

export default function Zones() {
  return (
    <PageLayout>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-5xl md:text-6xl text-black mb-8 font-groen'>
          Zones
        </h1>
        <div className='relative bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-lg'>
          <p className='text-xl text-gray'>Coming soon...</p>
        </div>
      </div>
    </PageLayout>
  );
}
