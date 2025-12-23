/**
 * RitzYard Theme System
 * Converted from web app's index.css design system
 * 
 * This file contains all design tokens including:
 * - Colors (from web index.css)
 * - Spacing scale
 * - Typography
 * - Shadows & Elevation
 * - Gradients
 * - Border radius
 */

import { colors } from './colors';

export const theme = {
  // ===== COLORS (from index.css) =====
  colors: {
    // Primary: Rust Orange/Terracotta #c15738
    primary: colors.primary,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    primaryGlow: colors.primaryGlow,

    // Secondary: Deep Earth Brown #5c2d23 (HSL: 15 42% 25%)
    secondary: colors.secondary,
    secondaryDeep: colors.secondaryDeep,
    secondaryLight: colors.secondaryLight,
    secondaryDark: colors.secondaryDark,

    // Background: Warm Cream
    background: colors.background, // #f7f5f2 (30 20% 97%)
    backgroundAlt: colors.backgroundAlt, // #ede9e3 (30 25% 94%)

    // Card & Surfaces
    card: colors.card, // #ffffff
    surface: '#ffffff',
    surfaceAlt: '#f9f8f6',

    // Text Colors
    text: colors.text, // #352f28 (Dark text)
    textSecondary: colors.textLight, // #6b6258 (Muted text)
    textMuted: '#9a9089',
    textInverse: '#ffffff',

    // Borders & Dividers
    border: colors.border, // #e5ddd6 (Light border)
    borderLight: '#f0e8e0',
    divider: '#e5ddd6',

    // Accent: Warm Clay
    accent: colors.accent, // #e8dcd4 (Warm Clay)
    accentLight: colors.accentLight, // #ede9e3
    accentDark: colors.accentDark, // #d4c5b9

    // Status Colors
    success: '#10b981',
    successLight: '#d1fae5',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    error: '#ef4444',
    errorLight: '#fee2e2',
    info: '#3b82f6',
    infoLight: '#dbeafe',

    // Glass Morphism (for web-like effects on mobile)
    glassBg: colors.glassBg, // 'rgba(255, 255, 255, 0.7)'
    glassBorder: colors.glassBorder, // 'rgba(255, 255, 255, 0.2)'
  },

  // ===== SPACING SCALE =====
  spacing: {
    xs: 4,      // 4px
    sm: 8,      // 8px
    md: 12,     // 12px
    lg: 16,     // 16px
    xl: 20,     // 20px
    '2xl': 24,  // 24px
    '3xl': 32,  // 32px
    '4xl': 40,  // 40px
    '5xl': 48,  // 48px
    '6xl': 56,  // 56px
    '7xl': 64,  // 64px
  },

  // ===== TYPOGRAPHY =====
  typography: {
    // Font sizes
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 20,
      '3xl': 24,
      '4xl': 28,
      '5xl': 32,
      '6xl': 36,
      '7xl': 40,
      '8xl': 48,
    },

    // Font weights
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    // Line heights
    lineHeight: {
      tight: 1.1,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },

    // Letter spacing
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
    },
  },

  // ===== SHADOWS & ELEVATION =====
  shadows: {
    // Soft shadows (from index.css)
    sm: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },

    md: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },

    lg: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },

    xl: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    },

    // Elegant shadow (from index.css: 0 10px 30px -10px)
    elegant: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 30,
      elevation: 8,
    },

    // Glow shadow (from index.css: 0 0 40px)
    glow: {
      shadowColor: colors.primaryGlow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 40,
      elevation: 10,
    },

    // 3D shadow
    '3d': {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 30,
      elevation: 12,
    },
  },

  // ===== GRADIENTS =====
  gradients: {
    primary: {
      start: colors.primary,
      end: colors.primaryGlow,
    },
    secondary: {
      start: colors.secondary,
      end: colors.secondaryLight,
    },
    warm: {
      start: colors.background,
      end: colors.backgroundAlt,
    },
    // Premium gradient (from web design - dark brownish)
    premium: {
      start: colors.gradient1, // #c54e30
      end: colors.gradient2, // #643526
    },
    premiumReverse: {
      start: colors.gradient2, // #643526
      end: colors.gradient1, // #c54e30
    },
  },

  // ===== BORDER RADIUS =====
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  // ===== SHADOWS - PREMIUM (for gradient buttons) =====
  shadowsPremium: {
    sm: {
      shadowColor: colors.gradient1,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
    },
    md: {
      shadowColor: colors.gradient1,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
    lg: {
      shadowColor: colors.gradient1,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    },
  },

  // ===== COMMON STYLE PATTERNS =====
  patterns: {
    // Glass card effect (from index.css .glass-card)
    glassCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 16,
    },

    // Premium glass card with gradient (from web design)
    glassCardPremium: {
      backgroundColor: 'rgba(197, 78, 48, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(197, 78, 48, 0.2)',
      borderRadius: 16,
    },

    // Glass morphism (from index.css .glass-morphism)
    glassMorphism: {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
    },

    // Glass stat card (from index.css .glass-stat-card)
    glassStatCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 16,
      padding: 16,
    },

    // Gradient border
    gradientBorder: {
      borderWidth: 2,
      borderColor: colors.primary,
    },
  },

  // ===== SECTION PADDING (from index.css) =====
  sectionPadding: {
    vertical: 16, // 64px on web (py-16 = 4rem)
    horizontal: 16,
  },

  // ===== ANIMATIONS & TRANSITIONS =====
  transitions: {
    fast: 200,
    base: 300,
    slow: 500,
    slower: 700,
  },

  // ===== RESPONSIVE BREAKPOINTS =====
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

export type Theme = typeof theme;
export default theme;
