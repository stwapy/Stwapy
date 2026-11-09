'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, Listing, Category } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/marketplace/ProductCard';
import {
  ChevronRight,
  ShoppingBag,
  SlidersHorizontal,
  Building2,
  CheckCircle2,
  Tag,
  ArrowRight,
  Search,
} from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  const [category, setCategory] = useState<Category | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState('newest');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const catList = await api.getCategories();
        const categories = Array.isArray(catList) ? catList : (catList as any)?.data || [];
        if (categories.length > 0) {
          const matched = categories.find(
            (c: Category) => c.slug?.toLowerCase() === slug.toLowerCase() || c.id?.toLowerCase() === slug.toLowerCase()
          );
          setCategory(matched || null);

          const listItems = await api.getListings({
            categoryId: matched?.id || slug,
          });
          setListings(Array.isArray(listItems) ? listItems : (listItems as any)?.data || []);
        }
      } catch (err) {
        console.error('Failed to load category data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const categoryTitle = category?.name || slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50/70 py-3 sm:py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/search" className="hover:text-purple-700">Categories</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold capitalize">{categoryTitle}</span>
        </nav>

        {/* Hero Category Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white mb-6 sm:mb-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200 mb-2 sm:mb-3">
              <Tag className="w-3.5 h-3.5" />
              Verified Student Category
            </span>
            <h1 className="text-xl sm:text-3xl font-black capitalize mb-2">{categoryTitle}</h1>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              {category?.description ||
                `Browse genuine pre-owned ${categoryTitle} passed down between college students across Odisha universities.`}
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-white to-transparent pointer-events-none" />
        </div>

        {/* Action Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{listings.length}</strong> active student listings
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Listings Grid - 2 columns on phone view, fluid on wider screens */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-slate-200 animate-pulse h-64 sm:h-72" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-8 sm:p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-800">No products found in this category</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Be the first student to list your unused textbook or item in this category and get instant campus inquiries!
            </p>
            <Link
              href="/post"
              className="inline-flex items-center gap-2 bg-purple-800 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-900 transition-colors shadow-sm"
            >
              Post a Free Listing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5">
            {listings.map((item) => (
              <ProductCard key={item.id} listing={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
