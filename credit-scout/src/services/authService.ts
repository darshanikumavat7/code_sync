import { AuthUser, StoredUserAccount, UserRole } from '../types';

const STORAGE_USERS_KEY = 'peerfund_registered_accounts';
const STORAGE_CURRENT_USER_KEY = 'peerfund_active_auth_user';

// Seed default accounts in localStorage if empty
function initializeStoredAccounts(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) return JSON.parse(raw);

    const defaultAccounts: StoredUserAccount[] = [
      {
        id: 'usr-inv-01',
        email: 'investor@peerfund.org',
        password: 'password123',
        name: 'Rajesh Mehta',
        role: 'investor',
        isEmailVerified: true,
        createdAt: '2026-10-10T10:00:00.000Z',
      },
      {
        id: 'usr-bor-01',
        email: 'borrower@peerfund.org',
        password: 'password123',
        name: 'Sunil Jagtap',
        role: 'borrower',
        isEmailVerified: true,
        createdAt: '2026-10-10T10:00:00.000Z',
      },
    ];

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(defaultAccounts));
    return defaultAccounts;
  } catch (e) {
    return [];
  }
}

/**
 * Returns current signed-in user from localStorage
 */
export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Persists current session user to localStorage
 */
export function setCurrentUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user:', e);
  }
}

/**
 * Register a new user with strictly 1 unique password per registered email
 * (Zero Rate Limits)
 */
export async function registerUser(params: {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}): Promise<{ success: boolean; user?: AuthUser; demoOtp?: string; error?: string }> {
  const email = params.email.trim().toLowerCase();
  const password = params.password.trim();
  const name = (params.name || '').trim() || email.split('@')[0];
  const role: UserRole = params.role || 'investor';

  // Client validation
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  // Check backend API first
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      // Also sync to localStorage
      saveAccountLocally({
        id: data.user.id,
        email,
        password,
        name,
        role,
        isEmailVerified: false,
        createdAt: data.user.createdAt,
      });

      return { success: true, user: data.user, demoOtp: data.demoOtp };
    }

    if (!data.success && data.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn('Backend API unreachable, using resilient LocalStorage fallback:', err);
  }

  // LocalStorage Fallback (ensures 100% Zero-Rate-Limit operation)
  const accounts = initializeStoredAccounts();
  const exists = accounts.find((a) => a.email.toLowerCase() === email);

  if (exists) {
    return { 
      success: false, 
      error: 'An account with this email is already registered. Please sign in or use another email.' 
    };
  }

  const newUserAccount: StoredUserAccount = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9),
    email,
    password,
    name,
    role,
    isEmailVerified: false,
    createdAt: new Date().toISOString(),
  };

  accounts.push(newUserAccount);
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));

  const authUser: AuthUser = {
    id: newUserAccount.id,
    email: newUserAccount.email,
    name: newUserAccount.name,
    role: newUserAccount.role,
    isEmailVerified: false,
    createdAt: newUserAccount.createdAt,
  };

  return { success: true, user: authUser, demoOtp: '123456' };
}

/**
 * Sign in user with Email & Password
 * (Zero Rate Limits)
 */
export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; user?: AuthUser; demoOtp?: string; error?: string }> {
  const email = params.email.trim().toLowerCase();
  const password = params.password.trim();

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setCurrentUser(data.user);
      return { success: true, user: data.user, demoOtp: data.demoOtp };
    }

    if (!data.success && data.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn('Backend login API unreachable, checking LocalStorage accounts:', err);
  }

  // LocalStorage Fallback
  const accounts = initializeStoredAccounts();
  const account = accounts.find((a) => a.email.toLowerCase() === email);

  if (!account) {
    return { success: false, error: 'No account found with this email. Please create a new account.' };
  }

  if (account.password !== password) {
    return { success: false, error: 'Incorrect password. Please verify and try again.' };
  }

  const authUser: AuthUser = {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    isEmailVerified: account.isEmailVerified,
    createdAt: account.createdAt,
  };

  setCurrentUser(authUser);
  return { 
    success: true, 
    user: authUser, 
    demoOtp: authUser.isEmailVerified ? undefined : '123456' 
  };
}

/**
 * Dispatches 6-digit verification OTP (with demo code 123456)
 */
export async function sendEmailOtp(email: string): Promise<{ success: boolean; demoOtp: string; message: string }> {
  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, demoOtp: data.demoOtp || '123456', message: data.message };
    }
  } catch (err) {
    console.warn('Backend send-otp unreachable, using demo OTP 123456:', err);
  }

  return { 
    success: true, 
    demoOtp: '123456', 
    message: 'Demo OTP: 123456 generated with zero rate limits.' 
  };
}

/**
 * Validates 6-digit OTP and verifies email
 */
export async function verifyEmailOtp(
  email: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  const cleanOtp = otp.trim();
  const cleanEmail = email.trim().toLowerCase();

  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp: cleanOtp }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      updateLocalUserVerification(cleanEmail);
      return { success: true };
    }

    if (!data.success && data.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn('Backend verify-otp unreachable, validating locally:', err);
  }

  // Demo master OTP check
  if (cleanOtp === '123456') {
    updateLocalUserVerification(cleanEmail);
    return { success: true };
  }

  return { success: false, error: 'Invalid OTP code. In demo mode, use 123456.' };
}

/**
 * Logout current active session
 */
export function logoutUser() {
  setCurrentUser(null);
}

function saveAccountLocally(account: StoredUserAccount) {
  try {
    const accounts = initializeStoredAccounts();
    const idx = accounts.findIndex((a) => a.email.toLowerCase() === account.email.toLowerCase());
    if (idx >= 0) {
      accounts[idx] = account;
    } else {
      accounts.push(account);
    }
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save account locally:', e);
  }
}

function updateLocalUserVerification(email: string) {
  try {
    const accounts = initializeStoredAccounts();
    const acc = accounts.find((a) => a.email.toLowerCase() === email);
    if (acc) {
      acc.isEmailVerified = true;
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
    }

    const current = getCurrentUser();
    if (current && current.email.toLowerCase() === email) {
      current.isEmailVerified = true;
      setCurrentUser(current);
    }
  } catch (e) {
    console.error('Failed to update verification locally:', e);
  }
}
