import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  featured?: boolean;
}

// Mock blog data
const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'How to Optimize Your Supply Chain for Maximum Efficiency',
    excerpt: 'Learn proven strategies to streamline your procurement process and reduce costs by up to 40%.',
    image: 'https://via.placeholder.com/400x250/c15738/ffffff?text=Supply+Chain',
    category: 'Supply Chain',
    author: 'Sarah Johnson',
    date: '2024-12-15',
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Digital Transformation in Procurement: A Complete Guide',
    excerpt: 'Discover how digital tools are revolutionizing the way businesses handle procurement and supplier relationships.',
    image: 'https://via.placeholder.com/400x250/5c2d23/ffffff?text=Digital+Transform',
    category: 'Technology',
    author: 'Michael Chen',
    date: '2024-12-12',
    readTime: 6,
    featured: true,
  },
  {
    id: '3',
    title: 'Supplier Relationship Management Best Practices',
    excerpt: 'Build stronger partnerships with your suppliers and unlock new opportunities for growth and innovation.',
    image: 'https://via.placeholder.com/400x250/e8dcd4/5c2d23?text=Partnership',
    category: 'Business',
    author: 'Emma Davis',
    date: '2024-12-10',
    readTime: 7,
  },
  {
    id: '4',
    title: 'Sustainability in Procurement: Why It Matters',
    excerpt: 'Explore how sustainable procurement practices benefit your business and the environment.',
    image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Sustainability',
    category: 'Sustainability',
    author: 'James Wilson',
    date: '2024-12-08',
    readTime: 5,
  },
  {
    id: '5',
    title: 'Market Trends: Materials & Manufacturing 2025',
    excerpt: 'Stay ahead of industry changes with insights into emerging trends and market forecasts.',
    image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Market+Trends',
    category: 'Market Analysis',
    author: 'Robert Taylor',
    date: '2024-12-05',
    readTime: 10,
  },
  {
    id: '6',
    title: 'Cost Reduction Strategies for Industrial Buyers',
    excerpt: 'Practical techniques to negotiate better prices without compromising quality or supplier relationships.',
    image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Cost+Reduction',
    category: 'Finance',
    author: 'Lisa Anderson',
    date: '2024-12-01',
    readTime: 9,
  },
];

export default function BlogScreen() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Supply Chain',
    'Technology',
    'Business',
    'Sustainability',
    'Market Analysis',
    'Finance',
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBlogs(mockBlogs);
      setFilteredBlogs(mockBlogs);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, selectedCategory, blogs]);

  const filterBlogs = () => {
    let filtered = blogs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.excerpt.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const FeaturedBlogCard = ({ blog }: { blog: BlogPost }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <Image
        source={{ uri: blog.image }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
          <MaterialCommunityIcons name="star" size={14} color="#fff" />
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>
      </View>
      <View style={styles.featuredContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{blog.category}</Text>
        </View>
        <Text style={styles.featuredTitle}>{blog.title}</Text>
        <View style={styles.featuredMeta}>
          <View style={styles.authorInfo}>
            <MaterialCommunityIcons name="account-circle" size={16} color={colors.primary} />
            <Text style={styles.authorName}>{blog.author}</Text>
          </View>
          <Text style={styles.readTime}>{blog.readTime} min read</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const BlogCard = ({ blog }: { blog: BlogPost }) => (
    <TouchableOpacity style={styles.blogCard}>
      <Image
        source={{ uri: blog.image }}
        style={styles.blogImage}
      />
      <View style={styles.blogContent}>
        <View style={styles.blogHeader}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{blog.category}</Text>
          </View>
          <Text style={styles.blogDate}>{formatDate(blog.date)}</Text>
        </View>

        <Text style={styles.blogTitle} numberOfLines={2}>
          {blog.title}
        </Text>

        <Text style={styles.blogExcerpt} numberOfLines={2}>
          {blog.excerpt}
        </Text>

        <View style={styles.blogFooter}>
          <View style={styles.blogMeta}>
            <MaterialCommunityIcons name="account-circle" size={14} color={colors.textLight} />
            <Text style={styles.blogAuthor}>{blog.author}</Text>
          </View>
          <Text style={styles.blogReadTime}>{blog.readTime} min</Text>
        </View>

        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read Article</Text>
          <MaterialCommunityIcons name="arrow-right" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>RitzYard Blog</Text>
          <Text style={styles.subtitle}>Industry insights, tips & trends</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} />
          <Text style={styles.searchPlaceholder}>Search articles...</Text>
        </View>

        {/* Featured Section */}
        {filteredBlogs.filter((b) => b.featured).length > 0 && (
          <View style={styles.featuredSection}>
            <FlatList
              data={filteredBlogs.filter((b) => b.featured)}
              renderItem={({ item }) => <FeaturedBlogCard blog={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={width - 32}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryPill,
                  selectedCategory === cat && styles.categoryPillActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    selectedCategory === cat && styles.categoryPillTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
          </Text>
        </View>

        {/* Blog List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading articles...</Text>
          </View>
        ) : filteredBlogs.length > 0 ? (
          <View style={styles.blogsList}>
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="newspaper-variant" size={48} color={colors.border} />
            <Text style={styles.emptyText}>No articles found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        )}

        {/* Newsletter Section */}
        <View style={styles.newsletterSection}>
          <MaterialCommunityIcons name="email-newsletter" size={32} color={colors.primary} />
          <Text style={styles.newsletterTitle}>Stay Updated</Text>
          <Text style={styles.newsletterSubtitle}>Get industry insights delivered to your inbox</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe to Newsletter</Text>
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
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  featuredSection: {
    marginVertical: 12,
  },
  featuredList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featuredCard: {
    width: width - 32,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  featuredOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  featuredBadge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  featuredContent: {
    padding: 14,
  },
  categoryBadge: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '500',
  },
  featuredTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  readTime: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  categoriesList: {
    gap: 8,
    paddingRight: 16,
  },
  categoryPill: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textLight,
  },
  blogsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  blogCard: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  blogImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.border,
  },
  blogContent: {
    padding: 12,
  },
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryTagText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '500',
  },
  blogDate: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '500',
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  blogExcerpt: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 10,
    lineHeight: 16,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  blogAuthor: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  blogReadTime: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 6,
  },
  newsletterSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  newsletterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },
  newsletterSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
