import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  level: 'Entry' | 'Mid' | 'Senior';
  description: string;  
  requirements: string[];
  salary: string;
}

interface Benefit {
  icon: string;
  label: string;
  description: string;
}

export default function CareersScreen() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareersData();
  }, []);

  const fetchCareersData = async () => {
    try {
      // TODO: Fetch from backend API
      // For now, using fallback data
      const defaultJobs: JobOpening[] = [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          department: 'Engineering',
          location: 'Mumbai, India',
          type: 'Full-time',
          level: 'Senior',
          description: 'Build and scale our B2B procurement platform with latest technologies.',
          requirements: ['5+ years experience', 'React/Node.js', 'MongoDB', 'System Design'],
          salary: '₹25-35L',
        },
        {
          id: '2',
          title: 'Product Manager',
          department: 'Product',
          location: 'Mumbai, India',
          type: 'Full-time',
          level: 'Mid',
          description: 'Lead product strategy and development for procurement solutions.',
          requirements: ['3+ years PM experience', 'B2B expertise', 'Analytics', 'Leadership'],
          salary: '₹18-25L',
        },
        {
          id: '3',
          title: 'Supplier Onboarding Manager',
          department: 'Operations',
          location: 'Pan India',
          type: 'Full-time',
          level: 'Mid',
          description: 'Manage supplier relationships and onboarding process.',
          requirements: ['3+ years experience', 'Supply chain knowledge', 'Communication', 'Sales'],
          salary: '₹12-18L',
        },
        {
          id: '4',
          title: 'Customer Success Manager',
          department: 'Sales',
          location: 'Mumbai, Bangalore',
          type: 'Full-time',
          level: 'Mid',
          description: 'Ensure customer satisfaction and drive retention.',
          requirements: ['2+ years CSM experience', 'B2B background', 'Problem-solving', 'CRM'],
          salary: '₹10-15L',
        },
        {
          id: '5',
          title: 'React Native Developer',
          department: 'Engineering',
          location: 'Mumbai, India',
          type: 'Full-time',
          level: 'Mid',
          description: 'Build mobile apps for iOS and Android platforms.',
          requirements: ['3+ years React Native', 'iOS/Android', 'REST APIs', 'Git'],
          salary: '₹15-22L',
        },
        {
          id: '6',
          title: 'Data Analyst',
          department: 'Analytics',
          location: 'Remote',
          type: 'Full-time',
          level: 'Entry',
          description: 'Analyze market trends and supplier data.',
          requirements: ['1+ years experience', 'SQL', 'Python', 'Data visualization'],
          salary: '₹8-12L',
        },
      ];

      const defaultBenefits: Benefit[] = [
        { icon: 'briefcase', label: 'Competitive Pay', description: 'Industry-leading salaries' },
        { icon: 'home', label: 'Remote Options', description: 'Work from anywhere' },
        { icon: 'heart-multiple', label: 'Health Benefits', description: 'Complete coverage' },
        { icon: 'book-open', label: 'Learning', description: 'Training & development' },
        { icon: 'chart-line', label: 'Growth', description: 'Career advancement' },
        { icon: 'people', label: 'Culture', description: 'Diverse & inclusive' },
      ];

      setJobOpenings(defaultJobs);
      setBenefits(defaultBenefits);
    } catch (error) {
      console.error('Error fetching careers data:', error);
    } finally {
      setLoading(false);
    }
  };

  const JobCard = ({ job }: { job: JobOpening }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => setSelectedJob(job)}
    >
      <View style={styles.jobHeader}>
        <View>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobDepartment}>{job.department}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.jobMeta}>
        <View style={styles.jobMetaItem}>
          <MaterialCommunityIcons name="map-marker" size={14} color={colors.primary} />
          <Text style={styles.jobMetaText}>{job.location}</Text>
        </View>
        <View style={styles.jobMetaItem}>
          <MaterialCommunityIcons name="briefcase-outline" size={14} color={colors.primary} />
          <Text style={styles.jobMetaText}>{job.type}</Text>
        </View>
        <View style={styles.jobMetaItem}>
          <MaterialCommunityIcons name="star-outline" size={14} color={colors.primary} />
          <Text style={styles.jobMetaText}>{job.level}</Text>
        </View>
      </View>

      <Text style={styles.jobSalary}>{job.salary}</Text>
    </TouchableOpacity>
  );

  const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
    <View style={styles.benefitCard}>
      <View style={styles.benefitIcon}>
        <MaterialCommunityIcons name={benefit.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.benefitLabel}>{benefit.label}</Text>
      <Text style={styles.benefitDescription}>{benefit.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Join Our Team</Text>
          <Text style={styles.subtitle}>Build the future of B2B procurement</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="rocket-launch" size={32} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>We&apos;re Hiring!</Text>
          <Text style={styles.heroSubtitle}>{jobOpenings.length} open positions across engineering, sales, and operations</Text>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Join RitzYard?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </View>
        </View>

        {/* Job Openings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open Positions</Text>
          <View style={styles.jobsList}>
            {jobOpenings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </View>
        </View>

        {/* Job Details Modal */}
        {selectedJob && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedJob(null)}
              >
                <MaterialCommunityIcons name="close" size={20} color={colors.text} />
              </TouchableOpacity>

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                <Text style={styles.modalDepartment}>{selectedJob.department}</Text>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalSectionTitle}>Job Details</Text>
                
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
                  <Text style={styles.detailText}>{selectedJob.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="briefcase-outline" size={16} color={colors.primary} />
                  <Text style={styles.detailText}>{selectedJob.type} • {selectedJob.level}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="currency-inr" size={16} color={colors.primary} />
                  <Text style={styles.detailText}>{selectedJob.salary}</Text>
                </View>

                <Text style={[styles.modalSectionTitle, { marginTop: 12 }]}>Description</Text>
                <Text style={styles.descriptionText}>{selectedJob.description}</Text>

                <Text style={[styles.modalSectionTitle, { marginTop: 12 }]}>Requirements</Text>
                {selectedJob.requirements.map((req, index) => (
                  <View key={index} style={styles.requirementItem}>
                    <MaterialCommunityIcons name="check-circle-outline" size={16} color={colors.success} />
                    <Text style={styles.requirementText}>{req}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.applyButton}>
                <MaterialCommunityIcons name="send" size={16} color="#fff" />
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'center',
  },
  jobsList: {
    gap: 8,
  },
  jobCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  jobDepartment: {
    fontSize: 11,
    color: colors.textLight,
  },
  jobMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  jobMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobMetaText: {
    fontSize: 10,
    color: colors.textLight,
  },
  jobSalary: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modalHeader: {
    marginBottom: 16,
    paddingRight: 32,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  modalDepartment: {
    fontSize: 12,
    color: colors.textLight,
  },
  modalBody: {
    marginBottom: 16,
    maxHeight: 400,
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 12,
    color: colors.textLight,
  },
  descriptionText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 11,
    color: colors.textLight,
    flex: 1,
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
