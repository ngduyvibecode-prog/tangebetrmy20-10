'use client';

import React, { useState, useEffect } from 'react';
import { QRConfig, User, SavedQRItem } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { QRGeneratorSection } from '@/components/QRGeneratorSection';
import { PricingSection } from '@/components/PricingSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { GoogleAuthModal } from '@/components/GoogleAuthModal';
import { SePayPaymentModal } from '@/components/SePayPaymentModal';
import { SavedHistoryDrawer } from '@/components/SavedHistoryDrawer';
import { TestScanModal } from '@/components/TestScanModal';
import { SecretLetterModal } from '@/components/SecretLetterModal';
import { RomanticAudioPlayer } from '@/components/RomanticAudioPlayer';

const DEFAULT_CONFIG: QRConfig = {
  mode: 'url',
  text: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
  title: 'Quét Để Xem Bất Ngờ',
  subtitle: 'From Anh With Love • 14.02.2026',
  style: 'floral_rose',
  dotStyle: 'heart',
  colorTheme: 'strawberry',
  fgColor: '#e11d48',
  bgColor: '#fff5f7',
  centerIcon: 'heart',
  secretLetter: {
    recipient: 'Bé Iu Thu Hà',
    sender: 'Anh Tuấn của em',
    message:
      'Chào em yêu,\n\nCảm ơn em vì đã luôn ở bên cạnh anh, mang lại những nụ cười ấm áp nhất. Mã QR này là một món quà nhỏ chứa đựng tất cả tình cảm anh dành cho em.\n\nMãi yêu thương em.',
    date: '14.02.2026',
  },
  showScanMeTag: true,
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);
  const [savedItems, setSavedItems] = useState<SavedQRItem[]>([]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTestScanOpen, setIsTestScanOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Load user and saved items from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('loveqr_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedItems = localStorage.getItem('loveqr_saved_items');
      if (storedItems) {
        setSavedItems(JSON.parse(storedItems));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Sync user to localStorage
  const handleUserChange = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('loveqr_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('loveqr_user');
    }
  };

  // Payment success handler (SePay)
  const handlePaymentSuccess = () => {
    const updatedUser: User = user
      ? { ...user, isVip: true, plan: 'vip_lifetime' }
      : {
          id: 'usr_' + Date.now(),
          name: 'Khách Hàng VIP',
          email: 'vip.customer@loveqr.vn',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          isVip: true,
          plan: 'vip_lifetime',
        };

    handleUserChange(updatedUser);
  };

  // Save QR to history
  const handleSaveQR = (item: SavedQRItem) => {
    const updated = [item, ...savedItems];
    setSavedItems(updated);
    try {
      localStorage.setItem('loveqr_saved_items', JSON.stringify(updated));
    } catch {
      // storage quota
    }
  };

  // Delete saved QR
  const handleDeleteSavedQR = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem('loveqr_saved_items', JSON.stringify(updated));
    } catch {}
  };

  // Re-select saved QR into editor
  const handleSelectSavedQR = (item: SavedQRItem) => {
    setConfig(item.config);
  };

  const handleQuickStart = (urlOrText: string) => {
    if (!urlOrText) return;
    if (urlOrText.startsWith('http://') || urlOrText.startsWith('https://')) {
      setConfig((prev) => ({ ...prev, mode: 'url', text: urlOrText }));
    } else {
      setConfig((prev) => ({
        ...prev,
        mode: 'secret_letter',
        secretLetter: { ...prev.secretLetter, message: urlOrText },
      }));
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-rose-200">
      {/* Navigation Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPricing={() => setIsPaymentOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLogout={() => handleUserChange(null)}
        savedCount={savedItems.length}
      />

      {/* Hero Section with Bento Grid & Spectacular Showcase */}
      <HeroSection
        onQuickStart={handleQuickStart}
        onOpenPricing={() => setIsPaymentOpen(true)}
      />

      {/* QR Customizer Studio */}
      <QRGeneratorSection
        config={config}
        onChangeConfig={setConfig}
        user={user}
        onOpenPricing={() => setIsPaymentOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTestScan={() => setIsTestScanOpen(true)}
        onOpenLetter={() => setIsLetterOpen(true)}
        onSaveQR={handleSaveQR}
      />

      {/* Pricing Section */}
      <PricingSection
        user={user}
        onSelectPlan={() => setIsPaymentOpen(true)}
      />

      {/* FAQ & Testimonials */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Floating Romantic Audio Player */}
      <RomanticAudioPlayer />

      {/* Modals & Overlays */}
      <GoogleAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => handleUserChange(newUser)}
      />

      <SePayPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        userEmail={user?.email}
      />

      <SavedHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={savedItems}
        onSelect={handleSelectSavedQR}
        onDelete={handleDeleteSavedQR}
      />

      <TestScanModal
        isOpen={isTestScanOpen}
        onClose={() => setIsTestScanOpen(false)}
        config={config}
        onOpenLetter={() => setIsLetterOpen(true)}
      />

      <SecretLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        letter={config.secretLetter}
      />
    </main>
  );
}
