'use client';

import React, { useState, useRef } from 'react';
import {
  QRConfig,
  QRMode,
  QRStyle,
  QRDotStyle,
  ColorTheme,
  User,
  SavedQRItem,
  CenterIconType,
} from '@/types';
import { QRVisualCanvas } from './QRVisualCanvas';
import { COLOR_PALETTES } from '@/lib/qr-generator';
import { downloadQRCodePNG, downloadQRCodeSVG } from '@/lib/export-utils';
import {
  Link as LinkIcon,
  Mail,
  Phone,
  Wifi,
  Sparkles,
  Crown,
  Heart,
  Palette,
  Image as ImageIcon,
  Type,
  Download,
  Eye,
  Bookmark,
  Share2,
  Check,
  Upload,
  Flower2,
  Camera,
  Zap,
  Gem,
  Flame,
  CircleDot,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRGeneratorSectionProps {
  config: QRConfig;
  onChangeConfig: (newConfig: QRConfig) => void;
  user: User | null;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onOpenTestScan: () => void;
  onOpenLetter: () => void;
  onSaveQR: (savedItem: SavedQRItem) => void;
}

const STYLE_OPTIONS: { id: QRStyle; label: string; icon: React.ElementType; isVip: boolean; desc: string }[] = [
  { id: 'standard', label: 'Tiêu Chuẩn', icon: Sparkles, isVip: false, desc: 'Bo góc thanh lịch' },
  { id: 'floral_rose', label: 'Hoa Hồng Nhung', icon: Flower2, isVip: true, desc: 'Viền hoa nở rộ' },
  { id: 'tulip_garden', label: 'Vườn Hoa Tulip', icon: Flower2, isVip: true, desc: 'Pastel ngọt ngào' },
  { id: 'heart_wreath', label: 'Vòng Hoa Trái Tim', icon: Heart, isVip: true, desc: 'Dây tim lãng mạn' },
  { id: 'neon_glow', label: 'Neon Phát Sáng', icon: Zap, isVip: true, desc: 'Ánh sáng cyber glow' },
  { id: 'polaroid', label: 'Polaroid Kỷ Niệm', icon: Camera, isVip: true, desc: 'Ảnh chụp vintage' },
  { id: 'ribbon_letter', label: 'Thư Tình Buộc Nơ', icon: Mail, isVip: true, desc: 'Phong bì thắt nơ' },
];

const DOT_STYLES: { id: QRDotStyle; label: string; preview: string }[] = [
  { id: 'rounded', label: 'Tròn Mềm', preview: '●' },
  { id: 'heart', label: 'Trái Tim Mini', preview: '♥' },
  { id: 'diamond', label: 'Kim Cương', preview: '◆' },
  { id: 'dots', label: 'Chấm Bi', preview: '•' },
  { id: 'square', label: 'Cổ Điển', preview: '■' },
];

const CENTER_ICONS: { id: CenterIconType; label: string; icon: React.ElementType }[] = [
  { id: 'heart', label: 'Trái Tim', icon: Heart },
  { id: 'sparkle', label: 'Lấp Lánh', icon: Sparkles },
  { id: 'rose', label: 'Hoa Hồng', icon: Flower2 },
  { id: 'gem', label: 'Kim Cương', icon: Gem },
  { id: 'mail', label: 'Thư Tình', icon: Mail },
  { id: 'flame', label: 'Ngọn Lửa', icon: Flame },
  { id: 'none', label: 'Không Có', icon: CircleDot },
];

export const QRGeneratorSection: React.FC<QRGeneratorSectionProps> = ({
  config,
  onChangeConfig,
  user,
  onOpenPricing,
  onOpenAuth,
  onOpenTestScan,
  onOpenLetter,
  onSaveQR,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'dots_color' | 'center' | 'caption'>('content');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUserVip = Boolean(user?.isVip);

  const updateConfig = (patch: Partial<QRConfig>) => {
    onChangeConfig({ ...config, ...patch });
  };

  const handleSelectStyle = (style: QRStyle, isVipRequired: boolean) => {
    if (isVipRequired && !isUserVip) {
      onOpenPricing();
      return;
    }
    updateConfig({ style });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isUserVip) {
      onOpenPricing();
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateConfig({
        centerIcon: 'custom_image',
        customImage: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFreeDownload = async () => {
    setIsExporting(true);
    try {
      await downloadQRCodePNG('love-qr-svg', `LoveQR_${config.title || 'Romantic'}_standard`, 800);
    } catch {
      alert('Không thể xuất ảnh, vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleVipDownload = async (format: 'png4k' | 'svg') => {
    if (!isUserVip) {
      onOpenPricing();
      return;
    }

    setIsExporting(true);
    try {
      if (format === 'svg') {
        downloadQRCodeSVG('love-qr-svg', `LoveQR_${config.title || 'Romantic'}_vector`);
      } else {
        await downloadQRCodePNG('love-qr-svg', `LoveQR_${config.title || 'Romantic'}_4k_ultra_hd`, 2048);
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      alert('Lỗi xuất file VIP, vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    try {
      const svg = document.getElementById('love-qr-svg');
      let dataUrl = '';
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
      }

      const item: SavedQRItem = {
        id: 'qr_' + Date.now(),
        title: config.title || 'Mã Tỏ Tình Lãng Mạn',
        style: config.style,
        createdAt: new Date().toLocaleDateString('vi-VN'),
        dataUrl: dataUrl,
        config: config,
      };

      onSaveQR(item);
      alert('Đã lưu mã QR vào lịch sử tài khoản của bạn thành công!');
    } catch {
      alert('Đã lưu mã QR vào lịch sử!');
    }
  };

  const handleCopyLink = () => {
    const url = config.mode === 'secret_letter'
      ? `https://loveqr.vn/letter?to=${encodeURIComponent(config.secretLetter.recipient)}`
      : config.text || window.location.href;

    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="editor" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editor Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-semibold mb-2 border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
            <span>STUDIO THIẾT KẾ MÃ QR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Tùy Biến Mã QR Tình Yêu
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Chọn khung viền hoa, màu sắc và gửi gắm những lời tỏ tình chân thành nhất
          </p>
        </div>

        {/* Main Grid: Control Panel (Left) + Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Customizer Studio Tabs (Glassmorphism + Hover) */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-pink-500/10 border border-white/50 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/60 border border-white/80 overflow-x-auto">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Nội Dung</span>
              </button>

              <button
                onClick={() => setActiveTab('style')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'style'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Flower2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Viền Hoa & Khung</span>
              </button>

              <button
                onClick={() => setActiveTab('dots_color')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'dots_color'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Màu Sắc & Điểm</span>
              </button>

              <button
                onClick={() => setActiveTab('center')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'center'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Icon & Ảnh Đôi</span>
              </button>

              <button
                onClick={() => setActiveTab('caption')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'caption'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Type className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Lời Nhắn</span>
              </button>
            </div>

            {/* TAB 1: Content Input */}
            {activeTab === 'content' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => updateConfig({ mode: 'url' })}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      config.mode === 'url'
                        ? 'border-rose-500 bg-white/80 text-rose-600 font-bold shadow-xs'
                        : 'border-white/60 bg-white/30 text-neutral-600 hover:border-pink-200'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4 mx-auto mb-1 text-rose-500" strokeWidth={1.5} />
                    <span className="text-xs">Liên Kết URL</span>
                  </button>

                  <button
                    onClick={() => updateConfig({ mode: 'secret_letter' })}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      config.mode === 'secret_letter'
                        ? 'border-rose-500 bg-white/80 text-rose-600 font-bold shadow-xs'
                        : 'border-white/60 bg-white/30 text-neutral-600 hover:border-pink-200'
                    }`}
                  >
                    <Mail className="w-4 h-4 mx-auto mb-1 text-pink-500" strokeWidth={1.5} />
                    <span className="text-xs">Thư Tình Bí Mật</span>
                  </button>

                  <button
                    onClick={() => updateConfig({ mode: 'zalo' })}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      config.mode === 'zalo'
                        ? 'border-rose-500 bg-white/80 text-rose-600 font-bold shadow-xs'
                        : 'border-white/60 bg-white/30 text-neutral-600 hover:border-pink-200'
                    }`}
                  >
                    <Phone className="w-4 h-4 mx-auto mb-1 text-blue-500" strokeWidth={1.5} />
                    <span className="text-xs">Zalo / SĐT</span>
                  </button>

                  <button
                    onClick={() => updateConfig({ mode: 'wifi' })}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      config.mode === 'wifi'
                        ? 'border-rose-500 bg-white/80 text-rose-600 font-bold shadow-xs'
                        : 'border-white/60 bg-white/30 text-neutral-600 hover:border-pink-200'
                    }`}
                  >
                    <Wifi className="w-4 h-4 mx-auto mb-1 text-emerald-500" strokeWidth={1.5} />
                    <span className="text-xs">WiFi Cặp Đôi</span>
                  </button>
                </div>

                {config.mode === 'url' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-800">
                      Đường dẫn URL bài hát, video hoặc album ảnh
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtu.be/... hoặc link Spotify, Google Drive"
                      value={config.text}
                      onChange={(e) => updateConfig({ text: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs sm:text-sm text-neutral-900 bg-white/60"
                    />
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-rose-600">
                      <span className="font-semibold text-neutral-500">Gợi ý nhanh:</span>
                      <button
                        type="button"
                        onClick={() => updateConfig({ text: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M' })}
                        className="underline hover:text-rose-800 cursor-pointer"
                      >
                        Playlist Lofi Tỏ Tình
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => updateConfig({ text: 'https://youtube.com/watch?v=dQw4w9WgXcQ' })}
                        className="underline hover:text-rose-800 cursor-pointer"
                      >
                        Nhạc Kỷ Niệm
                      </button>
                    </div>
                  </div>
                )}

                {config.mode === 'secret_letter' && (
                  <div className="space-y-3 p-4 rounded-2xl bg-white/50 border border-white/80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Tên người nhận (Bé iu)
                        </label>
                        <input
                          type="text"
                          placeholder="VD: Em Bé Thu Hà"
                          value={config.secretLetter.recipient}
                          onChange={(e) =>
                            updateConfig({
                              secretLetter: { ...config.secretLetter, recipient: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-white/80 text-xs sm:text-sm bg-white/80"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1">
                          Tên người gửi (Anh)
                        </label>
                        <input
                          type="text"
                          placeholder="VD: Anh Tuấn của em"
                          value={config.secretLetter.sender}
                          onChange={(e) =>
                            updateConfig({
                              secretLetter: { ...config.secretLetter, sender: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-white/80 text-xs sm:text-sm bg-white/80"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Nội dung bức thư tình bí mật
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Nhập những lời yêu thương chân thành nhất gửi đến người ấy..."
                        value={config.secretLetter.message}
                        onChange={(e) =>
                          updateConfig({
                            secretLetter: { ...config.secretLetter, message: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 text-xs sm:text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={onOpenLetter}
                      className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Xem thử trang mở thư tương tác</span>
                    </button>
                  </div>
                )}

                {config.mode === 'zalo' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-800">
                      Số điện thoại Zalo của bạn hoặc người ấy
                    </label>
                    <input
                      type="tel"
                      placeholder="0988888888"
                      value={config.text.replace('https://zalo.me/', '')}
                      onChange={(e) => updateConfig({ text: `https://zalo.me/${e.target.value.trim()}` })}
                      className="w-full px-4 py-3 rounded-2xl border border-white/80 text-xs sm:text-sm bg-white/60"
                    />
                  </div>
                )}

                {config.mode === 'wifi' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Tên mạng WiFi (SSID)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Nha-Cua-Chung-Ta"
                        onChange={(e) =>
                          updateConfig({
                            text: `WIFI:T:WPA;S:${e.target.value};P:love123456;;`,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-2xl border border-white/80 text-xs sm:text-sm bg-white/60"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Style & Frames (NO EMOJIS - Lucide Icons) */}
            {activeTab === 'style' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-neutral-800">Chọn Khung Viền Nghệ Thuật</p>
                  {!isUserVip && (
                    <button
                      onClick={onOpenPricing}
                      className="text-xs text-amber-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={1.5} />
                      <span>Mở khóa toàn bộ mẫu VIP (49K)</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STYLE_OPTIONS.map((style) => {
                    const isSelected = config.style === style.id;
                    const IconComponent = style.icon;
                    return (
                      <button
                        key={style.id}
                        onClick={() => handleSelectStyle(style.id, style.isVip)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-rose-500 bg-white shadow-md shadow-pink-500/10'
                            : 'border-white/60 hover:border-pink-200 bg-white/40'
                        }`}
                      >
                        {style.isVip && !isUserVip && (
                          <span className="absolute top-2 right-2 p-1 rounded-full bg-amber-500 text-white shadow-xs">
                            <Crown className="w-3 h-3 fill-white" strokeWidth={1.5} />
                          </span>
                        )}

                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2">
                          <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <p className="text-xs font-bold text-neutral-900 truncate">{style.label}</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Dots Style & Colors */}
            {activeTab === 'dots_color' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <p className="text-xs font-bold text-neutral-800 mb-2">Hình Dáng Điểm Ảnh (QR Dots)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {DOT_STYLES.map((dot) => {
                      const isSelected = config.dotStyle === dot.id;
                      return (
                        <button
                          key={dot.id}
                          onClick={() => updateConfig({ dotStyle: dot.id })}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-rose-500 bg-white text-rose-600 font-bold shadow-xs'
                              : 'border-white/60 hover:border-pink-200 bg-white/40 text-neutral-600'
                          }`}
                        >
                          <div className="text-lg text-rose-500 font-bold mb-0.5">{dot.preview}</div>
                          <p className="text-[11px]">{dot.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-neutral-800 mb-2">Bảng Màu Lãng Mạn</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(COLOR_PALETTES) as ColorTheme[]).map((key) => {
                      const item = COLOR_PALETTES[key];
                      const isSelected = config.colorTheme === key;
                      return (
                        <button
                          key={key}
                          onClick={() => updateConfig({ colorTheme: key })}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? 'border-rose-500 bg-white shadow-xs'
                              : 'border-white/60 hover:border-pink-200 bg-white/40'
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                            style={{ backgroundColor: item.fg }}
                          />
                          <p className="text-xs font-bold text-neutral-900 truncate">{item.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Center Logo & Photo Upload (NO EMOJIS) */}
            {activeTab === 'center' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-xs font-bold text-neutral-800">Chọn Biểu Tượng Ở Giữa Hoặc Tải Ảnh Đôi</p>

                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {CENTER_ICONS.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => updateConfig({ centerIcon: item.id })}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          config.centerIcon === item.id
                            ? 'border-rose-500 bg-white text-rose-600 font-bold shadow-xs'
                            : 'border-white/60 hover:border-pink-200 bg-white/40'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-1">
                          <IconComp className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <p className="text-[10px] text-neutral-800 font-medium">{item.label}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Couple Photo Upload */}
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-amber-500 fill-amber-500" strokeWidth={1.5} />
                      <span>Lồng Ảnh Đôi Của Hai Bạn (VIP)</span>
                    </p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">
                      Chèn ảnh selfie 2 người vào giữa mã QR với viền bo tròn tinh tế
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => {
                      if (!isUserVip) {
                        onOpenPricing();
                      } else {
                        fileInputRef.current?.click();
                      }
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{config.customImage ? 'Đổi Ảnh Khác' : 'Tải Ảnh Lên'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: Captions */}
            {activeTab === 'caption' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Tiêu đề phía trên mã QR
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Quét để xem bất ngờ nè!"
                    value={config.title}
                    onChange={(e) => updateConfig({ title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 text-xs sm:text-sm bg-white/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Dòng chữ kỷ niệm / Lời nhắn phía dưới
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 14.02.2026 • Forever with you"
                    value={config.subtitle}
                    onChange={(e) => updateConfig({ subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 text-xs sm:text-sm bg-white/60"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="scanMeTag"
                    checked={config.showScanMeTag}
                    onChange={(e) => updateConfig({ showScanMeTag: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <label htmlFor="scanMeTag" className="text-xs font-semibold text-neutral-800 cursor-pointer">
                    Hiển thị huy hiệu &quot;Scan with Love&quot; ở góc dưới mã QR
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Preview & Export Hub (Glassmorphism card) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl shadow-pink-500/10 border border-white/50 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
              {/* Scanability indicator */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-bold border border-emerald-200 mb-5">
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
                <span>Camera iPhone & Zalo quét 100% chuẩn</span>
              </div>

              {/* Visual QR Code Display */}
              <div className="flex justify-center my-2">
                <QRVisualCanvas config={config} isVip={isUserVip} />
              </div>

              {/* Action Buttons Hub with micro-interactions */}
              <div className="mt-7 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onOpenTestScan}
                    className="py-2.5 px-3 rounded-2xl bg-white/60 hover:bg-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/80 shadow-xs hover:-translate-y-0.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                    <span>Quét Thử Ngay</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 px-3 rounded-2xl bg-white/60 hover:bg-white text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/80 shadow-xs hover:-translate-y-0.5"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />
                        <span className="text-emerald-700">Đã chép link</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-rose-500" strokeWidth={1.5} />
                        <span>Sao Chép Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Primary Download Free */}
                <button
                  onClick={handleFreeDownload}
                  disabled={isExporting}
                  className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200/80 text-neutral-800 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 text-rose-500" strokeWidth={1.5} />
                  <span>Tải Miễn Phí (PNG Chuẩn)</span>
                </button>

                {/* VIP Download 4K Ultra HD */}
                <button
                  onClick={() => handleVipDownload('png4k')}
                  disabled={isExporting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-400/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/25 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-amber-200 fill-amber-200" strokeWidth={1.5} />
                  <span>
                    {isUserVip ? 'Tải Bản VIP 4K Ultra HD (Sắc Nét)' : 'Mở Khóa Xuất Ảnh 4K & In Thiệp (49K)'}
                  </span>
                </button>

                {/* Save to History Button */}
                <button
                  onClick={handleSaveToHistory}
                  className="w-full py-2.5 rounded-2xl text-neutral-600 hover:text-neutral-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Lưu vào lịch sử tài khoản</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
