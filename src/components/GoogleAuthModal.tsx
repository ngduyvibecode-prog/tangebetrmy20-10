'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';
import { User } from '@/types';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const PRESET_ACCOUNTS = [
  {
    name: 'Nguyễn Thu Hà',
    email: 'thuha.sweetlove@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Trần Tuấn Anh',
    email: 'tuananh.crush@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
];

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSelectAccount = (account: { name: string; email: string; avatar: string }) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name: account.name,
        email: account.email,
        avatar: account.avatar,
        isVip: false,
      };
      setIsSubmitting(false);
      onSuccess(newUser);
      onClose();
    }, 500);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const name = customName.trim() || customEmail.split('@')[0];
      const newUser: User = {
        id: 'usr_' + Date.now(),
        name: name,
        email: customEmail,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${name}`,
        isVip: false,
      };
      setIsSubmitting(false);
      onSuccess(newUser);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl border border-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-2.5 shadow-xs">
            <Heart className="w-5 h-5 fill-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-extrabold tracking-tight">Đăng Nhập LoveQR</h3>
          <p className="text-xs text-rose-100 mt-0.5">
            Lưu trữ lịch sử mã QR tỏ tình & đồng bộ tài khoản VIP
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Chọn tài khoản Google nhanh (1-Click)
          </p>

          <div className="space-y-2">
            {PRESET_ACCOUNTS.map((acc, index) => (
              <button
                key={index}
                disabled={isSubmitting}
                onClick={() => handleSelectAccount(acc)}
                className="w-full p-2.5 rounded-2xl border border-neutral-200 hover:border-pink-300 hover:bg-neutral-50 transition-all flex items-center gap-3 group cursor-pointer text-left"
              >
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-200 group-hover:ring-rose-400"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">
                    {acc.name}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">{acc.email}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                </div>
              </button>
            ))}
          </div>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="px-2.5 bg-white text-neutral-400">
                Hoặc nhập tài khoản khác
              </span>
            </div>
          </div>

          <form onSubmit={handleCustomLogin} className="space-y-2.5">
            <div>
              <input
                type="text"
                placeholder="Tên / Biệt danh (VD: Bé Iu)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Gmail của bạn (VD: crush@gmail.com)"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Đang kết nối...' : 'Tiếp tục với Google'}</span>
            </button>
          </form>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" strokeWidth={1.5} />
            <span>Bảo mật an toàn qua Google OAuth 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
