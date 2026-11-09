'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, Order } from '@/lib/api';
import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<'ALL' | 'ACTIVE' | 'DELIVERED'>('ALL');

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      try {
        const res = await api.getMyOrders();
        if (Array.isArray(res)) {
          setOrders(res);
        } else if ((res as any)?.data) {
          setOrders((res as any).data);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const st = o.status || o.orderStatus;
    if (filterTab === 'ACTIVE') return st !== 'DELIVERED' && st !== 'COMPLETED' && st !== 'CANCELLED';
    if (filterTab === 'DELIVERED') return st === 'DELIVERED' || st === 'COMPLETED';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-purple-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/account" className="hover:text-purple-700">Account</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">My Orders</span>
        </nav>

        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">My Orders & Purchases</h1>
            <p className="text-xs text-slate-500 mt-1">Track orders, campus delivery milestones, and invoices</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            {(['ALL', 'ACTIVE', 'DELIVERED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterTab === tab ? 'bg-purple-800 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Orders' : tab === 'ACTIVE' ? 'Active Tracking' : 'Completed'}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-40" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-800">No orders found</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              When you purchase items from verified campus peers, their delivery progress and invoices will appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-purple-800 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-900 transition-colors shadow-xs"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isDelivered = order.status === 'DELIVERED';
              const isCancelled = order.status === 'CANCELLED';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all p-6"
                >
                  {/* Top Bar of Order Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                        Order #{order.orderNumber || order.id.slice(0, 10)}
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isCancelled
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-purple-50 text-purple-800 border border-purple-200'
                        }`}
                      >
                        {isDelivered ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : isCancelled ? (
                          <AlertCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {(order.status || order.orderStatus || 'CONFIRMED').replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-black text-slate-900">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => {
                      const title = item.productTitle || item.title;
                      const img = item.productImage || item.imageUrl;
                      const unitP = item.unitPrice || item.price;
                      const totalP = item.totalPrice || (unitP * item.quantity);
                      return (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                              {img && (
                                <img src={img} alt={title} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{title}</h4>
                              <p className="text-[11px] text-slate-500">Qty: {item.quantity} • ₹{unitP} each</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-800">₹{totalP}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Footer Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-purple-700" />
                      <span>
                        Delivery to: <strong className="text-slate-800">{order.deliveryAddress?.city || 'Campus Gate'}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors"
                      >
                        Live Tracking & Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
