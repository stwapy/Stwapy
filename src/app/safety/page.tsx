import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, CheckCircle2, MapPin, Eye, PhoneCall, ChevronLeft } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Student Trust & Safety Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Safe Campus Transactions on Stwapy
        </h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Stwapy Technologies Pvt LTD is committed to providing a secure, verified environment for college students. Review these essential guidelines before transacting.
        </p>
      </div>

      {/* Safety Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">1. Campus Common Areas Only</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Always meet in daylight at well-populated campus landmarks such as your college library entrance, student canteen, or main security gate. Never meet in secluded off-campus locations or private hostel rooms.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">2. Inspect Before Paying</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Test scientific calculators, engineering drafters, and cycles in person. Ensure there are no missing pages in textbooks. Only conclude the deal when you are completely satisfied with the item&apos;s condition.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">3. No Advance UPI Payments</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never send deposit money, booking advances, or courier fees before physically seeing the product. Genuine student sellers will always meet you on campus.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">4. Look for Verified Student Badges</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prefer interacting with sellers carrying the green &quot;Verified Student&quot; badge, indicating their enrollment number and college ID card have been validated by our moderation team.
          </p>
        </div>
      </div>

      {/* Prohibited Items Policy */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>Prohibited Items Policy</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Stwapy Technologies strictly forbids listing or selling any of the following items. Violators will face immediate account suspension and notification to college authorities:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 list-disc list-inside pt-2">
          <li>Stolen campus or personal property</li>
          <li>Exam leakage material or forged university credentials</li>
          <li>Counterfeit electronic components or fake calculators</li>
          <li>Prescription medications and hazardous lab chemicals</li>
          <li>Weapons, sharp blades, or hazardous items</li>
          <li>Any unlawful or non-student goods</li>
        </ul>
      </div>

      {/* Report Fraud & Suspicious Activity Section */}
      <div id="report-fraud" className="bg-rose-50/80 rounded-3xl border border-rose-200 p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-rose-950">Report Fraud or Suspicious User</h2>
            <p className="text-xs text-rose-700">Immediate action is taken on all reported listings within 2 hours.</p>
          </div>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          If you encounter any fake listing, suspicious payment request, harassment, or unauthorized seller, report it immediately to our Student Trust &amp; Safety Officers:
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="mailto:support@stwapy.com?subject=URGENT%3A%20Fraud%20Report%20-%20Stwapy"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
          >
            <span>Email Fraud Desk: support@stwapy.com</span>
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Campus Safety Helpline: +91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>
  );
}
