export type Language = 'en' | 'hi' | 'mr';
export type Currency = 'USD' | 'INR';

export interface CibilTrendPoint {
  month: string;
  score: number;
}

export interface RepaymentLog {
  id: string;
  month: string;
  amount: number;
  status: 'ON_TIME' | 'EARLY' | 'LATE';
  daysOverdue: number;
}

export interface Borrower {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  businessName: string;
  businessNameHi: string;
  businessNameMr: string;
  category: 'Retail' | 'Handloom & Textile' | 'Agri & Dairy' | 'Tech Services' | 'Logistics' | 'Artisan & Crafts' | 'Automotive' | 'Food Processing';
  categoryHi: string;
  categoryMr: string;
  location: string;
  locationHi: string;
  locationMr: string;
  region: 'Pune Metro' | 'PCMC Industrial' | 'Rural Outskirts';
  cibilScore: number; // 300 - 900
  cibilTrend: CibilTrendPoint[];
  loanAmountUsd: number;
  nominalInterestRate: number; // e.g. 14.5%
  defaultProbability: number; // e.g. 0.025 (2.5%)
  termMonths: number;
  pastRepaymentRate: number; // e.g. 100%
  pastRepaymentLogs: RepaymentLog[];
  monthlyRevenueUsd: number;
  debtToIncomeRatio: number; // e.g. 24%
  cashFlowStability: 'Excellent' | 'Strong' | 'Moderate';
  gstinVerified: boolean;
  udyamVerified: boolean;
  aadhaarKycVerified: boolean;
  avatarUrl: string;
  businessPhotoUrl: string;
  loanPurpose: string;
  loanPurposeHi: string;
  loanPurposeMr: string;
  aiRationaleEn: string;
  aiRationaleHi: string;
  aiRationaleMr: string;
}

export interface MatchResult {
  borrower: Borrower;
  matchScore: number; // 0 to 100
  netRoi: number; // Calculated via formula
  nominalInterestRate: number;
  defaultProbability: number;
  lossPenalty: number;
  allocatedAmountUsd: number;
  allocationPercent: number;
  basketTagEn: string;
  basketTagHi: string;
  basketTagMr: string;
}

export interface EscrowTransaction {
  txHash: string;
  blockNumber: number;
  timestamp: string;
  totalDeployedUsd: number;
  borrowerCount: number;
  projectedAnnualYield: number;
  contractAddress: string;
  status: 'CONFIRMED';
  investorDid: string;
}
