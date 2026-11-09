'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Truck,
  Heart,
} from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const deliveryFee = subtotal > 499 || items.length === 0 ? 0 : 40;
  const savings = Math.round(subtotal * 0.25) + couponDiscount;
  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'CAMPUS100') {
      setCouponDiscount(100);
      setCouponApplied(true);
    } else if (code === 'STWAPYFIRST') {
      setCouponDiscount(50);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try CAMPUS100 or STWAPYFIRST');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 bg-slate-50">
        <div className="w-24 h-24 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center mb-6 shadow-sm border border-purple-100">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-slate-500 max-w-md text-center mb-8">
          Explore engineering textbooks, mini drafters, scientific calculators, laptops, and student hostel gear from verified peers across campus.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition-all text-sm"
        >
          Explore Campus Marketplace
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Shopping Cart ({itemCount} items)</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900">Cart Items ({itemCount})</h1>
                <p className="text-xs text-slate-500 mt-0.5">Verified peer-to-peer campus sellers in Odisha</p>
              </div>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Cart
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item) => {
                const originalPrice = Math.round(item.price * 1.35);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row gap-5"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/listing/${item.listingId}`}
                      className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-purple-900/80 text-white backdrop-blur-xs">
                        {item.condition}
                      </span>
                    </Link>

                    {/* Details & Controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <Link
                            href={`/listing/${item.listingId}`}
                            className="font-semibold text-slate-900 hover:text-purple-800 text-base line-clamp-2 leading-snug"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.listingId)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
                          <span>Seller: <strong className="text-slate-700">{item.sellerName}</strong></span>
                          <span>•</span>
                          <span>Campus: <strong className="text-purple-700">{item.institutionName || 'Odisha Campus'}</strong></span>
                        </div>

                        {item.meetingArea && (
                          <p className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Safe Meeting Spot: {item.meetingArea}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-slate-900">₹{item.price * item.quantity}</span>
                          <span className="text-xs text-slate-400 line-through">₹{originalPrice * item.quantity}</span>
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Save ₹{(originalPrice - item.price) * item.quantity}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.listingId, item.quantity - 1)}
                              className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.listingId, item.quantity + 1)}
                              className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Guarantee Banner */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 flex items-center gap-3 text-purple-900 text-xs">
              <ShieldCheck className="w-5 h-5 text-purple-700 flex-shrink-0" />
              <div>
                <strong className="font-semibold">Stwapy Campus Safe Delivery:</strong> Inspect your textbook or equipment in person at the campus canteen/gate before sharing the delivery confirmation OTP.
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary & Checkout */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Application Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Tag className="w-4 h-4 text-purple-700" />
                Apply Student Coupons
              </div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. CAMPUS100"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 uppercase text-xs font-bold border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-600 bg-slate-50/50"
                />
                <button
                  type="submit"
                  className="bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponApplied && (
                <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Coupon applied! You saved ₹{couponDiscount}.
                </p>
              )}
              {couponError && (
                <p className="text-xs text-rose-600 font-medium mt-2">{couponError}</p>
              )}
            </div>

            {/* Order Summary Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Price Summary</h2>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Campus Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : 'font-semibold text-slate-800'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {deliveryFee === 0 && (
                  <p className="text-[11px] text-emerald-600 bg-emerald-50/80 p-2 rounded-lg font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    Free delivery applied on student orders over ₹499!
                  </p>
                )}

                <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-lg text-purple-900">₹{finalTotal}</span>
                </div>

                <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg text-center">
                  You will save ₹{savings} on this order!
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-sm mt-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Safe & Secure Student Payments (UPI & Cash on Delivery)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
