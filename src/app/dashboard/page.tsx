'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, Listing, Conversation, Message, Order, validateNegotiationMessage } from '@/lib/api';
import { uploadToCloudinary } from '@/lib/cloudinary';
import ProductCard from '@/components/marketplace/ProductCard';
import {
  Grid,
  MessageSquare,
  Heart,
  ShieldCheck,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Eye,
  Trash2,
  ExternalLink,
  Upload,
  ShoppingBag,
  Truck,
  PackageCheck,
  MapPin,
  IndianRupee,
  ChevronRight,
  Camera,
  Image as ImageIcon,
  RefreshCw,
  Home,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'listings';

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Data states
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsgContent, setNewMsgContent] = useState<string>('');
  const [chatValidationError, setChatValidationError] = useState<string>('');
  const [sendingMsg, setSendingMsg] = useState<boolean>(false);

  // Orders states
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);
  const [orderSubTab, setOrderSubTab] = useState<'bought' | 'sold'>('bought');
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

  // Verification state
  const [verifStatus, setVerifStatus] = useState<string>('UNVERIFIED');
  const [instName, setInstName] = useState<string>('');
  const [enrollmentNo, setEnrollmentNo] = useState<string>('');
  const [idCardUrl, setIdCardUrl] = useState<string>('');
  const [uploadingIdCard, setUploadingIdCard] = useState<boolean>(false);
  const [submittingVerif, setSubmittingVerif] = useState<boolean>(false);
  const [verifFeedback, setVerifFeedback] = useState<string>('');
  const [isReuploading, setIsReuploading] = useState<boolean>(false);

  // Sync verification fields from active user
  useEffect(() => {
    if (user) {
      if (user.collegeName && !instName) setInstName(user.collegeName);
      if (user.collegeIdNumber && !enrollmentNo) setEnrollmentNo(user.collegeIdNumber);
      if (user.idCardImageUrl && !idCardUrl) setIdCardUrl(user.idCardImageUrl);
      if (user.verificationStatus) setVerifStatus(user.verificationStatus);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [user, isLoading, router]);

  // Load Tab Data
  useEffect(() => {
    if (!user) return;

    if (activeTab === 'listings') {
      api.getMyListings().then(setMyListings).catch(console.error);
    } else if (activeTab === 'favorites') {
      api.getFavorites().then(setFavorites).catch(console.error);
    } else if (activeTab === 'messages') {
      api.getConversations().then((convs) => {
        setConversations(convs);
        if (convs.length > 0 && !selectedConvId) {
          setSelectedConvId(convs[0].id);
        }
      }).catch(console.error);
    } else if (activeTab === 'orders') {
      setOrdersLoading(true);
      Promise.all([
        api.getMyOrders().catch(() => []),
        api.getReceivedOrders().catch(() => []),
      ]).then(([bought, sold]) => {
        setMyOrders(bought);
        setReceivedOrders(sold);
      }).finally(() => setOrdersLoading(false));
    } else if (activeTab === 'verification') {
      api.getVerificationStatus().then((res) => {
        setVerifStatus(res.verificationStatus);
        if (res.profile?.institutionName) setInstName(res.profile.institutionName);
        if (res.profile?.enrollmentNumber) setEnrollmentNo(res.profile.enrollmentNumber);
      }).catch(console.error);
    }
  }, [user, activeTab, selectedConvId]);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setReceivedOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      setMyOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err: any) {
      alert(err?.message || 'Failed to update order status');
    }
  };

  // Load messages when conversation selected
  useEffect(() => {
    if (selectedConvId) {
      api.getMessages(selectedConvId).then(setMessages).catch(console.error);
    }
  }, [selectedConvId]);

  const handleStatusChange = async (listingId: string, status: string) => {
    try {
      await api.updateListingStatus(listingId, status);
      setMyListings(myListings.map((l) => (l.id === listingId ? { ...l, status: status as any } : l)));
    } catch (err: any) {
      alert(err?.message || 'Failed to update status');
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      await api.deleteListing(listingId);
      setMyListings(myListings.filter((l) => l.id !== listingId));
    } catch (err: any) {
      alert(err?.message || 'Failed to delete listing');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgContent.trim() || !selectedConvId) return;

    // Strict validation: No Instagram, email, phone, or external IDs
    const validation = validateNegotiationMessage(newMsgContent.trim());
    if (!validation.isValid) {
      setChatValidationError(validation.error || 'Sharing contact info or social IDs is prohibited.');
      return;
    }
    setChatValidationError('');

    try {
      setSendingMsg(true);
      const res = await api.sendMessage({
        conversationId: selectedConvId,
        content: newMsgContent.trim(),
      });
      setMessages([...messages, res.message]);
      setNewMsgContent('');
    } catch (err: any) {
      alert(err?.message || 'Failed to send message');
    } finally {
      setSendingMsg(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB.');
        return;
      }
      try {
        setUploadingIdCard(true);
        const cdnUrl = await uploadToCloudinary(file, 'stwapy/verifications');
        setIdCardUrl(cdnUrl);
      } catch (err: any) {
        console.error('Cloudinary upload error', err);
        alert(err?.message || 'Failed to upload photo to Cloudinary.');
      } finally {
        setUploadingIdCard(false);
      }
    }
  };

  const useSampleStudentId = () => {
    setIdCardUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80');
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName.trim() || !enrollmentNo.trim()) {
      alert('Please provide your Institution Name and Roll/Enrollment Number.');
      return;
    }
    if (!idCardUrl) {
      alert('Please upload a photo of your college ID card before submitting.');
      return;
    }

    try {
      setSubmittingVerif(true);

      let finalIdCardUrl = idCardUrl;
      if (idCardUrl && !idCardUrl.startsWith('http://') && !idCardUrl.startsWith('https://')) {
        finalIdCardUrl = await uploadToCloudinary(idCardUrl, 'stwapy/verifications');
      }

      await api.submitVerification({
        institutionName: instName.trim(),
        enrollmentNumber: enrollmentNo.trim(),
        idCardUrl: finalIdCardUrl,
      });

      // Dispatch to KYC sync for Central Super Admin Control Plane
      if (user) {
        try {
          await fetch('/api/kyc-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'SUBMIT_KYC',
              payload: {
                studentName: user.fullName,
                email: user.email,
                phone: user.phone,
                alternatePhone: user.alternatePhone,
                address: user.address,
                college: instName.trim(),
                enrollmentNumber: enrollmentNo.trim(),
                idCardImageUrl: idCardUrl,
              },
            }),
          });
        } catch (syncErr) {
          console.warn('KYC sync dispatch failed:', syncErr);
        }
      }

      setVerifStatus('PENDING');
      setIsReuploading(false);
      setVerifFeedback('✓ ID Card photo submitted successfully! It is now under review by the Admin KYC desk.');
    } catch (err: any) {
      alert(err?.message || 'Verification submission failed');
    } finally {
      setSubmittingVerif(false);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 space-y-6">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-xl flex items-center justify-center">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{user.fullName}</h1>
              {user.accountType === 'INSTITUTE_STUDENT' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Institute Verified
                </span>
              ) : user.verificationStatus === 'VERIFIED' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Student
                </span>
              ) : user.verificationStatus === 'PENDING' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Clock className="w-3.5 h-3.5" /> Verification Pending
                </span>
              ) : user.accountType === 'NORMAL_USER' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  👤 Normal User (Buyer Only)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Unverified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <span>{user.email}</span>
              {user.phone && <span> • {user.phone}</span>}
              {user.collegeName && <span className="font-medium text-[#5423A5]"> • {user.collegeName}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#FF7900] text-white hover:bg-[#e06b00] shadow-md shadow-[#FF7900]/25 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home / Buy Products</span>
          </Link>

          <Link
            href="/post"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#5423A5] text-white hover:bg-[#35105F] shadow-md shadow-[#5423A5]/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Item</span>
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'listings', label: 'My Listings', icon: Grid, count: myListings.length },
          { id: 'orders', label: 'Campus Orders & Purchases', icon: ShoppingBag, count: myOrders.length + receivedOrders.length },
          { id: 'messages', label: 'Messages', icon: MessageSquare, count: conversations.length },
          { id: 'favorites', label: 'Favorites', icon: Heart, count: favorites.length },
          { id: 'verification', label: 'Student Verification', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
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
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#5423A5] bg-[#F1EAFE] hover:bg-[#ebdffe] transition-colors shrink-0 border border-[#5423A5]/20 ml-auto whitespace-nowrap cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Browse Products to Buy →</span>
        </Link>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Manage Your Products ({myListings.length})</h2>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Grid className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">You have no active listings yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Sell engineering textbooks, instruments, calculators, or bikes to other students in your college.
              </p>
              <Link
                href="/post"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Post Your First Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myListings.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' :
                        item.status === 'SOLD' ? 'bg-slate-100 text-slate-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-sm font-black text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>

                    <Link href={`/listing/${item.id}`} className="font-bold text-xs text-slate-900 hover:text-indigo-600 line-clamp-2 block">
                      {item.title}
                    </Link>

                    <p className="text-[11px] text-slate-400">
                      {item.institutionName} • {item.viewCount} views
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      {item.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleStatusChange(item.id, 'SOLD')}
                          className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg cursor-pointer"
                        >
                          Mark as Sold
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(item.id, 'ACTIVE')}
                          className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg cursor-pointer"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/listing/${item.id}`} className="text-slate-400 hover:text-indigo-600">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteListing(item.id)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          {/* Threads list */}
          <div className="border-r border-slate-200 p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Buyer & Seller Chats ({conversations.length})
            </h3>
            {conversations.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">No message threads yet.</p>
            ) : (
              conversations.map((c) => {
                const isSelected = selectedConvId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConvId(c.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
                      isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {c.buyerId === user.id ? c.sellerName : c.buyerName}
                      </span>
                      <span className="text-[10px] text-slate-400">₹{c.listingPrice}</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-700 truncate mt-0.5">
                      {c.listingTitle}
                    </p>
                    {c.lastMessageSnippet && (
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {c.lastMessageSnippet}
                      </p>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Active conversation messages */}
          <div className="md:col-span-2 flex flex-col justify-between h-[500px] p-4">
            {selectedConvId ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-3 p-2">
                  {messages.map((m) => {
                    const isMe = m.senderId === user.id;
                    return (
                      <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-slate-400 mb-0.5">{m.senderName}</span>
                        <div className={`p-3 rounded-2xl text-xs max-w-sm ${
                          isMe ? 'bg-indigo-600 text-white rounded-br-xs' : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                        }`}>
                          {m.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="px-2.5 py-1.5 bg-amber-50 border border-amber-200/60 rounded-xl text-[10px] text-amber-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Price negotiation only. Sharing Instagram handles, phone numbers, or emails is prohibited.</span>
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type price offer or negotiation message..."
                      value={newMsgContent}
                      onChange={(e) => {
                        setNewMsgContent(e.target.value);
                        const v = validateNegotiationMessage(e.target.value);
                        setChatValidationError(v.isValid ? '' : v.error || 'Prohibited contact sharing.');
                      }}
                      className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg || Boolean(chatValidationError)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  {chatValidationError && (
                    <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-[11px] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                      <span>{chatValidationError}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">
                Select a conversation on the left to start messaging.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Campus Orders & Purchases */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Campus Shopping Orders</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your campus purchases, COD pickups, and incoming order requests.
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setOrderSubTab('bought')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  orderSubTab === 'bought'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                My Purchases ({myOrders.length})
              </button>
              <button
                type="button"
                onClick={() => setOrderSubTab('sold')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  orderSubTab === 'sold'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Orders Received ({receivedOrders.length})
              </button>
            </div>
          </div>

          {ordersLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading orders...</div>
          ) : (orderSubTab === 'bought' ? myOrders : receivedOrders).length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">
                {orderSubTab === 'bought' ? 'No purchases yet' : 'No incoming orders yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {orderSubTab === 'bought'
                  ? 'Explore textbooks, lab gear, and tech from your college peers and order with campus handover.'
                  : 'When fellow students buy items from your listings, their pickup requests will show up here.'}
              </p>
              {orderSubTab === 'bought' && (
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                >
                  Browse Campus Marketplace
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {(orderSubTab === 'bought' ? myOrders : receivedOrders).map((order) => {
                const isSellerView = orderSubTab === 'sold';
                const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
                  CONFIRMED: { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', label: 'Order Confirmed' },
                  PROCESSING: { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', label: 'Processing' },
                  READY_FOR_PICKUP: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Ready for Campus Handover' },
                  COMPLETED: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Completed' },
                  CANCELLED: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', label: 'Cancelled' },
                };
                const currentStatus = statusStyles[order.orderStatus] || {
                  bg: 'bg-slate-50 border-slate-200',
                  text: 'text-slate-700',
                  label: order.orderStatus,
                };

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-slate-300"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 tracking-wide">
                            ORDER #{order.orderNumber}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${currentStatus.bg} ${currentStatus.text}`}
                          >
                            {currentStatus.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                        {order.deliveryType && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            order.deliveryType === 'PICKUP'
                              ? 'bg-purple-50 text-[#5423A5] border-[#5423A5]/20'
                              : order.deliveryType === 'SUPERFAST_DELIVERY'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {order.deliveryType === 'PICKUP' ? '🏢 Campus Pickup' : order.deliveryType === 'SUPERFAST_DELIVERY' ? '⚡ 24h Express Delivery' : '🚚 Standard Delivery (3-4 Days)'}
                          </span>
                        )}
                        <span className="text-slate-500 font-medium">
                          Payment: <strong className="text-slate-800">
                            {order.paymentMethod === 'CASH_ON_DELIVERY_PARTIAL_ADVANCE'
                              ? 'Cash on Delivery (20% Advance)'
                              : order.paymentMethod === 'ONLINE_UPI_100_PERCENT' || order.paymentMethod === 'ONLINE_UPI' || order.paymentMethod === 'UPI_ON_PICKUP'
                              ? 'UPI'
                              : 'Online'}
                          </strong>
                        </span>
                        <div className="text-base font-black text-slate-900 flex items-center">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Partial COD Advance / Remaining Alert if applicable */}
                    {order.paymentMethod === 'CASH_ON_DELIVERY_PARTIAL_ADVANCE' && (
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-50/70 border border-amber-200 rounded-xl px-3 py-2 text-xs">
                        <span className="text-emerald-700 font-bold">
                          ✓ Advance Paid Online: ₹{order.partialAdvanceAmount?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-amber-800 font-black">
                          💵 Cash Due on Delivery: ₹{order.remainingCashAmount?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    {/* Order Details: Pickup Spot / Address & Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50/70 p-3.5 rounded-2xl text-xs text-slate-600 border border-slate-100">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {order.deliveryType === 'PICKUP' ? 'Campus Handover Point' : 'Delivery Address'}
                          </span>
                          <span className="font-semibold text-slate-800">{order.pickupPoint}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {isSellerView ? 'Buyer Contact & Notes' : 'Contact Phone & Timeline'}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {order.buyerPhone} {order.notes ? `• "${order.notes}"` : ''}
                            {order.estimatedDelivery ? ` [${order.estimatedDelivery}]` : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Purchased Items ({order.items.length})
                      </span>
                      <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                        {order.items.map((item) => (
                          <div key={item.id} className="p-3 bg-white flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={item.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'}
                                alt={item.title}
                                className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                              />
                              <div className="min-w-0">
                                <Link
                                  href={`/listing/${item.productId}`}
                                  className="font-bold text-slate-800 hover:text-indigo-600 truncate block hover:underline"
                                >
                                  {item.title}
                                </Link>
                                <span className="text-[10px] text-slate-400">
                                  Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>
                            <div className="font-bold text-slate-900 shrink-0">
                              ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions */}
                    {isSellerView && order.orderStatus !== 'COMPLETED' && order.orderStatus !== 'CANCELLED' && (
                      <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                        {order.orderStatus === 'CONFIRMED' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(order.id, 'READY_FOR_PICKUP')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer transition-colors"
                          >
                            Mark Ready for Pickup
                          </button>
                        )}
                        {order.orderStatus === 'READY_FOR_PICKUP' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETED')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer transition-colors"
                          >
                            Mark Handover Completed
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, 'CANCELLED')}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer transition-colors"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Saved Items ({favorites.length})</h2>
          {favorites.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">No saved items</h3>
              <p className="text-xs text-slate-500">
                Tap the heart icon on any listing to save it here for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5">
              {favorites.map((item) => (
                <ProductCard key={item.id} listing={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Student Verification */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Student ID Verification</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Get the green &quot;Verified Student&quot; badge to boost trust among buyers and sellers across college campuses.
            </p>
          </div>

          {/* Current Status Banner */}
          <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
            user.accountType === 'INSTITUTE_STUDENT' || user.verificationStatus === 'AUTO_VERIFIED' || user.verificationStatus === 'VERIFIED'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : user.verificationStatus === 'PENDING'
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : user.verificationStatus === 'REJECTED'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            {user.accountType === 'INSTITUTE_STUDENT' || user.verificationStatus === 'AUTO_VERIFIED' || user.verificationStatus === 'VERIFIED' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : user.verificationStatus === 'PENDING' ? (
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            ) : user.verificationStatus === 'REJECTED' ? (
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
            )}
            <div>
              <span className="font-bold block">
                Status:{' '}
                {user.accountType === 'INSTITUTE_STUDENT'
                  ? 'INSTITUTE_AUTO_VERIFIED'
                  : user.verificationStatus || 'UNVERIFIED'}
              </span>
              <span className="text-[11px] opacity-80">
                {user.accountType === 'INSTITUTE_STUDENT'
                  ? `Academic domain verified (${user.collegeName || user.email}). Full Buy & Sell permissions are active.`
                  : user.verificationStatus === 'VERIFIED'
                  ? 'Your student identity is fully verified. You can post and sell items freely.'
                  : user.verificationStatus === 'PENDING'
                  ? 'Your student ID is under review by the Admin KYC desk. Selling will unlock upon verification approval.'
                  : user.verificationStatus === 'REJECTED'
                  ? `Verification rejected: ${user.rejectionReason || 'Please submit a clear photo of your college ID.'}`
                  : 'Normal user account (Buyer Only).'}
              </span>
            </div>
          </div>

          {/* Registered Details Summary Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
              Registered Profile Details
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div><strong className="text-slate-800">Name:</strong> {user.fullName}</div>
              <div><strong className="text-slate-800">Phone:</strong> {user.phone || 'Not provided'}</div>
              {user.alternatePhone && <div><strong className="text-slate-800">Alt Phone:</strong> {user.alternatePhone}</div>}
              <div><strong className="text-slate-800">Address:</strong> {user.address || 'Not provided'}</div>
              {user.collegeName && <div><strong className="text-slate-800">College:</strong> {user.collegeName}</div>}
              {user.collegeIdNumber && <div><strong className="text-slate-800">ID / Roll No:</strong> {user.collegeIdNumber}</div>}
              <div>
                <strong className="text-slate-800">ID Photograph:</strong>{' '}
                {idCardUrl ? (
                  <span className="text-emerald-700 font-bold">
                    ✓ Photo Attached ({user.verificationStatus === 'VERIFIED' ? 'Approved' : user.verificationStatus === 'REJECTED' ? 'Rejected' : 'Under Review'})
                  </span>
                ) : (
                  <span className="text-amber-600 font-bold">
                    ✕ Photo Not Uploaded
                  </span>
                )}
              </div>
              <div>
                <strong className="text-slate-800">Selling Permission:</strong>{' '}
                <span className={user.canSell ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                  {user.canSell ? '✓ Enabled (Can Buy & Sell)' : '✕ Disabled (Buyer Only)'}
                </span>
              </div>
            </div>
          </div>

          {verifFeedback && (
            <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xl border border-emerald-200">
              {verifFeedback}
            </div>
          )}

          {/* Current Verification Flow based on Photo Status */}
          {/* STATE 1: APPROVED / VERIFIED */}
          {(user.accountType === 'INSTITUTE_STUDENT' || user.verificationStatus === 'AUTO_VERIFIED' || user.verificationStatus === 'VERIFIED') && (
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Student ID Status: Approved &amp; Verified</span>
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold tracking-wide">
                  Active Verified Seller
                </span>
              </div>
              {idCardUrl ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 bg-white max-w-sm shadow-sm">
                  <img src={idCardUrl} alt="Verified Student ID Card" className="w-full h-44 object-cover" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" /> Approved &amp; Verified by KYC Desk
                  </div>
                </div>
              ) : (
                <p className="text-xs text-emerald-700">
                  Auto-verified via official college domain. You have full privileges to list and sell items across campus.
                </p>
              )}
            </div>
          )}

          {/* STATE 2: UNDER REVIEW (PENDING) */}
          {(user.verificationStatus === 'PENDING' || verifStatus === 'PENDING') && !isReuploading && (
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Student ID Status: Under Review by KYC Desk</span>
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold tracking-wide">
                  Pending Verification
                </span>
              </div>
              {idCardUrl ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 bg-white max-w-sm shadow-sm">
                  <img src={idCardUrl} alt="Submitted Student ID Card" className="w-full h-44 object-cover" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Photo Uploaded • Awaiting Admin Approval
                  </div>
                </div>
              ) : (
                <p className="text-xs text-amber-700">
                  Student details submitted. Verification in progress.
                </p>
              )}
              <p className="text-xs text-amber-800 leading-relaxed">
                Your college ID photograph is currently in the verification queue. KYC verification officers verify student IDs within 15–30 minutes during campus working hours.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsReuploading(true)}
                  className="text-xs font-bold text-[#5423A5] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Upload a different or clearer ID card photo</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: REJECTED */}
          {(user.verificationStatus === 'REJECTED' || verifStatus === 'REJECTED') && !isReuploading && (
            <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Student ID Status: Verification Rejected</span>
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold tracking-wide">
                  Rejected
                </span>
              </div>
              {idCardUrl && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-rose-300 bg-white max-w-sm shadow-sm opacity-80">
                  <img src={idCardUrl} alt="Rejected Student ID" className="w-full h-44 object-cover grayscale-[25%]" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-rose-800/90 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
                    <XCircle className="w-3.5 h-3.5" /> Rejected Photo
                  </div>
                </div>
              )}
              <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs text-rose-800">
                <strong>Reason:</strong> {user.rejectionReason || 'Uploaded ID card photo was blurry, cropped, or not recognizable.'}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIdCardUrl('');
                  setIsReuploading(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New ID Card Photo &amp; Re-submit</span>
              </button>
            </div>
          )}

          {/* STATE 4: UNVERIFIED OR RE-UPLOADING (FORM WITH PHOTO UPLOAD & PREVIEW — NO RAW URL) */}
          {user.accountType !== 'INSTITUTE_STUDENT' && user.verificationStatus !== 'VERIFIED' && user.verificationStatus !== 'AUTO_VERIFIED' && ((user.verificationStatus !== 'PENDING' && user.verificationStatus !== 'REJECTED') || isReuploading) && (
            <form onSubmit={handleSubmitVerification} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Institution / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KIIT University or OUTR Bhubaneswar"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5423A5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Roll / Enrollment Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 21051980 or SOA22ECE041"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5423A5]"
                />
              </div>

              {/* Student ID Card Photograph — No raw URL input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#5423A5]" />
                    <span>Student ID Card Photograph *</span>
                  </span>
                  {idCardUrl ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Photo Attached
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                      Photo Not Uploaded
                    </span>
                  )}
                </label>

                {uploadingIdCard ? (
                  <div className="border-2 border-dashed border-[#5423A5] rounded-2xl p-6 text-center space-y-2 bg-[#F1EAFE]/40 animate-pulse max-w-md">
                    <div className="w-7 h-7 border-3 border-[#5423A5] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-[#5423A5]">Uploading Student ID to Cloudinary CDN...</p>
                  </div>
                ) : idCardUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-100 group max-w-md">
                    <img src={idCardUrl} alt="Uploaded Student ID Card" className="w-full h-44 object-cover" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label className="px-3 py-1.5 bg-white text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-100 cursor-pointer shadow-md">
                        <span>Change Photo</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setIdCardUrl('')}
                        className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 shadow-md cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle className="w-3 h-3" /> ID Photo Ready for Submission
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center space-y-2.5 bg-slate-50 hover:border-[#5423A5] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white text-slate-400 mx-auto flex items-center justify-center shadow-xs">
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        Photo Not Uploaded
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Please upload your college student ID card photo to verify student status.
                      </p>
                    </div>
                    <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <label className="px-4 py-2 bg-[#5423A5] hover:bg-[#35105F] text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse ID Photo from Computer</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={useSampleStudentId}
                        className="px-3 py-2 bg-white hover:bg-slate-100 text-[#FF7900] border border-[#FF7900]/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Use Sample Student ID (Demo)
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">PNG, JPG or WebP (Max 5MB)</p>
                  </div>
                )}

                <span className="text-[11px] text-slate-400 block">
                  Confidential: Stored securely and only visible to authorized verification officers.
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {isReuploading && (
                  <button
                    type="button"
                    onClick={() => setIsReuploading(false)}
                    className="py-3 px-4 rounded-2xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submittingVerif || !idCardUrl}
                  className="flex-1 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] text-white hover:bg-[#35105F] shadow-lg shadow-[#5423A5]/25 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submittingVerif ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit for Verification</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
