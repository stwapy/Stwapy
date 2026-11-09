'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'tech-deals',
    tag: 'Campus Tech Deals',
    title: 'Pre-Loved Laptops & Gadgets',
    subtitle: 'Verified MacBooks, ThinkPads, iPads and engineering gear from campus peers.',
    ctaText: 'Explore Tech Deals',
    ctaLink: '#marketplace',
    secondaryCtaText: 'Sell a Device',
    secondaryCtaLink: '/post',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Laptops and electronics',
  },
  {
    id: 'academic-books',
    tag: 'Semester Textbooks',
    title: 'Books, Solved Papers & Notes',
    subtitle: 'Pass down engineering, medical and degree standard books at pocket-friendly rates.',
    ctaText: 'Browse Books',
    ctaLink: '#marketplace',
    secondaryCtaText: 'List Old Books',
    secondaryCtaLink: '/post',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'College textbooks and study materials',
  },
  {
    id: 'campus-cycles',
    tag: 'Campus Mobility',
    title: 'Bicycles & Campus Commute',
    subtitle: 'Geared and hybrid cycles in top condition, ready for instant handover.',
    ctaText: 'Find Bicycles',
    ctaLink: '#marketplace',
    secondaryCtaText: 'Sell Your Bike',
    secondaryCtaLink: '/post',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Bicycles on campus',
  },
  {
    id: 'hostel-living',
    tag: 'Hostel & Dorm Essentials',
    title: 'Room Furniture & Appliances',
    subtitle: 'Study desks, room coolers, table lamps and essentials from graduating seniors.',
    ctaText: 'Explore Room Gear',
    ctaLink: '#marketplace',
    secondaryCtaText: 'Post Room Items',
    secondaryCtaLink: '/post',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Hostel furniture and room essentials',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay slider right-to-left every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    autoPlayTimer.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [goToNext, isPaused]);

  // Touch Swipe Handlers for mobile navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full pt-2 sm:pt-3 pb-1 sm:pb-2 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 group select-none bg-slate-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track - horizontal right-to-left slide */}
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 min-h-[260px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px] relative flex flex-col justify-end p-4 sm:p-8 md:p-14 lg:p-16 overflow-hidden"
            >
              {/* Background Photo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-75 scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out"
                />
                {/* Clean dark gradient overlay for crisp legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent z-10" />
              </div>

              {/* Minimal Slide Content */}
              <div className="relative z-20 max-w-2xl space-y-2 sm:space-y-4">
                <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-amber-300">
                  {slide.tag}
                </span>

                <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>

                <p className="text-[11px] sm:text-sm md:text-base text-slate-200/90 max-w-xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#FF7900] hover:bg-[#E56C00] active:scale-95 transition-all shadow-sm"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>

                  {slide.secondaryCtaText && slide.secondaryCtaLink && (
                    <Link
                      href={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 active:scale-95 transition-all"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Minimal Left Navigation Chevron */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous banner"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Clean Minimal Right Navigation Chevron */}
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next banner"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Clean Bottom Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-6 bg-[#FF7900]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
