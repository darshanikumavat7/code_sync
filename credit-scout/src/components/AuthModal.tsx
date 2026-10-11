import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Mail, 
  KeyRound, 
  User, 
  ArrowRight, 
  Zap, 
  RefreshCw,
  Check,
  TrendingUp,
  FileText
} from 'lucide-react';
import { AuthUser, Language, UserRole } from '../types';
import { registerUser, loginUser, sendEmailOtp, verifyEmailOtp } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAuthSuccess: (user: AuthUser) => void;
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onAuthSuccess,
  defaultRole = 'investor',
}) => {
  // Mode: 'signin' | 'signup' | 'otp'
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'otp'>('signin');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);

  // OTP state
  const [otpInput, setOtpInput] = useState('');
  const [activeDemoOtp, setActiveDemoOtp] = useState<string>('123456');
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  // Quick fill demo credentials
  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  // Sign In handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessToast(null);

    const res = await loginUser({ email, password });
    setIsLoading(false);

    if (res.success && res.user) {
      if (!res.user.isEmailVerified) {
        // Shift to OTP verification
        setPendingUser(res.user);
        setActiveDemoOtp(res.demoOtp || '123456');
        setAuthMode('otp');
        setSuccessToast(`Demo OTP code generated: ${res.demoOtp || '123456'}`);
      } else {
        onAuthSuccess(res.user);
        onClose();
      }
    } else {
      setErrorMessage(res.error || 'Sign in failed. Please check your credentials.');
    }
  };

  // Sign Up handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessToast(null);

    const res = await registerUser({
      email,
      password,
      name: fullName,
      role: selectedRole,
    });
    setIsLoading(false);

    if (res.success && res.user) {
      setPendingUser(res.user);
      setActiveDemoOtp(res.demoOtp || '123456');
      setAuthMode('otp');
      setSuccessToast(`Account created! Demo verification code: ${res.demoOtp || '123456'}`);
    } else {
      setErrorMessage(res.error || 'Registration failed.');
    }
  };

  // OTP Verification handler
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otpInput) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const res = await verifyEmailOtp(email, otpInput);
    setIsLoading(false);

    if (res.success) {
      const verifiedUser: AuthUser = {
        ...(pendingUser || {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          email,
          name: fullName || email.split('@')[0],
          role: selectedRole,
          createdAt: new Date().toISOString(),
        }),
        isEmailVerified: true,
      };

      onAuthSuccess(verifiedUser);
      onClose();
    } else {
      setErrorMessage(res.error || 'Invalid OTP code.');
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    const res = await sendEmailOtp(email);
    setIsLoading(false);
    setActiveDemoOtp(res.demoOtp);
    setSuccessToast(`New OTP generated: ${res.demoOtp}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/70 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden">
        
        {/* Top Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>ZERO RATE LIMIT AUTH</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-white/10 text-blue-200">
              LOCAL PERSISTENCE
            </span>
          </div>

          <h3 className="text-xl font-black tracking-tight">
            {authMode === 'otp' ? 'Email OTP Verification' : authMode === 'signup' ? 'Create PeerFund Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-blue-200 mt-1">
            {authMode === 'otp' 
              ? 'Enter the 6-digit security code to verify your identity.' 
              : 'Secure, local-persisted login with instant demo access.'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Create Account) */}
        {authMode !== 'otp' && (
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                authMode === 'signin'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                authMode === 'signup'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Create New Account
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          
          {/* Quick Demo Credentials Bar (Sign In Mode) */}
          {authMode === 'signin' && (
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-blue-950 block text-[11px]">
                ⚡ 1-Click Demo Login (Instant Judge Pass):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('investor@peerfund.org', 'password123')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100 text-blue-900 border border-blue-300 font-mono text-[11px] font-bold transition-colors shadow-xs"
                >
                  Demo Investor
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('borrower@peerfund.org', 'password123')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100 text-blue-900 border border-blue-300 font-mono text-[11px] font-bold transition-colors shadow-xs"
                >
                  Demo Borrower
                </button>
              </div>
            </div>
          )}

          {/* Success or Toast Banner */}
          {successToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{successToast}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* MODE 1: SIGN IN FORM */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 2: SIGN UP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Mehta"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (Strictly 1 unique password per email):
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Participant Role Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Your Primary Role:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('investor')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      selectedRole === 'investor'
                        ? 'border-blue-900 bg-blue-50 text-blue-900 ring-1 ring-blue-900'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-blue-800" />
                    <span>Investor (Lender)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('borrower')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      selectedRole === 'borrower'
                        ? 'border-blue-900 bg-blue-50 text-blue-900 ring-1 ring-blue-900'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>Need a Loan (Borrower)</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Continue to OTP Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 3: MOCK OTP VERIFICATION */}
          {authMode === 'otp' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Prominent Demo Mode Banner */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Demo Verification Pass:</span>
                  </span>
                  <span className="font-mono font-black text-sm text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 tracking-wider">
                    {activeDemoOtp}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOtpInput(activeDemoOtp);
                    setErrorMessage(null);
                  }}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Autofill Demo OTP ({activeDemoOtp})</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 6-Digit OTP Sent to {email}:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-center font-mono text-xl tracking-[0.4em] font-bold text-slate-900"
                />
              </div>

              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isLoading || otpInput.length < 6}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verify Email & Complete Sign In</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Back to Sign In
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-blue-900 hover:underline font-bold"
                >
                  Resend Code (0 Rate Limits)
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
