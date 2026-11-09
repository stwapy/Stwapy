'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function ReturnsPage() {
  const [returnRequests] = useState([
    {
      id: 'ret-od-101',
      orderNumber: 'ORD-OD-8921',
      productTitle: 'GATE Aerospace Engineering Question Bank 2024-2025',
      type: 'RETURN',
      reason: 'Course syllabus changed by department',
      refundAmount: 499,
      status: 'APPROVED',
      pickupDate: 'Tomorrow between 2:00 PM - 5:00 PM',
      pickupAgent: 'Prakash (Campus Courier)',
      createdAt: '2026-10-22',
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
            7-Day Replacement & Return Policy
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-1">Returns & Exchanges</h1>
        <p className="text-xs text-slate-500 mb-6">Track reverse pickups, item inspections, and replacement dispatches</p>

        {returnRequests.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center">
            <RotateCcw className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h2 className="text-base font-bold text-slate-800">No active return requests</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              All your purchases are eligible for hassle-free 7-day campus returns if the book edition or condition does not match.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {returnRequests.map((ret) => (
              <div key={ret.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                      Return ID: {ret.id}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">Order #{ret.orderNumber}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Pickup Scheduled
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ret.productTitle}</h3>
                  <p className="text-xs text-slate-500 mt-1">Reason: <strong className="text-slate-700">{ret.reason}</strong></p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    Refund Amount: ₹{ret.refundAmount} (Will be credited to original UPI account upon pickup)
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-700 border border-slate-100">
                  <Truck className="w-4 h-4 text-purple-700 flex-shrink-0" />
                  <div>
                    <span>Reverse Pickup Scheduled: <strong>{ret.pickupDate}</strong></span>
                    <p className="text-[11px] text-slate-500">Agent: {ret.pickupAgent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
