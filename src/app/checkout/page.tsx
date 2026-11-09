'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { api, Order } from '@/lib/api';
import {
  ShoppingBag,
  ShieldCheck,
  Building2,
  MapPin,
  IndianRupee,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
  Truck,
  PackageCheck,
  Zap,
  Info,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Lock,
  Clock,
  Calendar,
  Key,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user, isLoading } = useAuth();
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Wizard Step: 1 = Review & Fees, 2 = Buyer & Fulfilment, 3 = Payment & Commitment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 2 State: Buyer & Delivery Details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryType, setDeliveryType] = useState<'PICKUP' | 'STANDARD_DELIVERY' | 'SUPERFAST_DELIVERY'>('PICKUP');
  const [pickupPoint, setPickupPoint] = useState('Central Library Entrance');
  const [customPickup, setCustomPickup] = useState('');
  const [pickupNotes, setPickupNotes] = useState('');

  // Step 3 State: Payment
  const [paymentOption, setPaymentOption] = useState<'COD_PARTIAL' | 'ONLINE_UPI' | 'CARD' | 'NET_BANKING'>('COD_PARTIAL');
  const [advanceDepositMethod, setAdvanceDepositMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');

  // Form submission & UI state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  // Prefill user details from AuthContext
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  // Calculations
  // Platform fee is nominally 5% (Centrally configurable in Super-Admin)
  const platformFeePercentage = 0.05;
  const platformFee = useMemo(() => {
    return Math.round(subtotal * platformFeePercentage);
  }, [subtotal]);

  // Delivery fee based on selected type
  const deliveryFee = useMemo(() => {
    if (deliveryType === 'STANDARD_DELIVERY') return 40;
    if (deliveryType === 'SUPERFAST_DELIVERY') return 79;
    return 0; // Campus Pickup is always FREE
  }, [deliveryType]);

  // Grand Total Payable
  const grandTotal = useMemo(() => {
    return subtotal + platformFee + deliveryFee;
  }, [subtotal, platformFee, deliveryFee]);

  // 20% Partial Advance commitment for COD
  const codAdvanceAmount = useMemo(() => {
    return Math.round(grandTotal * 0.20);
  }, [grandTotal]);

  const codRemainingAmount = useMemo(() => {
    return grandTotal - codAdvanceAmount;
  }, [grandTotal, codAdvanceAmount]);

  if (isLoading) {
    return <div className="p-16 text-center text-xs text-slate-400">Loading your campus checkout...</div>;
  }

  // Empty Bag View
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F1EAFE] text-[#5423A5] flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#222222]">Your campus bag is empty</h1>
        <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
          You don&apos;t have any active items in your bag. Explore verified student listings from top colleges to buy books, electronics, drafters, or cycles.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#5423A5] text-white hover:bg-[#35105F] shadow-md shadow-[#5423A5]/25 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Explore Campus Marketplace</span>
        </Link>
      </div>
    );
  }

  // Step 1 Validation -> Move to Step 2
  const handleProceedToStep2 = () => {
    if (items.length === 0) {
      setErrorMsg('Please add at least one item to proceed.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Validation -> Move to Step 3
  const handleProceedToStep3 = () => {
    setErrorMsg('');
    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone Number is required for delivery & pickup coordination.');
      return;
    }

    if (deliveryType === 'PICKUP') {
      const finalPickup = pickupPoint === 'Other' ? customPickup.trim() : pickupPoint;
      if (!finalPickup) {
        setErrorMsg('Please select or specify a safe campus meeting point.');
        return;
      }
    } else {
      if (!address.trim()) {
        setErrorMsg('Please enter your full delivery address / hostel room number.');
        return;
      }
      if (!pincode.trim() || pincode.length < 6) {
        setErrorMsg('Please enter a valid 6-digit PIN code.');
        return;
      }
    }

    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Order Placement
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!user) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (paymentOption === 'ONLINE_UPI' && !upiId.trim()) {
      setErrorMsg('Please enter your UPI ID or mobile handle (e.g. name@okhdfcbank or 9876543210@paytm).');
      return;
    }

    if (paymentOption === 'CARD' && (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      setErrorMsg('Please enter complete Card Number, Expiry Date, and 3-digit CVV.');
      return;
    }

    const finalPickupPoint =
      deliveryType === 'PICKUP'
        ? pickupPoint === 'Other'
          ? customPickup.trim()
          : pickupPoint
        : `Doorstep: ${address.trim()}, PIN: ${pincode.trim()}`;

    const estimatedDeliveryTime =
      deliveryType === 'PICKUP'
        ? 'Same-Day / Mutual Peer Pickup'
        : deliveryType === 'SUPERFAST_DELIVERY'
        ? 'Within 24 Hours (Express Courier)'
        : '3-4 Working Days';

    try {
      setSubmitting(true);
      const orderItems = items.map((item) => ({
        id: `item-${Date.now()}-${item.listingId}`,
        productId: item.listingId,
        sellerId: item.sellerId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.image,
      }));

      const newOrder = await api.createOrder({
        items: orderItems,
        totalAmount: grandTotal,
        paymentMethod:
          paymentOption === 'COD_PARTIAL'
            ? 'CASH_ON_DELIVERY_PARTIAL_ADVANCE'
            : paymentOption === 'ONLINE_UPI'
            ? 'ONLINE_UPI_100_PERCENT'
            : paymentOption === 'CARD'
            ? 'ONLINE_CARD_100_PERCENT'
            : 'ONLINE_NET_BANKING_100_PERCENT',
        pickupPoint: finalPickupPoint,
        institutionName: items[0]?.institutionName || 'Campus Hub',
        notes: pickupNotes.trim(),
        buyerPhone: phone.trim(),
        deliveryType,
        deliveryFee,
        platformFee,
        partialAdvanceAmount: paymentOption === 'COD_PARTIAL' ? codAdvanceAmount : 0,
        remainingCashAmount: paymentOption === 'COD_PARTIAL' ? codRemainingAmount : 0,
        estimatedDelivery: estimatedDeliveryTime,
        deliveryAddress: {
          recipientName: fullName.trim(),
          streetAddress: address.trim(),
          city: 'Bhubaneswar',
          stateCode: 'OD',
          pincode: pincode.trim(),
        },
      });

      setOrderComplete(newOrder);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to place campus order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS VIEW: Order Confirmation Screen
  if (orderComplete) {
    const isPickup = orderComplete.deliveryType === 'PICKUP';
    const isSuperfast = orderComplete.deliveryType === 'SUPERFAST_DELIVERY';
    const isCOD = orderComplete.paymentMethod === 'CASH_ON_DELIVERY_PARTIAL_ADVANCE';

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-10 shadow-xl text-center space-y-6">
          {/* Celebration Icon */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-lg shadow-emerald-500/10">
            <PackageCheck className="w-10 h-10 sm:w-11 sm:h-11" />
          </div>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Order Confirmed &amp; Verified</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#222222] mt-2">
              Order #{orderComplete.orderNumber} Placed Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
              Thank you for shopping on Stwapy. Your order has been securely registered in the Odisha Campus State Gateway.
            </p>
          </div>

          {/* DYNAMIC FULFILMENT STATUS CARD */}
          <div
            className={`rounded-2xl p-5 sm:p-6 text-left border ${
              isPickup
                ? 'bg-[#F1EAFE]/80 border-[#5423A5]/30'
                : isSuperfast
                ? 'bg-amber-50/80 border-amber-200'
                : 'bg-blue-50/80 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isPickup ? (
                <Building2 className="w-6 h-6 text-[#5423A5] shrink-0 mt-0.5" />
              ) : isSuperfast ? (
                <Zap className="w-6 h-6 text-[#FF7900] shrink-0 mt-0.5" />
              ) : (
                <Truck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-black text-[#222222] flex items-center justify-between">
                  <span>
                    {isPickup
                      ? '🏢 Campus Hand-to-Hand Pickup'
                      : isSuperfast
                      ? '⚡ Superfast 24-Hour Express Delivery'
                      : '🚚 Standard Campus Doorstep Delivery'}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#E5E7EB]">
                    {isPickup ? 'Free Pickup' : isSuperfast ? '24h Delivery' : '3-4 Working Days'}
                  </span>
                </h3>

                {isPickup ? (
                  <div className="text-xs text-slate-700 space-y-1">
                    <p>
                      <strong>Pickup Spot:</strong> {orderComplete.pickupPoint}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      The verified student seller has been notified. Please meet at the designated campus area for peer inspection and exchange.
                    </p>
                    {orderComplete.deliveryOtp && (
                      <div className="pt-2 flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-600">Exchange Verification OTP:</span>
                        <span className="px-3 py-1 bg-white font-mono font-black text-sm text-[#5423A5] rounded-lg border border-[#5423A5]/30 shadow-xs">
                          {orderComplete.deliveryOtp}
                        </span>
                        <span className="text-[10px] text-slate-400">(Share only after inspecting item)</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-slate-700 space-y-1">
                    <p>
                      <strong>Delivery Address:</strong> {orderComplete.deliveryAddress?.streetAddress}, PIN: {orderComplete.deliveryAddress?.pincode}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {isSuperfast
                        ? 'Priority Express Courier assigned! Your package will be delivered within 24 hours.'
                        : 'Your order will be safely delivered in 3-4 working days by verified campus courier.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PAYMENT BREAKDOWN SUMMARY CARD */}
          <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-[#E5E7EB] text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Order Reference</span>
              <span className="font-mono font-bold text-[#222222]">{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Recipient Name</span>
              <span className="font-bold text-[#222222]">{orderComplete.buyerName} ({orderComplete.buyerPhone})</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Payment Method</span>
              <span className="font-bold text-[#5423A5]">
                {isCOD
                  ? 'Cash on Delivery (20% Advance Paid Online)'
                  : orderComplete.paymentMethod === 'ONLINE_UPI_100_PERCENT'
                  ? '100% Cashless UPI'
                  : '100% Online Payment'}
              </span>
            </div>

            {isCOD ? (
              <div className="space-y-1.5 pt-1 bg-white p-3 rounded-xl border border-[#E5E7EB]">
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>✓ 20% Reservation Deposit Paid Online</span>
                  <span>₹{orderComplete.partialAdvanceAmount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#FF7900] font-black text-xs pt-1 border-t border-dashed border-[#E5E7EB]">
                  <span>Remaining 80% Cash to Pay on Handover</span>
                  <span>₹{orderComplete.remainingCashAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between pt-1">
                <span className="font-bold text-slate-900">Total Paid in Full</span>
                <span className="text-base font-black text-emerald-600">
                  ₹{orderComplete.totalAmount.toLocaleString('en-IN')} (Paid Online)
                </span>
              </div>
            )}
          </div>

          {/* Items Preview */}
          <div className="text-left space-y-2 border-t border-[#E5E7EB] pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Ordered Items ({orderComplete.items.length})
            </h4>
            <div className="space-y-2">
              {orderComplete.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#E5E7EB] text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={it.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80'}
                      alt={it.title}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E5E7EB] shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-[#222222] truncate">{it.title}</p>
                      <p className="text-[10px] text-[#6B7280]">Quantity: {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#222222] shrink-0">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <Link
              href="/dashboard?tab=orders"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-md shadow-[#5423A5]/25 text-center transition-all cursor-pointer"
            >
              Track Order in Dashboard
            </Link>
            <Link
              href="/"
              className="py-3 px-6 rounded-xl text-xs font-bold border border-[#E5E7EB] bg-white text-[#222222] hover:bg-[#F5F5F7] text-center transition-all cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MULTI-STEP CHECKOUT VIEW
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Breadcrumb & Title */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#5423A5] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-[#222222] mt-2">
          Campus Order Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
          Review your items, choose safe handover or delivery, and secure your campus exchange.
        </p>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="mb-8 bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-xs">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {/* Step 1 Tab */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all cursor-pointer ${
              currentStep === 1
                ? 'bg-[#F1EAFE] text-[#5423A5] font-black border border-[#5423A5]/30'
                : currentStep > 1
                ? 'text-emerald-700 font-bold hover:bg-emerald-50'
                : 'text-[#6B7280] font-medium'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 1
                  ? 'bg-[#5423A5] text-white'
                  : currentStep > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className="truncate">1. Items &amp; Platform Fee</span>
          </button>

          {/* Step 2 Tab */}
          <button
            type="button"
            onClick={() => {
              if (currentStep > 2) setCurrentStep(2);
            }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all ${
              currentStep === 2
                ? 'bg-[#F1EAFE] text-[#5423A5] font-black border border-[#5423A5]/30 cursor-pointer'
                : currentStep > 2
                ? 'text-emerald-700 font-bold hover:bg-emerald-50 cursor-pointer'
                : 'text-[#6B7280] font-medium opacity-60 cursor-not-allowed'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 2
                  ? 'bg-[#5423A5] text-white'
                  : currentStep > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <span className="truncate">2. Details &amp; Delivery</span>
          </button>

          {/* Step 3 Tab */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all ${
              currentStep === 3
                ? 'bg-[#F1EAFE] text-[#5423A5] font-black border border-[#5423A5]/30'
                : 'text-[#6B7280] font-medium opacity-60'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 3
                  ? 'bg-[#5423A5] text-white'
                  : 'bg-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              3
            </div>
            <span className="truncate">3. Payment &amp; Deposit</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: ORDER ITEMS & PLATFORM SECURITY FEE */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h2 className="text-sm font-bold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#5423A5]" />
                  <span>Review Items in Bag ({items.length})</span>
                </h2>
                <Link
                  href="/"
                  className="text-xs font-bold text-[#5423A5] hover:underline"
                >
                  + Add More Products
                </Link>
              </div>

              {/* Items List Stepper */}
              <div className="divide-y divide-[#E5E7EB] space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E5E7EB] shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#222222] line-clamp-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                          <span className="bg-[#F1EAFE] text-[#5423A5] font-semibold px-2 py-0.5 rounded">
                            {item.condition}
                          </span>
                          <span>•</span>
                          <span className="truncate">{item.institutionName || 'Campus Hub'}</span>
                        </div>
                        <p className="text-xs font-bold text-[#FF7900]">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 shrink-0">
                      <div className="flex items-center border border-[#E5E7EB] rounded-xl bg-[#F5F5F7] p-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.listingId, item.quantity - 1);
                            } else {
                              removeFromCart(item.listingId);
                            }
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-[#222222] shadow-xs cursor-pointer"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#222222]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.listingId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-[#222222] shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-black text-[#222222]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PLATFORM SECURITY & TRUST FEE EXPLANATION NOTE */}
            <div className="bg-gradient-to-r from-[#F1EAFE] to-purple-50 rounded-2xl border border-[#5423A5]/20 p-5 space-y-2 text-xs text-slate-800">
              <div className="flex items-center gap-2 text-[#5423A5] font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#5423A5]" />
                <span>Why is there a Stwapy Platform Protection Fee?</span>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                To guarantee a 100% verified student ecosystem, eliminate fraudulent items, and protect both buyers and sellers, Stwapy collects a nominal <strong>5% Platform Security &amp; Verification Fee</strong>. This funds our rigorous college KYC checks, anti-counterfeit protection, and campus dispute resolution coverage.
              </p>
              <div className="text-[11px] text-purple-900 bg-white/70 p-2.5 rounded-xl border border-purple-200/60 font-medium">
                🛡️ <em>This ensures sellers only list authentic, legitimate items and guarantees no fake bookings or scams across the university network. (Configurable centrally by Admin).</em>
              </div>
            </div>
          </div>

          {/* Right Column: Step 1 Price Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-xs sticky top-24">
              <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider pb-3 border-b border-[#E5E7EB]">
                Step 1: Price Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Items Subtotal ({items.length} items)</span>
                  <span className="font-bold text-[#222222]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-[#5423A5]">
                  <span className="flex items-center gap-1">
                    <span>Platform Trust &amp; Security Fee (5%)</span>
                  </span>
                  <span className="font-bold">₹{platformFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex justify-between text-sm">
                  <span className="font-bold text-[#222222]">Current Total</span>
                  <span className="text-lg font-black text-[#5423A5]">
                    ₹{(subtotal + platformFee).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Continue to Step 2 Button */}
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-lg shadow-[#5423A5]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Delivery Details (Step 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next: Choose Safe Campus Pickup or Doorstep Delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: BUYER DETAILS & FULFILMENT METHOD */}
      {currentStep === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Buyer Contact Form */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-bold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5423A5] text-white text-[11px] flex items-center justify-center">2</span>
                <span>Buyer Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#222222]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 text-[#222222]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#222222]">Phone Number (For Handover Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 text-[#222222]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#222222]">Delivery / Residential Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room 302, KP-7 Boys Hostel, KIIT Campus or Plot 45 Saheed Nagar"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 text-[#222222]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#222222]">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 751024"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full p-3 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 text-[#222222]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#222222]">Email Address</label>
                  <input
                    type="email"
                    readOnly
                    value={email}
                    className="w-full p-3 bg-slate-100 border border-[#E5E7EB] rounded-xl text-[#858585] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* FULFILMENT METHOD: PICKUP vs STANDARD DELIVERY vs SUPERFAST */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-bold text-[#222222] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#5423A5]" />
                  <span>Choose Fulfilment Method</span>
                </span>
                <span className="text-xs font-semibold text-[#5423A5]">Select one</span>
              </h2>

              <div className="space-y-3 text-xs">
                {/* 1. Free Campus Pickup */}
                <label
                  onClick={() => setDeliveryType('PICKUP')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryType === 'PICKUP'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/80 text-[#222222] font-bold shadow-xs'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7] text-[#6B7280]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#5423A5] shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#222222]">Campus Pickup (Self Handover)</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          FREE
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-normal">
                        Meet seller hand-to-hand at a safe, open campus landmark. Inspect before paying.
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="delivery_type"
                    checked={deliveryType === 'PICKUP'}
                    onChange={() => setDeliveryType('PICKUP')}
                    className="w-4 h-4 accent-[#5423A5]"
                  />
                </label>

                {/* 2. Standard Campus Delivery */}
                <label
                  onClick={() => setDeliveryType('STANDARD_DELIVERY')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryType === 'STANDARD_DELIVERY'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/80 text-[#222222] font-bold shadow-xs'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7] text-[#6B7280]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#222222]">Standard Campus Delivery</span>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          +₹40
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-normal">
                        Delivered to your hostel / doorstep in <strong>3-4 working days</strong> by verified runner.
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="delivery_type"
                    checked={deliveryType === 'STANDARD_DELIVERY'}
                    onChange={() => setDeliveryType('STANDARD_DELIVERY')}
                    className="w-4 h-4 accent-[#5423A5]"
                  />
                </label>

                {/* 3. Superfast Delivery */}
                <label
                  onClick={() => setDeliveryType('SUPERFAST_DELIVERY')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryType === 'SUPERFAST_DELIVERY'
                      ? 'border-[#FF7900] bg-[#FFF0E2]/80 text-[#222222] font-bold shadow-xs'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7] text-[#6B7280]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#FF7900] shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#222222]">Superfast Delivery (Express 24H)</span>
                        <span className="bg-orange-100 text-[#FF7900] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          +₹79
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-normal">
                        Priority express dispatch! Guaranteed doorstep delivery within <strong>24 hours</strong>.
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="delivery_type"
                    checked={deliveryType === 'SUPERFAST_DELIVERY'}
                    onChange={() => setDeliveryType('SUPERFAST_DELIVERY')}
                    className="w-4 h-4 accent-[#FF7900]"
                  />
                </label>
              </div>

              {/* If Campus Pickup is chosen, show Safe Campus Meeting Spot options */}
              {deliveryType === 'PICKUP' && (
                <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#222222]">Select Campus Meeting Landmark</label>
                    <span className="text-[10px] text-[#6B7280]">Well-lit public spaces</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Central Library Entrance',
                      'Main Campus Cafeteria',
                      'Security Gate / Visitors Lobby',
                      'Academic Block Canteen',
                      'Hostel Reception Lounge',
                      'Other',
                    ].map((spot) => (
                      <button
                        key={spot}
                        type="button"
                        onClick={() => setPickupPoint(spot)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                          pickupPoint === spot
                            ? 'border-[#5423A5] bg-[#F1EAFE] text-[#5423A5] font-bold'
                            : 'border-[#E5E7EB] bg-white text-[#222222] hover:bg-[#F5F5F7]'
                        }`}
                      >
                        <span>{spot}</span>
                        {pickupPoint === spot && <CheckCircle2 className="w-3.5 h-3.5 text-[#5423A5]" />}
                      </button>
                    ))}
                  </div>

                  {pickupPoint === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify custom spot (e.g., Near Campus 6 Food Court Gate)"
                      value={customPickup}
                      onChange={(e) => setCustomPickup(e.target.value)}
                      className="w-full p-2.5 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl text-xs text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20 mt-1"
                    />
                  )}

                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-semibold text-[#6B7280]">Special Handover Notes (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Free after 4 PM lecture, will meet outside reading hall"
                      value={pickupNotes}
                      onChange={(e) => setPickupNotes(e.target.value)}
                      className="w-full p-2.5 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl text-xs text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Step 2 Calculations & Next CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-xs sticky top-24">
              <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider pb-3 border-b border-[#E5E7EB]">
                Step 2: Price Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#222222]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#5423A5]">
                  <span>Platform Fee (5%)</span>
                  <span className="font-bold">₹{platformFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>
                    Fulfilment ({deliveryType === 'PICKUP' ? 'Campus Pickup' : deliveryType === 'SUPERFAST_DELIVERY' ? 'Superfast 24H' : 'Standard 3-4 Days'})
                  </span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-600' : 'text-[#222222]'}`}>
                    {deliveryFee === 0 ? 'FREE' : `+₹${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex justify-between text-sm">
                  <span className="font-bold text-[#222222]">Total Payable</span>
                  <span className="text-lg font-black text-[#5423A5]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#5423A5] hover:bg-[#35105F] text-white shadow-lg shadow-[#5423A5]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Payment (Step 3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold text-[#6B7280] hover:text-[#222222] hover:bg-[#F5F5F7] transition-all cursor-pointer"
                >
                  ← Back to Order Items
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT & PARTIAL 20% COMMITMENT DEPOSIT */}
      {currentStep === 3 && (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h2 className="text-sm font-bold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5423A5] text-white text-[11px] flex items-center justify-center">3</span>
                  <span>Payment &amp; Commitment Options</span>
                </h2>
                <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit Encrypted</span>
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* OPTION 1: Cash on Delivery with 20% Partial Advance */}
                <label
                  onClick={() => setPaymentOption('COD_PARTIAL')}
                  className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-all ${
                    paymentOption === 'COD_PARTIAL'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/70 shadow-sm'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#222222]">
                            Cash on Delivery (Pay 20% Advance Online)
                          </span>
                          <span className="bg-[#FFF0E2] text-[#FF7900] text-[10px] font-bold px-2 py-0.5 rounded">
                            Peer Commitment
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6B7280]">
                          Pay 20% commitment deposit now; remaining 80% physical cash upon inspection.
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentOption === 'COD_PARTIAL'}
                      onChange={() => setPaymentOption('COD_PARTIAL')}
                      className="w-4 h-4 accent-[#5423A5]"
                    />
                  </div>

                  {/* COD Partial Breakdown Callout */}
                  {paymentOption === 'COD_PARTIAL' && (
                    <div className="mt-1 pt-3 border-t border-[#5423A5]/20 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-emerald-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                            Pay Now Online (20%)
                          </span>
                          <span className="text-base font-black text-emerald-700">
                            ₹{codAdvanceAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Refundable reservation deposit</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-[#FF7900]/30">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7900] block">
                            Pay on Handover (80%)
                          </span>
                          <span className="text-base font-black text-[#222222]">
                            ₹{codRemainingAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Physical cash after inspecting</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-[#E5E7EB]">
                        🛡️ <strong>Why is 20% advance collected?</strong> To ensure mutual seriousness, prevent non-serious orders, and guarantee the seller brings or ships the product safely. If the item doesn&apos;t match specifications, your deposit is 100% refunded.
                      </div>
                    </div>
                  )}
                </label>

                {/* OPTION 2: Full Online UPI (Instant 100%) */}
                <label
                  onClick={() => setPaymentOption('ONLINE_UPI')}
                  className={`p-4 rounded-2xl border flex flex-col gap-2.5 cursor-pointer transition-all ${
                    paymentOption === 'ONLINE_UPI'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/70 shadow-sm'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#5423A5] shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#222222]">
                            Instant UPI (100% Cashless)
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            Fast &amp; Zero Cash
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6B7280]">
                          Google Pay, PhonePe, Paytm, BHIM, or Any Banking UPI
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentOption === 'ONLINE_UPI'}
                      onChange={() => setPaymentOption('ONLINE_UPI')}
                      className="w-4 h-4 accent-[#5423A5]"
                    />
                  </div>

                  {paymentOption === 'ONLINE_UPI' && (
                    <div className="pt-2 border-t border-[#5423A5]/20 space-y-2">
                      <label className="text-[11px] font-bold text-[#222222]">Enter Your UPI ID / VPA</label>
                      <input
                        type="text"
                        placeholder="e.g. 9876543210@paytm or yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-3 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#5423A5]/20"
                      />
                    </div>
                  )}
                </label>

                {/* OPTION 3: Debit / Credit Card */}
                <label
                  onClick={() => setPaymentOption('CARD')}
                  className={`p-4 rounded-2xl border flex flex-col gap-2.5 cursor-pointer transition-all ${
                    paymentOption === 'CARD'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/70 shadow-sm'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <span className="text-sm font-bold text-[#222222]">Debit / Credit Card</span>
                        <span className="text-[11px] text-[#6B7280] block">
                          Visa, MasterCard, RuPay, and Maestro supported
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentOption === 'CARD'}
                      onChange={() => setPaymentOption('CARD')}
                      className="w-4 h-4 accent-[#5423A5]"
                    />
                  </div>

                  {paymentOption === 'CARD' && (
                    <div className="pt-2 border-t border-[#5423A5]/20 grid grid-cols-2 gap-2">
                      <div className="col-span-2 space-y-1">
                        <label className="text-[11px] font-bold text-[#222222]">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#222222]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#222222]">Valid Thru</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#222222]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-[#222222]">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#222222]"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* OPTION 4: Net Banking */}
                <label
                  onClick={() => setPaymentOption('NET_BANKING')}
                  className={`p-4 rounded-2xl border flex flex-col gap-2.5 cursor-pointer transition-all ${
                    paymentOption === 'NET_BANKING'
                      ? 'border-[#5423A5] bg-[#F1EAFE]/70 shadow-sm'
                      : 'border-[#E5E7EB] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-slate-700 shrink-0" />
                      <div>
                        <span className="text-sm font-bold text-[#222222]">Net Banking</span>
                        <span className="text-[11px] text-[#6B7280] block">
                          Instant redirection to SBI, HDFC, ICICI, Axis, and all major Indian banks
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentOption === 'NET_BANKING'}
                      onChange={() => setPaymentOption('NET_BANKING')}
                      className="w-4 h-4 accent-[#5423A5]"
                    />
                  </div>

                  {paymentOption === 'NET_BANKING' && (
                    <div className="pt-2 border-t border-[#5423A5]/20 space-y-1">
                      <label className="text-[11px] font-bold text-[#222222]">Select Your Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#222222]"
                      >
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank (PNB)</option>
                        <option>Bank of Baroda</option>
                        <option>Canara Bank</option>
                      </select>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Final Order Total & Place Order Button */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-xs sticky top-24">
              <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider pb-3 border-b border-[#E5E7EB]">
                Step 3: Final Total
              </h3>

              <div className="space-y-2.5 text-xs text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#222222]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-[#5423A5]">
                  <span>Platform Security Fee (5%)</span>
                  <span className="font-bold">₹{platformFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Fulfilment Fee</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-600' : 'text-[#222222]'}`}>
                    {deliveryFee === 0 ? 'FREE' : `+₹${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex justify-between text-sm">
                  <span className="font-bold text-[#222222]">Grand Total</span>
                  <span className="text-lg font-black text-[#5423A5]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* If COD is selected, emphasize the 20% advance to pay now */}
                {paymentOption === 'COD_PARTIAL' ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1 mt-2">
                    <div className="flex justify-between font-black">
                      <span>Amount to Pay Now (20%):</span>
                      <span className="text-sm text-emerald-700">₹{codAdvanceAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Balance on Handover (80%):</span>
                      <span className="font-bold text-[#222222]">₹{codRemainingAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F1EAFE] rounded-xl border border-[#5423A5]/20 text-xs text-[#5423A5] flex justify-between font-bold mt-2">
                    <span>Pay 100% Cashless:</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Final Submit CTA Button in Stwapy Orange #FF7900 */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl text-xs sm:text-sm font-bold bg-[#FF7900] hover:bg-[#D96500] text-white shadow-lg shadow-[#FF7900]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'Confirming Campus Order...'
                      : paymentOption === 'COD_PARTIAL'
                      ? `Pay ₹${codAdvanceAmount.toLocaleString('en-IN')} Advance & Confirm Order`
                      : `Pay ₹${grandTotal.toLocaleString('en-IN')} & Confirm Order`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold text-[#6B7280] hover:text-[#222222] hover:bg-[#F5F5F7] transition-all cursor-pointer"
                >
                  ← Back to Details &amp; Fulfilment
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Verified Campus Handover Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
