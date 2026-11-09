'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Building2,
  User,
} from 'lucide-react';

export default function SellerOrdersPage() {
  const [orders] = useState([
    {
      id: 'ORD-OD-9021',
      date: '2026-10-23 (10:15 AM)',
      buyerName: 'Sameer Panda',
      buyerPhone: '+91 94371 00214',
      buyerCampus: 'KIIT University (KP-6 Hostel)',
      productTitle: 'Casio Classwiz fx-991CW Scientific Calculator',
      quantity: 1,
      totalAmount: 950,
      paymentMethod: 'ONLINE_UPI',
      paymentStatus: 'PAID',
      status: 'PACKING_REQUIRED',
    },
    {
      id: 'ORD-OD-9018',
      date: '2026-10-23 (08:45 AM)',
      buyerName: 'Ananya Rath',
      buyerPhone: '+91 98610 88291',
      buyerCampus: 'OUTR Bhubaneswar (Girls Hostel 1)',
      productTitle: 'Engineering Thermodynamics by PK Nag (8th Edition)',
      quantity: 1,
      totalAmount: 420,
      paymentMethod: 'CASH_ON_DELIVERY',
      paymentStatus: 'PENDING',
      status: 'READY_FOR_PICKUP',
    },
    {
      id: 'ORD-OD-8942',
      date: '2026-10-22',
      buyerName: 'Rohan Jena',
      buyerPhone: '+91 97782 11990',
      buyerCampus: 'SOA University (Campus 2 Gate)',
      productTitle: 'Mini Drafter with Canvas Cover',
      quantity: 1,
      totalAmount: 350,
      paymentMethod: 'ONLINE_UPI',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
    },
  ]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Orders & Fulfillment</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage customer shipments, delivery OTPs, and courier dispatch</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-purple-800 uppercase tracking-wider">
                  Order #{ord.id}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Placed on {ord.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ord.status === 'DELIVERED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {ord.status.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-black text-slate-900">₹{ord.totalAmount}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="text-slate-400 font-semibold mb-1">Item Details</h4>
                <p className="font-bold text-slate-900 text-sm">{ord.productTitle}</p>
                <p className="text-slate-500 mt-0.5">Quantity: {ord.quantity} • Payment: {ord.paymentMethod} ({ord.paymentStatus})</p>
              </div>

              <div>
                <h4 className="text-slate-400 font-semibold mb-1">Buyer & Campus Delivery Spot</h4>
                <p className="font-bold text-slate-800">{ord.buyerName} ({ord.buyerPhone})</p>
                <p className="text-purple-700 font-medium mt-0.5">📍 {ord.buyerCampus}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Delivery funds released to your wallet immediately after delivery OTP confirmation.
              </span>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors">
                  <Printer className="w-3.5 h-3.5" />
                  Print Campus Slip
                </button>
                {ord.status === 'PACKING_REQUIRED' && (
                  <button className="bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs">
                    Mark Packed & Ready
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
