import { ChevronDown, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToPortfolio = () => {
    const el = document.querySelector("#portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/uploads/Screenshot_20260305-005941-8.png"
          alt="Charolia Architects Portfolio — Restaurant Design"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Rating Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
            <span className="text-brand-gold text-sm">★★★★★</span>
            <span className="text-white text-sm font-body font-medium">
              4.8 Google
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
            <span className="text-brand-gold text-sm">★★★★★</span>
            <span className="text-white text-sm font-body font-medium">
              4.7 Justdial
            </span>
          </div>
        </motion.div>

        {/* Firm Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white tracking-tight leading-tight mb-4"
        >
          CHAROLIA
          <span className="block text-brand-gold-light italic font-normal text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
            Architects
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-body text-white/80 text-base sm:text-lg tracking-[0.2em] uppercase mt-6 mb-10"
        >
          Exceptional Design,&nbsp;&nbsp;Trusted Results
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-px bg-brand-gold mx-auto mb-10"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/918286885154"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-300 hover:shadow-luxury hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Start Your Project
          </a>
          <button
            type="button"
            onClick={scrollToPortfolio}
            data-ocid="hero.secondary_button"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm border border-white/40 hover:border-white/70 transition-all duration-300"
          >
            View Our Work
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="font-body text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
