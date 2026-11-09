'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { RotateCcw, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function SellerReturnsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Returns & Dispute Management</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage customer return requests under the 7-day campus policy</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="font-mono text-xs font-bold text-purple-800">Return ID: RET-OD-101</span>
            <p className="text-xs text-slate-400 mt-0.5">Order #ORD-OD-8921 • Buyer: Indrajit Jena</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Reverse Pickup in Progress
          </span>
        </div>

        <div className="text-xs text-slate-700">
          <p><strong>Item:</strong> GATE Aerospace Engineering Question Bank 2024-2025</p>
          <p className="mt-1"><strong>Reason:</strong> Course syllabus changed by department</p>
          <p className="mt-1 text-slate-500">Pickup Location: KP-7 Hostel Gate, KIIT University</p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Refund Amount to be reversed: ₹499</span>
          <button className="bg-purple-800 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-purple-900">
            Approve & Inspect Item
          </button>
        </div>
      </div>
    </div>
  );
}
