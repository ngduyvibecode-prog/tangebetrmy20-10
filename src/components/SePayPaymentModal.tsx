'use client';

import React, { useState, useEffect } from 'react';
import { X, Crown, Copy, Check, Sparkles, ShieldCheck, RefreshCw, Smartphone, Zap, Clock, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SePayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  userEmail?: string;
}

const BANK_INFO = {
  bankName: 'MB Bank (Ngân hàng Quân Đội)',
  bankShortName: 'MBBank',
  bankCode: 'MB',
  accountNumber: '0388999888',
  accountHolder: 'LOVEQR SAAS - NGUYEN VAN A',
  defaultAmount: 49000,
  lifetimeAmount: 99000,
};

export const SePayPaymentModal: React.FC<SePayPaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  userEmail,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'vip_standard' | 'vip_lifetime'>('vip_standard');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentCode, setPaymentCode] = useState<string>('LOVEQR8842');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isChecking, setIsChecking] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Generate unique transfer syntax on open
  useEffect(() => {
    if (isOpen) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const code = `LOVEQR${randomSuffix}`;
      setPaymentCode(code);
      setTimeLeft(900);
      setPaymentSuccess(false);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || paymentSuccess) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, paymentSuccess]);

  // Real-time polling check SePay verify endpoint
  useEffect(() => {
    if (!isOpen || paymentSuccess) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sepay/verify?code=${paymentCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.paid) {
            handleSuccess();
          }
        }
      } catch {
        // silent check
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [isOpen, paymentCode, paymentSuccess]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSuccess = () => {
    setPaymentSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#ffffff'],
    });

    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const handleSimulateWebhook = async () => {
    setIsSimulating(true);
    try {
      const amount = selectedPlan === 'vip_standard' ? BANK_INFO.defaultAmount : BANK_INFO.lifetimeAmount;
      const res = await fetch('/api/sepay/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: paymentCode,
          amount: amount,
        }),
      });

      if (res.ok) {
        handleSuccess();
      }
    } catch {
      handleSuccess();
    } finally {
      setIsSimulating(false);
    }
  };

  const handleManualCheck = async () => {
    setIsChecking(true);
    try {
      const res = await fetch(`/api/sepay/verify?code=${paymentCode}`);
      const data = await res.json();
      if (data.paid) {
        handleSuccess();
      } else {
        alert(`Hệ thống SePay đang quét giao dịch "${paymentCode}". Nếu bạn vừa chuyển khoản, vui lòng đợi từ 3-10 giây để ngân hàng gửi callback tự động nhé!`);
      }
    } catch {
      alert('Đang kiểm tra kết nối với cổng SePay...');
    } finally {
      setIsChecking(false);
    }
  };

  if (!isOpen) return null;

  const currentAmount = selectedPlan === 'vip_standard' ? BANK_INFO.defaultAmount : BANK_INFO.lifetimeAmount;
  const vietQrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankCode}-${BANK_INFO.accountNumber}-compact2.png?amount=${currentAmount}&addInfo=${paymentCode}&accountName=${encodeURIComponent(BANK_INFO.accountHolder)}`;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-white overflow-hidden my-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-5 sm:p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold backdrop-blur-sm uppercase tracking-wide flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" strokeWidth={1.5} />
              Cổng SePay VietQR Tự Động
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-300 fill-amber-300" strokeWidth={1.5} />
            Nâng Cấp Gói VIP Tình Yêu
          </h3>
          <p className="text-xs text-rose-100 mt-1">
            Mở khóa trọn bộ viền hoa nghệ thuật, xuất ảnh 4K sắc nét và trang thư tình tương tác
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Plan Picker Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedPlan('vip_standard')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedPlan === 'vip_standard'
                  ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                  Gói Cặp Đôi (Hot)
                </span>
                <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                  -50%
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-black text-neutral-900">49.000đ</span>
                <span className="text-xs text-neutral-400 line-through">99.000đ</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedPlan('vip_lifetime')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedPlan === 'vip_lifetime'
                  ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
                  Trọn Đời
                </span>
                <span className="text-[10px] bg-neutral-900 text-white font-extrabold px-2 py-0.5 rounded-full">
                  Vĩnh Viễn
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-black text-neutral-900">99.000đ</span>
                <span className="text-xs text-neutral-400 line-through">199.000đ</span>
              </div>
            </button>
          </div>

          {/* Payment Section (VietQR + Bank details) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200/80">
            {/* Left: VietQR Image */}
            <div className="sm:col-span-5 flex flex-col items-center text-center">
              <div className="relative p-2 bg-white rounded-xl shadow-xs border border-neutral-200 group">
                <img
                  src={vietQrUrl}
                  alt="Mã VietQR thanh toán SePay"
                  className="w-40 h-40 object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2|99|${BANK_INFO.accountNumber}|${BANK_INFO.accountHolder}||0|0|${currentAmount}|${paymentCode}|transfer_p2p`;
                  }}
                />
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-700 font-semibold">
                <Smartphone className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                <span>Mở App ngân hàng quét</span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-500">
                <Clock className="w-3 h-3 text-rose-500" strokeWidth={1.5} />
                <span>Mã hết hạn trong: </span>
                <span className="font-bold text-rose-600">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Right: Bank Transfer Info & Copy Buttons */}
            <div className="sm:col-span-7 space-y-2">
              <div className="p-2 rounded-xl bg-white border border-neutral-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Ngân hàng thụ hưởng
                </p>
                <p className="text-xs font-bold text-neutral-900">
                  {BANK_INFO.bankName}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Số tài khoản
                  </p>
                  <p className="text-sm font-black text-neutral-900 font-mono">
                    {BANK_INFO.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(BANK_INFO.accountNumber, 'acc')}
                  className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedField === 'acc' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
                  ) : (
                    <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  <span>Sao chép</span>
                </button>
              </div>

              <div className="p-2 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Số tiền cần chuyển
                  </p>
                  <p className="text-sm font-black text-rose-600">
                    {currentAmount.toLocaleString('vi-VN')} đ
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(String(currentAmount), 'amount')}
                  className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedField === 'amount' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
                  ) : (
                    <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  <span>Sao chép</span>
                </button>
              </div>

              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                    Nội dung chuyển khoản
                  </p>
                  <p className="text-sm font-black text-rose-900 font-mono">
                    {paymentCode}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(paymentCode, 'code')}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedField === 'code' ? (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                  ) : (
                    <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  <span>Sao chép mã</span>
                </button>
              </div>
            </div>
          </div>

          {/* Webhook Status & Actions */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white border border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </div>
                <span className="text-xs font-medium text-neutral-700">
                  Hệ thống SePay đang dò tìm giao dịch theo thời gian thực...
                </span>
              </div>

              <button
                onClick={handleManualCheck}
                disabled={isChecking}
                className="px-3 py-1 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} strokeWidth={1.5} />
                <span>Kiểm tra ngay</span>
              </button>
            </div>

            {/* Test Simulation Button */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="text-left">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.5} />
                  Môi trường Sandbox / Trải nghiệm ngay
                </p>
                <p className="text-[11px] text-amber-800">
                  Mô phỏng SePay gửi Webhook thành công ngay lập tức để kiểm thử luồng VIP!
                </p>
              </div>

              <button
                onClick={handleSimulateWebhook}
                disabled={isSimulating}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" strokeWidth={1.5} />
                <span>{isSimulating ? 'Đang kích hoạt...' : '⚡ Mô phỏng chuyển khoản thành công'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" strokeWidth={1.5} />
              <span>Giao dịch an toàn qua cổng SePay VietQR NAPAS 247</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
