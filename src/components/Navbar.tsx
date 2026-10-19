'use client';

import React, { useState } from 'react';
import { Heart, Crown, Sparkles, LogOut, History, QrCode } from 'lucide-react';
import { User } from '@/types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onOpenPricing: () => void;
  onOpenHistory: () => void;
  onLogout: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onOpenPricing,
  onOpenHistory,
  onLogout,
  savedCount,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/40 backdrop-blur-md border-b border-white/60 shadow-xs transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-300/40 group-hover:scale-105 transition-transform duration-300">
            <Heart className="w-4 h-4 fill-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-neutral-900">
                Love<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">QR</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-200">
                SaaS
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-neutral-600">
          <a
            href="#editor"
            className="hover:text-rose-600 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
            Trình Tạo QR
          </a>
          <a
            href="#templates"
            className="hover:text-rose-600 transition-colors"
          >
            Mẫu Nghệ Thuật
          </a>
          <a
            href="#pricing"
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            Bảng Giá VIP
            <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full">
              49K
            </span>
          </a>
          <button
            onClick={onOpenHistory}
            className="hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
            Lịch Sử
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right CTA / Auth Profile */}
        <div className="flex items-center gap-3">
          {(!user || !user.isVip) ? (
            <button
              onClick={onOpenPricing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-xs font-bold shadow-md shadow-rose-400/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/20 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200" strokeWidth={1.5} />
              <span>Nâng Cấp VIP</span>
              <span className="hidden sm:inline text-[11px] opacity-90">(49K)</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-800 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={1.5} />
              <span>VIP Cặp Đôi</span>
            </div>
          )}

          {/* User Profile or Login */}
          {!user ? (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 rounded-xl bg-white/70 hover:bg-white text-neutral-800 border border-neutral-200/80 text-xs font-bold shadow-2xs hover:border-neutral-300 transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white/80 border border-neutral-200 hover:border-neutral-300 transition-all cursor-pointer shadow-xs"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover ring-1 ring-rose-200"
                />
                <span className="text-xs font-bold text-neutral-800 max-w-[90px] truncate">
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-neutral-100 p-2 z-50 animate-in fade-in duration-150">
                  <div className="p-2.5 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onOpenHistory();
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <History className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
                      Mã đã tạo ({savedCount})
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
