'use client';

import React, { useState } from 'react';
import {
  QrCode,
  Heart,
  Sparkles,
  Camera,
  Mail,
  Zap,
  ArrowRight,
  ShieldCheck,
  Gem,
  CheckCircle2,
  Wand2,
  Music,
  Check,
  Volume2,
  Flower2,
} from 'lucide-react';
import { QRVisualCanvas } from './QRVisualCanvas';
import { QRConfig, QRStyle } from '@/types';

interface HeroSectionProps {
  onQuickStart: (initialUrl: string) => void;
  onOpenPricing: () => void;
}

const HERO_PREVIEWS: {
  id: QRStyle;
  label: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  colorTheme: any;
  dotStyle: any;
  centerIcon: any;
}[] = [
  {
    id: 'floral_rose',
    label: 'Hoa Hồng Nhung',
    icon: Flower2,
    title: 'Gửi Em Bé Của Anh',
    subtitle: 'From Anh with Love • 14.02',
    colorTheme: 'strawberry',
    dotStyle: 'heart',
    centerIcon: 'heart',
  },
  {
    id: 'tulip_garden',
    label: 'Vườn Hoa Tulip',
    icon: Sparkles,
    title: 'Happy Anniversary',
    subtitle: 'Kỷ niệm 500 ngày yêu nhau',
    colorTheme: 'rose_gold',
    dotStyle: 'rounded',
    centerIcon: 'rose',
  },
  {
    id: 'heart_wreath',
    label: 'Valentine Trái Tim',
    icon: Heart,
    title: 'Will You Be Mine?',
    subtitle: 'Quét để nhận món quà đặc biệt',
    colorTheme: 'crimson',
    dotStyle: 'heart',
    centerIcon: 'heart',
  },
  {
    id: 'polaroid',
    label: 'Polaroid Kỷ Niệm',
    icon: Camera,
    title: 'Our Sweet Journey',
    subtitle: 'Together Forever • 2024 - 2026',
    colorTheme: 'strawberry',
    dotStyle: 'diamond',
    centerIcon: 'custom_image',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickStart,
  onOpenPricing,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [activeHeroStyle, setActiveHeroStyle] = useState<QRStyle>('floral_rose');

  const selectedPreview = HERO_PREVIEWS.find((p) => p.id === activeHeroStyle) || HERO_PREVIEWS[0];

  const heroQRConfig: QRConfig = {
    mode: 'url',
    text: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    title: selectedPreview.title,
    subtitle: selectedPreview.subtitle,
    style: selectedPreview.id,
    dotStyle: selectedPreview.dotStyle,
    colorTheme: selectedPreview.colorTheme,
    fgColor: '#e11d48',
    bgColor: '#fff5f7',
    centerIcon: selectedPreview.centerIcon,
    customImage:
      selectedPreview.id === 'polaroid'
        ? 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&auto=format&fit=crop&q=80'
        : undefined,
    secretLetter: {
      recipient: 'Bé Iu Thu Hà',
      sender: 'Anh Tuấn',
      message: 'Yêu em 3000!',
      date: '14.02.2026',
    },
    showScanMeTag: true,
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickStart(quickInput.trim());
    const editor = document.getElementById('editor');
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-luxury-mesh">
      {/* MAGNIFICENT GLOWING AURORA LIGHT SPHERES */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-pink-500/25 via-rose-400/20 to-amber-300/15 rounded-full blur-3xl pointer-events-none animate-aurora" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP ANNOUNCEMENT PILL */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-rose-300/80 shadow-md shadow-rose-300/20 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold text-rose-950">
              BỘ SƯU TẬP MÃ QR TỎ TÌNH & KỶ NIỆM ĐỘC BẢN 2026
            </span>
            <span className="text-xs font-bold text-rose-600 flex items-center gap-0.5 ml-1">
              Khám phá ngay <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* DUAL-COLUMN SPECTACULAR HERO SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Powerful Typography & Quick Input */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-neutral-900 leading-[1.12]">
              Biến Tình Yêu & Kỷ Niệm Thành{' '}
              <span className="text-luxury-gradient">
                Mã QR Kiệt Tác Nghệ Thuật
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Khắc họa lời tỏ tình, album ảnh kỷ niệm và giai điệu tình yêu vào những tác phẩm mã QR viền hoa hồng, hoa tulip và trái tim lộng lẫy nhất. Camera điện thoại nhận diện tức thì trong 0.2 giây.
            </p>

            {/* Glowing Input Box */}
            <form
              onSubmit={handleStart}
              className="max-w-lg mx-auto lg:mx-0 p-2 rounded-2xl bg-white/85 backdrop-blur-2xl border-2 border-rose-200/90 shadow-xl shadow-rose-400/20 flex flex-col sm:flex-row items-center gap-2 hover:border-rose-400 transition-all duration-300"
            >
              <div className="flex-1 w-full flex items-center gap-3 px-3.5 py-1.5">
                <QrCode className="w-5 h-5 text-rose-500 flex-shrink-0" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Dán link Spotify, YouTube, ảnh Drive hoặc lời tỏ tình..."
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  className="w-full text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-400/35 hover:-translate-y-0.5 hover:shadow-rose-500/50 active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Wand2 className="w-4 h-4" strokeWidth={1.5} />
                <span>Tạo Mã Ngay</span>
              </button>
            </form>

            {/* Social Proof with Overlapping Avatars & Trust Metrics */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-left">
              <div className="flex -space-x-2.5">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Couple 1"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                  alt="Couple 2"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Couple 3"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Couple 4"
                />
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-neutral-800 ml-1">4.9/5</span>
                </div>
                <p className="text-xs font-semibold text-neutral-600 mt-0.5">
                  Hơn <span className="font-extrabold text-rose-600">50,000+ cặp đôi</span> đã trao gửi yêu thương
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
                <span>Quét cực nhạy trên mọi Camera</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                <span>Kích hoạt tự động qua SePay VietQR</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE STAR OF THE SHOW - SÂN KHẤU KIỆT TÁC TRỰC DIỆN */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Ambient pedestal backlights */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 via-pink-400/30 to-amber-300/20 rounded-[3rem] blur-2xl -z-10 animate-border-glow" />

            {/* Luxury Glass Stage Card */}
            <div className="w-full max-w-md p-6 sm:p-8 rounded-[2.5rem] glass-luxury-pedestal relative">
              {/* Interactive Style Switcher Bar */}
              <div className="flex items-center justify-between gap-1 p-1 rounded-2xl bg-white/70 border border-rose-200/80 mb-6 shadow-xs overflow-x-auto">
                {HERO_PREVIEWS.map((item) => {
                  const isCurrent = activeHeroStyle === item.id;
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveHeroStyle(item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isCurrent
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-300/50 scale-102'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* The Glowing Centerpiece QR Code */}
              <div className="flex justify-center my-2 transform hover:scale-[1.02] transition-transform duration-300">
                <QRVisualCanvas config={heroQRConfig} isVip={true} />
              </div>

              {/* Scan with real camera prompt badge */}
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-200 text-rose-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                  <span>Dùng camera điện thoại quét thử ngay trên màn hình!</span>
                </span>
              </div>

              {/* FLOATING ORBITING BADGE 1: Spotify Music Player (Top-Right) */}
              <div className="hidden sm:flex absolute -top-6 -right-6 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-rose-400/20 items-center gap-3 animate-float-smooth z-20">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center text-rose-500 flex-shrink-0 shadow-sm">
                  <Music className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                      Bài hát đôi ta
                    </span>
                    {/* Equalizer soundwave bars */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
                      <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
                      <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
                      <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-neutral-900">Until I Found You</p>
                  <p className="text-[10px] text-neutral-500">Quét để nghe nhạc</p>
                </div>
              </div>

              {/* FLOATING ORBITING BADGE 2: Polaroid Love Photo (Bottom-Left) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-rose-400/20 items-center gap-3 animate-float-reverse z-20">
                <img
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&auto=format&fit=crop&q=80"
                  alt="Couple Polaroid"
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-rose-200"
                />
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Kỷ niệm 1 năm
                  </span>
                  <p className="text-xs font-bold text-neutral-900 mt-1">Forever With You</p>
                  <p className="text-[10px] text-neutral-400 font-mono">14.02.2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2026 BENTO GRID: CÁC KIỆT TÁC THỊ GIÁC LỘNG LẪY (VISUAL MASTERPIECES) */}
        <div id="templates" className="mt-28 max-w-6xl mx-auto text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Kiến Trúc Tính Năng Đỉnh Cao
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3">
              Những Kiệt Tác Dành Riêng Cho Tình Yêu
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Mỗi tác phẩm mã QR là một cảm xúc trọn vẹn được mã hóa nghệ thuật
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 (Span 2 columns - Rose Botanical Art QR) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 glass-luxury-card interactive-card relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-400/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-300/40 mb-4">
                    <Flower2 className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    High Error Correction 30%
                  </span>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mt-2.5">
                    Khung Viền Hoa Hồng & Mắt Trái Tim
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Thuật toán High Error Correction độc quyền bao bọc mã QR bằng những đường nét hoa văn tinh xảo, mắt định vị hình trái tim mà vẫn đảm bảo 100% camera điện thoại quét mượt mà.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-xl bg-white/80 border border-white text-xs font-semibold text-neutral-800 shadow-2xs">
                      Xuất 4K Ultra HD
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/80 border border-white text-xs font-semibold text-neutral-800 shadow-2xs">
                      Vector SVG in thiệp cưới
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-white/80 border border-white text-xs font-semibold text-neutral-800 shadow-2xs">
                      Không logo watermark
                    </span>
                  </div>
                </div>

                {/* Right side visual badge */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-lg shadow-rose-300/30 text-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-tr from-rose-100 to-pink-50 p-2 flex items-center justify-center mx-auto border border-rose-200">
                      <QrCode className="w-24 h-24 text-rose-600" strokeWidth={1.2} />
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mt-2">Mẫu Hoa Hồng VIP</p>
                    <span className="text-[10px] text-rose-500 font-semibold">Tương thích Zalo & iPhone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Polaroid Couple (Span 1 column) */}
            <div className="md:col-span-1 rounded-3xl p-7 glass-luxury-card interactive-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-amber-300/40 mb-4">
                  <Camera className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Couple Memory
                </span>

                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight mt-2.5">
                  Polaroid Lồng Ảnh Đôi
                </h3>

                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Lồng ảnh selfie của hai bạn vào giữa trung tâm mã QR cùng dòng chữ viết tay ghi nhớ ngày kỷ niệm.
                </p>
              </div>

              {/* Realistic Polaroid Photo Preview */}
              <div className="mt-6 p-2 bg-white rounded-xl shadow-md border border-neutral-200 rotate-1 group-hover:rotate-0 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&auto=format&fit=crop&q=80"
                  alt="Couple photo"
                  className="w-full h-28 object-cover rounded-lg"
                />
                <p className="text-[11px] font-serif text-center text-neutral-700 mt-1.5 italic">
                  Together Since 14.02.2024
                </p>
              </div>
            </div>

            {/* Bento Card 3: Secret Letter (Span 1 column) */}
            <div className="md:col-span-1 rounded-3xl p-7 glass-luxury-card interactive-card flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-pink-300/40 mb-4">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  Thư Tình Tương Tác
                </span>

                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight mt-2.5">
                  Bức Thư Tỏ Tình & Nhạc Lofi
                </h3>

                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  Người ấy quét mã sẽ mở ra giao diện đọc thư lãng mạn kèm hiệu ứng cánh hoa rơi và giai điệu nhạc nền ngọt ngào.
                </p>
              </div>

              {/* Visual Envelope Mockup */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-b from-rose-50 to-pink-50 border border-rose-200 text-center">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-sm">
                  <Heart className="w-5 h-5 fill-white" strokeWidth={1.5} />
                </div>
                <p className="text-xs font-bold text-rose-950 mt-2">Mở Bức Thư Tình</p>
                <p className="text-[10px] text-rose-500">Hiệu ứng hoa rơi & nhạc lofi</p>
              </div>
            </div>

            {/* Bento Card 4: SePay VietQR (Span 2 columns) */}
            <div className="md:col-span-2 rounded-3xl p-7 sm:p-9 glass-luxury-card interactive-card flex flex-col justify-between group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="max-w-md">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-300/40 mb-4">
                    <Zap className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    SePay Napas 247
                  </span>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mt-2.5">
                    Thanh Toán Tự Động Kích Hoạt Trong 3 Giây
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Tích hợp cổng SePay chuẩn ngân hàng Việt Nam. Mở bất kỳ ứng dụng ngân hàng nào (MB, Vietcombank, Techcombank, MoMo) quét mã VietQR để mở khóa toàn bộ tính năng VIP tức thì.
                  </p>
                </div>

                {/* Holographic Banking Card Mockup */}
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 text-white shadow-xl border border-neutral-700 flex-shrink-0 w-64 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      MB Bank • Napas 247
                    </span>
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] text-neutral-400">Số tài khoản VIP</p>
                    <p className="text-sm font-mono font-black tracking-wider text-white">
                      0388 999 888
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-neutral-700">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Đồng bộ tức thì
                    </span>
                    <span className="text-xs font-extrabold text-amber-300 font-mono">49.000đ</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Mã hóa chuẩn ngân hàng Việt Nam</span>
                <button
                  onClick={onOpenPricing}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  Xem bảng giá chi tiết <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
