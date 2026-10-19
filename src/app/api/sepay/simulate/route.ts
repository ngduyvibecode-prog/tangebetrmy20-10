import { NextRequest, NextResponse } from 'next/server';
import { registerTransaction } from '@/lib/sepay-store';

/**
 * Sandbox endpoint to simulate bank transfer received by SePay
 * POST /api/sepay/simulate { code: 'LOVEQR1234', amount: 49000 }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body.code || 'LOVEQR8842';
    const amount = body.amount || 49000;

    const result = registerTransaction({
      id: Math.floor(Math.random() * 1000000),
      gateway: 'MBBank (Napas 247)',
      transactionDate: new Date().toISOString(),
      accountNumber: '0388999888',
      transferType: 'in',
      transferAmount: amount,
      accumulated: 10000000,
      content: code,
      referenceCode: `TEST_${Date.now()}`,
      description: `Simulated VietQR payment for ${code}`,
    });

    return NextResponse.json({
      success: true,
      message: 'Simulated payment succeeded! VIP activated.',
      data: result,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to simulate payment' },
      { status: 500 }
    );
  }
}
