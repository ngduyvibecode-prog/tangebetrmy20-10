'use client';

import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-rose-100 bg-white/40 backdrop-blur-md py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
              <Heart className="w-4 h-4 fill-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-extrabold text-neutral-900 text-sm">
                Love<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">QR</span>
              </span>
              <p className="text-[11px] text-neutral-500">Mã Tỏ Tình & Kỷ Niệm Lãng Mạn</p>
            </div>
          </div>

          {/* SePay VietQR Integration Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/80 text-neutral-700 text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
            <span>Tích hợp cổng SePay (VietQR Napas 247 Tự Động)</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-neutral-400 font-medium">
            © 2026 LoveQR SaaS. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};
