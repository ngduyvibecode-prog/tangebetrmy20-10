import { NextRequest, NextResponse } from 'next/server';
import { registerTransaction } from '@/lib/sepay-store';
import { SePayTransaction } from '@/types';

/**
 * SePay Webhook Endpoint
 * Documentation: https://sepay.vn/docs/webhook
 * 
 * SePay sends a POST request with JSON payload whenever a bank transfer arrives.
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const apiKey = process.env.SEPAY_API_KEY;

    // Verify SePay API Key if configured in environment
    if (apiKey && authHeader) {
      const token = authHeader.replace(/^Apikey\s+/i, '');
      if (token !== apiKey) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized: Invalid SePay API Key' },
          { status: 401 }
        );
      }
    }

    const body = await req.json();

    // SePay payload validation
    if (!body || !body.content || typeof body.transferAmount === 'undefined') {
      return NextResponse.json(
        { success: false, message: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    // Only process incoming transfers (transferType: "in")
    if (body.transferType && body.transferType !== 'in') {
      return NextResponse.json({
        success: true,
        message: 'Ignored outgoing transaction',
      });
    }

    const tx: SePayTransaction = {
      id: body.id || Date.now(),
      gateway: body.gateway || 'VietQR',
      transactionDate: body.transactionDate || new Date().toISOString(),
      accountNumber: body.accountNumber || '',
      subAccount: body.subAccount,
      transferType: 'in',
      transferAmount: Number(body.transferAmount) || 0,
      accumulated: Number(body.accumulated) || 0,
      code: body.code,
      content: String(body.content),
      referenceCode: body.referenceCode,
      description: body.description,
    };

    const result = registerTransaction(tx);

    console.log(`[SePay Webhook] Successfully registered payment for code ${result.code}, Amount: ${result.amount} VND`);

    return NextResponse.json({
      success: true,
      message: 'Transaction processed successfully. VIP access activated.',
      data: {
        code: result.code,
        amount: result.amount,
      },
    });
  } catch (error: unknown) {
    console.error('[SePay Webhook Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while processing webhook' },
      { status: 500 }
    );
  }
}

// Support GET for testing health of webhook endpoint
export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'LoveQR SePay Webhook Endpoint is ready to receive bank transfer callbacks.',
    endpoint: '/api/sepay/webhook',
  });
}
