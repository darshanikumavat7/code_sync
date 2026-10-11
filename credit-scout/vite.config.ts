import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// In-memory mock databases for persistence in dev server
const mockOrdersDb = new Map<string, any>();
const mockTransactionsDb = new Map<string, any>();

function paymentGatewayBackendPlugin(): Plugin {
  return {
    name: 'peerfund-payment-gateway-backend',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        const url = new URL(req.url, 'http://localhost:5173');

        // 1. Endpoint: /api/create-order
        if (url.pathname === '/api/create-order' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
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

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                orderId,
                amountInr,
                currency,
                role,
                status: 'LOCKED',
                createdAt: orderRecord.createdAt,
                message: 'Order reference generated and payment amount locked in escrow register'
              }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload' }));
            }
          });
          return;
        }

        // 2. Endpoint: /api/verify-payment
        if (url.pathname === '/api/verify-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const orderId = data.orderId || `ORD_${Math.floor(100000 + Math.random() * 900000)}`;
              const paymentMethod = data.paymentMethod || 'upi';
              const paymentApp = data.paymentApp || 'Google Pay (UPI)';
              const amountInr = Number(data.amountInr) || 5000;
              const currency = data.currency || 'INR';
              const role = data.role || 'investor';
              const isSimulatedFailure = Boolean(data.simulateFailure);

              // Simulated 2-second bank authorization delay
              await new Promise((resolve) => setTimeout(resolve, 2000));

              if (isSimulatedFailure) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 402;
                res.end(JSON.stringify({
                  success: false,
                  status: 'FAILED',
                  orderId,
                  message: 'Simulated Bank Authorization Decline: Verification timed out or test failure triggered by user.',
                  timestamp: new Date().toISOString()
                }));
                return;
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

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                ...transactionRecord,
                message: 'Payment verified and escrow contract hash minted successfully'
              }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: 'Internal payment verification error' }));
            }
          });
          return;
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
    paymentGatewayBackendPlugin(),
  ],
});
