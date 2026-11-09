'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  IndianRupee,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function SellerDashboardPage() {
  const stats = [
    { label: 'Total Sales (30 Days)', value: '₹14,850', change: '+18.4%', icon: IndianRupee, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Pending Dispatch', value: '3 Orders', change: 'Action Required', icon: ShoppingBag, color: 'text-amber-700 bg-amber-50' },
    { label: 'Active Catalog', value: '18 Items', change: 'In Stock', icon: Package, color: 'text-purple-700 bg-purple-50' },
    { label: 'Available Payout', value: '₹4,200', change: 'Settlement: Friday', icon: TrendingUp, color: 'text-blue-700 bg-blue-50' },
  ];

  const pendingOrders = [
    {
      id: 'ORD-OD-9021',
      buyer: 'Sameer Panda',
      campus: 'KIIT University (KP-6 Hostel)',
      product: 'Casio Classwiz fx-991CW Calculator',
      price: 950,
      status: 'PACKING_REQUIRED',
      date: '12 mins ago',
    },
    {
      id: 'ORD-OD-9018',
      buyer: 'Ananya Rath',
      campus: 'OUTR Bhubaneswar (Girls Hostel 1)',
      product: 'Engineering Thermodynamics by PK Nag (8th Ed)',
      price: 420,
      status: 'READY_FOR_PICKUP',
      date: '1 hour ago',
    },
    {
      id: 'ORD-OD-9014',
      buyer: 'Biswajit Behera',
      campus: 'IIT Bhubaneswar (Argul Campus)',
      product: 'Mini Drafter with Metal Clamp',
      price: 350,
      status: 'SHIPPED',
      date: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Seller Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage campus inventory, student orders, and earnings</p>
        </div>

        <Link
          href="/seller/products"
          className="inline-flex items-center gap-2 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Product / Book
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* Orders to Fulfill */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Orders Requiring Action</h2>
            <p className="text-xs text-slate-500">Pack items safely for campus delivery</p>
          </div>
          <Link href="/seller/orders" className="text-xs font-bold text-purple-700 hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="space-y-3">
          {pendingOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-800">{ord.id}</span>
                  <span className="text-xs text-slate-400">• {ord.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{ord.product}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Buyer: {ord.buyer} ({ord.campus})</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm font-black text-slate-900">₹{ord.price}</span>
                <button className="bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs">
                  {ord.status === 'PACKING_REQUIRED' ? 'Confirm Packed' : 'Hand Over to Courier'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
