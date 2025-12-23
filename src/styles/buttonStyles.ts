import { StyleSheet } from 'react-native';
import { colors } from './colors';

/**
 * Consistent Button Styles for RitzYard Mobile App
 * 
 * PRIMARY BUTTON: Solid rust orange background with white text
 * SECONDARY BUTTON: White background with rust orange border
 * 
 * Usage:
 * <TouchableOpacity style={buttonStyles.primary}>
 *   <Text style={buttonStyles.primaryText}>Material Inquiry</Text>
 * </TouchableOpacity>
 */

export const buttonStyles = StyleSheet.create({
  // ===== PRIMARY BUTTONS =====
  // Gradient: #c54e30 to #643526 (dark brownish premium gradient)
  primary: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  primarySmall: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    elevation: 3,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  primarySmallText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryLarge: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 5,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  primaryLargeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ===== PREMIUM GRADIENT BUTTONS (dark brownish gradient) =====
  // #c54e30 to #643526 gradient with white text
  premium: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  premiumText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  premiumSmall: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    elevation: 3,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  premiumSmallText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  premiumLarge: {
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 5,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  premiumLargeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ===== SECONDARY BUTTONS =====
  // White background with premium gradient border
  secondary: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: colors.gradient1, // #c54e30
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryText: {
    color: colors.gradient1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondarySmall: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: colors.gradient1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondarySmallText: {
    color: colors.gradient1,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryLarge: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: colors.gradient1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryLargeText: {
    color: colors.gradient1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ===== OUTLINE BUTTONS =====
  // Light border, no background
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gradient1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  outlineText: {
    color: colors.gradient1,
    fontSize: 14,
    fontWeight: '600',
  },

  // ===== DISABLED STATE =====
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },

  // ===== ICON BUTTONS =====
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.gradient1, // Fallback: #c54e30
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconButtonSecondary: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: colors.gradient1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ... existing code ...
  buttonPair: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  buttonPairPrimary: {
    flex: 1,
  },
  buttonPairSecondary: {
    flex: 1,
  },

  // ===== VERTICAL BUTTON LAYOUT (stacked rows) =====
  buttonVerticalPrimary: {
    width: '100%',
    marginBottom: 10,
  },
  buttonVerticalSecondary: {
    width: '100%',
    marginBottom: 8,
  },
});

export default buttonStyles;