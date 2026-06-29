import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Tilt from "react-parallax-tilt";

type Service = {
  title: string;
  desc: string;
  icon: string;
  items: string[];
  brands?: string[];
  accent: string;
};

const services: Service[] = [
  {
    title: "Professional IT Services",
    desc: "Comprehensive IT consulting, deployment, and managed support tailored for modern enterprise infrastructure.",
    icon: "⚙️",
    items: [
      "IT Consulting",
      "Implementation & Deployment",
      "IT Support Services",
      "Managed Services",
    ],
    accent: "from-[var(--brand-red)] to-[#7a0a1c]",
  },
  {
    title: "Cloud & SaaS Solutions",
    desc: "Scalable cloud business applications for CRM, ERP, productivity and document management.",
    icon: "☁️",
    items: ["Hosting & SaaS", "IaaS & PaaS", "Cloud Backup", "Disaster Recovery"],
    brands: ["Microsoft Azure", "AWS", "Google Cloud", "IBM Cloud", "VMware"],
    accent: "from-[var(--brand-blue)] to-[#0a2447]",
  },
  {
    title: "Cloud Enablement",
    desc: "Expert migration, security and automation to unlock the full power of cloud-native operations.",
    icon: "🚀",
    items: ["Cloud Migration", "Cloud Security", "Cloud Automation"],
    brands: ["BitTitan", "AvePoint", "RPOST"],
    accent: "from-[#6d28d9] to-[#3b0764]",
  },
  {
    title: "Cybersecurity Solutions",
    desc: "Multi-layered defense protecting businesses from evolving cyber threats — perimeter to endpoint.",
    icon: "🛡️",
    items: ["Firewalls & UTM", "Antivirus & EDR", "Endpoint Protection", "Identity Management"],
    brands: ["Fortinet", "Palo Alto", "Check Point", "Sophos", "Trend Micro"],
    accent: "from-[var(--brand-red)] to-[var(--brand-blue)]",
  },
  {
    title: "Backup & Disaster Recovery",
    desc: "Comprehensive backup, rapid recovery and data protection strategies to safeguard business continuity.",
    icon: "💾",
    items: ["Data Backup", "Disaster Recovery Strategy", "Data Protection Services"],
    brands: ["Acronis", "Veeam", "Parablu", "Veritas", "NetApp"],
    accent: "from-[#0ea5e9] to-[#0c4a6e]",
  },
  {
    title: "Business Applications",
    desc: "Streamline operations with integrated CRM, ERP and digital signature workflows.",
    icon: "💼",
    items: ["CRM Systems", "ERP Solutions", "Digital Signatures"],
    brands: ["Microsoft Dynamics 365", "Salesforce", "DocuSign", "Freshworks", "eMudhra"],
    accent: "from-[#10b981] to-[#064e3b]",
  },
  {
    title: "Collaboration & Productivity",
    desc: "Empower teams with secure email, video conferencing and file-sharing tools that scale.",
    icon: "🤝",
    items: ["Productivity Tools", "Communication Tools", "Secure File Sharing"],
    brands: ["Microsoft 365", "Adobe", "Cisco Webex", "Dropbox Business", "Genesys"],
    accent: "from-[#f59e0b] to-[#78350f]",
  },
  {
    title: "Mailing Solutions",
    desc: "Streamlined email communication and marketing automation for measurable business growth.",
    icon: "✉️",
    items: ["Email Hosting", "Mailing Lists", "Mass Email Services", "Marketing Automation"],
    accent: "from-[var(--brand-blue)] to-[#6d28d9]",
  },
  {
    title: "Automation & DevOps",
    desc: "Accelerate innovation with RPA, CI/CD pipelines and modern developer workflows.",
    icon: "🤖",
    items: ["RPA & Workflow Automation", "CI/CD Platforms", "Version Control Tools"],
    brands: ["Automation Anywhere", "Simplifai", "GitLab"],
    accent: "from-[#ec4899] to-[#831843]",
  },
  {
    title: "IoT & Smart Solutions",
    desc: "Advanced IoT for smart cities, industrial monitoring and AI-driven operational automation.",
    icon: "📡",
    items: ["Smart Cities", "Industrial IoT", "Plant Monitoring", "Video Analytics"],
    brands: ["Bosch", "Honeywell", "Google Nest"],
    accent: "from-[var(--brand-red)] to-[#f59e0b]",
  },
];

export function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-x relative z-10">
        <SectionHeader
          kicker="Our Services"
          title="End-to-end enterprise infrastructure"
          subtitle="We engineer, deploy and manage high-performance technology environments for businesses that demand reliability and scale."
          linkTo="/services"
        />

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {services.map((s) => (
            <motion.button
              key={s.title}
              layoutId={`card-${s.title}`}
              onClick={() => setActive(s)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
              }}
              className="text-left cursor-pointer h-full outline-none"
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                className="group relative glass rounded-2xl p-6 shadow-xl overflow-hidden hover:shadow-2xl hover:border-white/40 transition-shadow duration-300 h-full"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-br ${s.accent}`}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                  }}
                />
                <div
                  className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl bg-gradient-to-br ${s.accent} text-white shadow-lg`}
                  >
                    {s.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-display font-semibold">{s.title}</h3>
                  <p className="mt-2 text-xs text-brand-blue font-medium leading-relaxed">{s.desc}</p>
                  <ul className="mt-4 space-y-1">
                    {s.items.slice(0, 3).map((it) => (
                      <li
                        key={it}
                        className="flex items-center gap-2 text-xs text-brand-blue font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-blue)]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  center = false,
  linkTo,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  linkTo?: string;
}) {
  const TitleEl = (
    <h2
      className={`mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient drop-shadow-md ${linkTo ? "group-hover:brightness-125 transition" : ""}`}
    >
      {title}{" "}
      {linkTo && (
        <span className="opacity-0 -ml-4 text-3xl group-hover:opacity-100 group-hover:ml-2 transition-all text-white">
          →
        </span>
      )}
    </h2>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`mb-12 md:mb-16 max-w-4xl ${center ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-blue font-bold drop-shadow-sm ${center ? "justify-center w-full" : ""}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-blue)]" />
        {kicker}
      </div>

      {linkTo ? (
        <Link to={linkTo} className="block group">
          {TitleEl}
        </Link>
      ) : (
        TitleEl
      )}
      {subtitle && (
        <p className="mt-5 text-lg text-brand-blue font-semibold drop-shadow-sm leading-relaxed">
          {subtitle}
        </p>
      )}
      {linkTo && (
        <div className="mt-6">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all"
          >
            View All Services →
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function ServiceModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/70 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-strong rounded-3xl p-8 md:p-10 max-h-[85vh] overflow-y-auto"
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 h-9 w-9 rounded-full glass grid place-items-center hover:bg-white/10"
            >
              ✕
            </button>
            <div
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-3xl bg-gradient-to-br ${service.accent} text-white shadow-xl`}
            >
              {service.icon}
            </div>
            <h3 className="mt-6 text-3xl md:text-4xl font-display font-bold text-gradient">
              {service.title}
            </h3>
            <p className="mt-4 text-brand-blue font-medium leading-relaxed">{service.desc}</p>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3">
                What's included
              </div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {service.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--brand-red)] to-[var(--brand-blue)]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {service.brands && (
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3">
                  Trusted technology partners
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.brands.map((b) => (
                    <span key={b} className="text-xs px-3 py-1.5 rounded-full glass">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/contact"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
              style={{ background: "linear-gradient(135deg,var(--brand-red),var(--brand-blue))" }}
            >
              Talk to a specialist →
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
