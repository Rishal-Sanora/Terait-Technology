export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className="inline-flex bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-lg">
      <img
        src="/1newface-removebg-preview.png"
        alt="TERAiT Technologies logo"
        className={`${className} object-contain drop-shadow-sm`}
        loading="eager"
      />
    </div>
  );
}

export function Wordmark({ size = "text-xl" }: { size?: string }) {
  return (
    <div className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-white/20 shadow-lg">
      <img
        src="/22new-removebg-preview.png"
        alt="TERAiT Technologies"
        className="h-8 md:h-9 w-auto object-contain drop-shadow-sm"
        loading="eager"
      />
    </div>
  );
}
