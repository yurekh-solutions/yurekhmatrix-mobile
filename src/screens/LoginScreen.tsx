import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { SuccessModal } from '../components/SuccessModal';
import { buyerLogin, buyerRegister } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation, onLoginSuccess }: any) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const pickImage = async (type: 'profile') => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required', 
          'Please allow access to your photo library to upload your company logo.'
        );
        return;
      }

      // Launch image picker with strict image-only settings
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false,
        exif: false,
      });

      // Check if user cancelled
      if (result.canceled) {
        return;
      }

      // Validate result
      if (!result.assets || result.assets.length === 0) {
        Alert.alert('Error', 'No image selected. Please try again.');
        return;
      }

      const asset = result.assets[0];
      
      // Validate URI exists and is valid
      if (!asset.uri || asset.uri.trim() === '') {
        Alert.alert('Error', 'Invalid image. Please select a valid image file.');
        return;
      }

      // Validate it's an image by checking URI
      const isValidImage = asset.uri.match(/\.(jpeg|jpg|png|gif|webp)$/i) || 
                          asset.uri.startsWith('file://') || 
                          asset.uri.startsWith('content://') ||
                          asset.uri.startsWith('data:');
      
      if (!isValidImage && Platform.OS !== 'web') {
        Alert.alert('Error', 'Please select a valid image file (JPG, PNG, GIF, or WebP).');
        return;
      }

      // Process for web or mobile
      if (Platform.OS === 'web') {
        try {
          const response = await fetch(asset.uri);
          if (!response.ok) {
            throw new Error('Failed to load image');
          }
          const blob = await response.blob();
          
          // Verify it's actually an image
          if (!blob.type.startsWith('image/')) {
            Alert.alert('Error', 'Selected file is not a valid image.');
            return;
          }
          
          setProfileImage({ uri: asset.uri, blob });
        } catch (err) {
          console.error('Web image processing error:', err);
          Alert.alert('Error', 'Failed to process image. Please try again.');
        }
      } else {
        // Mobile - set image directly
        setProfileImage({ uri: asset.uri });
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert(
        'Error', 
        'Failed to select image. Please make sure you have the latest version of the app and try again.'
      );
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
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
            onLoginSuccess?.();
          }, 2000);
        } else {
          Alert.alert('Login Failed', response.message || 'Invalid credentials');
        }
      } else {
        if (!name || !company || !phone) {
          Alert.alert('Required Fields', 'Please fill in all fields');
          setLoading(false);
          return;
        }

        const registrationData: any = {
          name,
          email,
          password,
          company,
          phone,
        };

        if (profileImage) {
          registrationData.profileImage = Platform.OS === 'web' ? profileImage.blob : profileImage.uri;
        }

        const response = await buyerRegister(registrationData);

        if (response.success) {
          setSuccessMessage('Registration successful! Welcome aboard');
          setShowSuccess(true);
          
          setTimeout(() => {
            setIsLogin(true);
            setName('');
            setCompany('');
            setPhone('');
            setProfileImage(null);
            setConfirmPassword('');
          }, 2000);
        } else {
          Alert.alert('Registration Failed', response.message || 'Could not create account');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
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

              {!isLogin ? (
                /* Registration Form */
                <View>
                  <View style={styles.logoUploadSection}>
                    <Text style={styles.inputLabel}>COMPANY LOGO</Text>
                    <TouchableOpacity style={styles.logoPickerContainer} onPress={() => pickImage('profile')}>
                      {profileImage ? (
                        <Image source={{ uri: profileImage.uri }} style={styles.selectedImage} />
                      ) : (
                        <View style={styles.imagePlaceholder}>
                          <Ionicons name="briefcase-outline" size={40} color="#FF6B35" />
                          <Text style={styles.imagePickerText}>Add Company Logo</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.inputLabel}>FULL NAME</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>PHONE NUMBER</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>EMAIL</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>COMPANY NAME</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="business-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="Matrix Corp"
                      value={company}
                      onChangeText={setCompany}
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>
                </View>
              ) : (
                /* Login Form */
                <View>
                  <Text style={styles.inputLabel}>EMAIL</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  <Text style={styles.inputLabel}>PASSWORD</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#FF6B35" />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>
                </View>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity onPress={handleAuth} disabled={loading}>
                <LinearGradient
                  colors={['#c15738', '#d66f4f']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.submitButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <View style={styles.submitButtonContent}>
                      <Text style={styles.submitText}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                    </View>
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
            onPress={() => {
              // Call onLoginSuccess to show the app even for guests
              if (onLoginSuccess) {
                onLoginSuccess();
              }
            }}
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
}

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
    paddingTop: 40,
    paddingBottom: 80,
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
    marginBottom: 24,
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
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF3E0',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 46, 29, 0.1)',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 6,
    fontFamily: 'Arial',
    letterSpacing: 1,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoUploadSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPickerContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 107, 53, 0.3)',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imagePickerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.3)',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 10,
    color: '#FF6B35',
    marginTop: 4,
    fontWeight: '600',
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
