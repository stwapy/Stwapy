'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-800 mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div>
          <h1 className="text-2xl font-black text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-0.5">Operated by Stwapy Technologies Pvt LTD • Effective October 2026</p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">1. Platform Scope</h3>
            <p>
              Stwapy is a campus-oriented marketplace platform connecting students, faculties, and verified collegiate sellers across recognized institutions in Odisha, India.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">2. Student Verification & Conduct</h3>
            <p>
              Users agree to provide authentic college credentials and conduct transactions within campus safe meeting zones or through designated campus delivery partners. Fraudulent listings, counterfeit books, or abusive behavior will result in permanent ban and college notification.
            </p>
          </section>

          <section className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">3. Payments & Escrow</h3>
            <p>
              Payments processed via online UPI or cards are held in regulated escrow and released to the student seller only upon successful entry of the recipient delivery OTP.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
