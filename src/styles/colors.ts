// RitzYard Theme Colors - Terracotta Earth Tones
// Matches web app exactly

export const colors = {
  // Primary: Rust Orange/Terracotta
  primary: '#c15738',
  primaryLight: '#d47050',
  primaryDark: '#a84a2f',
  primaryGlow: '#e07059',
  
  // Secondary: Deep Earth Brown
  secondary: '#5c2d23',
  secondaryLight: '#7a4a3a',
  secondaryDark: '#3d1f16',
  
  // Background & Neutrals
  background: '#f7f5f2', // Warm Cream (30 20% 97%)
  backgroundAlt: '#ede9e3', // Warm Cream Alt (30 25% 94%)
  card: '#ffffff',
  text: '#352f28', // Dark text (15 35% 20%)
  textLight: '#6b6258', // Muted text (15 20% 45%)
  border: '#e5ddd6', // Light border (20 20% 88%)
  
  // Accent: Warm Clay
  accent: '#e8dcd4', // Warm Clay (20 40% 88%)
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
  
  // Glass Morphism
  glassBg: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  
  // Gradients
  gradient: {
    primary: ['#c15738', '#e07059'],
    secondary: ['#5c2d23', '#7a4a3a'],
    warm: ['#f7f5f2', '#ede9e3'],
  },
  
  // Shadows
  shadow: {
    sm: 'rgba(193, 87, 56, 0.1)',
    md: 'rgba(193, 87, 56, 0.15)',
    lg: 'rgba(193, 87, 56, 0.2)',
  },
};

// Create color utilities
export const colorUtils = {
  rgba: (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};
