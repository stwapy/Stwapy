'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RotateCcw, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-800 mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">7-Day Campus Return & Refund Policy</h1>
            <p className="text-xs text-slate-500 mt-0.5">Operated by Stwapy Technologies Pvt LTD</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">1. Return Window</h3>
            <p>
              Students are entitled to a full 7-day return and exchange window from the date and time of physical delivery at the campus hostel or meeting spot.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">2. Return Eligibility</h3>
            <p>
              Items such as textbooks, mini drafters, engineering instruments, and electronics are eligible for return if:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-700">
              <li>The edition, author, or condition significantly differs from the seller description.</li>
              <li>A scientific calculator or electronic item fails to power on or has missing keys/displays.</li>
              <li>Missing essential accessories described in the listing.</li>
            </ul>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">3. Refund Processing</h3>
            <p>
              For prepaid UPI and card orders, funds are automatically reversed to the original payment source within 24–48 hours after courier pickup verification. For Cash on Delivery orders, the refund is credited directly to the buyer's verified UPI VPA.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
