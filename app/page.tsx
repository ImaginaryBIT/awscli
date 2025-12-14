import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      {/* Content - aligned to top */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16">
        {/* Logo/Title Area - Similar to Google logo positioning */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-7xl md:text-8xl font-light tracking-tight text-center">
            <span className="text-[#4285f4]">A</span>
            <span className="text-[#ea4335]">W</span>
            <span className="text-[#fbbc04]">S</span>
            <span className="text-[#4285f4]"> </span>
            <span className="text-[#34a853]">C</span>
            <span className="text-[#ea4335]">L</span>
            <span className="text-[#4285f4]">I</span>
          </h1>
          <span className="text-xs text-gray-400 mt-2 font-mono">v2.32.12</span>
        </div>

        {/* Search Component - 60% screen width */}
        <div className="w-3/5 max-w-4xl">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
