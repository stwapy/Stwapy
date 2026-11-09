'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserAccountType,
  UserVerificationStatus,
  api,
  getStoredUser,
  getToken,
  setToken,
  setStoredUser,
  removeToken,
  isInstituteEmail,
  detectCollegeFromEmail,
} from '@/lib/api';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  signOutFirebase,
  onFirebaseAuthStateChanged,
  FirebaseUser,
} from '@/lib/firebase';

interface CompleteProfileData {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  accountType: UserAccountType;
  collegeName?: string;
  collegeIdNumber?: string;
  idCardImageUrl?: string;
  isCustomCollege?: boolean;
  collegeAddress?: string;
  district?: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  token: string | null;
  currentState: string;
  setCurrentState: (state: string) => void;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  loginWithEmailPassword: (email: string, pass: string) => Promise<any>;
  registerWithEmailPassword: (email: string, pass: string, fullName: string) => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  completeUserProfile: (profileData: CompleteProfileData) => Promise<User>;
  checkVerificationStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage helper to permanently save completed user profiles per email
function getPersistentProfile(email: string): Partial<User> | null {
  if (typeof window === 'undefined' || !email) return null;
  try {
    const raw = localStorage.getItem(`stwapy_profile_${email.toLowerCase().trim()}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePersistentProfile(email: string, profile: Partial<User>): void {
  if (typeof window === 'undefined' || !email) return;
  try {
    const existing = getPersistentProfile(email) || {};
    const merged = { ...existing, ...profile };
    localStorage.setItem(`stwapy_profile_${email.toLowerCase().trim()}`, JSON.stringify(merged));
  } catch (e) {
    console.error('Failed saving persistent profile:', e);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUserState] = useState<FirebaseUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [currentState, setCurrentState] = useState<string>('OD');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to merge stored profile attributes into a user instance
  const enrichUserWithProfile = (baseUser: User): User => {
    const profile = getPersistentProfile(baseUser.email);
    if (profile && profile.profileComplete) {
      return {
        ...baseUser,
        ...profile,
        fullName: profile.fullName || baseUser.fullName,
        phone: profile.phone || baseUser.phone,
        profileComplete: true,
      };
    }

    // Check if it's an institute domain email
    if (isInstituteEmail(baseUser.email)) {
      return {
        ...baseUser,
        collegeName: baseUser.collegeName || detectCollegeFromEmail(baseUser.email),
      };
    }

    return baseUser;
  };

  useEffect(() => {
    const existingToken = getToken();
    const existingUser = getStoredUser();

    if (existingToken && existingUser) {
      setTokenState(existingToken);
      const enriched = enrichUserWithProfile(existingUser);
      setUser(enriched);
      // Background refresh from Central Backend
      api.getMe()
        .then((res) => {
          if (res?.user) {
            const fresh = enrichUserWithProfile(res.user);
            setUser(fresh);
            setStoredUser(fresh);
          }
        })
        .catch(() => {
          // Keep existing session
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }

    // Subscribe to Firebase Auth State
    const unsubscribe = onFirebaseAuthStateChanged(async (fbUser) => {
      setFirebaseUserState(fbUser);
      if (fbUser && !user) {
        const idToken = await fbUser.getIdToken();
        const baseUser: User = {
          id: fbUser.uid,
          email: fbUser.email || '',
          fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Stwapy User',
          avatarUrl: fbUser.photoURL || undefined,
          role: 'STUDENT',
          status: 'ACTIVE',
          primaryState: 'OD',
          createdAt: new Date().toISOString(),
        };

        const enriched = enrichUserWithProfile(baseUser);
        setUser(enriched);
        setStoredUser(enriched);
        setToken(idToken);
        setTokenState(idToken);
      }
    });

    return () => unsubscribe();
  }, []);

  // 1. Google One-Click Login
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { user: fbUser, token: fbToken } = await signInWithGoogle();
      setFirebaseUserState(fbUser);

      try {
        const syncRes = await api.syncFirebaseUser({
          email: fbUser.email || '',
          fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User',
          avatarUrl: fbUser.photoURL || undefined,
          firebaseUid: fbUser.uid,
          primaryState: currentState || 'OD',
        });
        const enriched = enrichUserWithProfile(syncRes.user);
        setUser(enriched);
        setStoredUser(enriched);
        setTokenState(syncRes.tokens?.accessToken || fbToken);
        return { ...syncRes, user: enriched };
      } catch (backendErr) {
        console.warn('Central backend sync fallback:', backendErr);
        const fallbackUser: User = {
          id: fbUser.uid,
          email: fbUser.email || '',
          fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User',
          avatarUrl: fbUser.photoURL || undefined,
          role: 'STUDENT',
          status: 'ACTIVE',
          primaryState: currentState || 'OD',
          createdAt: new Date().toISOString(),
        };
        const enriched = enrichUserWithProfile(fallbackUser);
        setStoredUser(enriched);
        setToken(fbToken);
        setUser(enriched);
        setTokenState(fbToken);
        return { user: enriched, token: fbToken };
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Email & Password Login
  const loginWithEmailPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const { user: fbUser, token: fbToken } = await signInWithEmail(email, pass);
      setFirebaseUserState(fbUser);

      try {
        const syncRes = await api.syncFirebaseUser({
          email: fbUser.email || email,
          fullName: fbUser.displayName || email.split('@')[0],
          avatarUrl: fbUser.photoURL || undefined,
          firebaseUid: fbUser.uid,
          primaryState: currentState || 'OD',
        });
        const enriched = enrichUserWithProfile(syncRes.user);
        setUser(enriched);
        setStoredUser(enriched);
        setTokenState(syncRes.tokens?.accessToken || fbToken);
        return { ...syncRes, user: enriched };
      } catch (backendErr) {
        console.warn('Central backend sync fallback:', backendErr);
        const fallbackUser: User = {
          id: fbUser.uid,
          email: fbUser.email || email,
          fullName: fbUser.displayName || email.split('@')[0],
          role: 'STUDENT',
          status: 'ACTIVE',
          primaryState: currentState || 'OD',
          createdAt: new Date().toISOString(),
        };
        const enriched = enrichUserWithProfile(fallbackUser);
        setStoredUser(enriched);
        setToken(fbToken);
        setUser(enriched);
        setTokenState(fbToken);
        return { user: enriched, token: fbToken };
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Email & Password Registration
  const registerWithEmailPassword = async (email: string, pass: string, fullName: string) => {
    setIsLoading(true);
    try {
      const { user: fbUser, token: fbToken } = await signUpWithEmail(email, pass, fullName);
      setFirebaseUserState(fbUser);

      try {
        const syncRes = await api.syncFirebaseUser({
          email: fbUser.email || email,
          fullName: fullName.trim() || fbUser.displayName || email.split('@')[0],
          firebaseUid: fbUser.uid,
          primaryState: currentState || 'OD',
        });
        const enriched = enrichUserWithProfile(syncRes.user);
        setUser(enriched);
        setStoredUser(enriched);
        setTokenState(syncRes.tokens?.accessToken || fbToken);
        return { ...syncRes, user: enriched };
      } catch (backendErr) {
        console.warn('Central backend sync fallback:', backendErr);
        const fallbackUser: User = {
          id: fbUser.uid,
          email: fbUser.email || email,
          fullName: fullName.trim() || email.split('@')[0],
          role: 'STUDENT',
          status: 'ACTIVE',
          primaryState: currentState || 'OD',
          createdAt: new Date().toISOString(),
        };
        const enriched = enrichUserWithProfile(fallbackUser);
        setStoredUser(enriched);
        setToken(fbToken);
        setUser(enriched);
        setTokenState(fbToken);
        return { user: enriched, token: fbToken };
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Send Password Reset
  const resetPassword = async (email: string) => {
    await sendPasswordReset(email);
  };

  // Legacy direct login
  const login = async (email: string, pass: string) => {
    try {
      return await loginWithEmailPassword(email, pass);
    } catch {
      const res = await api.login(email, pass);
      const enriched = enrichUserWithProfile(res.user);
      setUser(enriched);
      setStoredUser(enriched);
      setTokenState(res.tokens.accessToken);
      return { ...res, user: enriched };
    }
  };

  const register = async (data: any) => {
    try {
      return await registerWithEmailPassword(data.email, data.password, data.fullName);
    } catch {
      const res = await api.register(data);
      const enriched = enrichUserWithProfile(res.user);
      setUser(enriched);
      setStoredUser(enriched);
      setTokenState(res.tokens.accessToken);
      return { ...res, user: enriched };
    }
  };

  const logout = async () => {
    try {
      await signOutFirebase();
    } catch {}
    api.logout();
    setUser(null);
    setFirebaseUserState(null);
    setTokenState(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      if (res?.user) {
        const enriched = enrichUserWithProfile(res.user);
        setUser(enriched);
        setStoredUser(enriched);
      }
    } catch {}
  };

  // 5. Complete Onboarding Profile Form
  const completeUserProfile = async (profileData: CompleteProfileData): Promise<User> => {
    if (!user) throw new Error('No user is currently authenticated.');

    const isInst = profileData.accountType === 'INSTITUTE_STUDENT';
    const isStud = profileData.accountType === 'STUDENT';

    let verificationStatus: UserVerificationStatus = 'NOT_APPLICABLE';
    let canSell = false;

    if (isInst) {
      verificationStatus = 'AUTO_VERIFIED';
      canSell = true;
    } else if (isStud) {
      verificationStatus = 'PENDING';
      canSell = false;
    } else {
      verificationStatus = 'NOT_APPLICABLE';
      canSell = false;
    }

    const updated: User = {
      ...user,
      fullName: profileData.fullName.trim() || user.fullName,
      phone: profileData.phone.trim(),
      alternatePhone: profileData.alternatePhone?.trim() || undefined,
      address: profileData.address.trim(),
      accountType: profileData.accountType,
      collegeName: profileData.collegeName?.trim() || undefined,
      collegeIdNumber: profileData.collegeIdNumber?.trim() || undefined,
      idCardImageUrl: profileData.idCardImageUrl || undefined,
      verificationStatus,
      canSell,
      profileComplete: true,
    };

    // Save permanently in cache so re-login never asks again
    savePersistentProfile(updated.email, {
      fullName: updated.fullName,
      phone: updated.phone,
      alternatePhone: updated.alternatePhone,
      address: updated.address,
      accountType: updated.accountType,
      collegeName: updated.collegeName,
      collegeIdNumber: updated.collegeIdNumber,
      idCardImageUrl: updated.idCardImageUrl,
      verificationStatus: updated.verificationStatus,
      canSell: updated.canSell,
      profileComplete: true,
    });

    setStoredUser(updated);
    setUser(updated);

    // If Institute student, ensure domain is registered in central backend
    if (isInst && updated.email) {
      api.detectCollege(updated.email).catch(e => console.warn('College auto-detect sync notice:', e));
    }

    // If Student registering with personal email, submit to Central & KYC sync
    if (isStud) {
      if (profileData.isCustomCollege) {
        try {
          await api.submitOtherCollege({
            collegeName: updated.collegeName || 'Custom College',
            collegeAddress: profileData.collegeAddress || updated.address || 'Not provided',
            district: profileData.district || 'Odisha',
            registrationNo: updated.collegeIdNumber || '',
            idCardUrl: updated.idCardImageUrl || '',
            studentName: updated.fullName,
          });
        } catch (err) {
          console.warn('Central submitOtherCollege notice:', err);
        }
      }

      try {
        await fetch('/api/kyc-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'SUBMIT_KYC',
            payload: {
              studentName: updated.fullName,
              email: updated.email,
              phone: updated.phone,
              alternatePhone: updated.alternatePhone,
              address: updated.address,
              college: updated.collegeName,
              enrollmentNumber: updated.collegeIdNumber,
              idCardImageUrl: updated.idCardImageUrl,
              isCustomCollege: profileData.isCustomCollege || false,
              collegeAddress: profileData.collegeAddress,
              district: profileData.district,
            },
          }),
        });
      } catch (err) {
        console.warn('KYC sync dispatch failed:', err);
      }
    }

    return updated;
  };

  // 6. Check KYC status with Central / Admin sync
  const checkVerificationStatus = async () => {
    if (!user || user.accountType !== 'STUDENT' || user.verificationStatus === 'AUTO_VERIFIED') return;
    try {
      const res = await fetch(`/api/kyc-sync?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data?.success && data?.data) {
        const kyc = data.data;
        if (kyc.status === 'VERIFIED' && user.verificationStatus !== 'VERIFIED') {
          const updated: User = {
            ...user,
            verificationStatus: 'VERIFIED',
            canSell: true,
          };
          setUser(updated);
          setStoredUser(updated);
          savePersistentProfile(updated.email, {
            verificationStatus: 'VERIFIED',
            canSell: true,
          });
        } else if (kyc.status === 'REJECTED' && user.verificationStatus !== 'REJECTED') {
          const updated: User = {
            ...user,
            verificationStatus: 'REJECTED',
            rejectionReason: kyc.rejectionReason,
            canSell: false,
          };
          setUser(updated);
          setStoredUser(updated);
          savePersistentProfile(updated.email, {
            verificationStatus: 'REJECTED',
            rejectionReason: kyc.rejectionReason,
            canSell: false,
          });
        }
      }
    } catch {
      // Background check failed gracefully
    }
  };

  // Periodic KYC check for pending students
  useEffect(() => {
    if (user && user.accountType === 'STUDENT' && user.verificationStatus === 'PENDING') {
      checkVerificationStatus();
      const interval = setInterval(checkVerificationStatus, 4000);
      const handleFocus = () => checkVerificationStatus();
      window.addEventListener('focus', handleFocus);
      return () => {
        clearInterval(interval);
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, [user?.email, user?.accountType, user?.verificationStatus]);

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        token,
        currentState,
        setCurrentState,
        isLoading,
        login,
        register,
        loginWithGoogle,
        loginWithEmailPassword,
        registerWithEmailPassword,
        resetPassword,
        logout,
        refreshUser,
        completeUserProfile,
        checkVerificationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
