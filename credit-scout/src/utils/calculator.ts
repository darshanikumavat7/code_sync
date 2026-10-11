import { Borrower, BorrowerMatch, TransactionReceipt, Currency } from '../types';

/**
 * Calculates simple risk-adjusted net profit percentage
 */
export function calculateNetProfit(nominalRate: number, defaultRisk: number): number {
  const prob = defaultRisk / 100;
  const net = (nominalRate * (1 - prob)) - (prob * 50);
  return Number(Math.max(0, net).toFixed(1));
}

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
 * Instant Matchmaker scoring (0 to 100%)
 */
export function calculateMatchScore(
  borrower: Borrower,
  riskLevel: number,
  capital: number
): number {
  const bRisk = getBorrowerRiskRating(borrower);
  const riskDelta = Math.abs(riskLevel - bRisk);
  const riskScore = Math.max(30, 100 - riskDelta * 14);

  // Capital bite-size fit (15% to 35% of total capital is ideal)
  const bite = borrower.loanAmount / capital;
  let capitalFit = 85;
  if (bite >= 0.12 && bite <= 0.45) capitalFit = 98;
  else if (bite < 0.12) capitalFit = Math.max(50, 95 - (0.12 - bite) * 200);
  else capitalFit = Math.max(40, 95 - (bite - 0.45) * 100);

  // Credit quality score
  const cibilScore = ((borrower.cibilScore - 600) / 300) * 100;

  const total = (riskScore * 0.5) + (capitalFit * 0.25) + (cibilScore * 0.25);
  return Math.min(99, Math.max(45, Math.round(total)));
}

/**
 * Smart Basket Split: Divides investor capital across top 5 safe borrowers
 */
export function computeSmartBasket(
  borrowers: Borrower[],
  riskLevel: number,
  capital: number
): BorrowerMatch[] {
  // Score all
  const scored = borrowers.map((b) => {
    const matchScore = calculateMatchScore(b, riskLevel, capital);
    return {
      borrower: b,
      matchScore,
      allocatedAmount: 0,
      allocationPercent: 0,
      basketRoleEn: '',
      basketRoleHi: '',
      basketRoleMr: '',
    };
  });

  // Sort descending by match score
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Top 5 split
  const top5 = scored.slice(0, 5);

  // Allocation weights inversely proportional to default risk
  const rawWeights = top5.map((m) => {
    const safetyMultiplier = 1 / (m.borrower.defaultRiskScore + 1);
    return m.matchScore * safetyMultiplier;
  });

  const sumWeights = rawWeights.reduce((a, b) => a + b, 0);
  const pcts = rawWeights.map((w) => Math.round((w / sumWeights) * 100));

  // Ensure sum equals 100%
  const totalPct = pcts.reduce((a, b) => a + b, 0);
  if (pcts.length > 0) {
    pcts[0] += (100 - totalPct);
  }

  // Assign roles
  const roles = [
    { en: 'Primary Anchor', hi: 'मुख्य सुरक्षा आधार', mr: 'मुख्य सुरक्षा आधार' },
    { en: 'Steady Cash Flow', hi: 'स्थिर नकद प्रवाह', mr: 'स्थिर रोकड प्रवाह' },
    { en: 'Balanced Growth', hi: 'संतुलित विकास', mr: 'संतुलित वाढ' },
    { en: 'Yield Contributor', hi: 'लाभ प्रदाता', mr: 'नफा देणारा' },
    { en: 'Diversification Layer', hi: 'विविधीकरण स्तर', mr: 'विविधीकरण स्तर' },
  ];

  top5.forEach((item, idx) => {
    item.allocationPercent = pcts[idx];
    item.allocatedAmount = Math.round((capital * pcts[idx]) / 100);
    item.basketRoleEn = roles[idx]?.en || 'Safe Split';
    item.basketRoleHi = roles[idx]?.hi || 'सुरक्षित विभाजन';
    item.basketRoleMr = roles[idx]?.mr || 'सुरक्षित विभाजन';
  });

  return scored;
}

/**
 * Compares 1-Year Returns with Traditional Bank Fixed Deposit (~6.0%)
 */
export function generateComparisonStats(capital: number, expectedYieldPct: number) {
  const bankFdRate = 0.06;
  const peerFundRate = expectedYieldPct / 100;

  const peerFundAnnualProfit = Math.round(capital * peerFundRate);
  const bankFdAnnualProfit = Math.round(capital * bankFdRate);
  const extraProfit = peerFundAnnualProfit - bankFdAnnualProfit;

  return {
    peerFundTotal: capital + peerFundAnnualProfit,
    peerFundProfit: peerFundAnnualProfit,
    bankFdTotal: capital + bankFdAnnualProfit,
    bankFdProfit: bankFdAnnualProfit,
    extraProfit,
    growthMultiplier: Number((peerFundRate / bankFdRate).toFixed(1)),
  };
}

/**
 * Currency Formatting helper for USD and INR
 */
export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'INR') {
    const inrVal = Math.round(amount * 84);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrVal);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates official PeerFund Transaction Receipt details
 */
export function generateOfficialReceipt(
  totalCapital: number,
  currency: Currency,
  top5Matches: BorrowerMatch[]
): TransactionReceipt {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const randomRef = 88000 + Math.floor(Math.random() * 9999);

  let weightedProfit = 0;
  top5Matches.forEach((m) => {
    weightedProfit += (m.borrower.expectedAnnualProfit * m.allocationPercent) / 100;
  });

  return {
    referenceId: `#PF-2026-${randomRef}`,
    date: dateStr,
    time: `${timeStr} IST`,
    totalCapital,
    currency,
    escrowStatus: 'SECURED & DEPLOYED',
    escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
    investorAadhaarRef: 'XXXX-XXXX-9418',
    borrowers: top5Matches.map((m) => ({
      borrowerId: m.borrower.id,
      borrowerName: m.borrower.name,
      businessName: m.borrower.businessName,
      allocatedAmount: m.allocatedAmount,
      allocationPercent: m.allocationPercent,
      cibilScore: m.borrower.cibilScore,
      expectedProfit: m.borrower.expectedAnnualProfit,
      loanPurpose: m.borrower.loanPurpose,
    })),
    totalExpectedAnnualProfit: Number(weightedProfit.toFixed(1)),
    verificationHash: 'SHA256: 7f8a91b4c3e2...8849ef201',
  };
}
