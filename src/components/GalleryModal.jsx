/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
export const GalleryModal = ({
  images = [],
  index = 0,
  onClose,
  onIndexChange,
  backdropGradient,
}) => {
  const [i, setI] = useState(index);
  const wrap = (n) => {
    const len = images.length;
    return ((n % len) + len) % len;
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    modalRef.current?.focus?.();
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const go = (delta) => {
    const next = wrap(i + delta);
    setI(next);
    onIndexChange?.(next);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}>
      {/* Gradient + blur overlay */}
      <motion.div
        className={`absolute inset-0 backdrop-blur-[6px] ${backdropGradient ? `bg-gradient-to-br ${backdropGradient}` : "bg-gradient-to-br from-brand-900/80 via-tech-green-700/70 to-tech-green-900"}`}
        onClick={onClose}
        style={{ opacity: 0.95 }}
      />
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-5xl"
        exit={{ scale: 0.96, opacity: 0 }}
        initial={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}>
        {/* Close */}
        <motion.button
          className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:top-6 md:right-6"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <X className="h-6 w-6" />
        </motion.button>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-2xl bg-black/70 shadow-2xl backdrop-blur-md">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            {/* Slide area with drag/swipe */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="relative h-full w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              exit={{ opacity: 0, x: -40 }}
              initial={{ opacity: 0, x: 40 }}
              key={i}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}>
              <img
                alt={images[i]?.alt || `Photo ${i + 1}`}
                className="object-contain select-none w-full h-full"
                loading="eager"
                src={images[i]?.src}
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* Prev / Next */}
            <button
              aria-label="Previous"
              className="absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
              onClick={() => go(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next"
              className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
              onClick={() => go(1)}>
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {i + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3">
              {images.map((img, idx) => (
                <button
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                    idx === i ?
                      "ring-[var(--color-brand-400)]"
                    : "ring-white/10"
                  }`}
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    onIndexChange?.(idx);
                  }}>
                  <img
                    alt={img.alt || `Thumb ${idx + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    src={img.src}
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
