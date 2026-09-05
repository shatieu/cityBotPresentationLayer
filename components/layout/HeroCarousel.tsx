"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayMs?: number;
}

export function HeroCarousel({ slides, autoPlayMs = 5000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayMs]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full h-[240px] md:h-[320px] lg:h-[400px] rounded-base overflow-hidden bg-gold-100">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
      {(slide.title || slide.subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {slide.title && (
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              {slide.title}
            </h2>
          )}
          {slide.subtitle && (
            <p className="text-sm md:text-base text-white/80 mt-1">
              {slide.subtitle}
            </p>
          )}
        </div>
      )}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-base bg-white/80 flex items-center justify-center text-ink-900 hover:bg-white transition-colors"
            aria-label="Předchozí"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-base bg-white/80 flex items-center justify-center text-ink-900 hover:bg-white transition-colors"
            aria-label="Další"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-sm transition-colors ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Snímek ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
