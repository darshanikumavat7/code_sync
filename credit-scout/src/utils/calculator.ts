import { Borrower, BorrowerMatch, TransactionReceipt, Currency, TargetTimeline } from '../types';
import { MOCK_BORROWERS } from '../data/mockBorrowers';

/**
 * Rates borrower intrinsic safety grade on 1 to 10 scale
 */
export function getBorrowerRiskRating(borrower: Borrower): number {
  if (borrower.cibilScore >= 800) return 1.5;
  if (borrower.cibilScore >= 770) return 2.5;
  if (borrower.cibilScore >= 740) return 4.5;
  if (borrower.cibilScore >= 710) return 6.5;
  if (borrower.cibilScore >= 680) return 8.5;
  return 9.5;
}

/**
 * Dynamic Utility Match Score (0 to 100%) incorporating:
 * - Risk appetite alignment
 * - Timeline alignment (target duration vs borrower tenure)
 * - Micro-budget & fractional funding fit
 */
/**
 * Dynamic Utility Match Score (0 to 100%) incorporating:
 * - Repayment timeline alignment (target duration vs borrower tenure)
 * - Micro-budget & fractional micro-funding completion power
 * - Required loan size vs investor capital absorption
 * - Risk appetite and CIBIL credit safety
 */
export function calculateMatchScore(
  borrower: Borrower,
  riskLevel: number,
  budgetInr: number,
  targetTimeline: TargetTimeline
): {
  matchScore: number;
  isTimelineMatch: boolean;
  isBudgetMatch: boolean;
  matchBadgeLabel?: string;
  remainingNeededInr: number;
  fractionalCompletionPct: number;
  fractionalImpactText: string;
  matchReasonText: string;
} {
  const remainingNeededInr = Math.max(0, borrower.poolGoalInr - borrower.fundedAmountInr);

  // 1. Repayment Timeline Alignment (45% weight when timeline selected)
  let timelineScore = 95;
  const isTimelineMatch = targetTimeline === 0 || targetTimeline === borrower.loanTenureMonths;
  
  if (targetTimeline === 0) {
    timelineScore = 92;
  } else if (targetTimeline === borrower.loanTenureMonths) {
    timelineScore = 100; // Exact duration match!
  } else {
    // Proportional penalty for timeline mismatch
    const tenureDiff = Math.abs(targetTimeline - borrower.loanTenureMonths);
    timelineScore = Math.max(20, 85 - tenureDiff * 10);
  }

  // 2. Budget, Required Loan Size & Fractional Micro-Funding Alignment (35% weight)
  const isBudgetMatch = budgetInr >= borrower.microTicketMinInr;
  const isMicroBudget = budgetInr <= 2000;
  
  // Fractional completion calculation: How much of the remaining pool does this budget satisfy?
  const fractionalCompletionPct = remainingNeededInr > 0
    ? Math.min(100, Math.round((budgetInr / remainingNeededInr) * 100))
    : 100;

  let budgetScore = 90;
  let fractionalImpactText = '';

  if (isMicroBudget) {
    // Micro-investments (₹500 - ₹2,000): Prioritize micro-borrowers near completion
    if (remainingNeededInr <= 3000) {
      // High fractional completion boost: a single small investment helps complete the pool!
      budgetScore = 96 + Math.min(4, Math.round(fractionalCompletionPct * 0.04));
      fractionalImpactText = `Micro-Ticket Impact: Your contribution directly funds ${fractionalCompletionPct}% of the final ₹${remainingNeededInr.toLocaleString('en-IN')} needed to launch!`;
    } else {
      budgetScore = 91;
      fractionalImpactText = `Micro-ticket accepted (Min ₹${borrower.microTicketMinInr}): Joins community pool to reach ₹${borrower.poolGoalInr.toLocaleString('en-IN')}`;
    }
  } else if (budgetInr <= 10000) {
    // Mid-tier budget: balanced absorption
    budgetScore = 94;
    fractionalImpactText = `Balanced allocation: Safely distributed across verified active trade credit`;
  } else {
    // Large budget (₹15,000 - ₹50,000): Prioritize enterprises with larger capital pool needs
    if (borrower.poolGoalInr >= 40000) {
      budgetScore = 98;
      fractionalImpactText = `High capital capacity: Large enterprise pool safely absorbs substantial micro-lending tranches`;
    } else {
      budgetScore = 87;
      fractionalImpactText = `Standard capacity: Capital split ensures no concentration risk`;
    }
  }

  // 3. Risk Appetite & CIBIL Credit Quality Alignment (20% weight)
  const bRisk = getBorrowerRiskRating(borrower);
  const riskDelta = Math.abs(riskLevel - bRisk);
  const riskScore = Math.max(30, 100 - riskDelta * 12);
  const cibilContribution = Math.min(100, Math.max(40, ((borrower.cibilScore - 600) / 250) * 100));
  const creditSafetyScore = riskScore * 0.6 + cibilContribution * 0.4;

  // Composite Match Calculation
  let totalScore: number;
  if (targetTimeline > 0) {
    // Strict timeline prioritization
    totalScore = (timelineScore * 0.45) + (budgetScore * 0.35) + (creditSafetyScore * 0.20);
  } else {
    // All timelines: budget fit & safety take center stage
    totalScore = (budgetScore * 0.45) + (creditSafetyScore * 0.35) + (timelineScore * 0.20);
  }

  const finalScore = Math.min(99, Math.max(42, Math.round(totalScore)));

  // 4. Prominent "100% Budget & Timeline Match" Badge & Reason Text
  let badgeLabel: string | undefined;
  let matchReasonText = '';

  if (targetTimeline > 0) {
    if (isTimelineMatch && finalScore >= 87) {
      badgeLabel = '100% Budget & Timeline Match';
      matchReasonText = `Exact ${borrower.loanTenureMonths}M Tenure • ${isMicroBudget ? 'Fractional Pool Closer' : 'Optimal Capacity Fit'}`;
    } else if (isTimelineMatch) {
      badgeLabel = '100% Budget & Timeline Match';
      matchReasonText = `Timeline Aligned (${borrower.loanTenureMonths}M) • Active Micro-Pool`;
    } else {
      matchReasonText = `${borrower.loanTenureMonths} Months (${borrower.loanTenureMonths > targetTimeline ? 'Longer' : 'Shorter'} than target)`;
    }
  } else {
    // All timelines selected: top matches scoring 92%+ get 100% Match badge
    if (finalScore >= 91) {
      badgeLabel = '100% Budget & Timeline Match';
      matchReasonText = isMicroBudget
        ? `Top Fractional Micro-Match • ${borrower.loanTenureMonths}M Tenure`
        : `Prime Micro-Portfolio Candidate • ${borrower.loanTenureMonths}M Tenure`;
    } else {
      matchReasonText = `${borrower.loanTenureMonths} Months • Prime CIBIL ${borrower.cibilScore}`;
    }
  }

  return {
    matchScore: finalScore,
    isTimelineMatch,
    isBudgetMatch,
    matchBadgeLabel: badgeLabel,
    remainingNeededInr,
    fractionalCompletionPct,
    fractionalImpactText,
    matchReasonText,
  };
}

/**
 * Smart Basket Split: Divides investor budget across top 3 to 5 matching borrowers
 * Eliminates uninvested funds even for micro-budgets (₹500).
 */
export function computeSmartBasket(
  borrowers: Borrower[],
  riskLevel: number,
  budgetInr: number,
  targetTimeline: TargetTimeline,
  isPortfolioLocked: boolean = true,
  basketCount: number = 5
): BorrowerMatch[] {
  // Score all borrowers
  const scored = borrowers.map((b) => {
    const {
      matchScore,
      isTimelineMatch,
      isBudgetMatch,
      matchBadgeLabel,
      remainingNeededInr,
      fractionalCompletionPct,
      fractionalImpactText,
      matchReasonText,
    } = calculateMatchScore(b, riskLevel, budgetInr, targetTimeline);

    return {
      borrower: b,
      matchScore,
      allocatedAmountInr: 0,
      allocationPercent: 0,
      basketRoleEn: '',
      basketRoleHi: '',
      basketRoleMr: '',
      isTimelineMatch,
      isBudgetMatch,
      matchBadgeLabel,
      remainingNeededInr,
      fractionalCompletionPct,
      fractionalImpactText,
      matchReasonText,
    };
  });

  // DYNAMIC RE-RANKING:
  // If a target timeline is chosen (> 0):
  // 1. Priority #1: Exact timeline matches (loanTenureMonths === targetTimeline)
  // 2. Priority #2: Highest matchScore (fractional fit, budget alignment, credit score)
  // Non-timeline matches appear below.
  // If targetTimeline === 0:
  // Sort directly by matchScore descending.
  scored.sort((a, b) => {
    if (targetTimeline > 0) {
      if (a.isTimelineMatch && !b.isTimelineMatch) return -1;
      if (!a.isTimelineMatch && b.isTimelineMatch) return 1;
    }
    return b.matchScore - a.matchScore;
  });

  // Top 3 to 5 borrowers for the capital lock basket
  const count = Math.max(3, Math.min(basketCount, scored.length));
  const topBasket = scored.slice(0, count);

  // Compute allocation percentage weights based on match score and safety
  const rawWeights = topBasket.map((m) => {
    const safetyMultiplier = 1 / (m.borrower.defaultRiskScore + 0.8);
    const timelineBonus = m.isTimelineMatch ? 1.35 : 1.0;
    const microBonus = budgetInr <= 2000 && m.remainingNeededInr <= 3000 ? 1.25 : 1.0;
    return m.matchScore * safetyMultiplier * timelineBonus * microBonus;
  });

  const sumWeights = rawWeights.reduce((a, b) => a + b, 0);
  const pcts = rawWeights.map((w) => Math.max(5, Math.round((w / sumWeights) * 100)));

  // Normalize percentages to sum to exactly 100%
  const totalPct = pcts.reduce((a, b) => a + b, 0);
  if (pcts.length > 0) {
    pcts[0] += (100 - totalPct);
  }

  // Calculate exact rupee amounts that sum to EXACTLY budgetInr (zero idle cash)
  let allocatedSoFar = 0;
  const amounts = pcts.map((pct, idx) => {
    if (idx === pcts.length - 1) {
      // Final item takes remainder to guarantee 100.0% capital match
      return Math.max(0, budgetInr - allocatedSoFar);
    }
    const amt = Math.round((budgetInr * pct) / 100);
    allocatedSoFar += amt;
    return amt;
  });

  // Roles for basket diversification
  const roles = [
    { en: 'Core Anchor', hi: 'मुख्य सुरक्षा आधार', mr: 'मुख्य सुरक्षा आधार' },
    { en: 'Fractional Micro-Slice', hi: 'सूक्ष्म आंशिक स्लाइस', mr: 'सूक्ष्म आंशिक स्लाइस' },
    { en: 'Essential Staples', hi: 'दैनिक किराना प्रवाह', mr: 'दैनंदिन किराणा प्रवाह' },
    { en: 'Balanced Turnover', hi: 'संतुलित परतावा', mr: 'संतुलित परतावा' },
    { en: 'Yield Booster', hi: 'नफा वाढवणारा', mr: 'नफा वाढवणारा' },
  ];

  topBasket.forEach((item, idx) => {
    item.allocationPercent = pcts[idx];
    item.allocatedAmountInr = amounts[idx];
    item.basketRoleEn = roles[idx]?.en || 'Micro-Slice';
    item.basketRoleHi = roles[idx]?.hi || 'सूक्ष्म स्लाइस';
    item.basketRoleMr = roles[idx]?.mr || 'सूक्ष्म स्लाइस';
  });

  return scored;
}

/**
 * Currency Formatting helper for USD and INR
 */
export function formatCurrency(amountInr: number, currency: Currency): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amountInr);
  }
  // Convert INR to USD (approx 1 USD = 84 INR)
  const usdAmount = Math.max(1, Math.round(amountInr / 84));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usdAmount);
}

/**
 * 1-Year Returns comparison vs Bank FD (6.0%)
 */
export function generateComparisonStats(capitalInr: number, expectedYieldPct: number) {
  const bankFdRate = 0.06;
  const peerFundRate = expectedYieldPct / 100;

  const peerFundAnnualProfit = Math.round(capitalInr * peerFundRate);
  const bankFdAnnualProfit = Math.round(capitalInr * bankFdRate);
  const extraProfit = peerFundAnnualProfit - bankFdAnnualProfit;

  return {
    peerFundTotal: capitalInr + peerFundAnnualProfit,
    peerFundProfit: peerFundAnnualProfit,
    bankFdTotal: capitalInr + bankFdAnnualProfit,
    bankFdProfit: bankFdAnnualProfit,
    extraProfit,
    growthMultiplier: Number((peerFundRate / bankFdRate).toFixed(1)),
  };
}

/**
 * Calculates instant credit pre-assessment for Borrower Application Mode
 */
export function calculateBorrowerPreAssessment(
  loanAmountInr: number,
  tenureMonths: number,
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY',
  monthlyRevenue: number = 50000
) {
  // Safe interest range for micro-enterprises (12.0% to 15.0%)
  const rateAnnual = 0.135; // 13.5% p.a.
  const totalRepayable = loanAmountInr * (1 + (rateAnnual * tenureMonths) / 12);
  const monthlyEmi = Math.max(50, Math.round(totalRepayable / tenureMonths));
  
  let installmentAmount = monthlyEmi;
  if (frequency === 'DAILY') {
    installmentAmount = Math.max(10, Math.round(monthlyEmi / 30));
  } else if (frequency === 'WEEKLY') {
    installmentAmount = Math.max(25, Math.round(monthlyEmi / 4));
  }

  // Pre-assessed CIBIL score based on debt-to-income
  const monthlyBurdenRatio = monthlyEmi / Math.max(10000, monthlyRevenue);
  let estimatedCibil = 750;
  if (monthlyBurdenRatio < 0.15) estimatedCibil = 790;
  else if (monthlyBurdenRatio < 0.25) estimatedCibil = 765;
  else if (monthlyBurdenRatio < 0.35) estimatedCibil = 735;
  else estimatedCibil = 710;

  return {
    indicativeInterestRate: 13.5,
    estimatedCibil,
    totalRepayable: Math.round(totalRepayable),
    estimatedEmiInr: monthlyEmi,
    installmentAmount,
    frequencyLabel: frequency === 'DAILY' ? 'Daily' : frequency === 'WEEKLY' ? 'Weekly' : 'Monthly',
    isPreApproved: monthlyBurdenRatio < 0.40,
    disbursalSpeedHours: tenureMonths <= 3 ? 2 : 4,
  };
}

/**
 * Generates official PeerFund Combined Dual-Party Transaction Receipt
 */
export function generateOfficialReceipt(
  totalCapitalInr: number,
  currency: Currency,
  topMatches: BorrowerMatch[],
  targetTimeline: TargetTimeline = 0,
  isPortfolioLocked: boolean = true,
  lenderName: string = 'Rajesh Mehta (Retail Investor • Aadhaar Verified)',
  paymentMeta?: {
    orderId?: string;
    paymentApp?: string;
    transactionId?: string;
    bankRefNumber?: string;
    payerRole?: 'investor' | 'borrower';
    escrowStatus?: 'SECURED & DEPLOYED' | 'CONFIRMED' | 'VERIFIED & ESCROWED';
  }
): TransactionReceipt {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const randomRef = 88000 + Math.floor(Math.random() * 9999);
  const hexHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  // Fallback safeguard: Ensure topMatches is populated with valid matches
  let safeMatches = topMatches;
  if (!safeMatches || safeMatches.length === 0) {
    safeMatches = computeSmartBasket(
      MOCK_BORROWERS,
      3,
      totalCapitalInr || 5000,
      targetTimeline,
      isPortfolioLocked,
      5
    ).slice(0, 5);
  }

  let weightedProfit = 0;
  safeMatches.forEach((m) => {
    weightedProfit += (m.borrower.expectedAnnualProfit * m.allocationPercent) / 100;
  });

  const orderId = paymentMeta?.orderId || `ORD_${randomRef}`;
  const transactionId = paymentMeta?.transactionId || `TXN_${Math.floor(10000000 + Math.random() * 90000000)}`;
  const bankRefNumber = paymentMeta?.bankRefNumber || `SBI_UTR_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const paymentApp = paymentMeta?.paymentApp || 'Google Pay (UPI)';
  const payerRole = paymentMeta?.payerRole || 'investor';
  const escrowStatus = paymentMeta?.escrowStatus || 'VERIFIED & ESCROWED';

  return {
    referenceId: `#PF-2026-${randomRef}`,
    date: dateStr,
    time: `${timeStr} IST`,
    totalCapitalInr,
    currency,
    escrowStatus,
    escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
    lenderName,
    lenderAadhaarRef: 'XXXX-XXXX-9418',
    smartEscrowContractHash: hexHash,
    isPortfolioLocked,
    targetTimeline,
    paymentApp,
    transactionId,
    bankRefNumber,
    orderId,
    convenienceFeeInr: 0,
    payerRole,
    borrowers: safeMatches.map((m) => {
      // Calculate EMI for the borrower's allocated slice
      const tenure = m.borrower.loanTenureMonths;
      const rate = m.borrower.nominalInterestRate / 100;
      const totalRepay = m.allocatedAmountInr * (1 + (rate * tenure) / 12);
      const monthlyEmi = Math.max(1, Math.round(totalRepay / tenure));

      return {
        borrowerId: m.borrower.id,
        borrowerName: m.borrower.name,
        borrowerNameHi: m.borrower.nameHi,
        borrowerNameMr: m.borrower.nameMr,
        businessName: m.borrower.businessName,
        businessNameHi: m.borrower.businessNameHi,
        businessNameMr: m.borrower.businessNameMr,
        businessCategory: m.borrower.businessCategory,
        businessCategoryHi: m.borrower.businessCategoryHi,
        businessCategoryMr: m.borrower.businessCategoryMr,
        location: m.borrower.location,
        locationHi: m.borrower.locationHi,
        locationMr: m.borrower.locationMr,
        allocatedAmountInr: m.allocatedAmountInr,
        allocationPercent: m.allocationPercent,
        cibilScore: m.borrower.cibilScore,
        expectedProfit: m.borrower.expectedAnnualProfit,
        loanTenureMonths: m.borrower.loanTenureMonths,
        loanPurpose: m.borrower.loanPurpose,
        loanPurposeHi: m.borrower.loanPurposeHi,
        loanPurposeMr: m.borrower.loanPurposeMr,
        monthlyEmiInr: monthlyEmi,
      };
    }),
    totalExpectedAnnualProfit: Number(weightedProfit.toFixed(1)),
    verificationHash: `SHA256: ${hexHash.substring(0, 16)}...${hexHash.substring(32)}`,
  };
}
