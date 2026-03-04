import { Building2, Palette, Trees } from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    icon: Building2,
    title: "Architectural Design",
    tagline: "Built to endure. Designed to inspire.",
    bullets: [
      "Architectural Consultation",
      "Structural Engineering",
      "Custom Home Design",
      "Commercial Architecture",
    ],
    image: "/assets/uploads/Screenshot_20260305-005928-5.png",
  },
  {
    icon: Palette,
    title: "Interiors & Renovations",
    tagline: "Every detail, intentionally placed.",
    bullets: [
      "Residential Interiors",
      "Office Interiors",
      "Modular Kitchens & Bedrooms",
      "Renovation & Refurbishment",
    ],
    image: "/assets/uploads/Screenshot_20260305-005919-4.png",
  },
  {
    icon: Trees,
    title: "Landscape & Project Management",
    tagline: "From first sketch to final handover.",
    bullets: [
      "Landscape Design",
      "Garden Planning",
      "End-to-End Project Oversight",
      "Construction Management",
    ],
    image: "/assets/uploads/Screenshot_20260305-005853-6.png",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-brand-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="font-body text-xs text-brand-gold tracking-[0.25em] uppercase">
              What We Do
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-charcoal">
            Our{" "}
            <span className="italic font-normal text-brand-gold">Services</span>
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group bg-white rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-sm flex items-center justify-center mb-4">
                  <service.icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-1">
                  {service.title}
                </h3>
                <p className="font-body text-xs text-brand-gold italic mb-4">
                  {service.tagline}
                </p>
                <ul className="space-y-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 font-body text-sm text-muted-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
