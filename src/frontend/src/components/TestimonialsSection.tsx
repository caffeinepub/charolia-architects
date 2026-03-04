import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useGetActiveTestimonials } from "../hooks/useQueries";

const FALLBACK_TESTIMONIALS = [
  {
    id: BigInt(1),
    clientName: "Priya Sharma",
    location: "Andheri West, Mumbai",
    rating: BigInt(5),
    reviewText:
      "Charolia Architects transformed our apartment beyond what we imagined. Their attention to detail is extraordinary — every corner, every material was chosen with purpose. We felt heard throughout the entire process.",
    isActive: true,
  },
  {
    id: BigInt(2),
    clientName: "Rajesh Mehta",
    location: "Goregaon East, Mumbai",
    rating: BigInt(5),
    reviewText:
      "We hired them for our office renovation and the results were stunning. The team is professional, punctual, and passionate about what they do. Highly recommended for any commercial space.",
    isActive: true,
  },
  {
    id: BigInt(3),
    clientName: "Aisha & Farhan Khan",
    location: "Jogeshwari West, Mumbai",
    rating: BigInt(5),
    reviewText:
      "From the first consultation to the final walkthrough, the experience was exceptional. They turned a blank canvas into a home that truly reflects our personality. The modular kitchen design is perfect.",
    isActive: true,
  },
  {
    id: BigInt(4),
    clientName: "Vikram Nair",
    location: "Versova, Mumbai",
    rating: BigInt(5),
    reviewText:
      "What sets Charolia Architects apart is trust. They were transparent about costs, timelines, and every decision. The quality of execution was five-star. Our living room looks like something out of a magazine.",
    isActive: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-brand-gold text-brand-gold" : "text-brand-beige"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { data: fetched = [] } = useGetActiveTestimonials();
  const testimonials = fetched.length > 0 ? fetched : FALLBACK_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const active = testimonials[current];

  return (
    <section className="section-padding bg-brand-charcoal overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-gold/60" />
            <span className="font-body text-xs text-brand-gold tracking-[0.25em] uppercase">
              Testimonials
            </span>
            <div className="h-px w-12 bg-brand-gold/60" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
            What Our{" "}
            <span className="italic font-normal text-brand-gold">
              Clients Say
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-12 text-center"
              data-ocid={`testimonials.item.${(current % 3) + 1}`}
            >
              <Quote className="h-10 w-10 text-brand-gold/40 mx-auto mb-6" />

              <p className="font-display text-lg sm:text-xl lg:text-2xl text-white/90 italic leading-relaxed mb-8">
                &ldquo;{active.reviewText}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-2">
                <StarRating rating={Number(active.rating)} />
                <p className="font-body text-sm font-semibold text-white mt-2">
                  {active.clientName}
                </p>
                <p className="font-body text-xs text-white/40 tracking-wider">
                  {active.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              className="text-white/50 hover:text-brand-gold p-2 transition-colors"
              data-ocid="testimonials.pagination_prev"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: dot navigation uses position index intentionally
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-brand-gold"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-ocid="testimonials.toggle"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="text-white/50 hover:text-brand-gold p-2 transition-colors"
              data-ocid="testimonials.pagination_next"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
