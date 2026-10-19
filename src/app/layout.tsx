import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveQR 💖 Trình Tạo Mã QR Tỏ Tình & Nghệ Thuật Lãng Mạn",
  description: "Micro-SaaS tạo mã QR lãng mạn, QR hoa hồng, QR trái tim, thư tình bí mật cho các cặp đôi và Gen Z. Quét cực nhạy trên camera điện thoại và Zalo.",
  keywords: "QR tỏ tình, QR tình yêu, QR hoa hồng, QR trái tim, tạo mã QR lãng mạn, SePay VietQR, Valentine QR",
  openGraph: {
    title: "LoveQR 💖 Trình Tạo Mã QR Tỏ Tình & Nghệ Thuật Lãng Mạn",
    description: "Biến lời tỏ tình và kỷ niệm ngọt ngào thành tác phẩm mã QR nghệ thuật.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Quicksand:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-rose-200 selection:text-rose-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
