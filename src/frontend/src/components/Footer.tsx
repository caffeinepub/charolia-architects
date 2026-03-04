import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/uploads/Screenshot_20260305-010019-1.png"
                alt="Charolia Architects"
                className="h-12 w-12 object-contain rounded-full bg-white/10"
              />
              <div>
                <span className="font-display text-sm font-semibold tracking-widest uppercase block text-white">
                  Charolia
                </span>
                <span className="font-body text-xs tracking-[0.25em] uppercase block text-brand-gold">
                  Architects
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              A multidisciplinary practice delivering exceptional architecture,
              interior design, landscape architecture, and engineering
              consultancy from Jogeshwari West, Mumbai.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/charoliaarchitects"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-brand-gold/20 rounded-sm flex items-center justify-center transition-colors"
                data-ocid="footer.link"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-white/60 hover:text-brand-gold" />
              </a>
              <a
                href="https://wa.me/918286885154"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-green-500/20 rounded-sm flex items-center justify-center transition-colors"
                data-ocid="footer.link"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-white/60 hover:text-green-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-gold mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-gold/60 flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/50 leading-snug">
                  Jogeshwari West,
                  <br />
                  Mumbai, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-gold/60 flex-shrink-0" />
                <a
                  href="tel:+918286885154"
                  className="font-body text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  +91 82868 85154
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="h-4 w-4 text-brand-gold/60 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/charoliaarchitects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  @charoliaarchitects
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {year} Charolia Architects. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
