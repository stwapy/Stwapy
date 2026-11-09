'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Package,
  MapPin,
  Heart,
  RotateCcw,
  CreditCard,
  HelpCircle,
  Settings,
  ShieldCheck,
  User,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();

  const accountLinks = [
    {
      title: 'My Orders',
      description: 'Track ongoing deliveries, view receipts, and past orders',
      href: '/account/orders',
      icon: Package,
      badge: 'Active',
      color: 'text-purple-700 bg-purple-50',
    },
    {
      title: 'Saved Addresses',
      description: 'Manage campus hostel, college gate, and room delivery points',
      href: '/account/addresses',
      icon: MapPin,
      color: 'text-blue-700 bg-blue-50',
    },
    {
      title: 'Returns & Exchanges',
      description: 'Manage active item return requests and reverse pickups',
      href: '/account/returns',
      icon: RotateCcw,
      color: 'text-amber-700 bg-amber-50',
    },
    {
      title: 'Refunds & Payments',
      description: 'Check refund statuses to your original UPI ID or Bank account',
      href: '/account/refunds',
      icon: CreditCard,
      color: 'text-emerald-700 bg-emerald-50',
    },
    {
      title: 'Saved Wishlist',
      description: 'Books and equipment saved for later purchase',
      href: '/account/wishlist',
      icon: Heart,
      color: 'text-rose-700 bg-rose-50',
    },
    {
      title: 'Help Center & Disputes',
      description: 'Customer support, safe campus guidelines, and FAQs',
      href: '/help',
      icon: HelpCircle,
      color: 'text-indigo-700 bg-indigo-50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* User Identity Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-900 text-white font-black text-xl flex items-center justify-center shadow-md">
              {user?.fullName?.charAt(0) || 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user?.fullName || 'Student Account'}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Odisha Student
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{user?.email || 'student@kiit.ac.in'} • {user?.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/post"
              className="flex-1 sm:flex-initial text-center bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Sell An Item
            </Link>
            <button
              onClick={logout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <h2 className="text-base font-bold text-slate-900 mb-4">Account Features & Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accountLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-800 transition-colors">
                        {link.title}
                      </h3>
                      {link.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{link.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-800 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
