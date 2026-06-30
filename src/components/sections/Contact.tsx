"use client";

import { motion } from "framer-motion";

const INFO = [
  {
    label: "Visit us",
    value:
      "First floor, Kesaveeyam Building, Sreepadam Avenue, Cheroor Rd, Chembukkav, Thrissur, Kerala 680020",
    href: "https://maps.google.com/?q=Labhonitta+ladies+Beauty+Parlour+Thrissur",
  },
  { label: "Call / WhatsApp", value: "+91 90202 40426", href: "tel:+919020240426" },
  {
    label: "Website",
    value: "labhonittabeautyparlour.com",
    href: "https://labhonittabeautyparlour.com",
  },
  { label: "Hours", value: "Open daily · Closes 7:00 PM", href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden rounded-[2.5rem] p-8 glass md:p-14"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-rose/80">
              Book your seat
            </span>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
              Let&apos;s create your{" "}
              <span className="text-gold-gradient">perfect look</span>
            </h2>
            <p className="mt-4 max-w-md text-cream/65">
              Rated 4.9★ by 175+ happy clients. Reserve your bridal trial or
              salon appointment — we&apos;ll take care of the rest.
            </p>

            <ul className="mt-8 space-y-5">
              {INFO.map((it) => (
                <li key={it.label}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold/70">
                    {it.label}
                  </p>
                  {it.href ? (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cream/85 transition-colors hover:text-gold"
                    >
                      {it.value}
                    </a>
                  ) : (
                    <p className="text-cream/85">{it.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const msg = `Hi Labhonitta! I'd like to book ${data.get("service")}.%0AName: ${data.get("name")}%0ADate: ${data.get("date")}`;
              window.open(`https://wa.me/919020240426?text=${msg}`, "_blank");
            }}
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <select
              name="service"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-cream focus:border-gold focus:outline-none"
            >
              <option className="bg-plum">Bridal Makeup</option>
              <option className="bg-plum">Artist Makeup</option>
              <option className="bg-plum">Hair Cutting</option>
              <option className="bg-plum">Hair Treatment</option>
            </select>
            <input
              name="date"
              type="date"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-cream focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 rounded-2xl bg-gradient-to-r from-gold via-rosegold to-rose py-4 font-medium text-[#1a0a14] transition-transform hover:scale-[1.02]"
            >
              Book on WhatsApp
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
