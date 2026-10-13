"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/content/site";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon } from "@/components/icons";

const INFO = [
  {
    label: "Visit us",
    value: BUSINESS.address,
    href: BUSINESS.mapsUrl,
    Icon: PinIcon,
  },
  {
    label: "Call / WhatsApp",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
    Icon: PhoneIcon,
  },
  {
    label: "Instagram",
    value: BUSINESS.instagramHandle,
    href: BUSINESS.instagramUrl,
    Icon: InstagramIcon,
  },
  { label: "Hours", value: BUSINESS.hours, href: undefined, Icon: ClockIcon },
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
              Trusted by 1K+ happy brides, rated 4.9★ on Google. Reserve your bridal trial or
              salon appointment — we&apos;ll take care of the rest.
            </p>

            <ul className="mt-8 space-y-5">
              {INFO.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon />
                  </span>
                  <span>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold/70">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-cream/85 transition-colors hover:text-gold"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-cream/85">{value}</p>
                    )}
                  </span>
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

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-gold/20 bg-[color:var(--surface)]">
          <iframe
            src={BUSINESS.mapsEmbed}
            title={`${BUSINESS.name} on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[260px] w-full md:h-[340px]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <p className="font-display text-lg text-cream">
              Find us in Chembukkav, {BUSINESS.city}
            </p>
            <div className="flex gap-2">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rosegold to-rose px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink shadow-lg transition-transform hover:scale-105"
              >
                <PinIcon /> Get directions
              </a>
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold/10"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
