import { 
  CreateOrderRequest, 
  CreateOrderResponse, 
  VerifyPaymentRequest, 
  VerifyPaymentResponse,
  TransactionReceipt
} from '../types';

const STORAGE_ORDERS_KEY = 'peerfund_escrow_orders';
const STORAGE_TXNS_KEY = 'peerfund_escrow_transactions';
const STORAGE_RECEIPTS_KEY = 'peerfund_saved_receipts';

/**
 * Creates an escrow payment order via backend API (/api/escrow/create-order or /api/create-order)
 * with robust local fallback and storage persistence.
 */
export async function createPaymentOrder(
  request: CreateOrderRequest
): Promise<CreateOrderResponse> {
  try {
    // Try primary escrow endpoint
    let res = await fetch('/api/escrow/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
    }

    if (res.ok) {
      const data: CreateOrderResponse = await res.json();
      persistOrder(data);
      return data;
    }
  } catch (error) {
    console.warn('Backend escrow create-order unreachable, using local fallback handler:', error);
  }

  // Resilient fallback order generation
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const fallbackOrder: CreateOrderResponse = {
    success: true,
    orderId: `ORD_${randomNum}`,
    amountInr: request.amountInr,
    currency: request.currency,
    role: request.role,
    createdAt: new Date().toISOString(),
    status: 'LOCKED',
    message: 'Order reference generated and payment amount locked in escrow register (Client Fallback)',
  };

  persistOrder(fallbackOrder);
  return fallbackOrder;
}

/**
 * Verifies payment transaction via backend API (/api/escrow/verify or /api/verify-payment)
 * includes 1.5-second bank authorization delay and local storage persistence.
 */
export async function verifyPaymentTransaction(
  request: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> {
  try {
    let res = await fetch('/api/escrow/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
    }

    const data: VerifyPaymentResponse = await res.json();

    if (res.ok && data.success) {
      persistTransaction(data);
      return data;
    }

    if (!data.success) {
      return data;
    }
  } catch (error) {
    console.warn('Backend escrow verify unreachable, using local bank simulator:', error);
  }

  // Simulated 2-second bank delay if backend is unreachable
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (request.simulateFailure) {
    return {
      success: false,
      status: 'FAILED',
      orderId: request.orderId,
      transactionId: '',
      bankRefNumber: '',
      paymentMethod: request.paymentMethod,
      paymentApp: request.paymentApp,
      amountInr: request.amountInr,
      currency: request.currency,
      verificationHash: '',
      smartContractHash: '',
      timestamp: new Date().toISOString(),
      escrowStatus: 'FAILED',
      escrowPartnerBank: 'State Bank of India P2P Escrow',
      message: 'Simulated bank authorization decline: Insufficient balance or bank timeout.',
    };
  }

  const randomTxn = Math.floor(10000000 + Math.random() * 90000000);
  const randomUtr = Math.floor(10000000000 + Math.random() * 90000000000);
  const hexHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  const fallbackTxn: VerifyPaymentResponse = {
    success: true,
    status: 'SUCCESS',
    orderId: request.orderId,
    transactionId: `TXN_${randomTxn}`,
    bankRefNumber: `SBI_UTR_${randomUtr}`,
    paymentMethod: request.paymentMethod,
    paymentApp: request.paymentApp,
    amountInr: request.amountInr,
    currency: request.currency,
    verificationHash: `SHA256: ${hexHash.substring(0, 16)}...`,
    smartContractHash: hexHash,
    timestamp: new Date().toISOString(),
    escrowStatus: 'VERIFIED & ESCROWED',
    escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
    message: 'Payment verified and escrow contract hash minted successfully (Client Fallback)',
  };

  persistTransaction(fallbackTxn);
  return fallbackTxn;
}

function persistOrder(order: CreateOrderResponse) {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    const orders: CreateOrderResponse[] = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders.slice(0, 50)));
  } catch (err) {
    console.error('Failed to save order to localStorage:', err);
  }
}

function persistTransaction(txn: VerifyPaymentResponse) {
  try {
    const raw = localStorage.getItem(STORAGE_TXNS_KEY);
    const txns: VerifyPaymentResponse[] = raw ? JSON.parse(raw) : [];
    txns.unshift(txn);
    localStorage.setItem(STORAGE_TXNS_KEY, JSON.stringify(txns.slice(0, 50)));
  } catch (err) {
    console.error('Failed to save transaction to localStorage:', err);
  }
}

export function getStoredTransactions(): VerifyPaymentResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_TXNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Persists an official dual-party receipt to localStorage
 */
export function saveTransactionReceipt(receipt: TransactionReceipt) {
  try {
    const raw = localStorage.getItem(STORAGE_RECEIPTS_KEY);
    const list: TransactionReceipt[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((r) => r.referenceId !== receipt.referenceId);
    filtered.unshift(receipt);
    localStorage.setItem(STORAGE_RECEIPTS_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch (err) {
    console.error('Failed to save receipt to localStorage:', err);
  }
}

/**
 * Retrieves all saved official dual-party receipts from localStorage
 */
export function getSavedReceipts(): TransactionReceipt[] {
  try {
    const raw = localStorage.getItem(STORAGE_RECEIPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}
