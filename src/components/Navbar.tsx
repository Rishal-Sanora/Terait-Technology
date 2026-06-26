import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Logo";
import { triggerContactModal } from "./ContactModal";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/why", label: "Why Us" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all duration-500 ${
              scrolled
                ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
                : "bg-transparent"
            }`}
          >
            <Link to="/" className="flex items-center" aria-label="TERAiT home">
              <Wordmark />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeProps={{ className: "active" }}
                  activeOptions={l.exact ? { exact: true } : undefined}
                  className="relative px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors group [&.active]:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-blue)] transition-transform duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100" />
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={triggerContactModal}
                className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white overflow-hidden group cursor-pointer border-none transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-glow-red"
                style={{ background: "linear-gradient(135deg,var(--brand-red),var(--brand-blue))" }}
              >
                <span className="relative z-10">Request Quote</span>
                <span className="relative z-10">→</span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg,var(--brand-blue),var(--brand-red))",
                  }}
                />
              </button>
            </div>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span
                className={`h-0.5 w-6 bg-foreground transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-6 bg-foreground transition-all ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-6 bg-foreground transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
        {/* progress bar */}
        <div className="container-x mt-1">
          <div className="h-px w-full bg-white/5 overflow-hidden rounded-full">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,var(--brand-red),var(--brand-blue))",
              }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[80px] z-40 md:hidden px-5"
          >
            <div className="glass-strong rounded-3xl p-5">
              <div className="flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    activeProps={{ className: "active" }}
                    activeOptions={l.exact ? { exact: true } : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-white/5 py-4 text-xl font-medium text-foreground/80 transition-colors hover:text-foreground [&.active]:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    triggerContactModal();
                  }}
                  className="mt-4 inline-flex justify-center items-center rounded-full px-5 py-3 font-medium text-white cursor-pointer border-none"
                  style={{
                    background: "linear-gradient(135deg,var(--brand-red),var(--brand-blue))",
                  }}
                >
                  Request Quote →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
