import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../lib/api';
import { colors } from '../styles/colors';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

// Design System Colors (Premium Materials Marketplace - Linear Gradient Theme)
const COLORS = {
  primary: '#c15738', // Terracotta (for accents only)
  primaryLight: '#d66f4f',
  primaryDark: '#8b3a25',
  secondary: '#f5ede3', // Warm cream
  background: '#faf8f6',
  white: '#ffffff',
  text: '#332319',
  textLight: '#8b7355',
  border: '#e8dfd5',
  success: '#4caf50',
  error: '#f44336',
};

export default function LoginScreen({ navigation, onLoginSuccess }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Required Fields', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await login(data.token, data.user);
        onLoginSuccess?.();
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Required Fields', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await login(data.token, data.user);
        onLoginSuccess?.();
      } else {
        Alert.alert('Signup Failed', data.message || 'Could not create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSignup) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsSignup(false)}>
                <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* Logo & Title */}
            <View style={styles.logoSection}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>RY</Text>
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join RitzYard today</Text>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account" size={20} color={COLORS.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={COLORS.textLight}
                    value={name}
                    onChangeText={setName}
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="phone" size={20} color={COLORS.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor={COLORS.textLight}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="email" size={20} color={COLORS.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock" size={20} color={COLORS.primary} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color={COLORS.textLight}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Button */}
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signupButton}
              >
                <TouchableOpacity
                  onPress={handleSignup}
                  disabled={loading}
                  style={styles.buttonContent}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Create Account</Text>
                      <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
                    </>
                  )}
                </TouchableOpacity>
              </LinearGradient>

              {/* Already have account */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => setIsSignup(false)}>
                  <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Decorative Image */}
          <View style={styles.imageSection}>
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="package-variant" size={120} color={COLORS.primary} />
            </View>
          </View>

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>RY</Text>
            </View>
            <Text style={styles.title}>RitzYard</Text>
            <Text style={styles.subtitle}>Premium Materials Marketplace</Text>
          </View>

          {/* Login Form Card */}
          <View style={styles.formCard}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="email" size={20} color={COLORS.primary} />
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock" size={20} color={COLORS.primary} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={COLORS.textLight}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.rememberRow}>
                <MaterialCommunityIcons name="checkbox-blank-outline" size={18} color={COLORS.primary} />
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginButton}
            >
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={styles.buttonContent}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Log In</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
                  </>
                )}
              </TouchableOpacity>
            </LinearGradient>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="google" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="facebook" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="apple" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => setIsSignup(true)}>
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  gradient: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Image Section
  imageSection: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },

  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  // Form Card
  formCard: {
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    gap: 18,
  },

  // Input Group
  inputGroup: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },

  // Buttons
  loginButton: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 8,
  },

  signupButton: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 16,
  },

  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },

  // Footer
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rememberText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  forgotText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 4,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  footerText: {
    fontSize: 13,
    color: COLORS.textLight,
  },

  footerLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
