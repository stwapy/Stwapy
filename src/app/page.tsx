'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, Listing, Category, District, Institution } from '@/lib/api';
import ProductCard from '@/components/marketplace/ProductCard';
import CategoryBar from '@/components/marketplace/CategoryBar';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import {
  Sparkles,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  GraduationCap,
  PackageOpen,
  ArrowRight,
  TrendingUp,
  Tag,
  PlusCircle,
  Loader2,
  X,
} from 'lucide-react';
import Link from 'next/link';

import HeroSlider from '@/components/marketplace/HeroSlider';

function HomeContent() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialInstitution = searchParams.get('institution') || '';

  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>(initialInstitution);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Load initial static data
  useEffect(() => {
    async function loadMeta() {
      try {
        const [catData, distData, instData] = await Promise.all([
          api.getCategories().catch(() => []),
          api.getDistricts().catch(() => []),
          api.getInstitutions().catch(() => []),
        ]);
        setCategories(catData);
        setDistricts(distData);
        setInstitutions(instData);
      } catch (err) {
        console.error('Failed to load metadata', err);
      }
    }
    loadMeta();
  }, []);

  // Fetch listings whenever filters or search query change
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const data = await api.getListings({
          search: searchKeyword || undefined,
          categoryId: selectedCategory || undefined,
          district: selectedDistrict || undefined,
          institutionId: selectedInstitution || undefined,
          condition: selectedCondition || undefined,
          minPrice: minPrice ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
          sortBy: sortBy as any,
        });
        setListings(data);
      } catch (err) {
        console.error('Failed to load listings', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [
    searchKeyword,
    selectedCategory,
    selectedDistrict,
    selectedInstitution,
    selectedCondition,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Progressive chunk loading (Infinite scroll)
  const BATCH_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const productsContainerRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll delegation: when inner listings container hits top or bottom boundary,
  // forward scroll to the window so user is never trapped and the page scrolls naturally.
  useEffect(() => {
    const el = productsContainerRef.current;
    if (!el) return;

    const normalizeDelta = (e: WheelEvent) => {
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta = e.deltaY * 35; // Convert line mode to px
      } else if (e.deltaMode === 2) {
        delta = e.deltaY * window.innerHeight; // Convert page mode to px
      }
      return delta;
    };

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) {
        window.scrollBy({ top: normalizeDelta(e), behavior: 'auto' });
        return;
      }

      const isAtBottom = el.scrollTop >= maxScroll - 2;
      const isAtTop = el.scrollTop <= 2;
      const delta = normalizeDelta(e);

      // If scrolling down and already reached the bottom of listings
      if (delta > 0 && isAtBottom) {
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
      // If scrolling up and already reached the top of listings
      else if (delta < 0 && isAtTop) {
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      const isAtBottom = el.scrollTop >= maxScroll - 2;
      const isAtTop = el.scrollTop <= 2;

      if (deltaY > 0 && isAtBottom) {
        window.scrollBy({ top: deltaY, behavior: 'auto' });
      } else if (deltaY < 0 && isAtTop) {
        window.scrollBy({ top: deltaY, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Reset progressive count whenever filters or search query change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [
    searchKeyword,
    selectedCategory,
    selectedDistrict,
    selectedInstitution,
    selectedCondition,
    minPrice,
    maxPrice,
    sortBy,
    listings,
  ]);

  const hasMore = visibleCount < listings.length;

  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, listings.length));
      setLoadingMore(false);
    }, 450);
  }, [loadingMore, hasMore, listings.length]);

  // IntersectionObserver to auto-load next batch as user scrolls down inside the products container
  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel) return;

    const scrollContainer = document.getElementById('products-scroll-container');
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreItems();
        }
      },
      {
        root: isDesktop ? scrollContainer : null,
        rootMargin: '150px',
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, loadMoreItems]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedDistrict('');
    setSelectedInstitution('');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Modern E-Commerce Hero Slider (Moves Right-to-Left) */}
      <HeroSlider />

      {/* Main Marketplace Area - 100% Fluid Responsive Width */}
      <div id="marketplace" className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-6 space-y-3 sm:space-y-6">
        {/* Category Carousel / Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
              Browse by Category
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="text-xs font-bold text-[#5423A5] hover:text-[#35105F] cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>
          <CategoryBar
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelectCategory={(id) => setSelectedCategory(id)}
          />
        </div>

        {/* Mobile Filter Sticky Bar */}
        <div className="md:hidden sticky top-[92px] z-30 bg-[#F5F5F7]/95 backdrop-blur-md py-2 flex items-center justify-between -mx-2 px-2 sm:-mx-4 sm:px-4 border-b border-[#E5E7EB]/60">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#222222] shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#5423A5]" />
            <span>Filters & Campus ({listings.length} items)</span>
          </button>
          {(selectedDistrict || selectedInstitution || selectedCondition || minPrice || maxPrice || sortBy !== 'newest') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-[#5423A5] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer (Fixed Slide-over Backdrop) */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 md:hidden">
            <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#5423A5]" />
                  <h3 className="font-bold text-sm text-[#222222]">Filters & Campus</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-[#F5F5F7] text-[#858585] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Done</span>
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <FilterSidebar
                  districts={districts}
                  institutions={institutions}
                  selectedDistrict={selectedDistrict}
                  selectedInstitution={selectedInstitution}
                  selectedCondition={selectedCondition}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sortBy={sortBy}
                  onChangeDistrict={setSelectedDistrict}
                  onChangeInstitution={setSelectedInstitution}
                  onChangeCondition={setSelectedCondition}
                  onChangeMinPrice={setMinPrice}
                  onChangeMaxPrice={setMaxPrice}
                  onChangeSortBy={setSortBy}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          </div>
        )}

        {/* Layout: Sidebar Filters (Sticky/Fixed on Left) + 100% Responsive Products Grid with SEPARATE SCROLLING */}
        <div className="flex flex-col md:flex-row gap-5 xl:gap-7 items-start w-full">
          {/* Desktop & Tablet Filter Sidebar - Fixed on left */}
          <aside className="hidden md:block w-72 xl:w-80 shrink-0 sticky top-24 z-20 self-start">
            <FilterSidebar
              districts={districts}
              institutions={institutions}
              selectedDistrict={selectedDistrict}
              selectedInstitution={selectedInstitution}
              selectedCondition={selectedCondition}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              onChangeDistrict={setSelectedDistrict}
              onChangeInstitution={setSelectedInstitution}
              onChangeCondition={setSelectedCondition}
              onChangeMinPrice={setMinPrice}
              onChangeMaxPrice={setMaxPrice}
              onChangeSortBy={setSortBy}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Listings Grid with SEPARATE INDEPENDENT SCROLLING (Desktop & Tablet) */}
          <div
            id="products-scroll-container"
            ref={productsContainerRef}
            className="flex-1 min-w-0 w-full space-y-5 md:max-h-[calc(100vh-130px)] md:overflow-y-auto md:pr-3 overscroll-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C9ABFA #F5F5F7',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pb-2 border-b border-[#E5E7EB] sticky top-0 bg-[#F5F5F7]/95 backdrop-blur-md z-10 pt-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#222222]">
                  {searchKeyword ? `Search results for "${searchKeyword}"` : 'Active Campus Listings'}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#6B7280]">
                  Verified student items from colleges across your campus network
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-[#5423A5] bg-[#F1EAFE] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#5423A5]/20">
                  Showing {Math.min(visibleCount, listings.length)} of {listings.length} listings
                </span>
              </div>
            </div>

            {loading ? (
              // Skeleton Loaders - 2 columns side by side on phone, fluid scaling on wider screens
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-2.5 sm:p-4 space-y-2.5 animate-pulse">
                    <div className="aspect-[4/3] bg-slate-200 rounded-lg sm:rounded-xl" />
                    <div className="h-3 sm:h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-2.5 sm:h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl border border-dashed border-[#E5E7EB] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F1EAFE] text-[#5423A5] flex items-center justify-center mx-auto">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#222222]">
                    No student listings found matching your criteria
                  </h3>
                  <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                    Try clearing some filters or searching for common campus items like &quot;drafter&quot;, &quot;calculator&quot;, &quot;book&quot;, or &quot;cycle&quot;.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#5423A5] text-white hover:bg-[#35105F] transition-colors cursor-pointer shadow-md shadow-[#5423A5]/25"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Real Product Cards - 2 columns side by side (parallel) on phone view, fluid on wider viewports */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5 w-full">
                  {listings.slice(0, visibleCount).map((item) => (
                    <ProductCard key={item.id} listing={item} />
                  ))}
                </div>

                {/* Progressive Infinite Scroll Trigger Sentinel */}
                {hasMore && (
                  <div
                    ref={loadMoreSentinelRef}
                    className="py-8 flex flex-col items-center justify-center space-y-3"
                  >
                    {loadingMore ? (
                      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] shadow-xs text-xs font-bold text-[#5423A5]">
                        <Loader2 className="w-4 h-4 animate-spin text-[#FF7900]" />
                        <span>Loading more campus listings...</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={loadMoreItems}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F1EAFE] border border-[#5423A5]/30 text-xs font-bold text-[#5423A5] shadow-xs hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Scroll down or tap to load more ({listings.length - visibleCount} remaining)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* End of results message */}
                {!hasMore && listings.length > 0 && (
                  <div className="pt-6 pb-2 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-xs font-medium text-[#6B7280] shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>All {listings.length} verified campus listings loaded</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Marketplace...</div>}>
      <HomeContent />
    </Suspense>
  );
}
