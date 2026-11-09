'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Order } from '@/lib/api';
import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Building2,
  FileText,
  RotateCcw,
  MessageSquare,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await api.getMyOrders();
        const list = Array.isArray(res) ? res : (res as any)?.data || [];
        const found = list.find((o: Order) => o.id === orderId);
        setOrder(found || null);
      } catch (err) {
        console.error('Failed to fetch order details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  const milestones = [
    { title: 'Order Placed', desc: 'Received and verified on Stwapy', done: true },
    { title: 'Seller Confirmed', desc: 'Item packed by student seller', done: true },
    { title: 'In Transit', desc: 'Campus courier dispatched (AWB: STW-OD-892)', done: true },
    { title: 'Out for Delivery', desc: 'Arriving at hostel gate today', done: order?.status === 'OUT_FOR_DELIVERY' || order?.status === 'DELIVERED' },
    { title: 'Delivered', desc: 'Completed with delivery OTP', done: order?.status === 'DELIVERED' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <span className="text-xs font-mono text-slate-400">Order ID: {orderId}</span>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 animate-pulse h-96" />
        ) : !order ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-900">Order Not Found</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Could not find order #{orderId}. Please verify your order number in your order history.
            </p>
            <Link
              href="/account/orders"
              className="bg-purple-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-purple-900"
            >
              Back to My Orders
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Order Status Banner with Delivery OTP */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900">
                    Order #{order.orderNumber || order.id.slice(0, 10)}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                    {(order.status || order.orderStatus || 'CONFIRMED').replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Expected Campus Delivery: <strong>Today by 5:30 PM</strong>
                </p>
              </div>

              {/* Delivery OTP Badge */}
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-purple-200 uppercase tracking-widest block">
                    Campus Delivery OTP
                  </span>
                  <span className="text-2xl font-black tracking-wider text-amber-300">
                    {order.deliveryOtp || '8412'}
                  </span>
                </div>
                <div className="text-[10px] text-purple-200/90 max-w-[140px] leading-tight border-l border-white/20 pl-3">
                  Share this 4-digit code with courier only upon inspecting your book/item.
                </div>
              </div>
            </div>

            {/* Visual Milestones Stepper */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-6">Delivery Milestones</h2>
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex sm:flex-col items-start gap-3">
                      <div className="flex items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            m.done ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {m.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${m.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Items & Delivery Location */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Items Card */}
              <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Purchased Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    const title = item.productTitle || item.title;
                    const img = item.productImage || item.imageUrl;
                    const unitP = item.unitPrice || item.price;
                    const totalP = item.totalPrice || (unitP * item.quantity);
                    return (
                      <div key={idx} className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            {img && (
                              <img src={img} alt={title} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">Quantity: {item.quantity}</p>
                            <span className="inline-block mt-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                              ₹{unitP} per unit
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-black text-slate-900">₹{totalP}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery & Payment Information */}
              <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-700" />
                    Delivery Spot
                  </h3>
                  <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800">{order.deliveryAddress?.recipientName}</p>
                    <p>{order.deliveryAddress?.streetAddress}</p>
                    <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.stateCode} - {order.deliveryAddress?.pincode}</p>
                    <p className="text-purple-700 font-medium mt-1">Hostel/Room: {order.deliveryAddress?.hostelOrRoom || 'Campus Gate'}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Payment Details</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Method</span>
                      <span className="font-bold text-slate-800">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Payment Status</span>
                      <span className="font-bold text-emerald-600">{order.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-100">
                      <span>Total Paid</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* After-Sales Actions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by Stwapy 7-Day Campus Return & Replacement Policy</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/account/returns"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Request Return / Exchange
                </Link>
                <Link
                  href="/help"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
