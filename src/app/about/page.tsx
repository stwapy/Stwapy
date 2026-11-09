import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, Heart, Users, Sparkles, Building2, ChevronLeft, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Stwapy — India\'s Student Marketplace',
  description: 'Learn about Stwapy Technologies Pvt Ltd and our mission to make campus living and peer-to-peer exchanges affordable, safe, and sustainable.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#5423A5] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-[#24113F] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#35105F]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7900]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5423A5] text-xs font-bold text-white border border-purple-400/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>Campus Innovation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Empowering Indian College Students to Buy, Sell &amp; Thrive
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Stwapy Technologies Pvt. Ltd. was founded with a single mission: to eliminate the heavy financial burden of college essentials by enabling safe, verified, student-to-student commerce on campuses across India.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5423A5] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#222222]">100% Student Verified</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every seller undergoes student ID verification, guaranteeing authentic peer-to-peer interactions without external commercial vendors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FF7900] flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#222222]">Zero Fee Campus Model</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students keep 100% of their item sale price on mutual handovers. No hidden cuts, no exorbitant delivery costs for same-campus handoffs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#222222]">Sustainable Circular Economy</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Senior engineering books, drafters, aprons, and bicycles find a second life with incoming juniors, drastically reducing paper and plastic waste.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-[#222222]">The Stwapy Story</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every semester, thousands of college seniors graduate or move on, leaving behind expensive engineering mathematics textbooks, high-precision drafters, lab equipment, coolers, and bicycles. Meanwhile, freshmen arrive spending thousands on brand-new gear they only need for a few months.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Stwapy bridges this gap with an institutional-first marketplace where students can discover items from peers in their own hostel block or academic campus, inspect them in daylight, and complete instant, safe transactions.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5423A5] hover:bg-[#35105F] text-white text-xs font-bold transition-all shadow-md shadow-[#5423A5]/25"
            >
              <span>Join as a Campus Ambassador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
