'use client';

import React, { useMemo } from 'react';
import { QRConfig } from '@/types';
import { getQRMatrix, isFinderPattern, isCenterLogoArea, COLOR_PALETTES } from '@/lib/qr-generator';
import { Heart, Sparkles, Gem, Mail, Flame, Camera, Flower2 } from 'lucide-react';

interface QRVisualCanvasProps {
  config: QRConfig;
  isVip: boolean;
  scale?: number;
}

export const QRVisualCanvas: React.FC<QRVisualCanvasProps> = ({
  config,
  isVip,
  scale = 1,
}) => {
  // Generate Matrix
  const matrixData = useMemo(() => {
    try {
      const content =
        config.mode === 'secret_letter'
          ? `https://loveqr.vn/letter?to=${encodeURIComponent(config.secretLetter.recipient)}&from=${encodeURIComponent(config.secretLetter.sender)}&msg=${encodeURIComponent(config.secretLetter.message.substring(0, 80))}`
          : config.text || 'https://loveqr.vn';
      return getQRMatrix(content);
    } catch {
      return getQRMatrix('https://loveqr.vn');
    }
  }, [config.mode, config.text, config.secretLetter]);

  const palette = COLOR_PALETTES[config.colorTheme] || COLOR_PALETTES.strawberry;
  const fgColor = config.colorTheme === 'custom' ? config.fgColor : palette.fg;
  const bgColor = config.colorTheme === 'custom' ? config.bgColor : palette.bg;

  const { size, data } = matrixData;
  const moduleSize = 10;
  const qrPixelSize = size * moduleSize;

  // Render Corner Eye (Finder Pattern)
  const renderEye = (x: number, y: number) => {
    return (
      <g key={`eye-${x}-${y}`}>
        {/* Outer Eye frame */}
        <rect
          x={x * moduleSize}
          y={y * moduleSize}
          width={7 * moduleSize}
          height={7 * moduleSize}
          rx={config.dotStyle === 'heart' ? 14 : 10}
          ry={config.dotStyle === 'heart' ? 14 : 10}
          fill="none"
          stroke={fgColor}
          strokeWidth={moduleSize}
        />
        {/* Eye Inner Dot */}
        {config.dotStyle === 'heart' ? (
          <path
            d={`M ${(x + 3.5) * moduleSize} ${(y + 2.5) * moduleSize} 
                c -${moduleSize * 0.8} -${moduleSize * 1.0}, -${moduleSize * 2.0} 0, 0 ${moduleSize * 2.0} 
                c ${moduleSize * 2.0} -${moduleSize * 2.0}, ${moduleSize * 0.8} -${moduleSize * 3.0}, 0 -${moduleSize * 2.0} z`}
            fill={fgColor}
            transform={`rotate(180, ${(x + 3.5) * moduleSize}, ${(y + 3.5) * moduleSize}) scale(0.9)`}
          />
        ) : (
          <rect
            x={(x + 2) * moduleSize}
            y={(y + 2) * moduleSize}
            width={3 * moduleSize}
            height={3 * moduleSize}
            rx={config.dotStyle === 'rounded' || config.dotStyle === 'dots' ? 8 : 4}
            fill={fgColor}
          />
        )}
      </g>
    );
  };

  // Render modules
  const renderModules = () => {
    const modules: React.ReactNode[] = [];
    const hasCenter = config.centerIcon !== 'none';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (isFinderPattern(r, c, size)) continue;
        if (isCenterLogoArea(r, c, size, hasCenter)) continue;

        if (data[r][c]) {
          const cx = c * moduleSize + moduleSize / 2;
          const cy = r * moduleSize + moduleSize / 2;

          if (config.dotStyle === 'heart') {
            modules.push(
              <path
                key={`m-${r}-${c}`}
                d={`M ${cx} ${cy - 1.5}
                    C ${cx - 2.5} ${cy - 4.5}, ${cx - 5} ${cy - 1.5}, ${cx} ${cy + 3.5}
                    C ${cx + 5} ${cy - 1.5}, ${cx + 2.5} ${cy - 4.5}, ${cx} ${cy - 1.5} Z`}
                fill={fgColor}
              />
            );
          } else if (config.dotStyle === 'rounded' || config.dotStyle === 'dots') {
            modules.push(
              <circle
                key={`m-${r}-${c}`}
                cx={cx}
                cy={cy}
                r={moduleSize * 0.44}
                fill={fgColor}
              />
            );
          } else if (config.dotStyle === 'diamond') {
            modules.push(
              <polygon
                key={`m-${r}-${c}`}
                points={`${cx},${cy - 4.5} ${cx + 4.5},${cy} ${cx},${cy + 4.5} ${cx - 4.5},${cy}`}
                fill={fgColor}
              />
            );
          } else {
            modules.push(
              <rect
                key={`m-${r}-${c}`}
                x={c * moduleSize + 0.6}
                y={r * moduleSize + 0.6}
                width={moduleSize - 1.2}
                height={moduleSize - 1.2}
                rx={2.5}
                fill={fgColor}
              />
            );
          }
        }
      }
    }
    return modules;
  };

  // Render Center Icon / Logo (NO EMOJIS - pure Lucide vectors)
  const renderCenterLogo = () => {
    if (config.centerIcon === 'none') return null;

    const centerCoord = qrPixelSize / 2;
    const radius = qrPixelSize * 0.14;

    return (
      <g>
        {/* Background circular surface */}
        <circle
          cx={centerCoord}
          cy={centerCoord}
          r={radius + 3}
          fill="#ffffff"
          stroke={fgColor}
          strokeWidth="2.5"
          filter="drop-shadow(0 6px 12px rgba(244, 63, 94, 0.2))"
        />

        {config.centerIcon === 'custom_image' && config.customImage ? (
          <g>
            <clipPath id="center-image-clip">
              <circle cx={centerCoord} cy={centerCoord} r={radius} />
            </clipPath>
            <image
              href={config.customImage}
              x={centerCoord - radius}
              y={centerCoord - radius}
              width={radius * 2}
              height={radius * 2}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#center-image-clip)"
            />
          </g>
        ) : (
          <g transform={`translate(${centerCoord - 14}, ${centerCoord - 14})`}>
            {config.centerIcon === 'heart' && (
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                fill={fgColor}
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
            {config.centerIcon === 'sparkle' && (
              <path
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                fill={fgColor}
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
            {(config.centerIcon === 'rose' || config.centerIcon === 'flower' as any) && (
              <path
                d="M12 2a4 4 0 0 0-4 4c0 1.25.5 2.5 1.5 3.5-1.5.5-3.5 1.5-3.5 3.5a4 4 0 0 0 4 4c1.25 0 2.5-.5 3.5-1.5.5 1.5 1.5 3.5 3.5 3.5a4 4 0 0 0 4-4c0-1.25-.5-2.5-1.5-3.5 1.5-.5 3.5-1.5 3.5-3.5a4 4 0 0 0-4-4c-1.25 0-2.5.5-3.5 1.5-.5-1.5-1.5-3.5-3.5-3.5z"
                fill="none"
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
            {config.centerIcon === 'gem' && (
              <path
                d="M6 3h12l4 6-10 12L2 9z"
                fill="none"
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
            {config.centerIcon === 'mail' && (
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"
                fill="none"
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
            {config.centerIcon === 'flame' && (
              <path
                d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                fill="none"
                stroke={fgColor}
                strokeWidth="1.5"
                transform="scale(1.15)"
              />
            )}
          </g>
        )}
      </g>
    );
  };

  // Modern Vector SVG Frame Decorations (STRICTLY NO SYSTEM EMOJIS)
  const renderFrameDecoration = () => {
    switch (config.style) {
      case 'floral_rose':
        return (
          <div className="absolute inset-0 pointer-events-none -m-5 sm:-m-6 border border-rose-300/80 rounded-[2.5rem] shadow-xl shadow-rose-200/40">
            {/* Top-Left Botanical Rose SVG */}
            <svg className="absolute -top-4 -left-4 w-9 h-9 text-rose-500 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" fill="#ffe4e6" stroke="#f43f5e" />
              <path d="M12 8a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" fill="#f43f5e" stroke="#e11d48" />
            </svg>
            {/* Top-Right Botanical Rose SVG */}
            <svg className="absolute -top-4 -right-4 w-9 h-9 text-rose-500 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" fill="#ffe4e6" stroke="#f43f5e" />
              <path d="M12 8a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" fill="#f43f5e" stroke="#e11d48" />
            </svg>
            {/* Bottom-Left Botanical Rose SVG */}
            <svg className="absolute -bottom-4 -left-4 w-9 h-9 text-rose-500 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" fill="#ffe4e6" stroke="#f43f5e" />
              <path d="M12 8a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" fill="#f43f5e" stroke="#e11d48" />
            </svg>
            {/* Bottom-Right Botanical Rose SVG */}
            <svg className="absolute -bottom-4 -right-4 w-9 h-9 text-rose-500 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" fill="#ffe4e6" stroke="#f43f5e" />
              <path d="M12 8a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" fill="#f43f5e" stroke="#e11d48" />
            </svg>

            {/* Center Pill */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-white/95 border border-rose-200 text-[10px] font-bold text-rose-600 flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-rose-500" strokeWidth={1.5} />
              <span>Rose Art Frame</span>
            </div>
          </div>
        );

      case 'tulip_garden':
        return (
          <div className="absolute inset-0 pointer-events-none -m-5 sm:-m-6 border border-pink-300 rounded-[2.5rem] shadow-xl shadow-pink-200/40">
            {/* Tulip Corner Vectors */}
            <div className="absolute -top-3.5 -left-3.5 w-7 h-7 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-pink-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-pink-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-3.5 -left-3.5 w-7 h-7 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-pink-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-pink-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-white/95 border border-pink-200 text-[10px] font-bold text-pink-600 flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
              <Flower2 className="w-3 h-3 text-pink-500" strokeWidth={1.5} />
              <span>Tulip Botanical</span>
            </div>
          </div>
        );

      case 'heart_wreath':
        return (
          <div className="absolute inset-0 pointer-events-none -m-5 sm:-m-6 border-2 border-rose-400/80 rounded-[2.5rem] shadow-xl shadow-rose-300/40">
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-3.5 h-3.5 fill-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-3.5 h-3.5 fill-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-3.5 h-3.5 fill-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Heart className="w-3.5 h-3.5 fill-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Heart className="w-3 h-3 fill-white" strokeWidth={1.5} />
              <span>Forever Love</span>
            </div>
          </div>
        );

      case 'neon_glow':
        return (
          <div className="absolute inset-0 pointer-events-none -m-4 sm:-m-5 border-2 border-rose-500 rounded-3xl shadow-[0_0_25px_rgba(244,63,94,0.45)] ring-1 ring-pink-300/80">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-rose-600 text-[10px] font-black text-white tracking-widest uppercase shadow-[0_0_12px_#f43f5e]">
              Neon Romance
            </div>
          </div>
        );

      case 'polaroid':
        return (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none w-20 h-4 bg-amber-100/90 border border-amber-300/60 rotate-1 shadow-sm rounded-xs flex items-center justify-center">
            <div className="w-6 h-1 bg-amber-200/50 rounded-full" />
          </div>
        );

      case 'ribbon_letter':
        return (
          <div className="absolute inset-0 pointer-events-none -m-4 sm:-m-5 border border-dashed border-rose-300 rounded-3xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm flex items-center gap-1.5">
              <Mail className="w-3 h-3" strokeWidth={1.5} />
              <span>Love Letter Seal</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 pointer-events-none -m-3 sm:-m-4 border border-rose-200/80 rounded-3xl shadow-xs" />
        );
    }
  };

  return (
    <div
      className={`relative inline-block p-6 sm:p-7 rounded-[2.2rem] transition-all duration-300 ${
        config.style === 'polaroid'
          ? 'bg-white shadow-2xl pt-8 pb-10 border border-neutral-200/80'
          : 'bg-white/95 shadow-xl shadow-rose-300/30 border border-white/80'
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Decorative Frame Overlay */}
      {renderFrameDecoration()}

      {/* Top Title Banner */}
      {config.title && (
        <div className="text-center mb-3 relative z-10">
          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight flex items-center justify-center gap-1.5">
            <span>{config.title}</span>
            <Sparkles className="w-3 h-3 text-rose-500" strokeWidth={1.5} />
          </h4>
        </div>
      )}

      {/* QR Code SVG */}
      <div
        className="relative p-2.5 rounded-2xl flex items-center justify-center transition-colors"
        style={{ backgroundColor: bgColor }}
      >
        <svg
          id="love-qr-svg"
          viewBox={`0 0 ${qrPixelSize} ${qrPixelSize}`}
          className="w-52 h-52 sm:w-60 sm:h-60 max-w-full h-auto drop-shadow-xs select-none"
        >
          {/* Finder Pattern Eyes */}
          {renderEye(0, 0)}
          {renderEye(size - 7, 0)}
          {renderEye(0, size - 7)}

          {/* Body Modules */}
          {renderModules()}

          {/* Center Logo */}
          {renderCenterLogo()}
        </svg>

        {/* Scan Me Badge */}
        {config.showScanMeTag && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shadow-rose-400/40 flex items-center gap-1 whitespace-nowrap">
            <Heart className="w-2.5 h-2.5 fill-white" strokeWidth={1.5} />
            <span>Scan with Love</span>
          </div>
        )}
      </div>

      {/* Bottom Subtitle / Date */}
      {config.subtitle && (
        <div className="text-center mt-3.5 relative z-10">
          <p
            className={`text-[11px] text-neutral-600 font-medium ${
              config.style === 'polaroid' ? 'italic text-neutral-700' : ''
            }`}
          >
            {config.subtitle}
          </p>
        </div>
      )}
    </div>
  );
};
