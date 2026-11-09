'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Listing, api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  Heart,
  ShieldCheck,
  MapPin,
  Building,
  ShoppingBag,
} from 'lucide-react';

interface ProductCardProps {
  listing: Listing;
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
}

export default function ProductCard({ listing, onFavoriteToggle }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState<boolean>(Boolean(listing.isFavoritedByMe));
  const [isTogglingFav, setIsTogglingFav] = useState<boolean>(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please log in to save items to your wishlist.');
      return;
    }

    try {
      setIsTogglingFav(true);
      const res = await api.toggleFavorite(listing.id);
      setIsFavorited(res.isFavorited);
      if (onFavoriteToggle) {
        onFavoriteToggle(listing.id, res.isFavorited);
      }
    } catch (err: any) {
      console.error('Favorite error:', err);
    } finally {
      setIsTogglingFav(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(listing, 1);
  };

  const primaryImage = listing.images && listing.images.length > 0
    ? listing.images[0].url
    : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

  const conditionLabels: Record<string, { label: string; color: string }> = {
    NEW: { label: 'Brand New', color: 'bg-[#ECFDF5] text-[#15803D] border-emerald-200' },
    LIKE_NEW: { label: 'Like New', color: 'bg-[#F1EAFE] text-[#5423A5] border-[#5423A5]/30' },
    GOOD: { label: 'Good Condition', color: 'bg-[#F1EAFE] text-[#5423A5] border-[#5423A5]/20' },
    FAIR: { label: 'Fair / Usable', color: 'bg-[#FFF0E2] text-[#D96500] border-[#FF7900]/30' },
    FOR_PARTS: { label: 'For Parts', color: 'bg-slate-100 text-[#6B7280] border-[#E5E7EB]' },
  };

  const cond = conditionLabels[listing.condition] || conditionLabels['GOOD'];

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-xl hover:shadow-[#5423A5]/10 hover:border-[#5423A5]/40 transition-all duration-300 flex flex-col overflow-hidden h-full">
      {/* Product Image Header */}
      <Link href={`/listing/${listing.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F7] block">
        <img
          src={primaryImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Price Tag Overlay - Dark Charcoal background #222222 with Stwapy Orange Rupee */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 max-w-[85%] bg-[#222222]/90 backdrop-blur-md text-white font-black text-xs sm:text-base px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl shadow-md flex items-center gap-0.5 sm:gap-1">
          {listing.price === 0 ? (
            <span className="text-[#15803D] font-bold uppercase text-[10px] sm:text-xs tracking-wider">
              FREE
            </span>
          ) : (
            <>
              <span className="text-[11px] sm:text-sm font-bold text-[#FF7900]">₹</span>
              <span className="text-white truncate">{listing.price.toLocaleString('en-IN')}</span>
              {listing.isNegotiable && (
                <span className="text-[8.5px] sm:text-[10px] font-bold text-[#FF7900] ml-0.5 bg-[#FFF0E2] px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded shrink-0">
                  Neg.
                </span>
              )}
            </>
          )}
        </div>

        {/* Action Buttons: Add to Bag (Orange hover) & Wishlist (Light Purple background) */}
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 flex items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Add to shopping bag"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#222222] hover:text-[#FF7900] hover:bg-[#FFF0E2] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={handleFavoriteClick}
            disabled={isTogglingFav}
            aria-label="Save to wishlist"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#6B7280] hover:text-[#5423A5] hover:bg-[#F1EAFE] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                isFavorited ? 'text-[#FF7900] fill-[#FF7900]' : 'text-[#6B7280]'
              }`}
            />
          </button>
        </div>

        {/* Verification Status Pill - Success Green #15803D */}
        {listing.sellerVerificationStatus === 'VERIFIED' && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#15803D]/95 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 sm:gap-1">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
            <span className="truncate max-w-[80px] sm:max-w-none">Verified</span>
          </div>
        )}
      </Link>

      {/* Content Details */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-start">
          {/* Condition tag & category - non-wrapping for uniform card height */}
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1 overflow-hidden">
            <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 whitespace-nowrap ${cond.color}`}>
              {cond.label}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#6B7280] truncate min-w-0">
              {listing.categoryName}
            </span>
          </div>

          {/* Title with Dark Charcoal text & Purple hover */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-[#222222] group-hover:text-[#5423A5] transition-colors line-clamp-2 leading-snug">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Institution & Location details - flex pinned to bottom with mt-2 */}
        <div className="mt-2 pt-1.5 sm:pt-2 border-t border-[#E5E7EB] space-y-1 text-[10px] sm:text-xs text-[#6B7280]">
          <div className="flex items-center gap-1 truncate">
            <Building className="w-3 h-3 text-[#5423A5] shrink-0" />
            <span className="font-semibold text-[#222222] truncate text-[9.5px] sm:text-xs">
              {listing.institutionName || 'Campus Hub'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 pt-0.5">
            <div className="flex items-center gap-0.5 sm:gap-1 truncate text-[9px] sm:text-[11px] text-[#6B7280] min-w-0 flex-1">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#858585] shrink-0" />
              <span className="truncate">{listing.city}</span>
            </div>

            {/* Quick Add to Bag - Stwapy Orange CTA button #FF7900 */}
            <button
              onClick={handleAddToCart}
              className="text-[10px] sm:text-[11px] font-bold text-[#FF7900] hover:text-[#D96500] flex items-center gap-0.5 sm:gap-1 cursor-pointer bg-[#FFF0E2] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg hover:bg-[#fedfc2] transition-colors shrink-0 active:scale-95"
            >
              <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
