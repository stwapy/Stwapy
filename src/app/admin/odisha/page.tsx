'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, Listing } from '@/lib/api';
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  BarChart3,
  Users,
  Package,
  Layers,
  Search,
} from 'lucide-react';
import Link from 'next/link';

export default function OdishaAdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation' | 'verifications' | 'reports'>('analytics');
  const [analytics, setAnalytics] = useState<any>(null);
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Moderation modal / review action state
  const [moderatingId, setModeratingId] = useState<string | null>(null);
  const [moderationNotes, setModerationNotes] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  // Access guard: State Admin or Super Admin
  useEffect(() => {
    if (!isLoading) {
      if (!user || (user.role !== 'STATE_ADMIN' && user.role !== 'SUPER_ADMIN')) {
        router.replace('/');
      }
    }
  }, [user, isLoading, router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [analyticsData, pendingListingsData, verifsData, reportsData] = await Promise.all([
        api.getOdishaAdminAnalytics().catch(() => null),
        api.getOdishaPendingListings().catch(() => []),
        api.getOdishaPendingVerifications().catch(() => []),
        api.getOdishaReports().catch(() => []),
      ]);
      setAnalytics(analyticsData);
      setPendingListings(pendingListingsData);
      setPendingVerifications(verifsData);
      setReports(reportsData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'STATE_ADMIN' || user.role === 'SUPER_ADMIN')) {
      loadData();
    }
  }, [user]);

  const handleModerate = async (listingId: string, status: 'ACTIVE' | 'REJECTED') => {
    try {
      await api.moderateListing(listingId, status, moderationNotes || 'Reviewed by Moderator');
      alert(`Listing ${status === 'ACTIVE' ? 'approved' : 'rejected'}`);
      setModeratingId(null);
      setModerationNotes('');
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Moderation action failed');
    }
  };

  const handleReviewVerification = async (reqId: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      await api.reviewVerification(reqId, status, reviewNotes || 'Staff Verification Review');
      alert(`Student verification ${status.toLowerCase()}`);
      setReviewNotes('');
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Verification review failed');
    }
  };

  const handleResolveReport = async (reportId: string) => {
    const action = prompt('Enter action taken to resolve this report:', 'Listing reviewed and marked safe');
    if (!action) return;

    try {
      await api.resolveReport(reportId, action);
      alert('Report resolved.');
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to resolve report');
    }
  };

  if (isLoading || !user || (user.role !== 'STATE_ADMIN' && user.role !== 'SUPER_ADMIN')) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading moderation panel...
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-900 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Odisha Data Plane • Port 4001
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Odisha State Administration
          </h1>
          <p className="text-xs text-slate-300">
            Listing moderation, student verification approvals, campus governance, and state KPIs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Refresh State Data
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'analytics', label: 'State Analytics', icon: BarChart3 },
          { id: 'moderation', label: 'Listing Moderation Queue', icon: Package, count: pendingListings.length },
          { id: 'verifications', label: 'Student ID Approvals', icon: ShieldCheck, count: pendingVerifications.length },
          { id: 'reports', label: 'Abuse Reports', icon: AlertTriangle, count: reports.filter((r) => r.status === 'PENDING').length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-amber-100 text-amber-800'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: State Analytics */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Listings</span>
              <p className="text-2xl font-black text-slate-900">{analytics.activeListingsCount}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">Published across 30 districts</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Verified Students</span>
              <p className="text-2xl font-black text-emerald-600">{analytics.verifiedStudentsCount}</p>
              <span className="text-[10px] text-slate-500 font-medium">{analytics.registeredStudentsCount} total registered</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Verifications</span>
              <p className="text-2xl font-black text-amber-600">{analytics.pendingVerificationsCount}</p>
              <span className="text-[10px] text-amber-700 font-medium">Awaiting administrator review</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Open Reports</span>
              <p className="text-2xl font-black text-rose-600">{analytics.openReportsCount}</p>
              <span className="text-[10px] text-slate-500 font-medium">Complaints flagged</span>
            </div>
          </div>

          {/* Category Performance Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Odisha Marketplace Category Distribution</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {analytics.categoryBreakdown?.map((cat: any) => (
                <div key={cat.category} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{cat.category}</span>
                  <span className="font-bold bg-white px-2 py-0.5 rounded-md border text-indigo-600">
                    {cat.count} listings
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Audit Activities */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Recent Odisha State Audit Trail</h3>
            <div className="space-y-2 text-xs">
              {analytics.recentActivity?.map((act: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-800">{act.action}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{act.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(act.timestamp).toLocaleTimeString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Listing Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Listings Pending Moderation ({pendingListings.length})</h2>
          {pendingListings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All Odisha listings are currently reviewed. No pending moderation items in queue.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingListings.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      PENDING REVIEW
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Price: ₹{item.price} • Campus: {item.institutionName} • City: {item.city}
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                    <button
                      onClick={() => handleModerate(item.id, 'ACTIVE')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                    >
                      Approve Listing
                    </button>
                    <button
                      onClick={() => handleModerate(item.id, 'REJECTED')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                    >
                      Reject Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Student ID Verification Approvals */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Student ID Verification Requests ({pendingVerifications.length})</h2>
          {pendingVerifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              No pending student verification requests.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVerifications.map((req) => (
                <div key={req.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{req.studentName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({req.enrollmentNumber})</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      College: <strong>{req.institutionName}</strong>
                    </p>
                    <p className="text-xs text-slate-500">Email: {req.studentEmail}</p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">Submitted Student ID Card:</span>
                      <a
                        href={req.idCardUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block relative w-36 h-24 rounded-xl overflow-hidden border border-slate-300 hover:scale-105 transition-transform"
                      >
                        <img src={req.idCardUrl} alt="College ID" className="w-full h-full object-cover" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-2 shrink-0">
                    <button
                      onClick={() => handleReviewVerification(req.id, 'VERIFIED')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm cursor-pointer"
                    >
                      Verify Student ID
                    </button>
                    <button
                      onClick={() => handleReviewVerification(req.id, 'REJECTED')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                    >
                      Reject (Invalid ID)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Abuse Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Abuse & Prohibited Item Reports ({reports.length})</h2>
          {reports.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              Zero open abuse reports. Community trust score is 100%.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep.id} className="p-4 rounded-2xl border border-slate-200 flex justify-between items-start gap-4">
                  <div className="space-y-1 text-xs">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rep.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {rep.status}
                    </span>
                    <h3 className="font-bold text-slate-900">Reason: {rep.reason}</h3>
                    <p className="text-slate-600">{rep.details || 'No additional details provided'}</p>
                    <span className="text-[11px] text-slate-400 block">
                      Target: {rep.targetType} ({rep.targetId})
                    </span>
                  </div>

                  {rep.status === 'PENDING' && (
                    <button
                      onClick={() => handleResolveReport(rep.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shrink-0"
                    >
                      Take Action
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
