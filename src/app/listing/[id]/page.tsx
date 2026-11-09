'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, Listing, validateNegotiationMessage } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/marketplace/ProductCard';
import {
  Heart,
  ShieldCheck,
  MapPin,
  Building2,
  Calendar,
  Eye,
  MessageCircle,
  Share2,
  Flag,
  ChevronLeft,
  Send,
  AlertTriangle,
  CheckCircle,
  IndianRupee,
  ShoppingBag,
  Zap,
  PackageCheck,
  Truck,
  ShieldAlert,
  Lock,
  AlertCircle,
  Tag,
} from 'lucide-react';
import Link from 'next/link';

export default function ListingDetailPage() {
  const { id } = useParams() as { id: string };
  const { user } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const router = useRouter();

  const [listing, setListing] = useState<(Listing & { sellerOtherListings: Listing[] }) | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!listing) return;
    addToCart(listing);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (!listing) return;
    addToCart(listing);
    router.push('/checkout');
  };

  // Price Negotiation modal state
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [chatMessage, setChatMessage] = useState<string>('');
  const [negotiationError, setNegotiationError] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [chatSuccess, setChatSuccess] = useState<boolean>(false);

  const openNegotiationModal = () => {
    if (!listing) return;
    setChatModalOpen(true);
    setNegotiationError('');
    if (listing.isNegotiable && listing.price > 0) {
      const suggested = Math.max(1, Math.round(listing.price * 0.9));
      setOfferPrice(suggested.toString());
      setChatMessage(`Hi, would you consider accepting an offer of ₹${suggested} for this item?`);
    } else {
      setOfferPrice(listing.price.toString());
      setChatMessage(`Hi, I am interested in this item at the listed price.`);
    }
  };

  const handleChatMessageChange = (val: string) => {
    setChatMessage(val);
    const result = validateNegotiationMessage(val);
    if (!result.isValid) {
      setNegotiationError(result.error || 'Sharing Instagram, email, or contact IDs is strictly prohibited.');
    } else {
      setNegotiationError('');
    }
  };

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('PROHIBITED_ITEM');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  useEffect(() => {
    async function loadListing() {
      try {
        setLoading(true);
        const data = await api.getListingById(id);
        setListing(data);
        setIsFavorited(Boolean(data.isFavoritedByMe));
      } catch (err) {
        console.error('Error fetching listing:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadListing();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert('Please log in to save items to your favorites.');
      return;
    }
    try {
      const res = await api.toggleFavorite(id);
      setIsFavorited(res.isFavorited);
    } catch (err) {
      console.error('Favorite error:', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const trimmedMsg = chatMessage.trim();
    if (!trimmedMsg) {
      setNegotiationError('Please enter your price offer message.');
      return;
    }

    // Strict validation: no Instagram, email, phone numbers, or external IDs
    const validation = validateNegotiationMessage(trimmedMsg);
    if (!validation.isValid) {
      setNegotiationError(validation.error || 'Sharing contact info or social IDs is strictly prohibited.');
      return;
    }

    try {
      setIsSendingMessage(true);
      const fullContent = listing?.isNegotiable && offerPrice
        ? `[Offer Proposed: ₹${offerPrice}] ${trimmedMsg}`
        : trimmedMsg;

      await api.sendMessage({
        listingId: id,
        content: fullContent,
      });
      setChatSuccess(true);
      setTimeout(() => {
        setChatModalOpen(false);
        setChatSuccess(false);
        router.push('/dashboard?tab=messages');
      }, 1200);
    } catch (err: any) {
      alert(err?.message || 'Failed to send offer');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      await api.submitReport({
        targetType: 'LISTING',
        targetId: id,
        reason: reportReason,
        details: reportDetails,
      });
      setReportSubmitted(true);
      setTimeout(() => {
        setReportModalOpen(false);
        setReportSubmitted(false);
      }, 1500);
    } catch (err: any) {
      alert(err?.message || 'Failed to submit report');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-[4/3] bg-slate-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-6 bg-slate-200 rounded w-1/2" />
              <div className="h-32 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Listing Not Found</h2>
        <p className="text-xs text-slate-500">
          This listing may have been sold or removed by the seller.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [{ id: '1', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80', isPrimary: true, order: 0 }];

  const currentImage = images[selectedImageIndex]?.url || images[0].url;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-[#5423A5]">
          Campus Marketplace
        </Link>
        <span>/</span>
        <span className="text-slate-700">{listing.categoryName}</span>
        <span>/</span>
        <span className="text-slate-400 truncate max-w-[200px]">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Photo Viewer */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm">
            <img
              src={currentImage}
              alt={listing.title}
              className="w-full h-full object-contain"
            />
            {listing.status === 'SOLD' && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center">
                <span className="text-2xl font-black text-rose-400 border-2 border-rose-400 px-6 py-2 rounded-2xl rotate-[-6deg]">
                  ITEM SOLD
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#5423A5] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Block */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Product Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Condition</span>
                <span className="font-bold text-slate-800">{listing.condition.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Pricing</span>
                <span className="font-bold text-slate-800">
                  {listing.isNegotiable ? (
                    <span className="text-[#FF7900]">Negotiable (Open to offers)</span>
                  ) : (
                    <span className="text-emerald-700">Fixed Campus Price</span>
                  )}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Listed Date</span>
                <span className="font-bold text-slate-800">
                  {new Date(listing.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Price Card, Seller & Safety Info */}
        <div className="space-y-6">
          {/* Price & Primary Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-5 shadow-xs">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {listing.isNegotiable ? 'Asking Price (Negotiable)' : 'Fixed Price'}
              </span>
              <div className="flex items-baseline gap-2">
                {listing.price === 0 ? (
                  <span className="text-3xl font-black text-[#15803D]">FREE GIVEAWAY</span>
                ) : (
                  <>
                    <span className="text-3xl font-black text-[#222222]">
                      ₹{listing.price.toLocaleString('en-IN')}
                    </span>
                    {listing.isNegotiable ? (
                      <span className="text-xs font-bold text-[#FF7900] bg-[#FFF0E2] px-2.5 py-0.5 rounded-full border border-[#FF7900]/30">
                        Negotiable
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Fixed Price
                      </span>
                    )}
                  </>
                )}
              </div>
              <h1 className="text-lg font-bold text-[#222222] mt-2 leading-snug">
                {listing.title}
              </h1>
            </div>

            {/* Stock & Campus Handover Status */}
            <div className="flex items-center justify-between text-xs py-2 px-3 bg-[#ECFDF5] border border-emerald-200/60 rounded-xl text-[#15803D]">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
                <span>{listing.status === 'SOLD' ? 'Out of Stock (Sold)' : 'In Stock • Campus Pickup Ready'}</span>
              </div>
              <span className="text-[11px] text-[#15803D] bg-emerald-100/60 px-2 py-0.5 rounded-md font-medium">
                Verified Seller
              </span>
            </div>

            {/* Added to Bag Toast Notification */}
            {addedToCartToast && (
              <div className="p-3 bg-[#F1EAFE] border border-[#5423A5]/30 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5423A5]">
                  <CheckCircle className="w-4 h-4 text-[#5423A5] shrink-0" />
                  <span>Added to your campus shopping bag!</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs font-black text-[#5423A5] hover:text-[#35105F] underline cursor-pointer"
                >
                  View Bag
                </button>
              </div>
            )}

            {/* E-Commerce Shopping CTAs - Specified in Stwapy Design System */}
            <div className="space-y-2.5 pt-1">
              {/* 🟠 Buy Now Button: #FF7900 */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={listing.status === 'SOLD'}
                className="w-full py-3.5 rounded-2xl text-sm font-bold bg-[#FF7900] hover:bg-[#D96500] text-white shadow-md shadow-[#FF7900]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 group"
              >
                <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Buy Now (Campus Handover)</span>
              </button>

              {/* Add to Shopping Bag: Deep Purple #24113F */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={listing.status === 'SOLD'}
                className="w-full py-3 rounded-2xl text-xs font-bold bg-[#24113F] hover:bg-[#35105F] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* 🟣 Price Offer / Negotiation: Stwapy Purple #5423A5 */}
                <button
                  type="button"
                  onClick={openNegotiationModal}
                  disabled={listing.status === 'SOLD'}
                  className="py-2.5 rounded-xl text-xs font-bold bg-[#5423A5] hover:bg-[#35105F] text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-xs shadow-[#5423A5]/20"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>{listing.isNegotiable ? 'Make an Offer' : 'Ask Seller'}</span>
                </button>

                {/* 🟪 Add to Wishlist: Light Purple #F1EAFE with Purple #5423A5 text */}
                <button
                  type="button"
                  onClick={handleFavoriteToggle}
                  className="py-2.5 rounded-xl text-xs font-bold bg-[#F1EAFE] hover:bg-[#e4d5fd] text-[#5423A5] border border-[#5423A5]/25 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isFavorited ? 'text-[#FF7900] fill-[#FF7900]' : 'text-[#5423A5]'}`}
                  />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Delivery & Protection Assurance */}
            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#5423A5] shrink-0" />
                <span>Campus Pickup (Free) &amp; Express Doorstep Delivery available at checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                <span>Verified Student Marketplace • Exchange OTP Security on handover</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#858585]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {listing.viewCount} students viewed
              </span>
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-[#858585] hover:text-[#DC2626] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Flag className="w-3 h-3" /> Report Listing
              </button>
            </div>
          </div>

          {/* Seller Profile Card */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-[#858585] uppercase tracking-wider">
              Student Seller Information
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F1EAFE] text-[#5423A5] font-black text-lg flex items-center justify-center border border-[#5423A5]/20">
                {listing.sellerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#222222]">{listing.sellerName}</h4>
                {listing.sellerVerificationStatus === 'VERIFIED' ? (
                  <div className="flex items-center gap-1 text-xs font-bold text-[#15803D]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Student Account</span>
                  </div>
                ) : (
                  <span className="text-xs text-[#858585]">Registered Student</span>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-[#5423A5] shrink-0 mt-0.5" />
                <span>{listing.institutionName || 'College Campus'}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5423A5] shrink-0 mt-0.5" />
                <span>
                  Campus Location: <strong>{listing.city}</strong> ({listing.district})
                </span>
              </div>
            </div>
          </div>

          {/* Safety Recommendation Notice */}
          <div className="bg-amber-50 rounded-3xl border border-amber-200/80 p-5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Campus Safety Notice</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Always inspect products in person at safe campus spots (canteen, library gate). Share the handover verification OTP only after inspecting the product.
            </p>
          </div>
        </div>
      </div>

      {/* Seller's other active listings */}
      {listing.sellerOtherListings && listing.sellerOtherListings.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            More listings from this student in {listing.city}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {listing.sellerOtherListings.map((item) => (
              <ProductCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      )}

      {/* Price Negotiation Modal (Strictly Price Offers Only - No Instagram, Email, or Contact Details) */}
      {chatModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#5423A5]" />
                  <span>{listing.isNegotiable ? `Make a Price Offer to ${listing.sellerName}` : `Contact ${listing.sellerName}`}</span>
                </h3>
                <p className="text-[11px] text-slate-500 truncate max-w-[280px]">
                  Regarding: {listing.title} • {listing.isNegotiable ? `Listed at ₹${listing.price.toLocaleString('en-IN')} (Negotiable)` : `Fixed Price (₹${listing.price.toLocaleString('en-IN')})`}
                </p>
              </div>
              <button
                onClick={() => setChatModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer font-bold p-1"
              >
                ✕
              </button>
            </div>

            {chatSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Price Offer Sent!</h4>
                <p className="text-xs text-slate-500">
                  Redirecting to your Messages dashboard to view seller response...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                {/* Strict Campus Anti-Contact Policy Banner */}
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-[11px] leading-relaxed">
                    <strong className="block font-bold">Strict Rule: Price Negotiation Only</strong>
                    <p className="text-amber-800">
                      Discussions must be strictly about proposing and agreeing on price offers. Sharing Instagram IDs,
                      social handles, phone numbers, WhatsApp, or emails is strictly prohibited to protect student safety.
                    </p>
                  </div>
                </div>

                {/* Offer Price Input (If listing is negotiable) */}
                {listing.isNegotiable && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold text-slate-800">Your Offer Price (INR ₹) *</label>
                      <span className="text-slate-500 text-[11px]">
                        Listed: <strong>₹{listing.price.toLocaleString('en-IN')}</strong>
                      </span>
                    </div>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        min="1"
                        max={listing.price}
                        required
                        value={offerPrice}
                        onChange={(e) => {
                          setOfferPrice(e.target.value);
                          if (e.target.value) {
                            setChatMessage(`Hi, would you consider accepting ₹${e.target.value} for this item?`);
                          }
                          setNegotiationError('');
                        }}
                        placeholder="e.g. 500"
                        className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                      />
                    </div>

                    {/* Quick Offer Chips */}
                    {listing.price > 50 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Quick offers:</span>
                        {[0.95, 0.9, 0.85].map((pct) => {
                          const calculated = Math.round(listing.price * pct);
                          const discountPct = Math.round((1 - pct) * 100);
                          return (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => {
                                setOfferPrice(calculated.toString());
                                setChatMessage(`Hi, would you consider accepting ₹${calculated} for this item?`);
                                setNegotiationError('');
                              }}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                            >
                              -{discountPct}% (₹{calculated})
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Offer Note / Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Offer Message (Price Negotiation Only) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={chatMessage}
                    onChange={(e) => handleChatMessageChange(e.target.value)}
                    placeholder="e.g. Would you consider this price offer? (Strictly no Instagram, phone, or email IDs)"
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                  />
                </div>

                {/* Real-time Content Filter Error Alert */}
                {negotiationError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span className="font-medium">{negotiationError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setChatModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingMessage || Boolean(negotiationError)}
                    className="px-5 py-2 text-xs font-bold bg-[#5423A5] text-white rounded-xl hover:bg-[#35105F] shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingMessage ? 'Sending...' : 'Send Price Offer'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Report Listing Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Report Inappropriate Listing</h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Report Received</h4>
                <p className="text-xs text-slate-500">
                  Our moderation team will review this listing shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for report</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="PROHIBITED_ITEM">Prohibited or Illegal Item</option>
                    <option value="COUNTERFEIT">Counterfeit / Fake Product</option>
                    <option value="SCAM_OR_FRAUD">Suspected Scam or Suspicious Activity</option>
                    <option value="MISLEADING_INFO">Misleading Title or Description</option>
                    <option value="HARASSMENT">Harassment or Offensive Language</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Details (Optional)</label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide additional context for the state moderation team..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold bg-rose-600 text-white rounded-xl hover:bg-rose-700"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
