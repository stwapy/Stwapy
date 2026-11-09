'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Building2, User, Save } from 'lucide-react';

export default function SellerSettingsPage() {
  const [storeName, setStoreName] = useState('Indrajit Campus Gear & Books');
  const [campus, setCampus] = useState('KIIT University, Bhubaneswar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Seller Store Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Configure your campus merchant profile and notification preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Store / Merchant Display Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Primary College Campus</label>
            <input
              type="text"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-700"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Contact Phone (For Courier Dispatch)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-700"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Student Verification: Active
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
