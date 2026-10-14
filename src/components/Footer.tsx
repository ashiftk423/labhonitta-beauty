import { BUSINESS } from "@/content/site";
import { InstagramIcon, PhoneIcon, PinIcon } from "@/components/icons";

const LINKS = [
  { label: "Instagram", href: BUSINESS.instagramUrl, Icon: InstagramIcon },
  { label: "Location on Google Maps", href: BUSINESS.mapsUrl, Icon: PinIcon },
  { label: "Call", href: BUSINESS.phoneHref, Icon: PhoneIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center">
      <p className="font-display text-2xl text-gold-gradient">
        Labhonitta <span className="italic text-rose">by Soumya</span>
      </p>
      <p className="mt-2 text-sm text-cream/50">
        Ladies Beauty Parlour · Bridal Makeup & Salon · Thrissur, Kerala
      </p>
      <ul className="mt-5 flex justify-center gap-3">
        {LINKS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:border-gold hover:bg-gold/10"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
      <a
        href={BUSINESS.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-xs tracking-[0.15em] text-cream/55 transition-colors hover:text-gold"
      >
        {BUSINESS.instagramHandle}
      </a>
      <p className="mt-4 text-xs text-cream/35">
        © {new Date().getFullYear()} Labhonitta by Soumya · Ladies Beauty Parlour. Crafted with care.
      </p>
    </footer>
  );
}
