import { Borrower, MatchResult } from '../types';

/**
 * Calculates Risk-Adjusted Net ROI Formula:
 * Net Expected ROI = (Interest Rate * (1 - Default Probability)) - (Default Probability * 50% Loss Penalty)
 */
export function calculateNetRoi(nominalRate: number, defaultProb: number): number {
  const netRoi = (nominalRate * (1 - defaultProb)) - (defaultProb * 50);
  return Math.max(0, Number(netRoi.toFixed(2)));
}

/**
 * Estimates a borrower's intrinsic risk profile on a 1-10 scale
 */
export function getBorrowerRiskTier(borrower: Borrower): number {
  // Lower CIBIL & higher default probability -> higher risk tier (10)
  if (borrower.cibilScore >= 800) return 1.5;
  if (borrower.cibilScore >= 770) return 2.5;
  if (borrower.cibilScore >= 740) return 4.5;
  if (borrower.cibilScore >= 710) return 6.5;
  if (borrower.cibilScore >= 680) return 8.5;
  return 9.8;
}

/**
 * Dynamic Utility Match Score (0 to 100)
 * Evaluates risk affinity, capital bite size, credit stability, and net yield
 */
export function calculateMatchScore(
  borrower: Borrower,
  investorRisk: number, // 1 to 10
  investmentCapital: number // $2,000 to $25,000
): number {
  const borrowerRisk = getBorrowerRiskTier(borrower);
  
  // 1. Risk Affinity (45%)
  const riskDelta = Math.abs(investorRisk - borrowerRisk);
  const riskAffinity = Math.max(0, 100 - riskDelta * 13.5);

  // 2. Capital Bite-Size Fit (20%)
  // Ideal ratio: a single borrower takes 15% to 35% of total investor capital
  const biteRatio = borrower.loanAmountUsd / investmentCapital;
  let capitalFit = 75;
  if (biteRatio >= 0.12 && biteRatio <= 0.40) {
    capitalFit = 96;
  } else if (biteRatio < 0.12) {
    capitalFit = Math.max(50, 96 - (0.12 - biteRatio) * 200);
  } else {
    capitalFit = Math.max(40, 96 - (biteRatio - 0.40) * 120);
  }

  // 3. Credit Quality & Past Repayment (20%)
  const cibilScoreNorm = Math.min(100, Math.max(0, ((borrower.cibilScore - 600) / 300) * 100));
  const creditScore = (cibilScoreNorm * 0.6) + (borrower.pastRepaymentRate * 0.4);

  // 4. Yield Opportunity (15%)
  const netRoi = calculateNetRoi(borrower.nominalInterestRate, borrower.defaultProbability);
  const yieldScore = Math.min(100, Math.max(50, (netRoi / 18) * 100));

  const totalScore = (
    riskAffinity * 0.45 +
    capitalFit * 0.20 +
    creditScore * 0.20 +
    yieldScore * 0.15
  );

  return Math.min(99, Math.max(35, Math.round(totalScore)));
}

/**
 * Determines portfolio basket tag based on borrower role in top 5
 */
function getBasketTag(
  index: number,
  borrower: Borrower
): { en: string; hi: string; mr: string } {
  if (borrower.cibilScore >= 780 || index === 0) {
    return {
      en: 'Core Anchor',
      hi: 'मुख्य सुरक्षा आधार',
      mr: 'मुख्य सुरक्षा आधार',
    };
  }
  if (borrower.nominalInterestRate >= 18) {
    return {
      en: 'Alpha Booster',
      hi: 'अल्फा बूस्टर (उच्च लाभ)',
      mr: 'अल्फा बूस्टर (उच्च नफा)',
    };
  }
  if (borrower.category === 'Agri & Dairy' || borrower.category === 'Retail') {
    return {
      en: 'Defensive Cash Flow',
      hi: 'सुरक्षित नकद प्रवाह',
      mr: 'सुरक्षित रोकड सुलभता',
    };
  }
  return {
    en: 'Growth Mid-Cap',
    hi: 'मध्यम वृद्धि विकल्प',
    mr: 'मध्यम वाढ पर्याय',
  };
}

/**
 * Smart Basket Diversification Engine:
 * Computes optimal capital split across top 5 matches
 */
export function computeSmartBasket(
  borrowers: Borrower[],
  investorRisk: number,
  investmentCapital: number
): MatchResult[] {
  // Score all borrowers
  const scored = borrowers.map((b) => {
    const matchScore = calculateMatchScore(b, investorRisk, investmentCapital);
    const netRoi = calculateNetRoi(b.nominalInterestRate, b.defaultProbability);
    const lossPenalty = Number((b.defaultProbability * 50).toFixed(2));

    return {
      borrower: b,
      matchScore,
      netRoi,
      nominalInterestRate: b.nominalInterestRate,
      defaultProbability: b.defaultProbability,
      lossPenalty,
      allocatedAmountUsd: 0,
      allocationPercent: 0,
      basketTagEn: '',
      basketTagHi: '',
      basketTagMr: '',
    };
  });

  // Sort descending by matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Take top 5 for smart basket
  const topMatches = scored.slice(0, 5);

  // Compute allocation weights: proportional to (matchScore / (defaultProb * 100))
  // Safety bias: lower default probability receives higher weight
  const rawWeights = topMatches.map((m) => {
    const safetyMultiplier = 1 / (m.defaultProbability * 50 + 0.5);
    return m.matchScore * safetyMultiplier;
  });

  const sumWeights = rawWeights.reduce((acc, w) => acc + w, 0);

  // Distribute capital with minimum 10% and maximum 35% cap
  let allocatedPercentages = rawWeights.map((w) => Math.round((w / sumWeights) * 100));

  // Normalize percentages to sum to exactly 100%
  const totalAlloc = allocatedPercentages.reduce((a, b) => a + b, 0);
  const diff = 100 - totalAlloc;
  if (allocatedPercentages.length > 0) {
    allocatedPercentages[0] += diff;
  }

  // Assign to top 5
  topMatches.forEach((item, idx) => {
    const pct = allocatedPercentages[idx] || 20;
    item.allocationPercent = pct;
    item.allocatedAmountUsd = Math.round((investmentCapital * pct) / 100);
    const tags = getBasketTag(idx, item.borrower);
    item.basketTagEn = tags.en;
    item.basketTagHi = tags.hi;
    item.basketTagMr = tags.mr;
  });

  // Return full list with top 5 having allocations
  return scored;
}

/**
 * 12-Month Compounded Returns Projection vs Bank Fixed Deposit (6.0%)
 */
export interface MonthlyGrowthPoint {
  month: number;
  monthName: string;
  creditScoutValue: number;
  creditScoutProfit: number;
  bankFdValue: number;
  bankFdProfit: number;
  alphaDelta: number;
}

export function generate12MonthGrowth(
  capitalUsd: number,
  portfolioNetRoiPct: number
): { points: MonthlyGrowthPoint[]; totalAlphaUsd: number; totalCreditScoutProfit: number } {
  const bankFdAnnualRate = 0.06; // 6.0% Fixed Deposit
  const p2pMonthlyRate = (portfolioNetRoiPct / 100) / 12;
  const fdMonthlyRate = bankFdAnnualRate / 12;

  const monthNames = [
    'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6',
    'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12',
  ];

  const points: MonthlyGrowthPoint[] = [];

  for (let m = 1; m <= 12; m++) {
    // Compounded monthly
    const csVal = capitalUsd * Math.pow(1 + p2pMonthlyRate, m);
    const fdVal = capitalUsd * Math.pow(1 + fdMonthlyRate, m);

    const csProfit = csVal - capitalUsd;
    const fdProfit = fdVal - capitalUsd;
    const alpha = csProfit - fdProfit;

    points.push({
      month: m,
      monthName: monthNames[m - 1],
      creditScoutValue: Math.round(csVal),
      creditScoutProfit: Math.round(csProfit),
      bankFdValue: Math.round(fdVal),
      bankFdProfit: Math.round(fdProfit),
      alphaDelta: Math.round(alpha),
    });
  }

  const finalPoint = points[points.length - 1];
  return {
    points,
    totalAlphaUsd: finalPoint ? finalPoint.alphaDelta : 0,
    totalCreditScoutProfit: finalPoint ? finalPoint.creditScoutProfit : 0,
  };
}

/**
 * Currency Formatting helper for USD and INR
 */
export function formatCurrency(
  amountUsd: number,
  currency: 'USD' | 'INR'
): string {
  if (currency === 'INR') {
    const inrAmount = Math.round(amountUsd * 84);
    // Indian formatting (e.g. ₹8,40,000)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrAmount);
  }
  // USD
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amountUsd);
}
