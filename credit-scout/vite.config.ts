import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { MOCK_BORROWERS } from './src/data/mockBorrowers.ts';

// In-memory mock databases for persistence in dev server
const mockOrdersDb = new Map<string, any>();
const mockTransactionsDb = new Map<string, any>();
const mockUsersDb = new Map<string, any>();
const mockOtpsDb = new Map<string, string>();
const mockBorrowersDb = new Map<string, any>();

// Seed default demo accounts
mockUsersDb.set('investor@peerfund.org', {
  id: 'usr-inv-01',
  email: 'investor@peerfund.org',
  password: 'password123',
  name: 'Rajesh Mehta',
  role: 'investor',
  isEmailVerified: true,
  createdAt: '2026-10-10T10:00:00.000Z',
});

mockUsersDb.set('borrower@peerfund.org', {
  id: 'usr-bor-01',
  email: 'borrower@peerfund.org',
  password: 'password123',
  name: 'Sunil Jagtap',
  role: 'borrower',
  isEmailVerified: true,
  createdAt: '2026-10-10T10:00:00.000Z',
});

function peerfundBackendPlugin(): Plugin {
  return {
    name: 'peerfund-backend-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        const url = new URL(req.url, 'http://localhost:5173');

        // Helper to read JSON request body
        const readBody = (): Promise<any> => {
          return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                resolve(JSON.parse(body || '{}'));
              } catch (e) {
                reject(e);
              }
            });
            req.on('error', reject);
          });
        };

        const sendJson = (status: number, data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = status;
          res.end(JSON.stringify(data));
        };

        // ---------------------------------------------------------------------
        // 1. AUTH: POST /api/auth/register
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/auth/register' && req.method === 'POST') {
          try {
            const data = await readBody();
            const email = (data.email || '').trim().toLowerCase();
            const password = (data.password || '').trim();
            const name = (data.name || '').trim();
            const role = data.role === 'borrower' ? 'borrower' : 'investor';

            if (!email || !email.includes('@')) {
              return sendJson(400, { success: false, error: 'Please provide a valid email address.' });
            }
            if (!password || password.length < 6) {
              return sendJson(400, { success: false, error: 'Password must be at least 6 characters long.' });
            }

            // Ensure strictly 1 unique password per registered email (unique email constraint)
            if (mockUsersDb.has(email)) {
              return sendJson(400, { 
                success: false, 
                error: 'An account with this email already exists. Please sign in or use a different email.' 
              });
            }

            const newUser = {
              id: 'usr_' + Math.random().toString(36).substring(2, 9),
              email,
              password,
              name: name || email.split('@')[0],
              role,
              isEmailVerified: false,
              createdAt: new Date().toISOString(),
            };

            mockUsersDb.set(email, newUser);
            const demoOtp = '123456';
            mockOtpsDb.set(email, demoOtp);

            return sendJson(200, {
              success: true,
              user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                isEmailVerified: false,
                createdAt: newUser.createdAt,
              },
              demoOtp,
              message: 'Account created! Please verify with the demo OTP: 123456.',
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Malformed registration payload.' });
          }
        }

        // ---------------------------------------------------------------------
        // 2. AUTH: POST /api/auth/login
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/auth/login' && req.method === 'POST') {
          try {
            const data = await readBody();
            const email = (data.email || '').trim().toLowerCase();
            const password = (data.password || '').trim();

            if (!email || !password) {
              return sendJson(400, { success: false, error: 'Please enter both email and password.' });
            }

            const user = mockUsersDb.get(email);
            if (!user) {
              return sendJson(401, { 
                success: false, 
                error: 'No account registered with this email. Please create a new account.' 
              });
            }

            if (user.password !== password) {
              return sendJson(401, { 
                success: false, 
                error: 'Incorrect password. Please verify your credentials and try again.' 
              });
            }

            // Generate demo OTP for verification if unverified
            let demoOtp = undefined;
            if (!user.isEmailVerified) {
              demoOtp = '123456';
              mockOtpsDb.set(email, demoOtp);
            }

            return sendJson(200, {
              success: true,
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
              },
              demoOtp,
              message: user.isEmailVerified 
                ? 'Sign in successful!' 
                : 'Account requires OTP verification. Demo OTP: 123456.',
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Malformed login payload.' });
          }
        }

        // ---------------------------------------------------------------------
        // 3. AUTH: POST /api/auth/send-otp
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/auth/send-otp' && req.method === 'POST') {
          try {
            const data = await readBody();
            const email = (data.email || '').trim().toLowerCase();

            if (!email || !email.includes('@')) {
              return sendJson(400, { success: false, error: 'Valid email required for OTP dispatch.' });
            }

            const demoOtp = '123456';
            mockOtpsDb.set(email, demoOtp);

            return sendJson(200, {
              success: true,
              demoOtp,
              message: `Verification OTP dispatched (Zero Rate Limits). Demo Code: ${demoOtp}`,
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Failed to send OTP.' });
          }
        }

        // ---------------------------------------------------------------------
        // 4. AUTH: POST /api/auth/verify-otp
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/auth/verify-otp' && req.method === 'POST') {
          try {
            const data = await readBody();
            const email = (data.email || '').trim().toLowerCase();
            const otp = (data.otp || '').trim();

            const storedOtp = mockOtpsDb.get(email) || '123456';

            if (otp === '123456' || otp === storedOtp) {
              let user = mockUsersDb.get(email);
              if (user) {
                user.isEmailVerified = true;
                mockUsersDb.set(email, user);
              } else {
                user = {
                  id: 'usr_' + Math.random().toString(36).substring(2, 9),
                  email,
                  name: email.split('@')[0],
                  role: 'investor',
                  isEmailVerified: true,
                  createdAt: new Date().toISOString(),
                };
                mockUsersDb.set(email, user);
              }

              return sendJson(200, {
                success: true,
                isEmailVerified: true,
                user,
                message: 'Email successfully verified with zero rate limits!',
              });
            }

            return sendJson(400, { 
              success: false, 
              error: 'Invalid 6-digit OTP code. In demo mode, use: 123456.' 
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Malformed OTP verification payload.' });
          }
        }

        // ---------------------------------------------------------------------
        // 5a. BORROWERS: GET /api/borrowers
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/borrowers' && req.method === 'GET') {
          const customBorrowers = Array.from(mockBorrowersDb.values());
          const customIds = new Set(customBorrowers.map((b) => b.id));
          const allBorrowers = [...customBorrowers, ...MOCK_BORROWERS.filter((b: any) => !customIds.has(b.id))];
          return sendJson(200, {
            success: true,
            count: allBorrowers.length,
            borrowers: allBorrowers,
          });
        }

        // ---------------------------------------------------------------------
        // 5b. BORROWER: POST /api/borrowers/apply (New Borrower Onboarding)
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/borrowers/apply' && req.method === 'POST') {
          try {
            const data = await readBody();
            const fullName = (data.fullName || '').trim();
            const email = (data.email || '').trim();
            const mobile = (data.mobile || data.phone || '').trim();
            const cityArea = (data.cityArea || 'Pimpri, PCMC').trim();
            const businessName = (data.businessName || `${fullName}'s Enterprise`).trim();
            const businessCategory = (data.businessCategory || 'Retail & Trade').trim();
            const requestedAmountInr = Number(data.requestedAmountInr) || 15000;
            const tenureMonths = Number(data.tenureMonths) || 6;
            const monthlyIncomeInr = Number(data.monthlyIncomeInr) || 45000;
            const cibilSelf = Number(data.cibilSelfDeclaration) || 750;

            if (!fullName) {
              return sendJson(400, { success: false, error: 'Applicant full name is required.' });
            }
            if (email && !email.includes('@')) {
              return sendJson(400, { success: false, error: 'Please provide a valid email address.' });
            }
            if (requestedAmountInr < 500 || requestedAmountInr > 50000) {
              return sendJson(400, { success: false, error: 'Requested micro-loan amount must be between ₹500 and ₹50,000.' });
            }
            if (mobile) {
              // Validated mobile format present
            }

            // Algorithmic Credit & Risk Score Engine
            const debtBurdenRatio = (requestedAmountInr / tenureMonths) / Math.max(10000, monthlyIncomeInr);
            let calculatedCibil = Math.min(840, Math.max(710, cibilSelf));
            if (debtBurdenRatio < 0.15) calculatedCibil += 15;
            else if (debtBurdenRatio > 0.35) calculatedCibil -= 15;

            const expectedAnnualProfit = Number((12.2 + Math.min(2.5, debtBurdenRatio * 4)).toFixed(1));
            const defaultRiskScore = Number((1.4 + debtBurdenRatio * 2).toFixed(1));

            const newBorrowerId = `PF-PUN-NEW-${Math.floor(100 + Math.random() * 900)}`;

            const newBorrower = {
              id: newBorrowerId,
              name: fullName,
              nameHi: fullName,
              nameMr: fullName,
              businessName,
              businessNameHi: businessName,
              businessNameMr: businessName,
              businessCategory,
              businessCategoryHi: businessCategory,
              businessCategoryMr: businessCategory,
              location: `${cityArea}, Pune & PCMC`,
              locationHi: `${cityArea}, पुणे व पिंपरी-चिंचवड`,
              locationMr: `${cityArea}, पुणे व पिंपरी-चिंचवड`,
              cibilScore: calculatedCibil,
              cibilHistory: [
                { month: 'Jun', score: calculatedCibil - 10 },
                { month: 'Jul', score: calculatedCibil - 5 },
                { month: 'Aug', score: calculatedCibil - 2 },
                { month: 'Sep', score: calculatedCibil },
              ],
              loanAmount: Math.round(requestedAmountInr / 84),
              poolGoalInr: requestedAmountInr,
              fundedAmountInr: 0,
              fundingProgressPct: 0,
              microTicketMinInr: 500,
              expectedAnnualProfit,
              nominalInterestRate: 13.5,
              defaultRiskScore,
              loanTenureMonths: tenureMonths,
              cashFlowStability: 'High Stability',
              cashFlowStabilityHi: 'सत्यापित नकद प्रवाह',
              cashFlowStabilityMr: 'तपासलेला नियमित रोकड प्रवाह',
              pastRepaymentRecord: '100% On-Time Cash Verification',
              pastRepaymentRecordHi: '100% नियमित नकद आय सत्यापित',
              pastRepaymentRecordMr: '१००% नियमित उत्पन्न प्रमाणित',
              repaymentLogs: [
                { id: 'LOG-N1', date: 'Aug 2026', amount: Math.round(requestedAmountInr / tenureMonths), status: 'PAID_ON_TIME' },
                { id: 'LOG-N2', date: 'Jul 2026', amount: Math.round(requestedAmountInr / tenureMonths), status: 'PAID_ON_TIME' },
              ],
              loanPurpose: data.purpose || 'Working capital for inventory expansion and tools',
              loanPurposeHi: data.purpose || 'व्यापार वृद्धि और कार्यशील पूंजी',
              loanPurposeMr: data.purpose || 'व्यवसाय वाढ व खेळत्या भांडवलासाठी',
              monthlyRevenue: monthlyIncomeInr,
              aadhaarVerified: true,
              panVerified: true,
              gstVerified: false,
              udyamVerified: true,
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              recommendationReasonEn: `Instant Onboarding Approved: Verified income of ₹${monthlyIncomeInr.toLocaleString('en-IN')}/mo in ${cityArea}. Clean credit rating of ${calculatedCibil} eligible for community funding.`,
              recommendationReasonHi: `त्वरित ऑनबोर्डिंग स्वीकृत: ₹${monthlyIncomeInr.toLocaleString('en-IN')}/माह की सत्यापित आय। समुदाय वित्तपोषण के लिए पात्र।`,
              recommendationReasonMr: `त्वरित नोंदणी मंजूर: ₹${monthlyIncomeInr.toLocaleString('en-IN')}/महिना प्रमाणित उत्पन्न. पिअरफंड मंचावर गुंतवणुकीसाठी उपलब्ध.`,
              isNewListing: true,
            };

            mockBorrowersDb.set(newBorrowerId, newBorrower);

            return sendJson(200, {
              success: true,
              borrower: newBorrower,
              message: 'New borrower validated and dynamically listed on PeerFund marketplace!',
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Failed to process new borrower application.' });
          }
        }

        // ---------------------------------------------------------------------
        // 6. ESCROW: POST /api/escrow/create-order & /api/create-order
        // ---------------------------------------------------------------------
        if ((url.pathname === '/api/escrow/create-order' || url.pathname === '/api/create-order') && req.method === 'POST') {
          try {
            const data = await readBody();
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            const orderId = `ORD_${randomNum}`;
            const amountInr = Number(data.amountInr) || 5000;
            const currency = data.currency || 'INR';
            const role = data.role || 'investor';

            const orderRecord = {
              orderId,
              amountInr,
              currency,
              role,
              status: 'LOCKED',
              createdAt: new Date().toISOString(),
              lenderName: data.lenderName || 'Rajesh Mehta (Retail Investor)',
              notes: data.notes || 'Micro-portfolio capital escrow allocation'
            };

            mockOrdersDb.set(orderId, orderRecord);

            return sendJson(200, {
              success: true,
              orderId,
              amountInr,
              currency,
              role,
              status: 'LOCKED',
              createdAt: orderRecord.createdAt,
              message: 'Order reference generated and payment amount locked in escrow register'
            });
          } catch (err) {
            return sendJson(400, { success: false, error: 'Malformed JSON payload' });
          }
        }

        // ---------------------------------------------------------------------
        // 7. ESCROW: POST /api/escrow/verify & /api/verify-payment
        // ---------------------------------------------------------------------
        if ((url.pathname === '/api/escrow/verify' || url.pathname === '/api/verify-payment') && req.method === 'POST') {
          try {
            const data = await readBody();
            const orderId = data.orderId || `ORD_${Math.floor(100000 + Math.random() * 900000)}`;
            const paymentMethod = data.paymentMethod || 'upi';
            const paymentApp = data.paymentApp || 'Google Pay (UPI)';
            const amountInr = Number(data.amountInr) || 5000;
            const currency = data.currency || 'INR';
            const role = data.role || 'investor';
            const isSimulatedFailure = Boolean(data.simulateFailure);

            // Simulated 1.5-second bank authorization delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (isSimulatedFailure) {
              return sendJson(402, {
                success: false,
                status: 'FAILED',
                orderId,
                message: 'Simulated Bank Authorization Decline: Verification timed out or test failure triggered by user.',
                timestamp: new Date().toISOString()
              });
            }

            const randomTxn = Math.floor(10000000 + Math.random() * 90000000);
            const transactionId = `TXN_${randomTxn}`;
            const randomUtr = Math.floor(10000000000 + Math.random() * 90000000000);
            const bankRefNumber = `SBI_UTR_${randomUtr}`;
            const hexHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

            const transactionRecord = {
              orderId,
              transactionId,
              bankRefNumber,
              status: 'SUCCESS',
              paymentMethod,
              paymentApp,
              amountInr,
              currency,
              role,
              smartContractHash: hexHash,
              verificationHash: `SHA256: ${hexHash.substring(0, 16)}...${hexHash.substring(32)}`,
              escrowStatus: 'VERIFIED & ESCROWED',
              escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
              timestamp: new Date().toISOString()
            };

            mockTransactionsDb.set(transactionId, transactionRecord);

            return sendJson(200, {
              success: true,
              ...transactionRecord,
              message: 'Payment verified and escrow contract hash minted successfully'
            });
          } catch (err) {
            return sendJson(500, { success: false, error: 'Internal payment verification error' });
          }
        }

        // ---------------------------------------------------------------------
        // 8. ESCROW RECEIPTS: GET /api/escrow/receipts
        // ---------------------------------------------------------------------
        if (url.pathname === '/api/escrow/receipts' && req.method === 'GET') {
          const receipts = Array.from(mockTransactionsDb.values());
          return sendJson(200, {
            success: true,
            count: receipts.length,
            receipts,
          });
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    peerfundBackendPlugin(),
  ],
});
