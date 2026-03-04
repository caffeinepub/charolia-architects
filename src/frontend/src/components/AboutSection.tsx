import { Building2, Palette, Trees } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: Building2,
    title: "Architectural Design",
    desc: "From structural consultation to engineering and bespoke custom homes — every line drawn with intention.",
  },
  {
    icon: Palette,
    title: "Interiors & Renovations",
    desc: "Transforming homes, offices, and spaces with modular kitchens, bedrooms, and thoughtful renovations.",
  },
  {
    icon: Trees,
    title: "Landscape & Project Management",
    desc: "Garden planning, landscape design, and end-to-end construction oversight for seamless delivery.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/assets/uploads/Screenshot_20260305-005912-2.png"
                alt="Living Room Design by Charolia Architects"
                className="w-full h-64 object-cover rounded-sm shadow-card"
              />
              <img
                src="/assets/uploads/Screenshot_20260305-010001-7.png"
                alt="Luxury Lobby by Charolia Architects"
                className="w-full h-64 object-cover rounded-sm shadow-card mt-8"
              />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -right-4 bg-brand-charcoal text-white px-6 py-4 rounded-sm shadow-luxury hidden lg:block">
              <p className="font-display text-3xl font-semibold">
                96<span className="text-brand-gold">+</span>
              </p>
              <p className="font-body text-xs text-white/60 tracking-widest uppercase mt-1">
                Projects Delivered
              </p>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:pl-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="font-body text-xs text-brand-gold tracking-[0.25em] uppercase">
                About Us
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-6">
              A Multidisciplinary{" "}
              <span className="italic text-brand-gold font-normal">
                Practice
              </span>
            </h2>

            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">
              Charolia Architects is a Mumbai-based firm delivering exceptional
              architecture, interior design, landscape architecture, and
              engineering consultancy. Located in the heart of Jogeshwari West,
              we combine meticulous attention to detail with a deep commitment
              to transforming spaces into lasting experiences.
            </p>

            <p className="font-body text-muted-foreground leading-relaxed mb-10 text-base">
              Every project is approached as a unique opportunity — to listen,
              to understand, and to create spaces that reflect the vision and
              aspirations of our clients. Our 4.8/5 Google rating speaks to the
              trust we've built, one project at a time.
            </p>

            <div className="space-y-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-brand-beige/40 rounded-sm hover:bg-brand-beige/70 transition-colors"
                >
                  <div className="w-9 h-9 bg-brand-gold/15 rounded-sm flex items-center justify-center flex-shrink-0">
                    <f.icon className="h-4 w-4 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-brand-charcoal mb-0.5">
                      {f.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
