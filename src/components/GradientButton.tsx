import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/styles/colors';
import { buttonStyles } from '@/src/styles/buttonStyles';

interface GradientButtonProps {
  onPress?: () => void;
  text: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export default function GradientButton({
  onPress,
  text,
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  children,
}: GradientButtonProps) {
  // Get button style based on size
  let buttonStyle;
  let textStyleSheet;

  switch (size) {
    case 'small':
      buttonStyle = buttonStyles.primarySmall;
      textStyleSheet = buttonStyles.primarySmallText;
      break;
    case 'large':
      buttonStyle = buttonStyles.primaryLarge;
      textStyleSheet = buttonStyles.primaryLargeText;
      break;
    default:
      buttonStyle = buttonStyles.primary;
      textStyleSheet = buttonStyles.primaryText;
  }

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2]} // #c54e30 -> #643526
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[buttonStyle, style, disabled && buttonStyles.disabled]}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        {children}
        <Text style={[textStyleSheet, disabled && buttonStyles.disabledText, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
