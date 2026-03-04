import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-beige"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3"
            data-ocid="nav.link"
            aria-label="Charolia Architects — Home"
          >
            <img
              src="/assets/Screenshot_20260305-010019-1.png"
              alt="Charolia Architects Logo"
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-full bg-white shadow-sm"
            />
            <div className="hidden sm:block">
              <span
                className={`font-display text-sm font-semibold tracking-widest uppercase leading-none block transition-colors ${
                  isScrolled ? "text-brand-charcoal" : "text-white"
                }`}
              >
                Charolia
              </span>
              <span
                className={`font-body text-xs tracking-[0.25em] uppercase block transition-colors ${
                  isScrolled ? "text-brand-gold" : "text-brand-gold-light"
                }`}
              >
                Architects
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className={`font-body text-sm font-medium tracking-wider uppercase transition-colors hover:text-brand-gold ${
                  isScrolled ? "text-brand-charcoal" : "text-white/90"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918286885154"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
            >
              <Button
                size="sm"
                className="hidden sm:flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-body font-semibold text-xs tracking-widest uppercase border-0 shadow-none"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </Button>
            </a>

            <button
              type="button"
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-brand-charcoal hover:bg-brand-beige"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ocid="nav.toggle"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-brand-beige overflow-hidden"
          >
            <nav
              className="px-4 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-body text-sm font-medium tracking-wider uppercase text-brand-charcoal hover:text-brand-gold py-3 px-2 border-b border-brand-beige/50 transition-colors last:border-0"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wa.me/918286885154"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3"
                data-ocid="nav.primary_button"
              >
                <Button className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-body font-semibold text-xs tracking-widest uppercase border-0">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
