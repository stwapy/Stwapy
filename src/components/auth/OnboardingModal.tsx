'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  UserAccountType,
  isInstituteEmail,
  detectCollegeFromEmail,
  CAMPUS_INSTITUTIONS_LIST,
} from '@/lib/api';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  GraduationCap,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  CreditCard,
  Search,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Lock,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Plus,
  Building,
} from 'lucide-react';

export default function OnboardingModal() {
  const { user, completeUserProfile } = useAuth();

  // Show modal if user is logged in but hasn't completed onboarding profile
  const shouldShow = !!user && !user.profileComplete;

  const isInstEmail = useMemo(() => {
    return user ? isInstituteEmail(user.email) : false;
  }, [user]);

  // Form State
  // If institute domain email (.edu, .ac.in, .college, etc.) -> automatically INSTITUTE_STUDENT
  // If normal personal email (gmail.com, etc.) -> automatically NORMAL_USER
  const [accountType, setAccountType] = useState<UserAccountType>('NORMAL_USER');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [address, setAddress] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeIdNumber, setCollegeIdNumber] = useState('');
  const [idCardImageUrl, setIdCardImageUrl] = useState('');

  // Optional manual student verification toggle for personal emails
  const [showStudentVerificationFields, setShowStudentVerificationFields] = useState(false);

  // College Search dropdown state
  const [collegeSearch, setCollegeSearch] = useState('');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // "Other" Custom College Fields
  const [isOtherCollege, setIsOtherCollege] = useState(false);
  const [customCollegeName, setCustomCollegeName] = useState('');
  const [customCollegeAddress, setCustomCollegeAddress] = useState('');
  const [customCollegeDistrict, setCustomCollegeDistrict] = useState('Khordha');

  // Status & Validation
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successCelebration, setSuccessCelebration] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Initialize form fields when user loads
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      setAlternatePhone(user.alternatePhone || '');
      setAddress(user.address || '');
      setCollegeIdNumber(user.collegeIdNumber || '');
      setIdCardImageUrl(user.idCardImageUrl || '');

      if (isInstituteEmail(user.email)) {
        // Automatic determination: Institute Student
        const detectedCollege = detectCollegeFromEmail(user.email);
        setAccountType('INSTITUTE_STUDENT');
        setCollegeName(detectedCollege);
      } else {
        // Automatic determination: Normal User (No role questions asked)
        setAccountType('NORMAL_USER');
        setCollegeName(user.collegeName || 'KIIT University, Bhubaneswar');
      }
    }
  }, [user]);

  // Filtered colleges list
  const filteredColleges = useMemo(() => {
    if (!collegeSearch.trim()) return CAMPUS_INSTITUTIONS_LIST;
    const q = collegeSearch.toLowerCase();
    return CAMPUS_INSTITUTIONS_LIST.filter((c) =>
      c.toLowerCase().includes(q)
    );
  }, [collegeSearch]);

  // Session dismissal state: allow user to browse without modal overlapping the whole site
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('stwapy_onboarding_skipped') === 'true';
    }
    return false;
  });

  // Listen to open-onboarding-modal event (dispatched from navbar or reminder banner)
  useEffect(() => {
    const handleOpenModal = () => setIsDismissed(false);
    window.addEventListener('open-onboarding-modal', handleOpenModal);
    return () => window.removeEventListener('open-onboarding-modal', handleOpenModal);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('stwapy_onboarding_skipped', 'true');
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && shouldShow && !isDismissed) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldShow, isDismissed]);

  // Lock background body scroll when modal is actively open to prevent overlapping scroll
  useEffect(() => {
    if (shouldShow && !isDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [shouldShow, isDismissed]);

  if (!shouldShow) return null;

  // Handle Photo Upload (file input -> Cloudinary CDN URL)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('Image size should be less than 10MB.');
        return;
      }
      try {
        setUploadingPhoto(true);
        setErrorMsg('');
        const cdnUrl = await uploadToCloudinary(file, 'stwapy/verifications');
        setIdCardImageUrl(cdnUrl);
      } catch (err: any) {
        console.error('Cloudinary upload error', err);
        setErrorMsg(err?.message || 'Failed to upload photo to Cloudinary. Please try again.');
      } finally {
        setUploadingPhoto(false);
      }
    }
  };

  const useSampleStudentId = () => {
    setIdCardImageUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone Number is required.');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Delivery / Residential Address is required.');
      return;
    }

    const effectiveAccountType: UserAccountType = isInstEmail
      ? 'INSTITUTE_STUDENT'
      : showStudentVerificationFields
      ? 'STUDENT'
      : 'NORMAL_USER';

    if (effectiveAccountType === 'INSTITUTE_STUDENT') {
      if (!collegeName.trim()) {
        setErrorMsg('College Name is required.');
        return;
      }
      if (!collegeIdNumber.trim()) {
        setErrorMsg('College ID / Roll No is required.');
        return;
      }
    } else if (effectiveAccountType === 'STUDENT') {
      if (isOtherCollege) {
        if (!customCollegeName.trim()) {
          setErrorMsg('Please enter your full College / Institution Name.');
          return;
        }
        if (!customCollegeAddress.trim()) {
          setErrorMsg('Please enter your College Address & District.');
          return;
        }
      } else {
        if (!collegeName.trim()) {
          setErrorMsg('Please select your College Name from the list or choose Other.');
          return;
        }
      }
      if (!collegeIdNumber.trim()) {
        setErrorMsg('College ID / Roll Number is required.');
        return;
      }
      if (!idCardImageUrl) {
        setErrorMsg('Please upload a photo of your College ID Card for verification.');
        return;
      }
    }

    try {
      setSubmitting(true);
      const finalCollege = isOtherCollege ? customCollegeName.trim() : collegeName.trim();
      await completeUserProfile({
        fullName: fullName.trim(),
        phone: phone.trim(),
        alternatePhone: alternatePhone.trim() || undefined,
        address: address.trim(),
        accountType: effectiveAccountType,
        collegeName: (effectiveAccountType !== 'NORMAL_USER') ? finalCollege : undefined,
        collegeIdNumber: (effectiveAccountType !== 'NORMAL_USER') ? collegeIdNumber.trim() : undefined,
        idCardImageUrl: (effectiveAccountType === 'STUDENT') ? idCardImageUrl : undefined,
        isCustomCollege: isOtherCollege,
        collegeAddress: isOtherCollege ? customCollegeAddress.trim() : undefined,
        district: isOtherCollege ? customCollegeDistrict : undefined,
      });

      setSuccessCelebration(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to save profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (shouldShow && isDismissed) {
    return (
      <aside
        aria-label="Profile setup reminder"
        className="bg-gradient-to-r from-[#5423A5] via-[#431787] to-[#35105F] text-white px-4 py-2.5 shadow-md relative z-40 border-b border-[#5423A5]/30 animate-in slide-in-from-top duration-200"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-full bg-white/20 text-[#FF7900]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>
              <strong>Welcome to Stwapy!</strong> Complete your profile details to unlock 1-click checkout &amp; campus selling privileges.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDismissed(false)}
              className="px-3.5 py-1 bg-white hover:bg-slate-100 text-[#5423A5] font-bold rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
            >
              Complete Profile Setup →
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={handleDismiss}
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#5423A5] to-[#35105F] text-white p-5 sm:p-6 shrink-0 relative flex items-start justify-between gap-4">
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold text-white mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>Welcome to Stwapy!</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Complete Your Profile Setup
            </h2>
            <p className="text-xs text-white/80">
              {isInstEmail
                ? 'Official Academic Domain detected (.ac.in, .edu, .college, .university). You are automatically verified!'
                : 'Please fill in your details once. You will not be asked again on re-login.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer shrink-0"
            title="Close & Browse Website"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Modal Screen */}
        {successCelebration ? (
          <div className="p-8 text-center space-y-4 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-slate-900">
                {isInstEmail
                  ? '🎉 Auto-Verified Institute Student!'
                  : showStudentVerificationFields
                  ? '📋 Student Profile Submitted for KYC Review'
                  : '✅ Profile Setup Complete!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {isInstEmail && (
                  <>
                    Your academic email is verified. You have full access to <strong>Buy and Sell</strong> products across campus immediately!
                  </>
                )}
                {!isInstEmail && showStudentVerificationFields && (
                  <>
                    Your college details and ID card have been recorded. You can <strong>Buy items immediately</strong>! Selling will unlock once Admin verifies your ID card.
                  </>
                )}
                {!isInstEmail && !showStudentVerificationFields && (
                  <>
                    You are registered as a <strong>Normal User (Buyer Account)</strong>! You can browse listings, message sellers, and buy campus products anytime.
                  </>
                )}
              </p>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-8 py-3 bg-[#5423A5] hover:bg-[#35105F] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer"
              >
                Go to Stwapy Marketplace →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4.5 overflow-y-auto overscroll-contain flex-1">
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* CASE 1: Institute Domain Email Detected (.ac.in, .edu, .college, .university, etc.) */}
            {isInstEmail ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5 flex-wrap">
                    <span>College Student Account:</span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-800 text-[11px]">
                      {user?.email}
                    </span>
                  </div>
                  <p className="text-emerald-700 text-[11px] leading-relaxed">
                    ✓ Recognized academic extension (.ac.in / .edu / .college / .university). Auto-verified for instant <strong>Buying & Selling</strong>. Zero admin KYC waiting!
                  </p>
                </div>
              </div>
            ) : (
              /* CASE 2: Non-Domain / Personal Email (like @gmail.com) -> Automatically Normal User */
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-slate-200/80 text-slate-700 shrink-0 mt-0.5">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                    <span>Account: Normal User (Buyer Only)</span>
                    <span className="text-[11px] font-mono text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                      {user?.email}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    You can browse, chat with student sellers, and buy items. Selling on Stwapy is reserved for verified college students.
                  </p>
                </div>
              </div>
            )}

            {/* Form Fields: Name, Phone, Alternative Phone, Address */}
            <div className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav Panda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                />
              </div>

              {/* Phone & Alternate Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#5423A5]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Alternative Phone</span>
                    <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 94371 22334"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                  />
                </div>
              </div>

              {/* Delivery / Residential Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5423A5]" />
                  <span>
                    {isInstEmail
                      ? 'Campus Address / Hostel & Room No *'
                      : 'Delivery / Residential Address *'}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    isInstEmail
                      ? 'e.g. Hostel 6, Room 304, Campus 15, Patia, Bhubaneswar'
                      : 'e.g. Plot No 142, Saheed Nagar, Bhubaneswar'
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                />
              </div>
            </div>

            {/* Academic fields for Institute Domain student */}
            {isInstEmail && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#5423A5]" />
                  <span>College Information</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>College / University Name *</span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Auto-filled from domain
                    </span>
                  </label>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between">
                    <span>{collegeName}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                      Domain Verified
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    College ID No / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 21051892 or SOA22ECE041"
                    value={collegeIdNumber}
                    onChange={(e) => setCollegeIdNumber(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5423A5]"
                  />
                </div>
              </div>
            )}

            {/* Optional expandable student verification for personal email accounts */}
            {!isInstEmail && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowStudentVerificationFields(!showStudentVerificationFields)}
                  className="w-full text-left py-2.5 px-3.5 rounded-xl border border-dashed border-slate-300 hover:border-[#5423A5] bg-white text-xs font-bold text-[#5423A5] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Are you an enrolled college student using this personal email?</span>
                  </span>
                  {showStudentVerificationFields ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showStudentVerificationFields && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5 animate-in fade-in duration-150">
                    <div className="text-xs text-slate-600 leading-snug">
                      Upload your College ID card to request student seller privileges. Our Admin team will review and verify your account.
                    </div>

                    {!isOtherCollege ? (
                      <div className="space-y-1 relative">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#5423A5]" />
                            <span>Campus / College *</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setIsOtherCollege(true);
                              setShowCollegeDropdown(false);
                            }}
                            className="text-[11px] font-bold text-[#FF7900] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>My college is not in list (Other)</span>
                          </button>
                        </div>
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required={showStudentVerificationFields && !isOtherCollege}
                            placeholder="Type to search from 286+ Odisha colleges..."
                            value={collegeSearch || collegeName}
                            onFocus={() => setShowCollegeDropdown(true)}
                            onChange={(e) => {
                              setCollegeSearch(e.target.value);
                              setCollegeName(e.target.value);
                              setShowCollegeDropdown(true);
                            }}
                            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5423A5]"
                          />
                        </div>

                        {showCollegeDropdown && (
                          <div
                            className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-56 overflow-y-auto z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150 origin-top"
                            onMouseLeave={() => setShowCollegeDropdown(false)}
                          >
                            {/* "Other" Option Quick Selection at Top */}
                            <div
                              onClick={() => {
                                setIsOtherCollege(true);
                                setShowCollegeDropdown(false);
                              }}
                              className="px-3.5 py-2.5 bg-orange-50/80 hover:bg-orange-100/90 text-orange-900 cursor-pointer flex items-center justify-between font-bold text-xs"
                            >
                              <span className="flex items-center gap-1.5 text-[#FF7900]">
                                <Plus className="w-3.5 h-3.5" />
                                <span>College not in list? Click here to enter &quot;Other&quot;</span>
                              </span>
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-orange-200/80 rounded text-orange-800">
                                Add Custom
                              </span>
                            </div>

                            {filteredColleges.slice(0, 50).map((col, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setCollegeName(col);
                                  setCollegeSearch('');
                                  setShowCollegeDropdown(false);
                                }}
                                className="px-3.5 py-2 text-xs text-slate-700 hover:bg-[#F1EAFE] hover:text-[#5423A5] cursor-pointer flex items-center justify-between"
                              >
                                <span>{col}</span>
                                {collegeName === col && <Check className="w-3.5 h-3.5 text-[#5423A5]" />}
                              </div>
                            ))}
                            {filteredColleges.length === 0 && (
                              <div className="p-4 text-center text-xs text-slate-500 space-y-2">
                                <p>No matching college found in list.</p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsOtherCollege(true);
                                    setCustomCollegeName(collegeSearch);
                                    setShowCollegeDropdown(false);
                                  }}
                                  className="px-3 py-1 bg-[#5423A5] text-white rounded-lg text-xs font-bold"
                                >
                                  Use &quot;{collegeSearch}&quot; as Custom College (Other)
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* "Other" Custom College Form */
                      <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-amber-700" />
                            <span>Custom College (Requires Admin Approval)</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsOtherCollege(false)}
                            className="text-[11px] font-bold text-[#5423A5] hover:underline cursor-pointer"
                          >
                            ← Select from verified college list
                          </button>
                        </div>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Your college details will be reviewed and verified by the admin team. Once approved, this college will be permanently added to the dropdown for all students!
                        </p>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">
                            College / Institution Full Name *
                          </label>
                          <input
                            type="text"
                            required={isOtherCollege}
                            placeholder="e.g. Parala Maharaja Engineering College"
                            value={customCollegeName}
                            onChange={(e) => setCustomCollegeName(e.target.value)}
                            className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5423A5]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-800">
                              District *
                            </label>
                            <select
                              value={customCollegeDistrict}
                              onChange={(e) => setCustomCollegeDistrict(e.target.value)}
                              className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5423A5]"
                            >
                              {[
                                'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack',
                                'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur',
                                'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha',
                                'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada',
                                'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'
                              ].map((dist) => (
                                <option key={dist} value={dist}>{dist}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-800">
                              College Address / City *
                            </label>
                            <input
                              type="text"
                              required={isOtherCollege}
                              placeholder="e.g. Sitalapalli, Berhampur - 761003"
                              value={customCollegeAddress}
                              onChange={(e) => setCustomCollegeAddress(e.target.value)}
                              className="w-full text-xs sm:text-sm p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#5423A5]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">
                        College ID No / Roll No *
                      </label>
                      <input
                        type="text"
                        required={showStudentVerificationFields}
                        placeholder="e.g. 21051892 or SOA22ECE041"
                        value={collegeIdNumber}
                        onChange={(e) => setCollegeIdNumber(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#5423A5]"
                      />
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-200/80">
                      <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#5423A5]" />
                          <span>Upload College ID Card Photo *</span>
                        </span>
                        <span className="text-[10px] text-amber-600 font-semibold">
                          Required for Admin Review
                        </span>
                      </label>

                      {uploadingPhoto ? (
                        <div className="border-2 border-dashed border-[#5423A5] rounded-2xl p-6 text-center space-y-2 bg-[#F1EAFE]/40 animate-pulse">
                          <div className="w-7 h-7 border-3 border-[#5423A5] border-t-transparent rounded-full animate-spin mx-auto" />
                          <p className="text-xs font-bold text-[#5423A5]">Uploading Student ID to Cloudinary CDN...</p>
                        </div>
                      ) : idCardImageUrl ? (
                        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-100 max-h-40 group">
                          <img
                            src={idCardImageUrl}
                            alt="Uploaded Student ID Card"
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setIdCardImageUrl('')}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
                            >
                              Change Photo
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> ID Photo Attached
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2 bg-white hover:border-[#5423A5] transition-colors">
                          <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                          <div className="text-xs text-slate-600">
                            <label className="font-bold text-[#5423A5] hover:underline cursor-pointer">
                              <span>Browse ID card photo from computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG or WebP (Max 5MB)</p>
                          </div>
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={useSampleStudentId}
                              className="text-[11px] font-bold text-[#FF7900] hover:text-[#e06b00] underline cursor-pointer"
                            >
                              Click to Use Sample Student ID (Fast Demo)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-lg shadow-[#5423A5]/25 hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isInstEmail
                        ? 'Save & Start Buying & Selling'
                        : showStudentVerificationFields
                        ? 'Submit for Student Seller Verification'
                        : 'Save Details & Access Marketplace'}
                    </span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-[#5423A5] hover:underline transition-colors cursor-pointer text-center"
              >
                Skip for now &amp; Browse Marketplace
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Your details are saved securely. You won&apos;t be asked to fill this on next login.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
