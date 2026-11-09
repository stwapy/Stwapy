'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  GraduationCap,
  Search,
  PlusCircle,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Building2,
  ChevronDown,
  MessageSquare,
  Heart,
  Grid,
  ShieldAlert,
  ShoppingBag,
  PackageCheck,
  AlertTriangle,
  Clock,
  XCircle,
  X,
  ArrowRight,
  Sparkles,
  Home,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sellRestrictionModal, setSellRestrictionModal] = useState<null | 'NORMAL_USER' | 'PENDING' | 'REJECTED'>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-[#E5E7EB] shadow-xs w-full">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group select-none">
              <img
                src="/logo/LOGO.png"
                alt="Stwapy Logo"
                className="h-8 w-8 sm:h-11 sm:w-11 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
              />
              <img
                src="/logo/NAMELOGO.png"
                alt="Stwapy"
                className="h-5 sm:h-7 w-auto object-contain shrink-0"
              />
            </Link>
          </div>

          {/* Search Bar - Spec: Light gray background #F5F5F7, purple search icon #5423A5 (Desktop lg+ only to prevent minimization overlap) */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl xl:max-w-2xl mx-4 hidden lg:flex items-center relative min-w-0"
          >
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#5423A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search college books, engineering drafters, cycles, electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#F5F5F7] border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] transition-all placeholder:text-[#858585] text-[#222222]"
              />
            </div>
          </form>

          {/* Action CTAs & Auth Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Home / Buy Products Button - appears gracefully on wider phones and desktops */}
            <Link
              href="/"
              className="hidden min-[420px]:inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold text-[#222222] hover:text-[#5423A5] bg-[#F5F5F7] hover:bg-[#F1EAFE] border border-[#E5E7EB] transition-all cursor-pointer shrink-0"
              title="Explore marketplace to buy student products"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5423A5]" />
              <span className="hidden xl:inline">Buy Products</span>
              <span className="inline xl:hidden">Buy</span>
            </Link>

            {/* Sell Product CTA - Stwapy Purple #5423A5 with Smart Role Enforcement */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  router.push('/auth/login?redirect=/post');
                  return;
                }
                if (!user.profileComplete) {
                  window.dispatchEvent(new CustomEvent('open-onboarding-modal'));
                  return;
                }
                if (user.role === 'SUPER_ADMIN' || user.role === 'STATE_ADMIN') {
                  router.push('/post');
                  return;
                }
                if (user.accountType === 'NORMAL_USER') {
                  setSellRestrictionModal('NORMAL_USER');
                  return;
                }
                if (user.accountType === 'STUDENT' && user.verificationStatus === 'PENDING') {
                  setSellRestrictionModal('PENDING');
                  return;
                }
                if (user.accountType === 'STUDENT' && user.verificationStatus === 'REJECTED') {
                  setSellRestrictionModal('REJECTED');
                  return;
                }
                router.push('/post');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-md shadow-[#5423A5]/25 hover:shadow-lg hover:shadow-[#5423A5]/35 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Sell Product</span>
              <span className="sm:hidden">Sell</span>
            </button>

            {/* Shopping Bag Button with Orange Badge #FF7900 */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F5F7] transition-colors cursor-pointer text-[#222222] shrink-0"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#222222]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF7900] text-white font-black text-[10px] flex items-center justify-center animate-in zoom-in duration-200 shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F1EAFE] text-[#5423A5] font-bold text-xs flex items-center justify-center border border-[#5423A5]/20">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-bold text-[#222222] line-clamp-1 max-w-[120px]">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      {user.role === 'SUPER_ADMIN'
                        ? 'Super Admin'
                        : user.role === 'STATE_ADMIN'
                        ? 'Staff Moderator'
                        : user.accountType === 'INSTITUTE_STUDENT'
                        ? '🎓 Institute Student'
                        : user.accountType === 'STUDENT' && user.verificationStatus === 'VERIFIED'
                        ? '🎓 Verified Student'
                        : user.accountType === 'STUDENT' && user.verificationStatus === 'PENDING'
                        ? '⏳ Student (KYC Pending)'
                        : user.accountType === 'STUDENT' && user.verificationStatus === 'REJECTED'
                        ? '❌ Student (ID Rejected)'
                        : '👤 General User (Buyer)'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#E5E7EB]">
                      <p className="text-xs font-bold text-[#222222] truncate">
                        {user.fullName}
                      </p>
                      <p className="text-[11px] text-[#6B7280] truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      {/* Home / Buy Products Button */}
                      <Link
                        href="/"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#5423A5] bg-[#F1EAFE]/70 hover:bg-[#F1EAFE] border-b border-[#E5E7EB] transition-colors"
                      >
                        <Home className="w-4 h-4 text-[#5423A5] shrink-0" />
                        <div>
                          <span className="block font-bold">Home / Buy Products</span>
                          <span className="text-[10px] text-[#6B7280] font-normal">Explore listings to buy items</span>
                        </div>
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#222222] hover:bg-[#F1EAFE] hover:text-[#5423A5]"
                      >
                        <Grid className="w-4 h-4 text-[#5423A5]" />
                        <span>My Dashboard & Listings</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#222222] hover:bg-[#F1EAFE] hover:text-[#5423A5]"
                      >
                        <PackageCheck className="w-4 h-4 text-[#FF7900]" />
                        <span>My Campus Orders</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=messages"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#222222] hover:bg-[#F1EAFE] hover:text-[#5423A5]"
                      >
                        <MessageSquare className="w-4 h-4 text-[#858585]" />
                        <span>Messages</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=favorites"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#222222] hover:bg-[#F1EAFE] hover:text-[#5423A5]"
                      >
                        <Heart className="w-4 h-4 text-[#FF7900]" />
                        <span>Saved Wishlist</span>
                      </Link>

                      <Link
                        href="/dashboard?tab=verification"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#222222] hover:bg-[#F1EAFE] hover:text-[#5423A5]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                        <span>Student Verification</span>
                      </Link>

                      {!user.profileComplete && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            window.dispatchEvent(new CustomEvent('open-onboarding-modal'));
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#FF7900] bg-orange-50 hover:bg-orange-100 text-left transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-[#FF7900]" />
                          <span>Complete Profile Setup</span>
                        </button>
                      )}

                      {/* Admin Links */}
                      {(user.role === 'STATE_ADMIN' || user.role === 'SUPER_ADMIN') && (
                        <div className="my-1 border-t border-[#E5E7EB] pt-1">
                          <Link
                            href="/admin/odisha"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#15803D] hover:bg-emerald-50"
                          >
                            <Building2 className="w-4 h-4 text-[#15803D]" />
                            <span>Moderation Portal</span>
                          </Link>
                        </div>
                      )}

                      {user.role === 'SUPER_ADMIN' && (
                        <Link
                          href="/admin/central"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#5423A5] hover:bg-[#F1EAFE]"
                        >
                          <ShieldAlert className="w-4 h-4 text-[#5423A5]" />
                          <span>System Administration</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#E5E7EB] pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          router.push('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#DC2626] hover:bg-red-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#DC2626]" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <Link
                  href="/auth/login"
                  className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#222222] hover:text-[#5423A5] bg-[#F5F5F7] sm:bg-transparent rounded-full sm:rounded-none transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline-flex px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#5423A5] text-white hover:bg-[#35105F] transition-colors shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile & Minimized Window Search Row - Dedicated full-width search input for screens < lg */}
        <div className="pb-2.5 pt-0.5 lg:hidden">
          <form
            onSubmit={handleSearch}
            className="relative w-full"
          >
            <Search className="w-4 h-4 text-[#5423A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search college books, drafters, cycles, electronics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-1.5 text-xs bg-[#F5F5F7] border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5] transition-all placeholder:text-[#858585] text-[#222222]"
            />
          </form>
        </div>
      </div>
    </header>

      {/* SELL RESTRICTION MODAL - Rendered outside <header> so backdrop-filter does NOT trap fixed positioning */}
      {sellRestrictionModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSellRestrictionModal(null);
          }}
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-4 animate-in zoom-in-95 duration-150 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {sellRestrictionModal === 'NORMAL_USER' && (
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                )}
                {sellRestrictionModal === 'PENDING' && (
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5423A5] flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                )}
                {sellRestrictionModal === 'REJECTED' && (
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <XCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {sellRestrictionModal === 'NORMAL_USER' && 'Selling Restricted to Students'}
                    {sellRestrictionModal === 'PENDING' && 'Student ID Verification Pending'}
                    {sellRestrictionModal === 'REJECTED' && 'Verification Not Approved'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Stwapy Verified Campus Marketplace
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSellRestrictionModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2 leading-relaxed">
              {sellRestrictionModal === 'NORMAL_USER' && (
                <>
                  <p>
                    You are registered as a <strong>Normal User (Buyer Only)</strong>. Selling items on Stwapy is strictly reserved for verified college students to prevent fraud and protect students.
                  </p>
                  <div className="space-y-1 pt-1 font-medium text-slate-700">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span>✓</span> <span>You can buy all items and message sellers freely.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span>✕</span> <span>Posting items for sale is disabled for normal accounts.</span>
                    </div>
                  </div>
                </>
              )}

              {sellRestrictionModal === 'PENDING' && (
                <>
                  <p>
                    Your College ID card submission is currently under review by our Admin KYC team.
                  </p>
                  <div className="space-y-1.5 pt-1 font-medium text-slate-700">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>You can buy items across all campus markets right now.</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">⏳</span>
                      <span>Selling will unlock automatically once an Admin approves your ID card.</span>
                    </div>
                  </div>
                </>
              )}

              {sellRestrictionModal === 'REJECTED' && (
                <>
                  <p className="text-red-700 font-medium">
                    Your previous student ID upload was rejected by Admin.
                  </p>
                  <p className="italic text-slate-500">
                    Reason: {user?.rejectionReason || 'Uploaded ID card image was blurry or unreadable.'}
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSellRestrictionModal(null)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-md transition-all cursor-pointer"
              >
                {sellRestrictionModal === 'NORMAL_USER' ? 'Continue as Buyer' : 'Got It, Check Campus Listings'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
