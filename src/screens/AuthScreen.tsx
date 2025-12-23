import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { SuccessModal } from '../components/SuccessModal';
import { buyerLogin, buyerRegister } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface AuthScreenProps {
  navigation: any;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await buyerLogin(email, password);
        if (response.success && response.token) {
          await AsyncStorage.setItem('userToken', response.token);
          await AsyncStorage.setItem('user', JSON.stringify(response.user));
          
          setSuccessMessage('Welcome back! Login successful');
          setShowSuccess(true);
          
          setTimeout(() => {
            navigation.replace('Home');
          }, 2000);
        } else {
          alert(response.message || 'Login failed');
        }
      } else {
        if (!name || !company || !phone) {
          alert('Please fill in all fields');
          setLoading(false);
          return;
        }

        const response = await buyerRegister({
          name,
          email,
          password,
          company,
          phone,
        });

        if (response.success) {
          setSuccessMessage('Registration successful! Welcome aboard');
          setShowSuccess(true);
          
          setTimeout(() => {
            setIsLogin(true);
            setName('');
            setCompany('');
            setPhone('');
          }, 2000);
        } else {
          alert(response.message || 'Registration failed');
        }
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFE5D9', '#FFF5F0', '#FFE5D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Floating Orbs */}
      <View style={[styles.orb, styles.orb1]} />
      <View style={[styles.orb, styles.orb2]} />
      <View style={[styles.orb, styles.orb3]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#FF6B35', '#FF8C42']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logoText}>RY</Text>
            </LinearGradient>
            <Text style={styles.brandName}>RitzYard</Text>
            <Text style={styles.tagline}>Smart Material Procurement</Text>
          </View>

          {/* Auth Form Glass Card */}
          <BlurView intensity={30} tint="light" style={styles.glassCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.formContent}>
              <Text style={styles.formTitle}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={styles.formSubtitle}>
                {isLogin ? 'Sign in to continue' : 'Join RitzYard today'}
              </Text>

              {/* Name Field (Signup only) */}
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#FF6B35" />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                  />
                </View>
              )}

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#FF6B35" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Company Field (Signup only) */}
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="business-outline" size={20} color="#FF6B35" />
                  <TextInput
                    style={styles.input}
                    placeholder="Company Name"
                    value={company}
                    onChangeText={setCompany}
                    placeholderTextColor="#999"
                  />
                </View>
              )}

              {/* Phone Field (Signup only) */}
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#FF6B35" />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                  />
                </View>
              )}

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#FF6B35" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity onPress={handleAuth} disabled={loading}>
                <LinearGradient
                  colors={['#FF6B35', '#FF8C42']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.submitButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitText}>
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Social Login Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>

              {/* Toggle Auth Mode */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          {/* Guest Mode */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.guestText}>Continue as Guest</Text>
            <Ionicons name="arrow-forward" size={20} color="#FF6B35" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        message={successMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  orb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.3,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#FF6B35',
    top: -100,
    right: -100,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: '#FFB84D',
    bottom: 100,
    left: -50,
  },
  orb3: {
    width: 150,
    height: 150,
    backgroundColor: '#FF8C42',
    top: height * 0.4,
    right: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Arial',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D3436',
    marginTop: 12,
    fontFamily: 'Arial',
  },
  tagline: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
    fontFamily: 'Arial',
  },
  glassCard: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  formContent: {
    padding: 30,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 30,
    fontFamily: 'Arial',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 12,
    fontSize: 16,
    color: '#2D3436',
    fontFamily: 'Arial',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Arial',
  },
  submitButton: {
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Arial',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#636E72',
    fontSize: 14,
    fontFamily: 'Arial',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  toggleText: {
    color: '#636E72',
    fontSize: 14,
    fontFamily: 'Arial',
  },
  toggleLink: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Arial',
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  guestText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Arial',
  },
});
