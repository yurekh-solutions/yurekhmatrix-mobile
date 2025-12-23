import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  duration?: number;
}

const { width } = Dimensions.get('window');

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title,
  message,
  duration = 2000,
}) => {
  const scaleValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onClose());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <BlurView intensity={40} tint="dark" style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleValue }],
              opacity: fadeValue,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#FF6B35', '#FF8C42']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <Ionicons name="checkmark-circle" size={60} color="#fff" />
              </LinearGradient>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.shine} />
          </LinearGradient>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  gradient: {
    padding: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  message: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Arial',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
});
