// RitzYard Theme Colors - Terracotta Earth Tones
// For React Native / Mobile App Usage - Matching website exactly

export const colors = {
  // Primary: Rust Orange/Terracotta - matching website
  primary: '#c15738',
  primaryLight: '#d47050',
  primaryDark: '#5c2d23',
  primaryGlow: '#e07059',
  
  // Premium Gradient Colors - matching website exactly
  gradient1: '#c15738', // Rust orange-brown (start)
  gradient2: '#5c2d23', // Dark brown (end)
  
  // Secondary: Deep Earth Brown
  secondary: '#5c2d23',
  secondaryLight: '#7a4a3a',
  secondaryDark: '#3d1f16',
  secondaryDeep: '#452a21',
  
  // Background & Neutrals - matching website
  background: '#faf8f6',      // Warm Cream
  backgroundAlt: '#f5ede3',   // Warm Cream Alt
  card: '#ffffff',
  cardAlt: '#faf8f6',
  
  // Text - matching website
  text: '#452a21',            // Dark text (website brand)
  textLight: '#8b7355',       // Muted text
  textMuted: '#9a8f84',       // Very muted
  
  // Borders
  border: '#e8dfd5',
  borderLight: '#ede9e3',
  
  // Accent: Warm Clay
  accent: '#e8dcd4',
  accentLight: '#ede9e3',
  accentDark: '#d4c5b9',
  
  // Status Colors
  success: '#10b981',
  successLight: '#d1fae5',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  error: '#ef4444',
  errorLight: '#fee2e2',
  info: '#3b82f6',
  infoLight: '#dbeafe',
  
  // Live indicator
  live: '#22c55e',
  
  // Glass Morphism
  glassBg: 'rgba(255, 255, 255, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const gradients = {
  primary: ['#c15738', '#e07059'],
  secondary: ['#5c2d23', '#7a4a3a'],
  warm: ['#faf8f6', '#f5ede3'],
  // Premium gradient matching website exactly
  premium: ['#c15738', '#5c2d23'],
  premiumReverse: ['#5c2d23', '#c15738'],
  hero: ['#c15738', '#5c2d23'],
  // Button gradient - same as logo
  button: ['#c15738', '#5c2d23'],
  // Background gradient
  background: ['#faf8f6', '#f5ede3', '#faf8f6'],
};

export const shadows = {
  sm: {
    shadowColor: '#c15738',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#c15738',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#c15738',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#e07059',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fonts = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Utility function
export const rgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Complete theme object for React Native
export const theme = {
  colors,
  gradients,
  shadows,
  spacing,
  borderRadius,
  fonts,
  fontSizes,
};

export default theme;
