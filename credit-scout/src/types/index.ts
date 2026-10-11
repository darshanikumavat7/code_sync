export type Language = 'en' | 'hi' | 'mr';
export type Currency = 'USD' | 'INR';
export type TargetTimeline = 0 | 1 | 3 | 6 | 12 | 24; // 0 = All Timelines

export interface CibilTrendPoint {
  month: string;
  score: number;
}

export interface RepaymentLog {
  id: string;
  date: string;
  amount: number;
  status: 'PAID_ON_TIME' | 'PAID_EARLY';
}

export interface Borrower {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  businessName: string;
  businessNameHi: string;
  businessNameMr: string;
  businessCategory: string;
  businessCategoryHi: string;
  businessCategoryMr: string;
  location: string;
  locationHi: string;
  locationMr: string;
  cibilScore: number; // 300 to 900
  cibilHistory: CibilTrendPoint[];
  loanAmount: number; // in USD (approx equivalent)
  poolGoalInr: number; // Total loan request in INR (e.g., ₹25,000)
  fundedAmountInr: number; // Amount funded so far
  fundingProgressPct: number; // e.g. 92%
  microTicketMinInr: number; // Min micro investment e.g. ₹500
  expectedAnnualProfit: number; // Plain Net Profit (e.g., 11.8%)
  nominalInterestRate: number; // Raw Interest (e.g., 13.5%)
  defaultRiskScore: number; // e.g. 1.8%
  loanTenureMonths: 1 | 3 | 6 | 12 | 24;
  cashFlowStability: 'High Stability' | 'Good Stability' | 'Moderate';
  cashFlowStabilityHi: string;
  cashFlowStabilityMr: string;
  pastRepaymentRecord: string; // e.g. "100% On Time (18/18 EMIs)"
  pastRepaymentRecordHi: string;
  pastRepaymentRecordMr: string;
  repaymentLogs: RepaymentLog[];
  loanPurpose: string;
  loanPurposeHi: string;
  loanPurposeMr: string;
  monthlyRevenue: number;
  aadhaarVerified: boolean;
  panVerified: boolean;
  gstVerified: boolean;
  udyamVerified: boolean;
  avatarUrl: string;
  recommendationReasonEn: string;
  recommendationReasonHi: string;
  recommendationReasonMr: string;
  isNewListing?: boolean;
}

export interface BorrowerMatch {
  borrower: Borrower;
  matchScore: number; // 0 to 100%
  allocatedAmountInr: number;
  allocationPercent: number;
  basketRoleEn: string;
  basketRoleHi: string;
  basketRoleMr: string;
  isTimelineMatch: boolean;
  isBudgetMatch: boolean;
  matchBadgeLabel?: string;
  remainingNeededInr: number;
  fractionalCompletionPct?: number;
  fractionalImpactText?: string;
  matchReasonText?: string;
}

export type UserRole = 'investor' | 'borrower';
export type PortalTab = 'marketplace' | 'portfolio' | 'receipts' | 'assistant';
export type WizardStep = 1 | 2 | 3 | 4;

export interface ReceiptBorrowerDetail {
  borrowerId: string;
  borrowerName: string;
  borrowerNameHi?: string;
  borrowerNameMr?: string;
  businessName: string;
  businessNameHi?: string;
  businessNameMr?: string;
  businessCategory: string;
  businessCategoryHi?: string;
  businessCategoryMr?: string;
  location: string;
  locationHi?: string;
  locationMr?: string;
  allocatedAmountInr: number;
  allocationPercent: number;
  cibilScore: number;
  expectedProfit: number;
  loanTenureMonths: number;
  loanPurpose: string;
  loanPurposeHi?: string;
  loanPurposeMr?: string;
  monthlyEmiInr: number;
}

export type PaymentMethod = 'upi' | 'netbanking' | 'card';

export interface CreateOrderRequest {
  amountInr: number;
  currency: Currency;
  role: UserRole;
  lenderName?: string;
  notes?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  amountInr: number;
  currency: Currency;
  role: UserRole;
  createdAt: string;
  status: 'LOCKED' | 'CREATED';
  message: string;
}

export interface VerifyPaymentRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentApp: string;
  payerUpiOrAccount?: string;
  amountInr: number;
  currency: Currency;
  role: UserRole;
  simulateFailure?: boolean;
}

export interface VerifyPaymentResponse {
  success: boolean;
  status: 'SUCCESS' | 'FAILED';
  orderId: string;
  transactionId: string;
  bankRefNumber: string;
  paymentMethod: PaymentMethod;
  paymentApp: string;
  amountInr: number;
  currency: Currency;
  verificationHash: string;
  smartContractHash: string;
  timestamp: string;
  escrowStatus: string;
  escrowPartnerBank: string;
  message?: string;
}

export interface TransactionReceipt {
  referenceId: string; // e.g. #PF-2026-88941
  date: string;
  time: string;
  totalCapitalInr: number;
  currency: Currency;
  escrowStatus: 'SECURED & DEPLOYED' | 'CONFIRMED' | 'VERIFIED & ESCROWED';
  status?: string;
  escrowPartnerBank: string;
  lenderName: string;
  lenderAadhaarRef: string;
  smartEscrowContractHash: string;
  isPortfolioLocked: boolean;
  targetTimeline: TargetTimeline;
  borrowers: ReceiptBorrowerDetail[];
  totalExpectedAnnualProfit: number;
  verificationHash: string;
  // Payment Gateway Enhancements
  paymentApp: string;
  transactionId: string;
  bankRefNumber: string;
  orderId: string;
  convenienceFeeInr: number;
  payerRole: UserRole;
  repaymentScheduleSummary?: string;
}

export interface BorrowerApplication {
  applicantName: string;
  businessName: string;
  businessCategory: string;
  location: string;
  monthlyRevenue: number;
  loanAmountInr: number;
  loanPurpose: string;
  loanTenureMonths: 1 | 3 | 6 | 12 | 24;
  repaymentFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  aadhaarNumber: string;
  panNumber: string;
  estimatedCibil: number;
  indicativeInterestRate: number;
  estimatedEmiInr: number;
  estimatedDailyInr: number;
  applicationRefId: string;
  submissionDate: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface StoredUserAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  fullName?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface NewBorrowerApplicationRequest {
  fullName: string;
  email: string;
  mobile?: string;
  phone?: string;
  cityArea: string; // e.g. Pimpri, Chinchwad, Kothrud
  businessName: string;
  businessCategory: string;
  requestedAmountInr: number; // 500 to 50000
  purpose: string;
  tenureMonths: 1 | 3 | 6 | 12 | 24;
  monthlyIncomeInr: number;
  cibilSelfDeclaration: number;
  documentMockName?: string;
  mockDocUploaded?: string;
}
