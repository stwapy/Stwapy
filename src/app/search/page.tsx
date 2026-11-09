'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Listing, Category } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/marketplace/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Star,
  ShieldCheck,
  Building2,
  Tag,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(3000);

  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    async function init() {
      try {
        const catRes = await api.getCategories();
        const catList = Array.isArray(catRes) ? catRes : (catRes as any)?.data || [];
        setCategories(catList);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    init();
  }, []);

  // Fetch listings based on filters
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await api.getListings({
          search: searchQuery || undefined,
          categoryId: selectedCategory || undefined,
          condition: selectedCondition === 'ALL' ? undefined : selectedCondition,
          sortBy: selectedSort === 'price_asc' ? 'price_asc' : selectedSort === 'price_desc' ? 'price_desc' : 'newest',
        });
        const list = Array.isArray(res) ? res : (res as any)?.data || [];
        // Filter client-side by max price
        const filtered = list.filter((item: Listing) => item.price <= maxPrice);
        setListings(filtered);
      } catch (err) {
        console.error('Failed to search listings', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [searchQuery, selectedCategory, selectedCondition, selectedSort, maxPrice]);

  return (
    <div className="min-h-screen bg-slate-50/70 py-3 sm:py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Search Catalog</span>
          {searchQuery && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-purple-800 font-bold">"{searchQuery}"</span>
            </>
          )}
        </nav>

        {/* Top Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search textbooks, calculators, drafters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{listings.length}</strong> items
            </span>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-600"
              >
                <option value="newest">Sort by: Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 sticky top-[84px] z-30 self-start max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-700" />
                Filter Products
              </h3>
              {(selectedCategory || selectedCondition !== 'ALL' || maxPrice < 3000) && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedCondition('ALL');
                    setMaxPrice(3000);
                  }}
                  className="text-[11px] font-semibold text-purple-700 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Max Price: ₹{maxPrice}
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-purple-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹100</span>
                <span>₹5000+</span>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Categories</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    !selectedCategory ? 'bg-purple-100/70 text-purple-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === cat.id ? 'bg-purple-100/70 text-purple-900 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Item Condition</label>
              <div className="space-y-1.5 text-xs">
                {['ALL', 'NEW', 'LIKE_NEW', 'GOOD', 'FAIR'].map((cond) => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond}
                      onChange={() => setSelectedCondition(cond)}
                      className="accent-purple-800"
                    />
                    <span className="capitalize">{cond === 'ALL' ? 'Any Condition' : cond.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Campus Guarantee */}
            <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl text-[11px] text-emerald-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
              All listings are from verified college students across Odisha campuses.
            </div>
          </div>

          {/* Right Product Grid - 2 columns side by side on mobile, fluid on wider screens */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200/80 animate-pulse h-64 sm:h-72" />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No products matched your search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Try adjusting your price range, clearing filters, or searching for other course books or gear.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedCondition('ALL');
                    setMaxPrice(3000);
                  }}
                  className="bg-purple-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-900 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5">
                {listings.map((item) => (
                  <ProductCard key={item.id} listing={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-slate-400">Loading campus search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

