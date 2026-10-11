export type Language = 'en' | 'hi' | 'mr';
export type Currency = 'USD' | 'INR';

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
  loanAmount: number; // in USD
  expectedAnnualProfit: number; // Plain Net Profit (e.g., 11.8%)
  nominalInterestRate: number; // Raw Interest (e.g., 13.5%)
  defaultRiskScore: number; // e.g. 1.8%
  loanTenureMonths: number;
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
}

export interface BorrowerMatch {
  borrower: Borrower;
  matchScore: number; // 0 to 100%
  allocatedAmount: number;
  allocationPercent: number;
  basketRoleEn: string;
  basketRoleHi: string;
  basketRoleMr: string;
}

export interface TransactionReceipt {
  referenceId: string; // e.g. #PF-2026-88941
  date: string;
  time: string;
  totalCapital: number;
  currency: Currency;
  escrowStatus: 'SECURED & DEPLOYED' | 'CONFIRMED';
  escrowPartnerBank: string;
  investorAadhaarRef: string;
  borrowers: {
    borrowerId: string;
    borrowerName: string;
    businessName: string;
    allocatedAmount: number;
    allocationPercent: number;
    cibilScore: number;
    expectedProfit: number;
    loanPurpose: string;
  }[];
  totalExpectedAnnualProfit: number;
  verificationHash: string;
}
