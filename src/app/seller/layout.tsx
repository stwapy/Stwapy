'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  RotateCcw,
  IndianRupee,
  Settings,
  Store,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { title: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
    { title: 'My Products', href: '/seller/products', icon: Package },
    { title: 'Orders & Dispatch', href: '/seller/orders', icon: ShoppingBag, badge: '3' },
    { title: 'Returns & Disputes', href: '/seller/returns', icon: RotateCcw },
    { title: 'Earnings & Payouts', href: '/seller/earnings', icon: IndianRupee },
    { title: 'Store Settings', href: '/seller/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col md:flex-row">
      {/* Seller Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between p-5 border-r border-slate-800">
        <div>
          {/* Seller Brand */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center font-black text-lg shadow-sm">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide block">Campus Seller Hub</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Student Merchant
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <div className="pt-6 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to Shopping Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
