'use client';

import React, { useState } from 'react';
import { X, Heart, Volume2, VolumeX, Send, Sparkles, Mail } from 'lucide-react';
import { SecretLetterData } from '@/types';

interface SecretLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: SecretLetterData;
}

export const SecretLetterModal: React.FC<SecretLetterModalProps> = ({
  isOpen,
  onClose,
  letter,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      {/* Delicate floating SVG petal particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-300/40 select-none"
            style={{
              left: `${(i * 8.5) % 100}%`,
              animation: `petalFall ${7 + (i % 4)}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <svg className="w-5 h-5 text-rose-300/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-lg bg-white/95 rounded-3xl shadow-2xl border border-white overflow-hidden my-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Music toggle badge */}
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer z-10"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-rose-600 animate-pulse" strokeWidth={1.5} />
              <span>Giai điệu lofi đang phát</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
              <span>Bật nhạc lãng mạn</span>
            </>
          )}
        </button>

        {/* Header */}
        <div className="text-center pt-6 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white mx-auto shadow-md shadow-rose-300/40 mb-3">
            <Mail className="w-6 h-6" strokeWidth={1.5} />
          </div>

          <span className="text-[10px] uppercase font-bold tracking-widest text-rose-600 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
            Thư Tình Tương Tác
          </span>

          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-2">
            Gửi: {letter.recipient || 'Người yêu dấu'}
          </h3>
          <p className="text-xs text-neutral-400 font-medium">
            Ngày gửi: {letter.date || new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>

        {/* Parchment letter content box */}
        <div className="relative bg-neutral-50 p-6 sm:p-7 rounded-2xl border border-neutral-200 shadow-inner space-y-4">
          <div className="text-xs sm:text-sm leading-relaxed text-neutral-800 whitespace-pre-wrap font-serif">
            {letter.message ||
              `Chào em yêu,\n\nCảm ơn em vì đã luôn ở bên cạnh anh, mang đến cho anh những ngày tháng ngọt ngào và hạnh phúc nhất. Mã QR này là một chút bất ngờ anh muốn dành tặng em!\n\nYêu em nhiều hơn mỗi ngày.`}
          </div>

          <div className="pt-4 border-t border-neutral-200 text-right">
            <p className="text-xs text-neutral-400 italic">Mãi yêu thương,</p>
            <p className="text-sm font-bold text-rose-700 font-serif mt-0.5">
              {letter.sender || 'Anh của em'}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => alert('Đã gửi phản hồi yêu thương thành công!')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Gửi lời nhắn đáp lại</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs cursor-pointer transition-colors"
          >
            Đóng thư
          </button>
        </div>
      </div>
    </div>
  );
};
