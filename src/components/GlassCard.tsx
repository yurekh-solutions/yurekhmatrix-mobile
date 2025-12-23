import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  intensity = 20,
  gradient = true 
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint="light" style={styles.blurContainer}>
        {gradient && (
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  blurContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
