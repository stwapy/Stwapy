'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api, Category, District, Institution } from '@/lib/api';
import { uploadMultipleToCloudinary } from '@/lib/cloudinary';
import {
  PlusCircle,
  Upload,
  Image as ImageIcon,
  Building2,
  MapPin,
  IndianRupee,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Lock,
  Clock,
  AlertTriangle,
  Camera,
  RefreshCw,
  Trash2,
  X,
  CreditCard,
  QrCode,
  Sparkles,
  Check,
  Info,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function PostListingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [condition, setCondition] = useState('GOOD');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [district, setDistrict] = useState('Khordha');
  const [city, setCity] = useState('Bhubaneswar');
  const [institutionId, setInstitutionId] = useState('');

  // Multi-photo Live Camera state (min 2, max 4 photos)
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturingFlash, setIsCapturingFlash] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 5% Platform Fee & Verification Modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiApp, setUpiApp] = useState<'GPAY' | 'PHONEPE' | 'PAYTM' | 'BHIM'>('GPAY');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'CHOOSE' | 'PROCESSING' | 'SUCCESS'>('CHOOSE');
  const [processingStatusText, setProcessingStatusText] = useState('');
  const [createdListingId, setCreatedListingId] = useState<string | null>(null);
  const [txnId, setTxnId] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Protect route
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login?redirect=/post');
    }
  }, [user, isLoading, router]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Load categories and locations
  useEffect(() => {
    async function loadData() {
      try {
        const [catData, distData, instData] = await Promise.all([
          api.getCategories(),
          api.getDistricts(),
          api.getInstitutions(),
        ]);
        setCategories(catData);
        setDistricts(distData);
        setInstitutions(instData);

        if (catData.length > 0) setCategoryId(catData[0].id);
        if (instData.length > 0) setInstitutionId(instData[0].id);
      } catch (err) {
        console.error('Failed to load form metadata', err);
      }
    }
    loadData();
  }, []);

  // Camera Functions
  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      setCameraFacing(facing);
    } catch (err: any) {
      console.warn('Live camera error:', err);
      setCameraError(
        err?.message || 'Unable to open live camera. Please allow camera permissions or use Device Camera Snap.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    startCamera(nextFacing);
  };

  const captureLivePhoto = () => {
    if (imagesList.length >= 4) {
      setErrorMsg('Maximum 4 photos allowed.');
      return;
    }

    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flash visual
    setIsCapturingFlash(true);
    setTimeout(() => setIsCapturingFlash(false), 200);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.88);

    setImagesList((prev) => {
      const nextList = [...prev, photoDataUrl];
      if (nextList.length >= 4) {
        stopCamera();
      }
      return nextList;
    });
    setErrorMsg('');
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - imagesList.length;
    if (remainingSlots <= 0) return;

    const filesToRead = Array.from(files).slice(0, remainingSlots);

    filesToRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagesList((prev) => {
            if (prev.length >= 4) return prev;
            return [...prev, event.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
    setErrorMsg('');
  };

  const handleAddSampleLivePhoto = () => {
    if (imagesList.length >= 4) return;
    const samplePhotos = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80',
    ];
    const nextPhoto = samplePhotos[imagesList.length % samplePhotos.length];
    setImagesList((prev) => [...prev, nextPhoto]);
    setErrorMsg('');
  };

  const handleRemoveImage = (index: number) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  // Pricing & 5% Platform Fee Calculations
  const numericPrice = parseFloat(price) || 0;
  // 5% platform fee for verification and authenticated product listing
  const platformFee = numericPrice > 0 ? Math.max(5, Math.round(numericPrice * 0.05)) : 0;

  // Step 1: Validate Form & Open Verification & Fee Modal
  const handleProceedToVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter an item title.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please enter a detailed description.');
      return;
    }
    if (price === '' || isNaN(numericPrice) || numericPrice < 0) {
      setErrorMsg('Please enter a valid asking price (0 for free giveaway).');
      return;
    }
    if (!categoryId) {
      setErrorMsg('Please select a category.');
      return;
    }

    // Must have at least 2 photos and at most 4
    if (imagesList.length < 2) {
      setErrorMsg('Minimum 2 live camera photos are required (Front & Back/Angle) to verify item authenticity before publishing.');
      const photosElem = document.getElementById('photos-section');
      if (photosElem) {
        photosElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Stop camera if running
    stopCamera();

    // Open 5% Platform Authentication Fee Modal
    setPaymentStep('CHOOSE');
    setIsFeeModalOpen(true);
  };

  // Step 2: Process Platform Fee Payment & Publish Listing
  const handlePayFeeAndPublish = async () => {
    setIsProcessingPayment(true);
    setPaymentStep('PROCESSING');
    setProcessingStatusText('Connecting to Campus Escrow & Verification Gateway...');

    const matchedInst = institutions.find((i) => i.id === institutionId) || institutions[0];
    const collegeName = user?.collegeName || matchedInst?.name || 'KIIT University';
    const resolvedCity = matchedInst?.city || 'Bhubaneswar';
    const resolvedDistrict = matchedInst?.district || 'Khordha';
    const resolvedInstId = matchedInst?.id || 'inst-kiit';

    try {
      await new Promise((r) => setTimeout(r, 700));
      setProcessingStatusText(`Uploading ${imagesList.length} photos to Cloudinary Media CDN...`);
      const cloudinaryUrls = await uploadMultipleToCloudinary(
        imagesList,
        'stwapy/listings',
        (done, total) => setProcessingStatusText(`Uploading photo ${done}/${total} to Cloudinary...`)
      );

      setProcessingStatusText(`Processing 5% Seller Platform Fee (₹${platformFee})...`);
      await new Promise((r) => setTimeout(r, 600));

      setProcessingStatusText('Verifying Student Authenticity & Activating Campus Listing...');

      const res = await api.createListing({
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
        isNegotiable,
        condition,
        categoryId,
        subcategoryId: subcategoryId || undefined,
        district: resolvedDistrict,
        city: resolvedCity,
        institutionId: resolvedInstId,
        institutionName: collegeName,
        meetingArea: `${collegeName} Campus Handover`,
        images: cloudinaryUrls,
        platformFeePaid: true,
        platformFeeAmount: platformFee,
      });

      const generatedTxn = 'STW-FEE-' + Math.floor(100000 + Math.random() * 900000);
      setTxnId(generatedTxn);
      setCreatedListingId(res.id);

      await new Promise((r) => setTimeout(r, 600));
      setPaymentStep('SUCCESS');
    } catch (err: any) {
      console.error('Payment / publish error', err);
      setPaymentStep('CHOOSE');
      setIsFeeModalOpen(false);
      setErrorMsg(err?.message || 'Failed to complete authentication fee payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const selectedCategoryObj = categories.find((c) => c.id === categoryId);
  const selectedInstObj = institutions.find((i) => i.id === institutionId);

  const isAllowedToSell =
    user?.canSell ||
    user?.accountType === 'INSTITUTE_STUDENT' ||
    user?.verificationStatus === 'VERIFIED' ||
    user?.role === 'SUPER_ADMIN' ||
    user?.role === 'STATE_ADMIN';

  if (!isLoading && user && !isAllowedToSell) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            {user.accountType === 'NORMAL_USER' ? (
              <Lock className="w-8 h-8" />
            ) : (
              <Clock className="w-8 h-8 text-[#5423A5]" />
            )}
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {user.accountType === 'NORMAL_USER'
                ? 'Selling Restricted to College Students'
                : user.verificationStatus === 'REJECTED'
                ? 'Student ID Verification Not Approved'
                : 'Student ID Verification Pending Review'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {user.accountType === 'NORMAL_USER' ? (
                <>
                  You have a <strong>Normal User (Buyer Only)</strong> account. On Stwapy, listing and selling items is
                  exclusively reserved for verified college students to maintain a trusted campus community. You can
                  continue browsing and buying products freely.
                </>
              ) : user.verificationStatus === 'REJECTED' ? (
                <>
                  Your student verification was rejected:{' '}
                  <em>{user.rejectionReason || 'Please upload a clear photo of your student ID card.'}</em>.
                </>
              ) : (
                <>
                  Your College ID card submission is currently under review by our Admin KYC team. Once approved, you
                  will be able to post items for sale across campus. In the meantime, you can buy and browse all campus
                  listings!
                </>
              )}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-md transition-all cursor-pointer"
            >
              Browse Campus Marketplace
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              View My Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5423A5] bg-[#5423A5]/10 px-3 py-1 rounded-full mb-2">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post Student Ad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sell or Pass Down an Item
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in the details below. Live camera photos and verification are required for genuine campus listings.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleProceedToVerification} className="space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Item Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Higher Engineering Mathematics by B.S. Grewal 44th Ed"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubcategoryId('');
                }}
                className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Subcategory (Optional)</label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer"
              >
                <option value="">Select specific subcategory</option>
                {selectedCategoryObj?.subcategories?.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Asking Price (INR ₹) *</label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  placeholder="e.g. 450 (enter 0 for free giveaway)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
                />
              </div>
              <label className="flex items-center gap-2 pt-1 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={(e) => setIsNegotiable(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#5423A5] rounded"
                />
                <span>Price is negotiable with fellow students (Open to offers)</span>
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer"
              >
                <option value="NEW">Brand New / Unused</option>
                <option value="LIKE_NEW">Like New (Mint Condition)</option>
                <option value="GOOD">Good (Lightly used, clean)</option>
                <option value="FAIR">Fair (Visible wear but fully usable)</option>
                <option value="FOR_PARTS">For Parts / Repair</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">Detailed Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the semester, edition, condition, included accessories, reasons for selling, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 focus:border-[#5423A5]"
            />
          </div>



          {/* Product Photographs - Live Camera Feature (Min 2, Max 4) */}
          <div id="photos-section" className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <Camera className="w-4 h-4 text-[#5423A5]" />
                  <span>Product Photographs (Live Camera) *</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Minimum 2 photos, maximum 4 photos. Live camera photos verify item condition and authenticity.
                </p>
              </div>

              {/* Photo Count Tracker Badge */}
              <div className="shrink-0 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    imagesList.length < 2
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : imagesList.length <= 4
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {imagesList.length < 2 ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {imagesList.length} / 4 Photos {imagesList.length < 2 ? '(Min 2 required)' : 'Verified'}
                  </span>
                </span>
              </div>
            </div>

            {/* Hidden Canvas & File Input for Device Snap */}
            <canvas ref={canvasRef} className="hidden" />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handleNativeFileUpload}
              className="hidden"
            />

            {/* Live Camera Viewfinder Box */}
            {isCameraActive && (
              <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-[#5423A5] shadow-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-64 sm:h-80 object-cover ${cameraFacing === 'user' ? 'scale-x-[-1]' : ''}`}
                />

                {/* White Flash Effect on Snap */}
                {isCapturingFlash && (
                  <div className="absolute inset-0 bg-white pointer-events-none animate-pulse transition-opacity duration-150" />
                )}

                {/* Viewfinder Target Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 border border-white/40 rounded-2xl relative">
                    <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
                  </div>
                </div>

                {/* Camera Top Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[11px] font-mono tracking-wide">LIVE CAMERA FEED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleCameraFacing}
                      className="p-2 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-md cursor-pointer transition-colors"
                      title="Flip Camera"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="p-2 bg-black/60 hover:bg-rose-600 rounded-full text-white backdrop-blur-md cursor-pointer transition-colors"
                      title="Close Camera"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Camera Bottom Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={captureLivePhoto}
                    disabled={imagesList.length >= 4}
                    className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 p-1.5 shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
                  >
                    <div className="w-full h-full rounded-full border-2 border-slate-900 bg-white flex items-center justify-center">
                      <Camera className="w-6 h-6 text-slate-900" />
                    </div>
                  </button>
                  <span className="text-[11px] text-white/90 font-medium bg-black/60 px-3 py-0.5 rounded-full backdrop-blur-sm">
                    Tap circle to capture photo ({imagesList.length}/4)
                  </span>
                </div>
              </div>
            )}

            {/* Camera Error Message */}
            {cameraError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}

            {/* Camera Trigger Buttons */}
            {!isCameraActive && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => startCamera('environment')}
                  disabled={imagesList.length >= 4}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Live Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imagesList.length >= 4}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <span>Device Camera Snap</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddSampleLivePhoto}
                  disabled={imagesList.length >= 4}
                  className="text-[11px] font-semibold text-[#5423A5] hover:text-[#35105F] underline underline-offset-4 cursor-pointer ml-auto disabled:opacity-40"
                >
                  + Add Verified Campus Snap
                </button>
              </div>
            )}

            {/* Captured Photos Grid (Slots 1 to 4) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[0, 1, 2, 3].map((slotIndex) => {
                const photoUrl = imagesList[slotIndex];
                const slotLabels = ['Photo 1 (Front View)', 'Photo 2 (Back / Condition)', 'Photo 3 (Angle)', 'Photo 4 (Detail)'];
                const isRequired = slotIndex < 2;

                if (photoUrl) {
                  return (
                    <div
                      key={slotIndex}
                      className="relative group rounded-xl overflow-hidden border-2 border-emerald-400 bg-slate-900 aspect-square shadow-sm"
                    >
                      <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                      
                      {/* Photo Badge */}
                      <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        <span>#{slotIndex + 1}</span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(slotIndex)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow-sm transition-all cursor-pointer"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Label on bottom */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-center">
                        <span className="text-[10px] font-semibold text-white truncate block">
                          {slotLabels[slotIndex]}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={slotIndex}
                    onClick={() => {
                      if (!isCameraActive && imagesList.length < 4) {
                        startCamera('environment');
                      }
                    }}
                    className={`rounded-xl border-2 border-dashed p-3 aspect-square flex flex-col items-center justify-center text-center transition-all ${
                      isRequired
                        ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-50 cursor-pointer'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-1 text-slate-400">
                      <Camera className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">
                      {isRequired ? `Photo ${slotIndex + 1} *` : `Photo ${slotIndex + 1}`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isRequired ? 'Required' : 'Optional'}
                    </span>
                  </div>
                );
              })}
            </div>

            {imagesList.length < 2 && (
              <p className="text-[11px] text-amber-700 font-medium bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Please capture at least 2 photos (Front & Back/Angle) before proceeding to listing verification.</span>
              </p>
            )}
          </div>

          {/* Pricing & 5% Platform Verification Fee Info Banner */}
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#5423A5] text-white shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">
                Platform Verification & Protection Fee (5% of Price)
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                To maintain campus security, deter fake accounts, and ensure 100% genuine student-owned listings,
                a nominal 5% verification fee (
                <strong className="text-[#5423A5]">₹{platformFee}</strong> on this item) is charged to the seller upon publishing.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] text-white hover:bg-[#35105F] shadow-md shadow-[#5423A5]/25 cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <span>Proceed to Verify & Publish (5% Fee)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* 5% Platform Security & Authentication Fee Payment Modal */}
      {isFeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#5423A5] to-[#35105F] p-6 text-white relative">
              <button
                type="button"
                onClick={() => {
                  if (!isProcessingPayment && paymentStep !== 'SUCCESS') {
                    setIsFeeModalOpen(false);
                  }
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Campus Trust & Anti-Fraud Protection
                  </span>
                  <h3 className="text-lg font-black tracking-tight leading-none text-white">
                    Platform Listing Verification Fee (5%)
                  </h3>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Due to campus security and student verification, we collect a nominal platform fee (5%) for product
                protection, anti-fraud screening, and to ensure users list only genuine items.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {paymentStep === 'CHOOSE' && (
                <>
                  {/* Item & Fee Summary Card */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Listing Item:</span>
                      <strong className="text-slate-900 font-semibold max-w-[200px] truncate text-right">
                        {title}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Campus:</span>
                      <strong className="text-slate-900 font-semibold text-right">
                        {selectedInstObj?.shortName || 'Campus Marketplace'}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Item Asking Price:</span>
                      <span className="font-semibold text-slate-800">
                        ₹{numericPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Platform Verification Fee (5%):</span>
                      <span className="font-semibold text-[#5423A5]">
                        ₹{platformFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                      <span>Total Payable Now:</span>
                      <span className="text-[#5423A5] text-base">₹{platformFee.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Select Payment Method
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'UPI'
                            ? 'border-[#5423A5] bg-[#5423A5]/5 text-[#5423A5] font-bold shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <QrCode className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-[11px] block">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'CARD'
                            ? 'border-[#5423A5] bg-[#5423A5]/5 text-[#5423A5] font-bold shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-[11px] block">Debit / Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('NETBANKING')}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'NETBANKING'
                            ? 'border-[#5423A5] bg-[#5423A5]/5 text-[#5423A5] font-bold shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Building2 className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-[11px] block">Net Banking</span>
                      </button>
                    </div>

                    {/* Method Details */}
                    {paymentMethod === 'UPI' && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700">Scan UPI QR or select App:</span>
                          <span className="text-[11px] font-mono text-slate-500">stwapy.campus@icici</span>
                        </div>

                        {/* UPI App Quick Buttons */}
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          {(['GPAY', 'PHONEPE', 'PAYTM', 'BHIM'] as const).map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setUpiApp(app)}
                              className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                                upiApp === app
                                  ? 'border-[#5423A5] bg-[#5423A5] text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'CARD' && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
                        <input
                          type="text"
                          placeholder="Card Number: 4532 •••• •••• 8821"
                          defaultValue="4532 8920 1823 4402"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            defaultValue="08 / 28"
                            className="p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            defaultValue="882"
                            className="p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'NETBANKING' && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                        <label className="text-[11px] font-semibold text-slate-600 block">Select College Bank:</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs cursor-pointer"
                        >
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Punjab National Bank (PNB)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Trust Footer */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>256-bit campus escrow encryption. Verified student badge unlocks instantly.</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFeeModalOpen(false)}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Cancel & Edit
                    </button>
                    <button
                      type="button"
                      onClick={handlePayFeeAndPublish}
                      disabled={isProcessingPayment}
                      className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-lg shadow-[#5423A5]/25 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                    >
                      <span>Pay ₹{platformFee} & Publish Listing</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {paymentStep === 'PROCESSING' && (
                <div className="py-12 px-4 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full border-4 border-[#5423A5]/20 border-t-[#5423A5] animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">Authorizing Platform Fee</h4>
                    <p className="text-xs text-slate-500">{processingStatusText}</p>
                  </div>
                </div>
              )}

              {paymentStep === 'SUCCESS' && (
                <div className="py-8 px-4 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                      ✓ Authenticated & Verified
                    </span>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">
                      Platform Fee Paid & Listing Live!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your listing has been verified with authentic live camera photographs and is now active for fellow
                      students on campus.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 flex justify-between items-center max-w-sm mx-auto">
                    <span>Transaction ID:</span>
                    <span className="font-mono font-bold text-slate-900">{txnId}</span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFeeModalOpen(false);
                        if (createdListingId) {
                          router.push(`/listing/${createdListingId}`);
                        } else {
                          router.push('/');
                        }
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>View Live Listing</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsFeeModalOpen(false);
                        router.push('/');
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Campus Marketplace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
