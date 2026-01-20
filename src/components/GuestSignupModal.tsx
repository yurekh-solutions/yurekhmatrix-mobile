import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface GuestSignupModalProps {
  visible: boolean;
  onClose: () => void;
  onSignup: () => void;
  message?: string;
}

export const GuestSignupModal: React.FC<GuestSignupModalProps> = ({
  visible,
  onClose,
  onSignup,
  message = 'Please sign up to add items to your cart',
}) => {
  const { logout } = useAuth();

  const handleSignup = async () => {
    try {
      // Logout (which will reset the app to login screen)
      await logout();
      Alert.alert(
        'Redirecting to Sign Up',
        'You can now create an account to start adding items to your cart.',
        [{ text: 'OK', onPress: onSignup }]
      );
    } catch (error) {
      Alert.alert('Error', 'Please restart the app to sign up.');
    }
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
        
        <View style={styles.modalContainer}>
          <BlurView intensity={80} tint="light" style={styles.glassCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.content}>
              {/* Icon */}
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={['#FF6B35', '#FF8C42']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Ionicons name="lock-closed" size={40} color="#fff" />
                </LinearGradient>
              </View>

              {/* Title */}
              <Text style={styles.title}>Sign Up Required</Text>
              
              {/* Message */}
              <Text style={styles.message}>{message}</Text>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                {/* Signup Button */}
                <TouchableOpacity onPress={handleSignup} style={styles.signupButtonWrapper}>
                  <LinearGradient
                    colors={['#c15738', '#d66f4f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.signupButton}
                  >
                    <Text style={styles.signupButtonText}>Sign Up Now</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Continue as Guest */}
                <TouchableOpacity onPress={onClose} style={styles.guestButton}>
                  <Text style={styles.guestButtonText}>Continue as Guest</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width - 40,
    maxWidth: 400,
  },
  glassCard: {
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  content: {
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
    fontFamily: 'Arial',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  signupButtonWrapper: {
    width: '100%',
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 15,
    gap: 10,
    shadowColor: '#c15738',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Arial',
  },
  guestButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#636E72',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Arial',
  },
});
