'use client';

import React, { useState } from 'react';
import { ChevronDown, Heart, Star, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'Mã QR tình yêu tạo trên LoveQR có bị hết hạn không?',
    a: 'Hoàn toàn không bao giờ hết hạn. Mã QR chứa dữ liệu chuẩn quốc tế và liên kết trực tiếp, bạn và người ấy có thể quét lại sau 5 năm, 10 năm hay 50 năm nữa vào ngày kỷ niệm ngày cưới đều hoạt động bình thường.',
  },
  {
    q: 'Camera thường của iPhone và ứng dụng Zalo có quét được không?',
    a: 'Có, 100%. LoveQR áp dụng thuật toán High Error Correction (mức độ sửa lỗi cao 30%), giữ nguyên các mắt định vị Finder Patterns nên dù có thêm hoa hồng, hoa tulip hay trái tim ở giữa, camera điện thoại vẫn nhận diện ngay lập tức trong 0.2 giây.',
  },
  {
    q: 'Thanh toán SePay VietQR hoạt động như thế nào?',
    a: 'Bạn chỉ cần mở bất kỳ ứng dụng ngân hàng nào (MB Bank, Vietcombank, Techcombank, MoMo...) và quét mã VietQR trên màn hình. Hệ thống SePay sẽ tự động nhận diện nội dung chuyển khoản và kích hoạt tài khoản VIP của bạn ngay lập tức trong vòng 3-5 giây.',
  },
  {
    q: 'Mình muốn in mã QR lên thiệp cưới, áo thun cặp hoặc ly sứ thì sao?',
    a: 'Với gói VIP Cặp Đôi, bạn có thể tải file ảnh 4K Ultra HD (2048x2048px) hoặc Vector SVG không vỡ nét để gửi cho các xưởng in ấn chuyên nghiệp, đảm bảo hình ảnh sắc nét tuyệt đối.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Mình tạo mã QR viền hoa hồng in lên thiệp tặng bạn gái nhân dịp 100 ngày yêu, bạn ấy quét một phát ra bài hát Spotify của hai đứa xúc động vô cùng.',
    author: 'Hoàng Nam & Lan Anh',
    tag: 'Cặp đôi Hà Nội',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    quote: 'Giao diện cực kỳ sang trọng và tinh tế, thanh toán SePay quét mã VietQR cái là lên VIP liền chưa tới 3 giây. Rất đáng 49K cho một món quà bất ngờ thế này!',
    author: 'Minh Quân & Thùy Trang',
    tag: 'Gen Z Đà Nẵng',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 text-xs font-semibold mb-3 border border-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" strokeWidth={1.5} />
            <span>CẢM NHẬN CỦA CÁC CẶP ĐÔI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Những Câu Chuyện Tình Yêu Được Mã Hóa
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl shadow-pink-500/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-rose-100/60">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{item.author}</p>
                    <p className="text-[11px] text-neutral-500">{item.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              Câu Hỏi Thường Gặp
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-neutral-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-rose-500' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-rose-100/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
