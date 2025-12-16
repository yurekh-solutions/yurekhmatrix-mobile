import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
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

const jobOpenings: JobOpening[] = [
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

const benefits = [
  { icon: 'briefcase', label: 'Competitive Pay', description: 'Industry-leading salaries' },
  { icon: 'home', label: 'Remote Options', description: 'Work from anywhere' },
  { icon: 'heart-multiple', label: 'Health Benefits', description: 'Complete coverage' },
  { icon: 'book-open', label: 'Learning', description: 'Training & development' },
  { icon: 'chart-line', label: 'Growth', description: 'Career advancement' },
  { icon: 'people', label: 'Culture', description: 'Diverse & inclusive' },
];

export default function CareersScreen() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

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

  const BenefitCard = ({ benefit }: { benefit: typeof benefits[0] }) => (
    <View style={styles.benefitCard}>
      <View style={styles.benefitIcon}>
        <MaterialCommunityIcons name={benefit.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.benefitLabel}>{benefit.label}</Text>
      <Text style={styles.benefitDescription}>{benefit.description}</Text>
    </View>
  );

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
          <Text style={styles.heroSubtitle}>6 open positions across engineering, sales, and operations</Text>
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

              <Text style={styles.modalTitle}>{selectedJob.title}</Text>
              <Text style={styles.modalDepartment}>{selectedJob.department}</Text>

              <View style={styles.modalMetaRow}>
                <View style={styles.modalMetaItem}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
                  <Text style={styles.modalMetaText}>{selectedJob.location}</Text>
                </View>
                <View style={styles.modalMetaItem}>
                  <MaterialCommunityIcons name="currency-inr" size={16} color={colors.primary} />
                  <Text style={styles.modalMetaText}>{selectedJob.salary}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.modalLabel}>About this role</Text>
              <Text style={styles.modalDescription}>{selectedJob.description}</Text>

              <Text style={styles.modalLabel}>Requirements</Text>
              <View style={styles.requirementsList}>
                {selectedJob.requirements.map((req, index) => (
                  <View key={index} style={styles.requirementItem}>
                    <MaterialCommunityIcons name="check-circle" size={14} color={colors.success} />
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

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Don&apos;t see a fit?</Text>
          <View style={styles.contactCard}>
            <MaterialCommunityIcons name="email-outline" size={24} color={colors.primary} />
            <Text style={styles.contactText}>Send your resume to careers@ritzyard.com</Text>
          </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
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
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (Dimensions.get('window').width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  benefitDescription: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  jobsList: {
    gap: 10,
  },
  jobCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  jobDepartment: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  jobMeta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  jobMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobMetaText: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  jobSalary: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
    marginBottom: 12,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalMetaText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  requirementsList: {
    gap: 6,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 12,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});
