import { NextRequest, NextResponse } from 'next/server';
import { checkTransactionStatus } from '@/lib/sepay-store';

/**
 * Verify if a payment code has received bank transfer confirmation
 * GET /api/sepay/verify?code=LOVEQR1234
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { success: false, message: 'Missing transaction code' },
      { status: 400 }
    );
  }

  const status = checkTransactionStatus(code);

  return NextResponse.json({
    success: true,
    code: code.toUpperCase(),
    paid: status.paid,
    transaction: status.transaction || null,
  });
}
