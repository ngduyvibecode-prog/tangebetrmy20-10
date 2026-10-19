import QRCode from 'qrcode';
import { QRConfig, QRStyle, QRDotStyle } from '@/types';

export interface QRMatrixData {
  size: number;
  data: boolean[][];
}

/**
 * Generate binary matrix from text using QRCode library with High error correction
 */
export function getQRMatrix(text: string): QRMatrixData {
  const qr = QRCode.create(text || 'https://loveqr.vn', {
    errorCorrectionLevel: 'H',
  });
  const size = qr.modules.size;
  const data: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c++) {
      row.push(Boolean(qr.modules.get(r, c)));
    }
    data.push(row);
  }

  return { size, data };
}

/**
 * Checks if module (r, c) is part of the 3 Finder Pattern eyes (Top-Left, Top-Right, Bottom-Left)
 */
export function isFinderPattern(r: number, c: number, size: number): boolean {
  // Top-left 7x7 (0..6, 0..6) + 1 quiet border
  if (r <= 7 && c <= 7) return true;
  // Top-right 7x7
  if (r <= 7 && c >= size - 8) return true;
  // Bottom-left 7x7
  if (r >= size - 8 && c <= 7) return true;
  return false;
}

/**
 * Checks if module (r, c) is inside the center logo cutout area
 */
export function isCenterLogoArea(r: number, c: number, size: number, hasCenterIcon: boolean): boolean {
  if (!hasCenterIcon) return false;
  const center = Math.floor(size / 2);
  const radius = Math.floor(size * 0.18); // ~36% width center area
  return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
}

/**
 * Color theme presets
 */
export const COLOR_PALETTES = {
  strawberry: {
    name: 'Dâu Tây Sữa (Strawberry Milk)',
    fg: '#e11d48', // rose-600
    bg: '#fff5f7',
    accent: '#fb7185',
    gradient: 'from-pink-500 to-rose-600',
  },
  rose_gold: {
    name: 'Hồng Ánh Kim (Rose Gold)',
    fg: '#be185d', // pink-700
    bg: '#fff1f2',
    accent: '#f472b6',
    gradient: 'from-pink-600 to-rose-500',
  },
  crimson: {
    name: 'Đỏ Nhung Lãng Mạn (Velvet Crimson)',
    fg: '#9f1239', // rose-800
    bg: '#fff0f3',
    accent: '#e11d48',
    gradient: 'from-rose-700 to-pink-800',
  },
  lavender_dream: {
    name: 'Tím Hồng Giấc Mơ (Lavender Dream)',
    fg: '#7e22ce', // purple-700
    bg: '#faf5ff',
    accent: '#c084fc',
    gradient: 'from-purple-600 to-pink-500',
  },
  peach_sunset: {
    name: 'Cam Đào Hoàng Hôn (Peach Sunset)',
    fg: '#ea580c', // orange-600
    bg: '#fff7ed',
    accent: '#fb923c',
    gradient: 'from-orange-500 to-rose-500',
  },
  custom: {
    name: 'Tự Chọn Màu (Custom)',
    fg: '#f43f5e',
    bg: '#ffffff',
    accent: '#fb7185',
    gradient: 'from-pink-500 to-rose-500',
  },
};
