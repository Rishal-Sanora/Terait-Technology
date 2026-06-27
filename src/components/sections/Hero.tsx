import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { triggerContactModal } from "../ContactModal";
import Tilt from "react-parallax-tilt";
import { TypeAnimation } from "react-type-animation";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="container-x relative z-10 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs md:text-sm font-semibold text-black mb-10 drop-shadow-lg bg-transparent"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          Trusted by enterprises across Bengaluru & beyond
        </motion.div>

        <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Ambient Glow Spotlight to ensure text contrast over video */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[140%] bg-white/20 blur-[60px] rounded-[100%] pointer-events-none" />

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
            }}
            className="relative z-10 flex flex-col items-center w-full"
          >
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] font-bold tracking-tighter mb-8 flex flex-col items-center drop-shadow-[0_2px_10px_rgba(255,255,255,1)] min-h-[220px] justify-center">
              <div className="flex gap-4 flex-wrap justify-center overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { type: "spring", stiffness: 200, damping: 20 },
                    },
                  }}
                  className="text-gradient inline-block"
                >
                  Secure.
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { type: "spring", stiffness: 200, damping: 20 },
                    },
                  }}
                  className="text-gradient inline-block"
                >
                  Smart.
                </motion.span>
              </div>
              <TypeAnimation
                sequence={[
                  "Scalable.",
                  2000,
                  "Reliable.",
                  2000,
                  "Innovative.",
                  2000,
                  "Powerful.",
                  2000,
                ]}
                wrapper="span"
                speed={10}
                className="text-gradient-brand mt-1 inline-block drop-shadow-[0_10px_40px_rgba(244,63,94,0.4)]"
                repeat={Infinity}
              />
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.8 } },
              }}
              className="max-w-3xl text-lg md:text-2xl text-foreground font-semibold leading-relaxed drop-shadow-[0_2px_10px_rgba(255,255,255,1)] mt-4 px-4"
            >
              Enterprise networking, surveillance, cloud and cybersecurity — delivered end-to-end by
              certified engineers.{" "}
              <span className="font-bold text-brand-red">TERAiT Technologies</span> bridges complex
              infrastructure with seamless business operations.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5 animate-float"
        >
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4.5 font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,var(--brand-red),var(--brand-blue))",
              boxShadow: "var(--shadow-glow-red)",
            }}
          >
            <span>Explore Services</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <button
            onClick={triggerContactModal}
            className="group inline-flex items-center gap-2 rounded-full px-8 py-4.5 font-bold bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg drop-shadow-md"
          >
            Request a Quote
          </button>
          <a
            href="tel:+919964546464"
            className="group hidden sm:inline-flex items-center gap-3 text-foreground/90 hover:text-foreground transition ml-2 drop-shadow-md"
          >
            <span className="grid place-items-center h-12 w-12 rounded-full bg-foreground/5 border border-foreground/10 shadow-md group-hover:scale-110 transition-transform">
              📞
            </span>
            <div className="text-left text-sm">
              <div className="text-black font-semibold">Talk to an expert</div>
              <div className="font-bold text-base text-black">+91 99645 46464</div>
            </div>
          </a>
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl w-full"
        >
          {[
            ["500+", "Projects delivered"],
            ["150+", "Enterprise clients"],
            ["24/7", "Managed support"],
            ["15+", "Years of expertise"],
          ].map(([n, l]) => (
            <Tilt
              key={l}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.05}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
            >
              <div className="bg-transparent p-5 md:p-6 rounded-3xl h-full cursor-default transition-transform hover:scale-105 border border-foreground/5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient drop-shadow-sm">
                  {n}
                </div>
                <div className="text-xs md:text-sm font-semibold text-black mt-2">{l}</div>
              </div>
            </Tilt>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-bold text-black">
        <span>Scroll to explore</span>
        <span className="h-8 w-px bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  );
}
