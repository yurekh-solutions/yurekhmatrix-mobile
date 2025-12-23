import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';
import { API_BASE_URL } from '@/src/lib/api';

interface ApplicationStatus {
  companyName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedOn: string;
  rejectionReason?: string;
}

export default function SupplierStatusScreen({ route, navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const email = route?.params?.email || '';

  useEffect(() => {
    if (email) {
      checkStatus();
    }
  }, [email]);

  const checkStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/supplier/check-status?email=${email}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus(data.supplier);
      } else {
        Alert.alert('Error', data.message || 'Application not found');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      Alert.alert('Error', 'Failed to check status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status?.status) {
      case 'approved':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusIcon = () => {
    switch (status?.status) {
      case 'approved':
        return 'check-circle';
      case 'rejected':
        return 'close-circle';
      default:
        return 'clock-outline';
    }
  };

  const getStatusMessage = () => {
    switch (status?.status) {
      case 'approved':
        return 'Your application has been approved! Welcome to RitzYard supplier network.';
      case 'rejected':
        return status.rejectionReason || 'Unfortunately, your application was not approved.';
      default:
        return 'Your application is under review. We will notify you via email once a decision has been made.';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Checking application status...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#f5f5f5', '#fff']} style={styles.gradientBg}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Application Status</Text>
            <Text style={styles.headerSubtitle}>Track your supplier application progress</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {status && (
            <>
              {/* Status Badge */}
              <View style={styles.statusCard}>
                <View style={[styles.statusIconBox, { backgroundColor: `${getStatusColor()}20` }]}>
                  <MaterialCommunityIcons
                    name={getStatusIcon() as any}
                    size={48}
                    color={getStatusColor()}
                  />
                </View>
                <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
                  {status.status === 'approved'
                    ? 'Application Approved!'
                    : status.status === 'rejected'
                    ? 'Application Rejected'
                    : 'Application Under Review'}
                </Text>
                <Text style={styles.statusMessage}>{getStatusMessage()}</Text>
              </View>

              {/* Application Details */}
              <View style={styles.detailsCard}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Company Name</Text>
                  <Text style={styles.detailValue}>{status.companyName}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
                    <Text style={[styles.statusBadgeText, { color: getStatusColor() }]}>
                      {status.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Submitted On</Text>
                  <Text style={styles.detailValue}>
                    {new Date(status.submittedOn).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              {status.status === 'approved' && (
                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient
                    colors={[colors.gradient1, colors.gradient2]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <MaterialCommunityIcons name="login" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Login to Dashboard</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {status.status === 'pending' && (
                <View style={styles.infoBox}>
                  <MaterialCommunityIcons name="information" size={16} color={colors.gradient1} />
                  <Text style={styles.infoText}>
                    We will notify you via email at {email} once a decision has been made.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.homeButtonText}>Return to Homepage</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color={colors.gradient1} />
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientBg: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(197, 78, 48, 0.1)',
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(197, 78, 48, 0.1)',
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  statusIconBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusMessage: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(197, 78, 48, 0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(197, 78, 48, 0.1)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actionButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(197, 78, 48, 0.08)',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  homeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gradient1,
  },
});
