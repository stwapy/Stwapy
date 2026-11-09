'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-800 mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Campus Delivery & Shipping Policy</h1>
            <p className="text-xs text-slate-500 mt-0.5">Operated by Stwapy Technologies Pvt LTD</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">1. Delivery Zones</h3>
            <p>
              Stwapy operates dedicated peer-to-peer campus deliveries across all 30 districts of Odisha, with expedited intra-campus handoffs at KIIT, OUTR, IIT Bhubaneswar, SOA, VSSUT, and NIT Rourkela.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">2. Delivery Timeframes</h3>
            <p>
              Same-campus handoffs occur within 4–12 hours. Inter-city shipments across Odisha districts are fulfilled within 24–48 hours via trusted campus couriers.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">3. Delivery OTP Verification</h3>
            <p>
              Every delivery requires a 4-digit confirmation OTP generated on the buyer's account screen. Buyers must only share this OTP with the delivery agent after physical inspection of the item.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
