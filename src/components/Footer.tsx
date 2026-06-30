export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center">
      <p className="font-display text-2xl text-gold-gradient">Labhonitta</p>
      <p className="mt-2 text-sm text-cream/50">
        Ladies Beauty Parlour · Bridal Makeup & Salon · Thrissur, Kerala
      </p>
      <p className="mt-4 text-xs text-cream/35">
        © {new Date().getFullYear()} Labhonitta Ladies Beauty Parlour. Crafted with care.
      </p>
    </footer>
  );
}
