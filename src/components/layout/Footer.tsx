import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#24113F] text-slate-300 border-t border-[#35105F] mt-10 relative overflow-hidden text-xs">
      {/* Subtle brand glow in background */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#FF7900]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-7 sm:py-8 relative z-10 space-y-6">
        {/* Brand Header: Official Logo + Tagline + Support Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#35105F]">
          <Link href="/" className="inline-flex items-center gap-3 group">
            {/* Real Stwapy Logo */}
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/logo/LOGO.png"
                alt="Stwapy Logo"
                className="h-7 w-7 object-contain shrink-0"
              />
              <img
                src="/logo/NAMELOGO.png"
                alt="Stwapy"
                className="h-5 w-auto object-contain shrink-0"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/20 text-[#FF7900] border border-[#FF7900]/30 uppercase tracking-wider">
                  Campus Marketplace
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5">
                India&apos;s verified peer-to-peer student marketplace for colleges &amp; universities
              </span>
            </div>
          </Link>

          <a
            href="mailto:support@stwapy.com"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#35105F] hover:bg-[#5423A5] border border-[#5423A5]/40 text-xs font-bold text-white transition-all w-fit cursor-pointer shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF7900]" />
            <span>support@stwapy.com</span>
          </a>
        </div>

        {/* Compact 4-Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pb-5 border-b border-[#35105F]">
          {/* Column 1: Top Campuses */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF7900]">
              Top Campuses
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/?institution=inst-kiit-univ"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  KIIT University
                </Link>
              </li>
              <li>
                <Link
                  href="/?institution=inst-outr-bbsr"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  OUTR (CET)
                </Link>
              </li>
              <li>
                <Link
                  href="/?institution=inst-soa-iter"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  ITER SOA
                </Link>
              </li>
              <li>
                <Link
                  href="/?institution=inst-nit-rkl"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  NIT Rourkela
                </Link>
              </li>
              <li>
                <Link
                  href="/?institution=inst-vssut-burla"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  VSSUT Burla
                </Link>
              </li>
              <li className="pt-0.5">
                <Link
                  href="/#marketplace"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C9ABFA] hover:text-white transition-colors"
                >
                  <span>View All Campuses</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Marketplace */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF7900]">
              Marketplace
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/?category=cat-books"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Books &amp; Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=cat-engg-equip"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Lab Coats &amp; Drafters
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=cat-electronics"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Scientific Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=cat-bicycles"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Bicycles &amp; Mobility
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=cat-hostel"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Hostel Essentials
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=cat-giveaways"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Free Giveaways
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Safety */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF7900]">
              Support &amp; Safety
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/safety"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard?tab=verification"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Student ID Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Buyer &amp; Seller Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Help &amp; FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/safety#report-fraud"
                  className="text-rose-400 hover:text-rose-300 font-semibold transition-colors block"
                >
                  Report Fraud
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF7900]">
              Company &amp; Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Careers / Campus Leads
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@stwapy.com"
                  className="hover:text-[#FF7900] transition-colors block"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Copyright Bar & Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Stwapy Technologies Pvt. Ltd. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              Crafted with <Heart className="w-3 h-3 text-[#FF7900] fill-[#FF7900] inline" /> for Indian Campuses 🇮🇳
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/stwapy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stwapy Instagram"
              className="w-7 h-7 rounded-lg bg-[#35105F] hover:bg-[#5423A5] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#5423A5]/40"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com/company/stwapy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stwapy LinkedIn"
              className="w-7 h-7 rounded-lg bg-[#35105F] hover:bg-[#5423A5] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#5423A5]/40"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com/stwapy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stwapy Twitter / X"
              className="w-7 h-7 rounded-lg bg-[#35105F] hover:bg-[#5423A5] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#5423A5]/40"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com/@stwapy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stwapy YouTube"
              className="w-7 h-7 rounded-lg bg-[#35105F] hover:bg-[#5423A5] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#5423A5]/40"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
