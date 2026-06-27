import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { SectionHeader } from "./Services";
import { Wordmark } from "../Logo";
import { triggerContactModal, ContactRow, Field } from "../ContactModal";

/* ========== About ========== */
export function About() {
  const features = [
    { t: "Cloud Architecture", d: "Scalable, secure, and highly available environments.", i: "☁️" },
    { t: "DevOps & CI/CD", d: "Accelerated delivery pipelines and automation.", i: "🚀" },
    { t: "IT Support", d: "Expert managed services and maintenance.", i: "🛠️" },
  ];
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient Spotlight: A huge, ultra-soft white glow behind the text. No hard edges, no blocks, just pure light. */}
      <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/50 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div>
          <SectionHeader
            kicker="About TERAiT"
            title="Empowering businesses through technical excellence"
            subtitle="TERAiT Technologies is a leading provider of comprehensive IT infrastructure and specialized surveillance solutions. We bridge complex technology with seamless business operations — from architecture to 24/7 managed care."
          />
          <motion.div
            className="grid sm:grid-cols-2 gap-4 mt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {features.map((f) => (
              <motion.div
                key={f.t}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-left shadow-lg cursor-pointer hover:shadow-2xl hover:border-white/40 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">
                  {f.i}
                </div>
                <div className="font-bold drop-shadow-sm">{f.t}</div>
                <div className="mt-1 text-sm text-black font-semibold">{f.d}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-brand-red text-white font-bold tracking-wide hover:shadow-glow-red transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              Start Your Project <span>→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/20">
            <div className="absolute inset-0 z-20 mix-blend-screen pointer-events-auto">
            </div>
            <div className="absolute inset-0 z-30 grid place-items-center pointer-events-none">
              <img
                src="/1newface-removebg-preview.png"
                alt=""
                className="h-48 w-48 opacity-90 animate-float object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white/20 dark:bg-black/40 backdrop-blur-3xl rounded-2xl p-5 max-w-[240px] border border-white/20 shadow-xl">
            <div className="text-xs uppercase tracking-widest text-black font-bold">
              Headquartered in
            </div>
            <div className="mt-1 font-semibold">Bengaluru, Karnataka</div>
            <div className="text-xs text-black font-medium mt-1">Serving clients pan-India</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========== Why Us / Stats ========== */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient">
      {n}
      {suffix}
    </div>
  );
}

export function WhyUs() {
  const reasons = [
    {
      i: "🎓",
      t: "Certified IT Engineers",
      d: "Highly skilled, vendor-certified professionals across all major platforms.",
    },
    {
      i: "⚡",
      t: "Fast Installation",
      d: "Quick, efficient deployments designed to minimise downtime.",
    },
    {
      i: "💰",
      t: "Affordable Solutions",
      d: "Enterprise-grade quality at competitive, transparent pricing.",
    },
    {
      i: "🛟",
      t: "Reliable After-Support",
      d: "Expert support so your operations continue smoothly.",
    },
    {
      i: "🧩",
      t: "Complete IT Provider",
      d: "One partner for infrastructure, security, cloud and beyond.",
    },
  ];
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          kicker="Why TERAiT"
          title="The partner enterprises rely on"
          subtitle="We combine technical expertise with a relentless commitment to reliability — ensuring your IT is built for growth, scale and security."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { n: 500, s: "+", l: "Projects delivered" },
            { n: 150, s: "+", l: "Enterprise clients" },
            { n: 24, s: "/7", l: "Managed support" },
            { n: 15, s: "+", l: "Years experience" },
          ].map((s) => (
            <motion.div
              key={s.l}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1, transition: { type: "spring" } },
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass gradient-border-glow rounded-2xl p-5 md:p-6 cursor-default hover:shadow-glow-blue transition-all"
            >
              <Counter to={s.n} suffix={s.s} />
              <div className="mt-1 text-sm text-black font-semibold">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 hover:shadow-xl hover:border-white/30 transition-all duration-300"
            >
              <div className="text-3xl drop-shadow-sm">{r.i}</div>
              <div className="mt-3 font-display font-semibold text-lg">{r.t}</div>
              <div className="mt-2 text-sm text-black leading-relaxed font-semibold">{r.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== Process ========== */
export function Process() {
  const steps = [
    {
      n: "01",
      t: "Requirement Analysis",
      d: "We understand your business needs, goals and existing infrastructure.",
    },
    {
      n: "02",
      t: "Solution Design",
      d: "We plan the right architecture and select best-fit hardware and topology.",
    },
    {
      n: "03",
      t: "Installation",
      d: "Our certified engineers professionally deploy systems and equipment.",
    },
    {
      n: "04",
      t: "Maintenance",
      d: "Continuous monitoring and reliable after-support keep operations smooth.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          kicker="Our process"
          title="How we deliver, every time"
          subtitle="A proven four-step methodology built around clarity, craftsmanship and continuity."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative glass gradient-border-glow rounded-2xl p-6 hover:shadow-xl hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-black font-bold group-hover:text-brand-blue transition-colors">
                  STEP {s.n}
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--brand-red)] to-[var(--brand-blue)] text-white grid place-items-center text-sm font-bold drop-shadow-sm group-hover:shadow-glow-blue transition-shadow">
                  {i + 1}
                </div>
              </div>
              <h3 className="mt-4 font-display font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-black leading-relaxed font-semibold">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== Brand Marquee ========== */
export function Brands() {
  const brands = [
    "Microsoft",
    "AWS",
    "Cisco",
    "HPE",
    "Dell EMC",
    "Fortinet",
    "Palo Alto",
    "Hikvision",
    "Veeam",
    "Acronis",
    "VMware",
    "Lenovo",
    "Salesforce",
    "Adobe",
    "Logitech",
    "Sophos",
    "APC",
    "IBM",
    "Juniper",
    "NetApp",
  ];
  return (
    <section className="relative py-16 border-y border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="container-x"
      >
        <div className="text-center text-xs uppercase tracking-[0.3em] text-black font-bold mb-8">
          Powered by the world's leading technology brands
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="flex w-max animate-marquee gap-12 px-6">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="text-2xl md:text-3xl font-display font-bold text-black hover:text-black transition whitespace-nowrap"
            >
              {b}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </motion.div>
    </section>
  );
}

/* ========== Testimonials ========== */
export function Testimonials() {
  const data = [
    {
      q: "TERAiT helped us set up our office network and CCTV system perfectly. Their team is professional and highly skilled.",
      n: "Rajesh Kumar",
      r: "Business Owner — Bengaluru",
    },
    {
      q: "The server setup and networking delivered by TERAiT exceeded our expectations. Reliable and efficient service throughout.",
      n: "Suresh Raina",
      r: "IT Manager — Bengaluru",
    },
    {
      q: "Great after-support and quick installation. TERAiT is our go-to partner for everything IT.",
      n: "Meera Nair",
      r: "Operations Head — Bengaluru",
    },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeader kicker="Loved by clients" title="Real outcomes, real teams" />
        <div className="grid md:grid-cols-3 gap-5">
          {data.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass gradient-border-glow rounded-3xl p-7 relative hover:shadow-xl hover:border-white/30 transition-all duration-300"
            >
              <div className="text-5xl leading-none text-gradient-brand font-display drop-shadow-sm">
                "
              </div>
              <p className="mt-2 text-black leading-relaxed font-semibold">{t.q}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[var(--brand-red)] to-[var(--brand-blue)] grid place-items-center font-bold text-white shadow-md">
                  {t.n[0]}
                </div>
                <div>
                  <div className="font-bold">{t.n}</div>
                  <div className="text-xs text-black font-semibold">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== FAQ ========== */
export function FAQ() {
  const items = [
    {
      q: "What IT services does TERAiT Technologies provide?",
      a: "We specialise in IT networking, CCTV & surveillance, server setup, cloud enablement, cybersecurity, hardware supply (laptops, printers, etc.), and UPS power backup solutions — all delivered end-to-end.",
    },
    {
      q: "Where is TERAiT Technologies located?",
      a: "Our headquarters is at #24, 100 Feet Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, Karnataka 560043. We serve clients across India.",
    },
    {
      q: "Do you provide after-installation support?",
      a: "Yes. Every deployment includes managed support and maintenance options, with 24/7 monitoring available for enterprise clients.",
    },
    {
      q: "Can you help with new office IT setups?",
      a: "Absolutely. We design, procure and deploy full office IT infrastructure — networking, surveillance, servers, endpoints, security and cloud — as a single turnkey engagement.",
    },
    {
      q: "Which brands do you partner with?",
      a: "We work with Microsoft, AWS, Cisco, HPE, Dell EMC, Fortinet, Palo Alto, Hikvision, Veeam, VMware, Lenovo, Adobe and many more.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <SectionHeader kicker="FAQ" title="Questions, answered" center />
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4"
              >
                <span className="font-medium">{it.q}</span>
                <span className={`text-2xl transition-transform ${open === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 md:px-6 pb-6 text-black font-medium leading-relaxed">
                  {it.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== Contact ========== */
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x max-w-5xl">
        <div className="glass-strong rounded-2xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Let's build your next infrastructure
          </h2>
          <p className="text-black font-medium mb-10 max-w-2xl">
            We provide high-level enterprise solutions. Connect with our experts today to scale your
            infrastructure and secure your digital assets.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <ContactRow
                icon="📍"
                label="Headquarters"
                value="#24, 100 Feet Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, Karnataka 560043"
              />
              <ContactRow
                icon="📞"
                label="Phone"
                value={
                  <>
                    <a href="tel:+919964546464" className="hover:text-foreground font-medium">
                      +91 99645 46464
                    </a>
                    <span className="text-foreground/40 mx-2">·</span>
                    <a href="tel:08043364331" className="hover:text-foreground font-medium">
                      080 4336 4331
                    </a>
                  </>
                }
              />
              <ContactRow
                icon="✉️"
                label="Email"
                value={
                  <a
                    href="mailto:sales@TERAiTtech.com"
                    className="hover:text-foreground font-medium"
                  >
                    sales@TERAiTtech.com
                  </a>
                }
              />
              <ContactRow icon="🕒" label="Working Hours" value="9:30 am to 6:30 pm" />

              <div className="mt-8 rounded-xl overflow-hidden h-[250px] border border-black/10">
                <iframe
                  src="https://maps.google.com/maps?q=24,%20100%20Feet%20Rd,%20HRBR%20Layout%201st%20Block,%20Banaswadi,%20Bengaluru,%20Karnataka%20560043&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const f = new FormData(e.currentTarget);

                fetch("https://formsubmit.co/ajax/sales@TERAiTtech.com", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    name: f.get("name"),
                    email: f.get("email"),
                    phone: f.get("phone"),
                    message: f.get("message"),
                    _subject: "New Website Enquiry - TERAiT",
                    _template: "table",
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                      setIsSuccess(false);
                      // @ts-expect-error - grecaptcha target type is missing
                      e.target.reset();
                    }, 4000);
                  })
                  .catch((error) => {
                    setIsSubmitting(false);
                    alert("Failed to send message. Please try again or email us directly.");
                  });
              }}
              className="bg-white/80 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-2xl p-6 md:p-8 space-y-5 relative"
            >
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl z-10 text-center px-4">
                  <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mb-4 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-foreground/70">Our team will get back to you shortly.</p>
                </div>
              ) : null}

              <Field label="Full name" name="name" required />
              <Field label="Email address" name="email" type="email" required />
              <Field label="Phone number" name="phone" type="tel" />
              <Field label="Your message" name="message" textarea required />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 mt-2 font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-glow-blue border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg,var(--brand-blue),var(--brand-red))",
                }}
              >
                {isSubmitting ? "Sending Request..." : "Submit your request →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== Footer ========== */
export function Footer() {
  return (
    <footer className="relative pt-10 pb-6 glass-strong shadow-2xl border-x-0 border-b-0 rounded-none rounded-t-3xl">
      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 drop-shadow-md">
              <Wordmark size="text-xl" />
            </div>
            <p className="mt-3 text-sm text-black max-w-md leading-relaxed font-semibold drop-shadow-sm">
              Enterprise IT infrastructure, surveillance, cloud and cybersecurity — engineered for
              businesses that refuse to compromise.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground mb-3 drop-shadow-sm">
              Company
            </div>
            <ul className="space-y-1.5 text-black font-semibold text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-red transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-red transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground mb-3 drop-shadow-sm">
              Reach us
            </div>
            <ul className="space-y-1.5 text-black font-semibold text-sm">
              <li>+91 99645 46464</li>
              <li>080 4336 4331</li>
              <li>sales@TERAiTtech.com</li>
              <li>Bengaluru, Karnataka</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold text-black">
          <div>© {new Date().getFullYear()} TERAiT Technologies Pvt Ltd. All rights reserved.</div>
          <div>Designed & engineered for enterprises.</div>
        </div>
      </div>
    </footer>
  );
}
