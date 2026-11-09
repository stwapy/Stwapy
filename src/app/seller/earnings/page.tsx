'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import {
  IndianRupee,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function SellerEarningsPage() {
  const [payouts] = useState([
    {
      id: 'PAY-OD-4412',
      amount: 3250,
      bankAccount: 'HDFC Bank (A/C: **** 4091)',
      utrNumber: 'HDFCR52026102199',
      date: '2026-10-21',
      status: 'SETTLED',
    },
    {
      id: 'PAY-OD-4390',
      amount: 1800,
      bankAccount: 'HDFC Bank (A/C: **** 4091)',
      utrNumber: 'HDFCR52026101412',
      date: '2026-10-14',
      status: 'SETTLED',
    },
  ]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Earnings & Bank Settlements</h1>
        <p className="text-xs text-slate-500 mt-0.5">Track your campus sales earnings, commissions, and weekly bank transfers</p>
      </div>

      {/* Balances Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">Available for Payout</span>
            <div className="text-3xl font-black mt-2 text-white">₹4,200.00</div>
            <p className="text-[11px] text-purple-200/80 mt-1">Automatic transfer every Friday to registered bank/UPI</p>
          </div>
          <button className="mt-6 bg-white text-purple-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-purple-50 transition-colors shadow-xs">
            Request Instant Payout
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Escrow (Transit Orders)</span>
            <div className="text-3xl font-black mt-2 text-slate-900">₹1,370.00</div>
            <p className="text-[11px] text-slate-500 mt-1">Released as soon as buyers share delivery OTP</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-4">
            <ShieldCheck className="w-4 h-4" /> 100% Guaranteed Escrow
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Linked Payout Account</span>
            <div className="text-sm font-bold text-slate-900 mt-2">HDFC Bank Ltd</div>
            <p className="text-xs font-mono text-slate-500 mt-0.5">A/C: *******4091 • IFSC: HDFC0001234</p>
            <p className="text-[11px] text-purple-700 font-semibold mt-1">UPI: indrajit.jena@okhdfcbank</p>
          </div>
          <button className="text-xs font-bold text-purple-700 hover:underline text-left mt-4">
            Edit Bank Details →
          </button>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Settlement History</h2>
          <span className="text-xs text-slate-400 font-medium">Updated live</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Settlement ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Account Credited</th>
                <th className="p-4">UTR Reference</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-bold text-purple-900">{p.id}</td>
                  <td className="p-4 text-slate-600">{p.date}</td>
                  <td className="p-4 font-bold text-slate-900">₹{p.amount}</td>
                  <td className="p-4 text-slate-700">{p.bankAccount}</td>
                  <td className="p-4 font-mono text-slate-500">{p.utrNumber}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
