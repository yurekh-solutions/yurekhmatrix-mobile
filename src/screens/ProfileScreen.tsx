import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/src/styles/colors';
import { useAuth } from '@/src/contexts/AuthContext';
import { getBuyerProfile, uploadProfilePicture, API_BASE_URL } from '@/src/lib/api';

const { width } = Dimensions.get('window');

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  location?: string;
  profilePicture?: string;
  avatar?: string;
  memberSince?: string;
  totalRFQs?: number;
  completedOrders?: number;
  totalSpent?: number;
}

export default function ProfileScreen() {
  const { user, logout, token, updateProfilePicture } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      if (token && user) {
        // Try to fetch from backend
        const backendProfile = await getBuyerProfile(token);
        if (backendProfile) {
          setProfile(backendProfile.data || backendProfile);
        } else {
          // Fallback to auth context user data
          setProfile({
            id: user.id,
            name: user.name || 'User',
            email: user.email,
            phone: user.phone || '+91 9876543210',
            company: user.company || user.companyName || 'Company Name',
            role: user.role || 'Procurement Manager',
            location: user.location || 'Mumbai, India',
            profilePicture: user.profilePicture || user.avatar,
            memberSince: user.memberSince || 'January 2024',
            totalRFQs: user.totalRFQs || 0,
            completedOrders: user.completedOrders || 0,
            totalSpent: user.totalSpent || 0,
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Use auth context data as fallback
      if (user) {
        setProfile({
          id: user.id,
          name: user.name || 'User',
          email: user.email,
          phone: user.phone || '',
          company: user.company || user.companyName,
          role: user.role,
          profilePicture: user.profilePicture || user.avatar,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need access to your photos to update your profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadImage = async (imageUri: string) => {
    try {
      setUploading(true);
      if (!token) {
        Alert.alert('Error', 'Not authenticated');
        return;
      }

      const formData = new FormData();
      // Create proper FormData entry with Blob-like object for React Native
      formData.append('profileImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      // Use the existing /user/profile PUT endpoint which supports file upload
      // This is a workaround until the dedicated POST endpoint is deployed on Render
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type - let the browser/fetch handle it for FormData
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload profile picture');
      }

      if (data.success && (data.user?.profileImage || data.data?.profileImage)) {
        const profileImageUrl = data.user?.profileImage || data.data?.profileImage;
        await updateProfilePicture(profileImageUrl);
        setProfile(
          profile ? { ...profile, profilePicture: profileImageUrl, avatar: profileImageUrl } : null
        );
        Alert.alert('Success', 'Profile picture updated successfully!');
      } else {
        Alert.alert('Error', 'Upload completed but image URL missing');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    logout();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No profile data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const StatCard = ({ icon, label, value }: { icon: string; label: string; value: string | number }) => (
    <View style={styles.statCard}>
      <View style={styles.statIconBox}>
        <MaterialCommunityIcons name={icon as any} size={20} color={colors.primary} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Avatar - GLASSMORPHISM */}
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            {uploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="small" color="#ffffff" />
              </View>
            )}
            <Image
              source={
                profile.profilePicture || profile.avatar
                  ? { uri: profile.profilePicture || profile.avatar }
                  : { uri: `https://via.placeholder.com/120/${colors.primary.replace('#', '')}/ffffff?text=${profile.name?.charAt(0) || 'U'}` }
              }
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton} onPress={pickImage} disabled={uploading}>
              <MaterialCommunityIcons name="pencil" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.nameText}>{profile.name}</Text>
          <Text style={styles.roleText}>{profile.role || 'Procurement Professional'}</Text>
          <Text style={styles.companyText}>{profile.company || 'Company'}</Text>

          {profile.memberSince && (
            <View style={styles.memberInfo}>
              <MaterialCommunityIcons name="calendar-check" size={14} color={colors.textLight} />
              <Text style={styles.memberText}>Member since {profile.memberSince}</Text>
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <StatCard icon="file-document-outline" label="Active RFQs" value={profile.totalRFQs || 0} />
          <StatCard icon="check-circle" label="Completed" value={profile.completedOrders || 0} />
          <StatCard icon="currency-inr" label="Total Spent" value={profile.totalSpent ? `₹${(profile.totalSpent / 100000).toFixed(1)}L` : '₹0'} />
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="information-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Contact Information</Text>
          </View>

          <TouchableOpacity style={styles.infoCard}>
            <MaterialCommunityIcons name="email" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{profile.email}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>

          {profile.phone && (
            <TouchableOpacity style={styles.infoCard}>
              <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}

          {profile.location && (
            <TouchableOpacity style={styles.infoCard}>
              <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{profile.location}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Company Information */}
        {profile.company && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="office-building" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Company Details</Text>
            </View>

            <View style={styles.companyCard}>
              <View style={styles.companyCardRow}>
                <Text style={styles.companyLabel}>Company Name</Text>
                <Text style={styles.companyValue}>{profile.company}</Text>
              </View>
              {profile.role && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.companyCardRow}>
                    <Text style={styles.companyLabel}>Role</Text>
                    <Text style={styles.companyValue}>{profile.role}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        )}

        {/* Account Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-settings" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Account</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="history" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Order History</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="file-download-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Download Invoices</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="lock-reset" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
          >
            <MaterialCommunityIcons name="logout" size={18} color={colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal - GLASSMORPHISM */}
      <Modal transparent visible={logoutModalVisible} animationType="fade" onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <MaterialCommunityIcons name="logout" size={40} color={colors.error} />
              <Text style={styles.modalTitle}>Confirm Logout</Text>
            </View>

            {/* Modal Body */}
            <View style={styles.modalBody}>
              <Text style={styles.modalMessage}>Are you sure you want to logout? You&apos;ll need to login again to access your account.</Text>
              <Text style={styles.modalUserInfo}>{profile.email}</Text>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutConfirmButton}
                onPress={handleLogout}
              >
                <MaterialCommunityIcons name="logout" size={16} color="#ffffff" />
                <Text style={styles.logoutConfirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '600',
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  companyText: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 10,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  memberText: {
    fontSize: 11,
    color: colors.textLight,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  companyCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  companyCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  companyLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  companyValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '15',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.error + '30',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: '85%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  modalUserInfo: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  logoutConfirmButton: {
    flex: 1,
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  logoutConfirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
