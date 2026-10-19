// In-memory transaction store for demo & production synchronization
import { SePayTransaction } from '@/types';

// Global variable to persist transactions in server runtime
const globalForSePay = globalThis as unknown as {
  sepayTransactions: Map<string, SePayTransaction>;
  activeVipCodes: Set<string>;
};

export const transactionsStore =
  globalForSePay.sepayTransactions || new Map<string, SePayTransaction>();

export const activeVipCodesStore =
  globalForSePay.activeVipCodes || new Set<string>();

if (process.env.NODE_ENV !== 'production') {
  globalForSePay.sepayTransactions = transactionsStore;
  globalForSePay.activeVipCodes = activeVipCodesStore;
}

export function registerTransaction(tx: SePayTransaction) {
  // Normalize content to extract transaction code, e.g. LOVEQR1234
  const codeMatch = tx.content.match(/LOVEQR[A-Z0-9]+/i);
  const code = codeMatch ? codeMatch[0].toUpperCase() : tx.content.trim().toUpperCase();

  transactionsStore.set(code, tx);
  activeVipCodesStore.add(code);
  
  return {
    code,
    success: true,
    amount: tx.transferAmount
  };
}

export function checkTransactionStatus(code: string): { paid: boolean; transaction?: SePayTransaction } {
  const normalizedCode = code.trim().toUpperCase();
  const tx = transactionsStore.get(normalizedCode);
  if (tx || activeVipCodesStore.has(normalizedCode)) {
    return { paid: true, transaction: tx };
  }
  return { paid: false };
}
