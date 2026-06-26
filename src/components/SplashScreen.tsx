import { motion } from "framer-motion";
import { useEffect } from "react";
import { Wordmark } from "./Logo";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 1.8, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 overflow-hidden"
    >
      {/* Background ambient light effects with multiple vibrant colors */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: ["-20%", "10%", "-20%"],
            y: ["-10%", "20%", "-10%"]
          }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/4 left-1/4 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.5) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: ["20%", "-10%", "20%"],
            y: ["20%", "-10%", "20%"]
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/3 right-1/4 h-[800px] w-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.5) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: ["0%", "0%", "0%"],
            y: ["10%", "-10%", "10%"]
          }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />



      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Animated Wordmark with cinematic bloom landing */}
        <motion.div
          initial={{ opacity: 0, y: -30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="scale-125 md:scale-150 mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-slate-900"
        >
          <Wordmark size="text-4xl" />
        </motion.div>

        {/* Animated Subtitle landing gracefully below */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-slate-600 uppercase text-xs md:text-sm font-bold mt-4 tracking-[0.3em] drop-shadow-sm mix-blend-multiply"
        >
          Elevating Your Infrastructure
        </motion.div>

        {/* GPU-accelerated loading bar */}
        <div 
          className="w-[220px] h-[4px] mt-12 rounded-full overflow-hidden relative shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full origin-left"
            style={{
              background: "linear-gradient(90deg, #38bdf8, #f472b6, #fde047)"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
