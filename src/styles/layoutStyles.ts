/**
 * Layout & Spacing Utilities
 * Based on web app's design system spacing scale
 */

import { StyleSheet } from 'react-native';
import theme from './theme';

export const layoutStyles = StyleSheet.create({
  // ===== CONTAINERS =====
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  containerPadded: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },

  containerCompact: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },

  // ===== SECTIONS =====
  section: {
    paddingVertical: theme.sectionPadding.vertical,
    paddingHorizontal: theme.sectionPadding.horizontal,
  },

  sectionCompact: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },

  sectionSpaced: {
    paddingVertical: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing.lg,
  },

  // ===== CARDS =====
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    padding: theme.spacing.lg,
  },

  cardElevated: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.md,
  },

  cardOutline: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },

  glassCard: {
    backgroundColor: theme.colors.glassBg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    padding: theme.spacing.lg,
  },

  // ===== SURFACES =====
  surface: {
    backgroundColor: theme.colors.surface,
  },

  surfaceAlt: {
    backgroundColor: theme.colors.surfaceAlt,
  },

  // ===== FLEX LAYOUTS =====
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flexAround: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  flexEvenly: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  // ===== GAPS & SPACING =====
  gap: {
    gap: theme.spacing.md,
  },

  gapXs: {
    gap: theme.spacing.xs,
  },

  gapSm: {
    gap: theme.spacing.sm,
  },

  gapLg: {
    gap: theme.spacing.lg,
  },

  gapXl: {
    gap: theme.spacing.xl,
  },

  gap2xl: {
    gap: theme.spacing['2xl'],
  },

  // ===== PADDING =====
  pXs: {
    padding: theme.spacing.xs,
  },

  pSm: {
    padding: theme.spacing.sm,
  },

  pMd: {
    padding: theme.spacing.md,
  },

  pLg: {
    padding: theme.spacing.lg,
  },

  pXl: {
    padding: theme.spacing.xl,
  },

  p2xl: {
    padding: theme.spacing['2xl'],
  },

  // Horizontal padding
  pxSm: {
    paddingHorizontal: theme.spacing.sm,
  },

  pxMd: {
    paddingHorizontal: theme.spacing.md,
  },

  pxLg: {
    paddingHorizontal: theme.spacing.lg,
  },

  // Vertical padding
  pySm: {
    paddingVertical: theme.spacing.sm,
  },

  pyMd: {
    paddingVertical: theme.spacing.md,
  },

  pyLg: {
    paddingVertical: theme.spacing.lg,
  },

  // ===== MARGIN =====
  mXs: {
    margin: theme.spacing.xs,
  },

  mSm: {
    margin: theme.spacing.sm,
  },

  mMd: {
    margin: theme.spacing.md,
  },

  mLg: {
    margin: theme.spacing.lg,
  },

  mXl: {
    margin: theme.spacing.xl,
  },

  m2xl: {
    margin: theme.spacing['2xl'],
  },

  // Horizontal margin
  mxSm: {
    marginHorizontal: theme.spacing.sm,
  },

  mxMd: {
    marginHorizontal: theme.spacing.md,
  },

  mxLg: {
    marginHorizontal: theme.spacing.lg,
  },

  // Vertical margin
  mySm: {
    marginVertical: theme.spacing.sm,
  },

  myMd: {
    marginVertical: theme.spacing.md,
  },

  myLg: {
    marginVertical: theme.spacing.lg,
  },

  // ===== BORDERS =====
  border: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  borderLight: {
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },

  borderPrimary: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  borderRounded: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
  },

  // ===== ELEVATION / SHADOWS =====
  shadowSm: theme.shadows.sm,
  shadowMd: theme.shadows.md,
  shadowLg: theme.shadows.lg,
  shadowXl: theme.shadows.xl,
  shadowElegant: theme.shadows.elegant,
  shadowGlow: theme.shadows.glow,
  shadow3d: theme.shadows['3d'],

  // ===== DIVIDERS =====
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },

  dividerVertical: {
    width: 1,
    backgroundColor: theme.colors.divider,
  },

  // ===== COMMON PATTERNS =====
  heroSection: {
    paddingVertical: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },

  responsiveCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },
});

export default layoutStyles;
