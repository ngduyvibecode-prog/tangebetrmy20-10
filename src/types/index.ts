export type QRMode = 'url' | 'secret_letter' | 'zalo' | 'wifi';

export type QRStyle = 
  | 'standard' 
  | 'floral_rose' 
  | 'tulip_garden' 
  | 'heart_wreath' 
  | 'neon_glow' 
  | 'polaroid' 
  | 'ribbon_letter';

export type QRDotStyle = 'rounded' | 'heart' | 'diamond' | 'dots' | 'square';

export type ColorTheme = 
  | 'strawberry' 
  | 'rose_gold' 
  | 'crimson' 
  | 'lavender_dream' 
  | 'peach_sunset' 
  | 'custom';

export interface SecretLetterData {
  recipient: string;
  sender: string;
  message: string;
  date: string;
  themeMusic?: string;
}

export type CenterIconType = 
  | 'heart' 
  | 'sparkle' 
  | 'rose' 
  | 'gem' 
  | 'mail' 
  | 'flame'
  | 'custom_image' 
  | 'none';

export interface QRConfig {
  mode: QRMode;
  text: string;
  title: string;
  subtitle: string;
  style: QRStyle;
  dotStyle: QRDotStyle;
  colorTheme: ColorTheme;
  fgColor: string;
  bgColor: string;
  centerIcon: CenterIconType;
  customImage?: string;
  secretLetter: SecretLetterData;
  showScanMeTag: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVip: boolean;
  vipExpiresAt?: string;
  plan?: 'free' | 'vip_monthly' | 'vip_lifetime';
}

export interface SavedQRItem {
  id: string;
  title: string;
  style: QRStyle;
  createdAt: string;
  dataUrl: string;
  config: QRConfig;
}

export interface SePayTransaction {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  subAccount?: string;
  transferType: 'in' | 'out';
  transferAmount: number;
  accumulated: number;
  code?: string;
  content: string;
  referenceCode?: string;
  description?: string;
}
