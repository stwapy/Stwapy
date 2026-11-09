'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import {
  ShieldAlert,
  Server,
  Activity,
  Globe2,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  Ban,
  Shield,
} from 'lucide-react';

export default function CentralSuperAdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'health' | 'states' | 'users' | 'analytics'>('health');
  const [healthData, setHealthData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [statesList, setStatesList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Super Admin Route Guard
  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'SUPER_ADMIN') {
        router.replace('/');
      }
    }
  }, [user, isLoading, router]);

  const loadCentralData = async () => {
    try {
      setRefreshing(true);
      const [health, analytics, states, users] = await Promise.all([
        api.getCentralHealth().catch(() => null),
        api.getCentralAnalytics().catch(() => null),
        api.getStates().catch(() => []),
        api.getCentralUsers(userSearch).catch(() => []),
      ]);
      setHealthData(health);
      setAnalyticsData(analytics);
      setStatesList(states);
      setUsersList(users);
    } catch (err) {
      console.error('Failed to load Central control plane data', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'SUPER_ADMIN') {
      loadCentralData();
    }
  }, [user]);

  const handleRoleChange = async (targetUserId: string, newRole: string) => {
    try {
      await api.updateUserRole(targetUserId, newRole, 'OD');
      alert(`User role updated to ${newRole}`);
      loadCentralData();
    } catch (err: any) {
      alert(err?.message || 'Failed to update role');
    }
  };

  const handleStatusChange = async (targetUserId: string, newStatus: string) => {
    try {
      await api.updateUserStatus(targetUserId, newStatus);
      alert(`User status changed to ${newStatus}`);
      loadCentralData();
    } catch (err: any) {
      alert(err?.message || 'Failed to update user status');
    }
  };

  if (isLoading || !user || user.role !== 'SUPER_ADMIN') {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading administration panel...
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-purple-900 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Control Plane • Port 4000 • Stwapy Technologies Pvt LTD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Central Super-Admin Control Plane
          </h1>
          <p className="text-xs text-slate-300">
            Global service registry, real-time backend health pings, state orchestration, and platform governance
          </p>
        </div>

        <button
          onClick={loadCentralData}
          disabled={refreshing}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Pinging Nodes...' : 'Ping Services Now'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'health', label: 'Service Health Monitor', icon: Activity },
          { id: 'states', label: 'State Registry & Gateways', icon: Globe2, count: statesList.length },
          { id: 'users', label: 'Global User Governance', icon: Users, count: usersList.length },
          { id: 'analytics', label: 'Central Analytics & Audits', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive ? 'bg-purple-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-200'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Real-time Service Health Monitor */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Central Control Plane Gateway
              </span>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xl">
                <CheckCircle2 className="w-6 h-6" />
                <span>ONLINE (Port 4000)</span>
              </div>
              <p className="text-xs text-slate-500">
                Uptime: {healthData?.centralService?.uptimeSeconds || 0}s • Timezone: Asia/Kolkata
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Registered State Microservices
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
                <Server className="w-6 h-6 text-purple-600" />
                <span>{healthData?.stateServices?.length || 1} Microservice Active</span>
              </div>
              <p className="text-xs text-slate-500">
                Independent deployment and data plane separation active
              </p>
            </div>
          </div>

          {/* Microservice Ping Status Cards */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Real-Time State Backend Latency & Connectivity Pings</span>
            </h3>

            <div className="space-y-3">
              {healthData?.stateServices?.map((node: any) => (
                <div
                  key={node.stateCode}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {node.stateName} State Backend ({node.stateCode})
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        node.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">
                      Service URL: {node.endpoint}
                    </p>
                    {node.serviceDetails && (
                      <p className="text-[11px] text-slate-400">
                        Active Listings: {node.serviceDetails.metrics?.activeListings} • Node Time: {node.serviceDetails.timestamp}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
                      Ping Latency:{' '}
                      <strong className={node.latencyMs < 50 ? 'text-emerald-600' : 'text-amber-600'}>
                        {node.latencyMs}ms
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: State Registry */}
      {activeTab === 'states' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Registered Indian States ({statesList.length})</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statesList.map((st) => (
              <div key={st.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">
                      {st.stateCode}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{st.stateName}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    st.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {st.isActive ? 'ACTIVE LAUNCH' : 'COMING SOON'}
                  </span>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p>Service Endpoint: <strong className="font-mono text-slate-700">{st.serviceUrl || 'Unregistered'}</strong></p>
                  <p>Features: {st.supportedFeatures?.join(', ') || 'Standard Marketplace'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Global User Governance */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold text-slate-900">Global Accounts ({usersList.length})</h2>
            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  api.getCentralUsers(e.target.value).then(setUsersList);
                }}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-2">User</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">Primary State</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-2">
                      <div className="font-bold text-slate-900">{u.fullName}</div>
                      <div className="text-[11px] text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        u.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                        u.role === 'STATE_ADMIN' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-700">{u.primaryState}</td>
                    <td className="py-3 px-2">
                      <span className={`text-[10px] font-bold ${u.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right space-x-1">
                      {u.role !== 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleRoleChange(u.id, u.role === 'STATE_ADMIN' ? 'STUDENT' : 'STATE_ADMIN')}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-700 cursor-pointer"
                        >
                          {u.role === 'STATE_ADMIN' ? 'Revoke State Admin' : 'Make State Admin'}
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(u.id, u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                        className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer ${
                          u.status === 'ACTIVE' ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Central Analytics & Audit History */}
      {activeTab === 'analytics' && analyticsData && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Platform-Wide Metrics & Central Audit Logs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400">Total Global Users</span>
              <p className="text-2xl font-black text-slate-900">{analyticsData.totalGlobalUsers}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400">Student Users</span>
              <p className="text-2xl font-black text-indigo-600">{analyticsData.studentUsersCount}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400">Active State Backends</span>
              <p className="text-2xl font-black text-emerald-600">{analyticsData.activeStatesCount}</p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase">Recent Central Audits</h3>
            <div className="space-y-1.5 text-xs">
              {analyticsData.recentAudits?.map((log: any) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-slate-500 text-[11px] ml-2 font-mono">({log.resource})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
