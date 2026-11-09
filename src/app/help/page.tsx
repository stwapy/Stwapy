'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      q: 'How does campus peer delivery work?',
      a: 'When you place an order, the student seller packs the item. A campus delivery agent or courier brings the item directly to your hostel gate or designated campus library spot. You verify the item and share your 4-digit Delivery OTP.',
    },
    {
      q: 'What if the textbook or calculator is damaged or wrong?',
      a: 'You can immediately refuse delivery or initiate a return within 7 days from your Account > My Orders page. Stwapy holds funds in escrow until you approve the item.',
    },
    {
      q: 'How do sellers receive payments?',
      a: 'Funds are credited to your Stwapy Seller Wallet as soon as the buyer provides the Delivery OTP. Payouts are transferred automatically to your linked UPI VPA or Bank Account every Friday, or instantly on request.',
    },
    {
      q: 'How are students verified?',
      a: 'Students upload their college ID cards during onboarding. The Stwapy campus moderation team validates student enrollment numbers against campus registries to assign the green Verified Student badge.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-800">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-md">
          <span className="text-xs font-bold text-purple-200 uppercase tracking-widest block mb-2">
            Stwapy Student Care
          </span>
          <h1 className="text-3xl font-black mb-3">How can we help you today?</h1>
          <p className="text-sm text-purple-200/90 max-w-xl">
            Get instant answers regarding orders, returns, seller payouts, student verification, and safe campus meeting spots.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">support@stwapy.com</p>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Average response: 2 hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Campus Helpline</h3>
              <p className="text-xs text-slate-500 mt-0.5">+91 (0674) 289-STWAPY</p>
              <span className="text-[10px] text-slate-400 block mt-1">Mon–Sat: 9:00 AM – 8:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-slate-900 text-sm hover:text-purple-800 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-800' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-xs text-slate-600 leading-relaxed mt-2.5 pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
