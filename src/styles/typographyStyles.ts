/**
 * Typography Utilities
 * Based on web app's design system (from index.css)
 * Sans-serif (Arial, Lato) - as per user preference
 */

import { StyleSheet } from 'react-native';
import theme from './theme';

export const typographyStyles = StyleSheet.create({
  // ===== HEADINGS =====
  h1: {
    fontSize: theme.typography.fontSize['7xl'], // 40px
    fontWeight: '700',
    lineHeight: 1.1,
    letterSpacing: -0.5,
    color: theme.colors.text,
  },

  h2: {
    fontSize: theme.typography.fontSize['6xl'], // 36px
    fontWeight: '700',
    lineHeight: 1.1,
    letterSpacing: -0.5,
    color: theme.colors.text,
  },

  h3: {
    fontSize: theme.typography.fontSize['5xl'], // 32px
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: 0,
    color: theme.colors.text,
  },

  h4: {
    fontSize: theme.typography.fontSize['4xl'], // 28px
    fontWeight: '600',
    lineHeight: 1.3,
    letterSpacing: 0,
    color: theme.colors.text,
  },

  h5: {
    fontSize: theme.typography.fontSize['3xl'], // 24px
    fontWeight: '600',
    lineHeight: 1.3,
    letterSpacing: 0,
    color: theme.colors.text,
  },

  h6: {
    fontSize: theme.typography.fontSize['2xl'], // 20px
    fontWeight: '600',
    lineHeight: 1.4,
    letterSpacing: 0,
    color: theme.colors.text,
  },

  // ===== BODY TEXT =====
  body: {
    fontSize: theme.typography.fontSize.base, // 14px
    fontWeight: '400',
    lineHeight: 1.4,
    color: theme.colors.text,
  },

  bodyLarge: {
    fontSize: theme.typography.fontSize.lg, // 16px
    fontWeight: '400',
    lineHeight: 1.4,
    color: theme.colors.text,
  },

  bodySmall: {
    fontSize: theme.typography.fontSize.sm, // 12px
    fontWeight: '400',
    lineHeight: 1.4,
    color: theme.colors.textSecondary,
  },

  bodyXsmall: {
    fontSize: theme.typography.fontSize.xs, // 10px
    fontWeight: '400',
    lineHeight: 1.3,
    color: theme.colors.textMuted,
  },

  // ===== SEMIBOLD TEXT =====
  bodySemibold: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.text,
  },

  bodyLargeSemibold: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.text,
  },

  bodySmallSemibold: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.textSecondary,
  },

  // ===== LABELS =====
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: 1.3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.textSecondary,
  },

  labelLarge: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 1.3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.textSecondary,
  },

  labelSmall: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.textMuted,
  },

  // ===== CAPTIONS =====
  caption: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
    lineHeight: 1.3,
    color: theme.colors.textSecondary,
  },

  captionMuted: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '400',
    lineHeight: 1.3,
    color: theme.colors.textMuted,
  },

  // ===== BUTTONS =====
  buttonLarge: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    lineHeight: 1.3,
    letterSpacing: 0.3,
    color: '#ffffff',
  },

  buttonMedium: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '700',
    lineHeight: 1.3,
    letterSpacing: 0.2,
    color: '#ffffff',
  },

  buttonSmall: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '700',
    lineHeight: 1.2,
    color: '#ffffff',
  },

  // ===== SECONDARY TEXT (Muted) =====
  secondary: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '400',
    lineHeight: 1.4,
    color: theme.colors.textSecondary,
  },

  secondaryLarge: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '400',
    lineHeight: 1.4,
    color: theme.colors.textSecondary,
  },

  secondarySmall: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 1.3,
    color: theme.colors.textSecondary,
  },

  // ===== ACCENT TEXT (Primary color) =====
  accent: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.primary,
  },

  accentDeep: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.secondaryDeep,
  },

  accentLarge: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    lineHeight: 1.4,
    color: theme.colors.primary,
  },

  accentSmall: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: 1.3,
    color: theme.colors.primary,
  },

  // ===== SECTION TITLES =====
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'], // 20px
    fontWeight: '700',
    lineHeight: 1.3,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },

  sectionSubtitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    lineHeight: 1.4,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },

  sectionDescription: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 1.6,
    color: theme.colors.textSecondary,
  },

  // ===== GRADIENT TEXT STYLES =====
  gradientTextPrimary: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700',
    lineHeight: 1.2,
    color: theme.colors.primary,
  },

  // ===== TEXT ALIGNMENT =====
  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  textRight: {
    textAlign: 'right',
  },

  // ===== FONT WEIGHTS =====
  fontLight: {
    fontWeight: '300',
  },

  fontNormal: {
    fontWeight: '400',
  },

  fontMedium: {
    fontWeight: '500',
  },

  fontSemibold: {
    fontWeight: '600',
  },

  fontBold: {
    fontWeight: '700',
  },

  fontExtraBold: {
    fontWeight: '800',
  },

  // ===== TEXT COLORS =====
  textPrimary: {
    color: theme.colors.primary,
  },

  textSecondary: {
    color: theme.colors.secondary,
  },

  textSecondaryDeep: {
    color: theme.colors.secondaryDeep,
  },

  textSuccess: {
    color: theme.colors.success,
  },

  textWarning: {
    color: theme.colors.warning,
  },

  textError: {
    color: theme.colors.error,
  },

  textInfo: {
    color: theme.colors.info,
  },

  textMuted: {
    color: theme.colors.textMuted,
  },

  // ===== LINE HEIGHT UTILITIES =====
  lineHeightTight: {
    lineHeight: theme.typography.lineHeight.tight,
  },

  lineHeightNormal: {
    lineHeight: theme.typography.lineHeight.normal,
  },

  lineHeightRelaxed: {
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  lineHeightLoose: {
    lineHeight: theme.typography.lineHeight.loose,
  },

  // ===== LETTER SPACING =====
  trackingTight: {
    letterSpacing: theme.typography.letterSpacing.tight,
  },

  trackingNormal: {
    letterSpacing: theme.typography.letterSpacing.normal,
  },

  trackingWide: {
    letterSpacing: theme.typography.letterSpacing.wide,
  },

  trackingWider: {
    letterSpacing: theme.typography.letterSpacing.wider,
  },
});

export default typographyStyles;
