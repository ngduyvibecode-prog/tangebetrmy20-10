'use client';

import React from 'react';
import { Check, Crown, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { User } from '@/types';

interface PricingSectionProps {
  user: User | null;
  onSelectPlan: (plan: 'free' | 'vip_monthly' | 'vip_lifetime') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  user,
  onSelectPlan,
}) => {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-semibold mb-3 border border-rose-200">
            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={1.5} />
            <span>BẢNG GIÁ DÀNH CHO CẶP ĐÔI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Chọn Gói Phù Hợp Cho Hai Bạn
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-600">
            Tạo miễn phí mọi lúc hoặc nâng cấp một lần để sở hữu trọn bộ mã QR hoa nghệ thuật & thư tình vĩnh cửu.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {/* Card 1: Free */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl shadow-pink-500/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900">Bản Miễn Phí</h3>
                <span className="text-[11px] bg-neutral-100 text-neutral-600 font-bold px-2.5 py-0.5 rounded-full border border-neutral-200">
                  Cơ Bản
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Dành cho trải nghiệm thử</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-neutral-900">0 đ</span>
                <span className="text-xs text-neutral-500">/ mãi mãi</span>
              </div>

              <div className="mt-6 space-y-3 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  <span>Khung viền bo tròn cơ bản</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  <span>Chấm tròn & điểm ảnh tim mini</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  <span>Tải ảnh PNG độ phân giải chuẩn (800px)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  <span>Không giới hạn số lượt quét</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 line-through">
                  <span>Khung viền hoa hồng & hoa tulip</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 line-through">
                  <span>Xuất ảnh 4K Ultra HD & Vector SVG</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('editor');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-2.5 rounded-xl bg-white/80 hover:bg-white text-neutral-800 border border-neutral-200/80 font-bold text-xs transition-all cursor-pointer"
            >
              Bắt Đầu Tạo Miễn Phí
            </button>
          </div>

          {/* Card 2: VIP Couple (Highlighted) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/70 backdrop-blur-md border-2 border-rose-400 shadow-2xl shadow-rose-300/30 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out relative flex flex-col justify-between transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200" strokeWidth={1.5} />
              <span>GÓI ĐƯỢC CHỌN NHIỀU NHẤT</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-neutral-900 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-500" strokeWidth={1.5} />
                  VIP Cặp Đôi
                </h3>
                <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                  HOT -50%
                </span>
              </div>
              <p className="text-xs text-rose-600 mt-1">Đầy đủ tính năng tỏ tình & kỷ niệm</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-rose-600">49.000 đ</span>
                <span className="text-xs text-neutral-400 line-through">99.000 đ</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1 font-medium">
                Thanh toán 1 lần qua VietQR SePay tự động
              </p>

              <div className="mt-6 space-y-3 text-xs text-neutral-800 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-bold">Mở khóa trọn bộ viền hoa hồng, tulip & trái tim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Khung ảnh Polaroid vintage lồng ảnh 2 bạn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Trang Thư Tình Tương Tác kèm hiệu ứng hoa rơi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Xuất file 4K Ultra HD & Vector SVG in thiệp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Xóa hoàn toàn logo & watermark</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('vip_monthly')}
              className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-400/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/25 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" strokeWidth={1.5} />
              <span>{user?.isVip ? 'Bạn Đang Dùng Gói VIP' : 'Mở Khóa VIP Ngay (49K)'}</span>
            </button>
          </div>

          {/* Card 3: VIP Lifetime */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl shadow-pink-500/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                  VIP Trọn Đời
                </h3>
                <span className="text-[11px] bg-amber-500/10 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Vĩnh Viễn
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Dành cho kỷ niệm tình yêu bền lâu</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-neutral-900">99.000 đ</span>
                <span className="text-xs text-neutral-400 line-through">199.000 đ</span>
              </div>

              <div className="mt-6 space-y-3 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-bold">Mọi quyền lợi của gói VIP Cặp Đôi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Không giới hạn số lượng tạo mã QR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" strokeWidth={1.5} />
                  <span>Lưu trữ đám mây vĩnh viễn</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('vip_lifetime')}
              className="mt-8 w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              Sở Hữu Trọn Đời (99K)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
