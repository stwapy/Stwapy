'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'list-od-001',
      title: 'Casio fx-991EX Classwiz Scientific Calculator (Dual Power)',
      price: 850,
      image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
      condition: 'LIKE_NEW',
      institutionName: 'KIIT University',
      sellerName: 'Aman Mohanty',
      meetingArea: 'Central Library Gate',
    },
    {
      id: 'list-od-002',
      title: 'Engineering Drawing Mini Drafter with Steel Arm & Canvas Cover',
      price: 350,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      condition: 'GOOD',
      institutionName: 'OUTR Bhubaneswar',
      sellerName: 'Priyanka Sahoo',
      meetingArea: 'Mechanical Workshop Gate',
    },
  ]);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <span className="text-xs font-semibold text-slate-500">{wishlistItems.length} items saved</span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-1">My Saved Wishlist</h1>
        <p className="text-xs text-slate-500 mb-6">Save products to buy later or monitor for price drops</p>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-800">Your wishlist is empty</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Tap the heart icon on any campus textbook or gear to save it here for later.
            </p>
            <Link
              href="/"
              className="bg-purple-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-purple-900 shadow-xs"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                    <p className="text-[11px] text-purple-700 font-semibold mt-1">{item.institutionName}</p>
                    <p className="text-base font-black text-slate-900 mt-2">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      // Add to cart
                      addToCart({
                        id: item.id,
                        sellerId: 'user-001',
                        sellerName: item.sellerName,
                        sellerEmail: 'seller@campus.edu',
                        sellerVerificationStatus: 'VERIFIED',
                        title: item.title,
                        description: '',
                        price: item.price,
                        isNegotiable: false,
                        condition: item.condition as any,
                        categoryId: 'cat-books',
                        categoryName: 'Books',
                        stateCode: 'OD',
                        district: 'Khordha',
                        city: 'Bhubaneswar',
                        institutionName: item.institutionName,
                        meetingArea: item.meetingArea,
                        status: 'ACTIVE',
                        images: [{ id: '1', url: item.image, isPrimary: true, order: 0 }],
                        viewCount: 10,
                        createdAt: new Date().toISOString(),
                      } as any);
                      removeItem(item.id);
                    }}
                    className="flex-1 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
