'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-800 mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div>
          <h1 className="text-2xl font-black text-slate-900">Privacy & Data Protection</h1>
          <p className="text-xs text-slate-500 mt-0.5">Operated by Stwapy Technologies Pvt LTD • Data Localization in India</p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">1. Information We Collect</h3>
            <p>
              We collect your name, college email address, contact number, institution affiliation, and college ID card strictly for authentication and safety verification.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">2. Data Security & Storage</h3>
            <p>
              Student identity records and transactional records are encrypted at rest and in transit. We do not sell or lease student data to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">3. Payment Information</h3>
            <p>
              Stwapy does not store complete bank card numbers or CVV. All electronic transactions are securely handled through PCI-DSS compliant and RBI-regulated payment gateways.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
