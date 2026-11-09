import React from 'react';
import Link from 'next/link';
import { GraduationCap, Award, Users, Sparkles, ChevronLeft, ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export const metadata = {
  title: 'Careers & Campus Leads — Stwapy',
  description: 'Join Stwapy Technologies Pvt Ltd as a Campus Lead or Core Team member. Lead student commerce in your university.',
};

export default function CareersPage() {
  const perks = [
    'Official Certificate of Leadership & Letter of Recommendation (LOR)',
    'Monthly Performance Stipend & Milestone Bonuses',
    'Exclusive Stwapy Campus Ambassador Swag Kit (Hoodie, Stickers, Bag)',
    'Direct mentorship from startup founders & tech leadership',
    'Pre-placement interview (PPI) opportunities for full-time roles',
  ];

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
              <span>Campus Leadership Program 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Lead the Stwapy Revolution on Your Campus
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              We are hiring energetic Campus Ambassadors, College Leads, and Tech Interns across universities in Odisha and pan-India.
            </p>
          </div>
        </div>

        {/* Perks Grid */}
        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#222222]">Why Become a Stwapy Campus Lead?</h2>
            <p className="text-xs text-slate-500">
              Build leadership experience, grow your network, and earn rewards while helping your college peers save money.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application CTA */}
        <div className="bg-gradient-to-r from-[#5423A5] to-[#35105F] text-white p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Ready to apply as a Campus Lead?</h3>
            <p className="text-xs text-purple-200">
              Send your resume and college details to our talent acquisition team.
            </p>
          </div>
          <a
            href="mailto:careers@stwapy.com?subject=Campus%20Lead%20Application%20-%20Stwapy"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF7900] hover:bg-[#e06b00] text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Apply to careers@stwapy.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
