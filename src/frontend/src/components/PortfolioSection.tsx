import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { PortfolioItem } from "../backend.d";
import { useGetPortfolioItems } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Architectural Design",
  "Interiors",
  "Commercial",
  "Residential",
  "Landscape",
];

// Static fallback portfolio using the uploaded project images
const STATIC_PORTFOLIO: PortfolioItem[] = [
  {
    id: BigInt(1),
    title: "Luxury Living Room",
    category: "Interiors",
    imageUrl: "/assets/Screenshot_20260305-005912.png",
    caption: "Warm beige & gold tones with bespoke furnishings",
    displayOrder: BigInt(1),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    title: "Hotel Bedroom Suite",
    category: "Interiors",
    imageUrl: "/assets/Screenshot_20260305-005904.png",
    caption: "Natural wood tones, premium finishes",
    displayOrder: BigInt(2),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    title: "Elegant Living Space",
    category: "Residential",
    imageUrl: "/assets/Screenshot_20260305-005919.png",
    caption: "Cream and brown palette, refined luxury",
    displayOrder: BigInt(3),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    title: "Modern Exterior",
    category: "Architectural Design",
    imageUrl: "/assets/Screenshot_20260305-005928.png",
    caption: "Night render — contemporary facade design",
    displayOrder: BigInt(4),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(5),
    title: "High-Rise Tower",
    category: "Architectural Design",
    imageUrl: "/assets/Screenshot_20260305-005853.png",
    caption: "Tall residential tower, Mumbai skyline",
    displayOrder: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(6),
    title: "Grand Lobby",
    category: "Commercial",
    imageUrl: "/assets/Screenshot_20260305-010001.png",
    caption: "Gold & marble lobby, premium hospitality",
    displayOrder: BigInt(6),
    createdAt: BigInt(0),
  },
  {
    id: BigInt(7),
    title: "Restaurant & Cafe",
    category: "Commercial",
    imageUrl: "/assets/Screenshot_20260305-005941.png",
    caption: "Pendant ceiling lights, intimate dining atmosphere",
    displayOrder: BigInt(7),
    createdAt: BigInt(0),
  },
];

function SkeletonCard() {
  return (
    <div
      className="bg-brand-beige/60 rounded-sm overflow-hidden animate-pulse"
      data-ocid="portfolio.loading_state"
    >
      <div className="h-56 bg-brand-sand/60" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-brand-sand/60 rounded w-3/4" />
        <div className="h-2 bg-brand-sand/40 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const { data: backendItems = [], isLoading } = useGetPortfolioItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Use backend items if any exist, otherwise fall back to static portfolio images
  const items = backendItems.length > 0 ? backendItems : STATIC_PORTFOLIO;

  const sorted = [...items].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );
  const filtered =
    activeCategory === "All"
      ? sorted
      : sorted.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevItem = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    );
  }, [filtered.length]);

  const nextItem = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: closeLightbox is stable
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prevItem, nextItem]);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="font-body text-xs text-brand-gold tracking-[0.25em] uppercase">
              Portfolio
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-charcoal">
            Our <span className="italic font-normal text-brand-gold">Work</span>
          </h2>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-ocid="portfolio.tab"
              className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                  : "bg-transparent text-brand-charcoal border-brand-beige hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground font-body"
            data-ocid="portfolio.empty_state"
          >
            <p className="text-lg mb-2">No projects in this category yet.</p>
            <p className="text-sm text-brand-gold/70">Check back soon.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <PortfolioCard
                  key={item.id.toString()}
                  item={item}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            data-ocid="portfolio.modal"
          >
            {/* Close */}
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={closeLightbox}
              data-ocid="portfolio.close_button"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
              data-ocid="portfolio.pagination_prev"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Next */}
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
              data-ocid="portfolio.pagination_next"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[75vh] max-w-full object-contain rounded-sm"
              />
              <div className="text-center">
                <span className="inline-block font-body text-xs text-brand-gold tracking-widest uppercase bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-sm mb-2">
                  {lightboxItem.category}
                </span>
                <h3 className="font-display text-xl text-white font-semibold mb-1">
                  {lightboxItem.title}
                </h3>
                {lightboxItem.caption && (
                  <p className="font-body text-sm text-white/60">
                    {lightboxItem.caption}
                  </p>
                )}
                <p className="font-body text-xs text-white/30 mt-2">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PortfolioCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group cursor-pointer rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-white text-left w-full"
      onClick={onClick}
      data-ocid={`portfolio.item.${index + 1}`}
      aria-label={`View ${item.title}`}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-block font-body text-xs text-white/90 tracking-wider bg-brand-gold/80 px-2 py-0.5 rounded-sm">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-display text-sm font-semibold text-brand-charcoal truncate">
          {item.title}
        </h3>
        {item.caption && (
          <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {item.caption}
          </p>
        )}
      </div>
    </motion.button>
  );
}
