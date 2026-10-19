'use client';

import React from 'react';
import { X, History, Trash2, ExternalLink, QrCode } from 'lucide-react';
import { SavedQRItem } from '@/types';

interface SavedHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SavedQRItem[];
  onSelect: (item: SavedQRItem) => void;
  onDelete: (id: string) => void;
}

export const SavedHistoryDrawer: React.FC<SavedHistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelect,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-neutral-200 flex flex-col">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-rose-200" strokeWidth={1.5} />
              <h3 className="text-sm font-extrabold">Lịch Sử Mã QR Đã Tạo</h3>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-3">
                  <QrCode className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-bold text-neutral-900">Chưa có mã QR nào được lưu</h4>
                <p className="text-[11px] text-neutral-500 mt-1 max-w-xs mx-auto">
                  Tạo mã QR tỏ tình hoặc hoa hồng và bấm &quot;Lưu vào lịch sử&quot; để xem lại bất cứ lúc nào!
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-neutral-200 hover:border-pink-300 bg-neutral-50/50 hover:bg-white transition-all flex items-center gap-3 group"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.dataUrl ? (
                      <img src={item.dataUrl} alt={item.title} className="w-full h-full object-contain" />
                    ) : (
                      <QrCode className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-rose-600 transition-colors">
                      {item.title || 'Mã Tỏ Tình Lãng Mạn'}
                    </p>
                    <p className="text-[10px] text-neutral-400">{item.createdAt}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full capitalize">
                      {item.style.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      title="Nạp vào trình chỉnh sửa"
                      className="p-1.5 rounded-lg text-neutral-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      title="Xóa"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
