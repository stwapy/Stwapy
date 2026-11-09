'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function RefundsPage() {
  const refunds = [
    {
      id: 'ref-od-901',
      orderNumber: 'ORD-OD-7720',
      amount: 850,
      destination: 'UPI (indrajit@okaxis)',
      rrnNumber: '429188102941',
      status: 'PROCESSED',
      date: '2026-10-21',
    },
  ];

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
          <span className="text-xs text-slate-400">Processed via RBI-Regulated Gateway</span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-1">Refunds & Settlements</h1>
        <p className="text-xs text-slate-500 mb-6">Real-time status of amounts returned to your UPI VPA or Bank Account</p>

        <div className="space-y-4">
          {refunds.map((ref) => (
            <div key={ref.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                    Refund ID: {ref.id}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">Order #{ref.orderNumber}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Refund Completed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Amount Refunded</span>
                  <strong className="text-lg font-black text-slate-900">₹{ref.amount}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Credited Destination</span>
                  <strong className="text-slate-800">{ref.destination}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Bank RRN / Reference</span>
                  <strong className="font-mono text-slate-700">{ref.rrnNumber}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
