'use client';

import React from 'react';
import { X, ExternalLink, CheckCircle2, QrCode, Mail, Link as LinkIcon } from 'lucide-react';
import { QRConfig } from '@/types';

interface TestScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRConfig;
  onOpenLetter: () => void;
}

export const TestScanModal: React.FC<TestScanModalProps> = ({
  isOpen,
  onClose,
  config,
  onOpenLetter,
}) => {
  if (!isOpen) return null;

  const isSecretLetter = config.mode === 'secret_letter';
  const targetUrl = isSecretLetter
    ? 'https://loveqr.vn/letter?secret=true'
    : config.text || 'https://loveqr.vn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xs sm:max-w-sm bg-neutral-950 rounded-[3rem] p-3.5 shadow-2xl border-4 border-neutral-800 text-white overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2">
          <div className="w-2 h-2 rounded-full bg-blue-900/60" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-30"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Camera Viewfinder Screen */}
        <div className="relative h-[460px] rounded-[2.2rem] bg-neutral-900 overflow-hidden flex flex-col justify-between p-4">
          {/* Top Status */}
          <div className="pt-7 text-center relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-semibold text-rose-200 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
              Đã nhận diện mã QR tình yêu
            </span>
          </div>

          {/* Center scan brackets */}
          <div className="relative mx-auto w-48 h-48 border border-yellow-400/80 rounded-2xl flex items-center justify-center">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-yellow-400" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-yellow-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-400" />
            <QrCode className="w-12 h-12 text-rose-500/40" strokeWidth={1.5} />
          </div>

          {/* Yellow iOS Scan Notification Banner */}
          <div className="relative z-10 mb-2">
            <div
              onClick={() => {
                if (isSecretLetter) {
                  onClose();
                  onOpenLetter();
                } else {
                  window.open(targetUrl, '_blank');
                }
              }}
              className="p-3 rounded-2xl bg-yellow-400 text-neutral-950 shadow-lg cursor-pointer hover:bg-yellow-300 transition-all hover:scale-102 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center flex-shrink-0 text-neutral-900">
                {isSecretLetter ? (
                  <Mail className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
                ) : (
                  <LinkIcon className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-bold truncate">
                  {isSecretLetter ? 'Mở Thư Tình Tương Tác' : config.title || 'Mở Liên Kết'}
                </p>
                <p className="text-[10px] text-neutral-800 truncate font-mono">
                  {targetUrl}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-900" strokeWidth={1.5} />
            </div>

            <p className="text-[10px] text-center text-neutral-400 mt-2">
              Chạm vào thông báo để mở nội dung trực tiếp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
