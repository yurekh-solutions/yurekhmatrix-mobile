import React, { useState } from 'react';
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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  avatar?: string;
  memberSince: string;
  totalRFQs: number;
  completedOrders: number;
  totalSpent: number;
}

const mockProfile: UserProfile = {
  id: 'user-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@company.com',
  phone: '+91 9876543210',
  company: 'BuildTech Solutions',
  role: 'Procurement Manager',
  location: 'Mumbai, India',
  avatar: 'https://via.placeholder.com/120/c15738/ffffff?text=RK',
  memberSince: 'January 2023',
  totalRFQs: 45,
  completedOrders: 23,
  totalSpent: 1250000,
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState(mockProfile);
  const [editMode, setEditMode] = useState(false);

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
        {/* Header with Avatar */}
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialCommunityIcons name="pencil" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.nameText}>{profile.name}</Text>
          <Text style={styles.roleText}>{profile.role}</Text>
          <Text style={styles.companyText}>{profile.company}</Text>

          <View style={styles.memberInfo}>
            <MaterialCommunityIcons name="calendar-check" size={14} color={colors.textLight} />
            <Text style={styles.memberText}>Member since {profile.memberSince}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <StatCard icon="file-document-outline" label="Active RFQs" value={profile.totalRFQs} />
          <StatCard icon="check-circle" label="Completed" value={profile.completedOrders} />
          <StatCard icon="currency-inr" label="Total Spent" value={`₹${(profile.totalSpent / 100000).toFixed(1)}L`} />
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

          <TouchableOpacity style={styles.infoCard}>
            <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profile.phone}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCard}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{profile.location}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Company Information */}
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
            <View style={styles.divider} />
            <View style={styles.companyCardRow}>
              <Text style={styles.companyLabel}>Role</Text>
              <Text style={styles.companyValue}>{profile.role}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editCompanyButton}>
            <MaterialCommunityIcons name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editCompanyText}>Edit Company Info</Text>
          </TouchableOpacity>
        </View>

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
            <MaterialCommunityIcons name="star-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Saved Items</Text>
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

        {/* Preferences */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="bell-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Notification Preferences</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="language-javascript" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Language & Region</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
          >
            <MaterialCommunityIcons name="logout" size={18} color={colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
  editCompanyButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editCompanyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
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
});
