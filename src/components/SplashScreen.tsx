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
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: ["-20%", "10%", "-20%"],
            y: ["-10%", "20%", "-10%"]
          }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #fde047 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: ["20%", "-10%", "20%"],
            y: ["20%", "-10%", "20%"]
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: ["0%", "0%", "0%"],
            y: ["10%", "-10%", "10%"]
          }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
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



      <div className="relative z-10 flex flex-col items-center" style={{ perspective: "1000px" }}>
        {/* Animated Wordmark - changed to dark text for light theme */}
        <motion.div
          initial={{ opacity: 0, y: -40, rotateX: 45, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="scale-125 md:scale-150 mb-8 drop-shadow-xl text-slate-900"
        >
          <Wordmark size="text-4xl" />
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-slate-600 uppercase text-xs md:text-sm font-bold mt-4 tracking-widest drop-shadow-sm mix-blend-multiply"
        >
          Elevating Your Infrastructure
        </motion.div>

        {/* New animated multi-color loading bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 220, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="h-[4px] mt-12 rounded-full overflow-hidden relative shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, #38bdf8, #f472b6, #fde047, transparent)"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
