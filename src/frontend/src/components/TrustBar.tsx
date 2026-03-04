import { Award, Camera, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { icon: Camera, value: "96+", label: "Projects Completed" },
  { icon: Star, value: "4.8/5", label: "Google Rating" },
  { icon: Award, value: "4.7/5", label: "Justdial Rating" },
  { icon: MapPin, value: "Jogeshwari West", label: "Mumbai" },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-charcoal py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4 py-2 lg:py-0"
            >
              <stat.icon className="h-4 w-4 text-brand-gold mb-2 opacity-80" />
              <div className="font-display text-2xl lg:text-3xl font-semibold text-white mb-0.5">
                {stat.value}
              </div>
              <div className="font-body text-xs text-white/50 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
