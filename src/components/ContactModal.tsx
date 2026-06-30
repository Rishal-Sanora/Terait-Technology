import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

// Global event to open the contact modal from anywhere
export const OPEN_CONTACT_MODAL_EVENT = "open-contact-modal";

export function triggerContactModal() {
  window.dispatchEvent(new Event(OPEN_CONTACT_MODAL_EVENT));
}

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setIsSuccess(false);
    };
    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handleOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-2xl glass-strong">
        <div className="glass-strong rounded-xl p-6 md:p-8">
          <DialogTitle className="text-2xl md:text-3xl font-display font-bold mb-2">
            Let's build your next infrastructure
          </DialogTitle>
          <p className="text-foreground/70 mb-8 max-w-xl">
            We provide high-level enterprise solutions. Connect with our experts today to scale your
            infrastructure and secure your digital assets.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Headquarters"
                value="#24, 100 Feet Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, Karnataka 560043"
              />
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
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
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={
                  <a
                    href="mailto:sales@teraittech.com"
                    className="hover:text-foreground font-medium"
                  >
                    sales@teraittech.com
                  </a>
                }
              />

              <div className="mt-6 rounded-xl overflow-hidden h-[200px] border border-black/10">
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

                fetch("https://formsubmit.co/ajax/sales@teraittech.com", {
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
                      setOpen(false);
                    }, 3000);
                  })
                  .catch((error) => {
                    setIsSubmitting(false);
                    alert("Failed to send message. Please try again or email us directly.");
                  });
              }}
              className="bg-white/80 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-2xl p-6 space-y-4 relative"
            >
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl z-10 text-center px-4">
                  <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mb-4 animate-bounce">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Sent Successfully!</h3>
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
                className="w-full relative group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-glow-blue border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg,var(--brand-blue),var(--brand-red))",
                }}
              >
                {isSubmitting ? "Sending Request..." : "Submit your request â†’"}
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-white/50 dark:bg-black/10 border border-black/5 dark:border-white/5 rounded-xl p-4 flex gap-4 items-center">
      <div className="h-10 w-10 shrink-0 rounded-lg bg-brand-red text-white text-xl grid place-items-center font-bold">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">
          {label}
        </div>
        <div className="mt-0.5 text-foreground/90 text-sm leading-tight">{value}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 px-4 py-3 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 focus:border-brand-blue focus:bg-black/5 dark:focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-brand-blue/30 focus:shadow-glow-blue";
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className={`${base} mt-1.5 resize-none`}
        />
      ) : (
        <input name={name} type={type} required={required} className={`${base} mt-1.5`} />
      )}
    </label>
  );
}
