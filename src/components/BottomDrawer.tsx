import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { height } = Dimensions.get('window');

const COLORS = {
  primary: '#c15738',
  primaryLight: '#d66f4f',
  primaryDark: '#8b3a25',
  secondary: '#f5ede3',
  background: '#faf8f6',
  white: '#ffffff',
  text: '#332319',
  textLight: '#8b7355',
  border: '#e8dfd5',
  divider: '#e8dfd5',
};

interface DrawerItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
  onPress: () => void;
  badge?: number;
  color?: string;
  requiresAuth?: boolean;
}

interface DrawerSection {
  title: string;
  items: DrawerItem[];
}

interface BottomDrawerProps {
  visible: boolean;
  onClose: () => void;
  navigation?: any;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ visible, onClose, navigation }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<DrawerSection[]>([]);

  useEffect(() => {
    if (visible) {
      loadDrawerItems();
    }
  }, [visible, isAuthenticated]);

  const loadDrawerItems = async () => {
    setLoading(true);
    try {
      // Build drawer sections dynamically based on auth status
      const drawerSections: DrawerSection[] = [];

      // RITZYARD SECTION
      drawerSections.push({
        title: 'RITZYARD',
        items: [
          {
            id: 'home',
            title: 'Home',
            icon: 'home-outline',
            description: 'Back to home',
            color: COLORS.primary,
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('products');
              onClose();
            },
          },
          {
            id: 'explore',
            title: 'Explore',
            icon: 'compass-outline',
            description: 'Discover products',
            color: '#4ECDC4',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('explore');
              onClose();
            },
          },
          {
            id: 'products',
            title: 'Products',
            icon: 'shopping-outline',
            description: 'Browse materials',
            color: '#FFB84D',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('products');
              onClose();
            },
          },
        ],
      });

      // PROFILE SECTION (Auth Required)
      if (isAuthenticated) {
        drawerSections.push({
          title: 'YOUR ACCOUNT',
          items: [
            {
              id: 'profile',
              title: 'Profile',
              icon: 'account-circle-outline',
              description: 'Manage your profile',
              color: '#9B59B6',
              requiresAuth: true,
              onPress: () => {
                if (navigation?.navigate) navigation.navigate('more');
                onClose();
              },
            },
            {
              id: 'settings',
              title: 'Settings',
              icon: 'cog-outline',
              description: 'App preferences',
              color: COLORS.primary,
              requiresAuth: true,
              onPress: () => {
                if (navigation?.navigate) navigation.navigate('settings');
                onClose();
              },
            },
            {
              id: 'notifications',
              title: 'Notifications',
              icon: 'bell-outline',
              description: 'View notifications',
              color: '#E74C3C',
              badge: 3,
              requiresAuth: true,
              onPress: () => {
                if (navigation?.navigate) navigation.navigate('notifications');
                onClose();
              },
            },
          ],
        });
      }

      // SUPPORT SECTION
      drawerSections.push({
        title: 'SUPPORT & INFO',
        items: [
          {
            id: 'contact',
            title: 'Contact Us',
            icon: 'email-outline',
            description: 'Get in touch',
            color: '#1ABC9C',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('contact');
              onClose();
            },
          },
          {
            id: 'help',
            title: 'Help Center',
            icon: 'help-circle-outline',
            description: 'FAQs & guides',
            color: '#3498DB',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('help');
              onClose();
            },
          },
          {
            id: 'about',
            title: 'About',
            icon: 'information-outline',
            description: 'About RitzYard',
            color: '#2ECC71',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('about');
              onClose();
            },
          },
        ],
      });

      // LEGAL SECTION
      drawerSections.push({
        title: 'LEGAL',
        items: [
          {
            id: 'privacy',
            title: 'Privacy Policy',
            icon: 'shield-outline',
            description: 'Your privacy matters',
            color: '#F39C12',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('privacy');
              onClose();
            },
          },
          {
            id: 'terms',
            title: 'Terms & Conditions',
            icon: 'file-document-outline',
            description: 'Legal terms',
            color: '#E67E22',
            onPress: () => {
              if (navigation?.navigate) navigation.navigate('terms');
              onClose();
            },
          },
        ],
      });

      // LOGOUT SECTION (Auth Required)
      if (isAuthenticated) {
        drawerSections.push({
          title: 'ACCOUNT',
          items: [
            {
              id: 'logout',
              title: 'Logout',
              icon: 'logout',
              description: `Logout (${user?.email || 'User'})`,
              color: '#E74C3C',
              requiresAuth: true,
              onPress: async () => {
                await logout();
                onClose();
              },
            },
          ],
        });
      }

      setSections(drawerSections);
    } catch (error) {
      console.error('Error loading drawer items:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDrawerItem = (item: DrawerItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.drawerItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.itemIconBox, { backgroundColor: (item.color || COLORS.primary) + '20' }]}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={item.color || COLORS.primary}
        />
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.itemDescription}>{item.description}</Text>
        )}
      </View>

      {item.badge ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );

  const renderSection = (section: DrawerSection) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map((item, idx) => (
          <View key={item.id}>
            {renderDrawerItem(item)}
            {idx < section.items.length - 1 && <View style={styles.itemDivider} />}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />

        <SafeAreaView style={styles.drawerContainer}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerTitle}>RitzYard</Text>
                <Text style={styles.headerSubtitle}>
                  {isAuthenticated ? `Welcome, ${user?.name || 'User'}` : 'Smart Materials Marketplace'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
              >
                <MaterialCommunityIcons name="close" size={28} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* Content */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {sections.map((section) => renderSection(section))}
              </ScrollView>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>RitzYard v1.0.0</Text>
              <Text style={styles.footerSubText}>Premium Materials Marketplace</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  overlayTouchable: {
    flex: 1,
  },

  drawerContainer: {
    maxHeight: height * 0.85,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },

  gradient: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginTop: 4,
  },

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingVertical: 16,
  },

  section: {
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  sectionContent: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },

  itemIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  itemDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 3,
    fontWeight: '500',
  },

  itemDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 80,
  },

  badgeContainer: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },

  footerSubText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 3,
    fontWeight: '500',
  },
});

export default BottomDrawer;
