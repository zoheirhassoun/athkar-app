import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AthkarScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallScreen = width < 375;

  const athkarCategories = [
    {
      id: 'morning',
      title: 'أذكار الصباح',
      subtitle: 'أذكار بداية اليوم',
      icon: 'sunny',
      color: '#FF6B35',
      count: 12,
    },
    {
      id: 'evening',
      title: 'أذكار المساء',
      subtitle: 'أذكار نهاية اليوم',
      icon: 'moon',
      color: '#00B4A6',
      count: 12,
    },
    {
      id: 'sleep',
      title: 'أذكار النوم',
      subtitle: 'أذكار قبل النوم',
      icon: 'bed',
      color: '#3D5A80',
      count: 8,
    },
    {
      id: 'wakeup',
      title: 'أذكار الاستيقاظ',
      subtitle: 'أذكار بعد الاستيقاظ',
      icon: 'alarm',
      color: '#7209B7',
      count: 5,
    },
    {
      id: 'prayer',
      title: 'أذكار الصلاة',
      subtitle: 'أذكار قبل وبعد الصلاة',
      icon: 'heart',
      color: '#DC2626',
      count: 15,
    },
    {
      id: 'daily',
      title: 'أذكار يومية',
      subtitle: 'أذكار متنوعة',
      icon: 'calendar',
      color: '#7C3AED',
      count: 20,
    },
    {
      id: 'protection',
      title: 'أذكار الحفظ',
      subtitle: 'أذكار الحماية والرزق',
      icon: 'shield',
      color: '#059669',
      count: 10,
    },
    {
      id: 'quran',
      title: 'أذكار القرآن',
      subtitle: 'أذكار تلاوة القرآن',
      icon: 'book',
      color: '#2563EB',
      count: 6,
    },
  ];

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        {
          marginBottom: isTablet ? 20 : 15,
        }
      ]}
      onPress={() => navigation.navigate('AthkarDetail', { category: category.id })}
    >
      <LinearGradient
        colors={[category.color, category.color + '80']}
        style={[
          styles.cardGradient,
          {
            padding: isTablet ? 30 : 20,
            minHeight: isTablet ? 120 : 100,
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <Ionicons 
            name={category.icon} 
            size={isTablet ? 36 : isSmallScreen ? 24 : 28} 
            color="white" 
          />
          <View style={[
            styles.countBadge,
            {
              paddingHorizontal: isTablet ? 12 : 8,
              paddingVertical: isTablet ? 6 : 4,
            }
          ]}>
            <Text style={[
              styles.countText,
              { fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12 }
            ]}>
              {category.count}
            </Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={[
            styles.cardTitle,
            { fontSize: isTablet ? 24 : isSmallScreen ? 16 : 18 }
          ]}>
            {category.title}
          </Text>
          <Text style={[
            styles.cardSubtitle,
            { fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14 }
          ]}>
            {category.subtitle}
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <Ionicons 
            name="chevron-forward" 
            size={isTablet ? 28 : isSmallScreen ? 16 : 20} 
            color="white" 
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[
        styles.header,
        {
          padding: isTablet ? 40 : 20,
        }
      ]}>
        <Text style={[
          styles.headerTitle,
          { fontSize: isTablet ? 32 : isSmallScreen ? 20 : 24 }
        ]}>
          اختر نوع الأذكار
        </Text>
        <Text style={[
          styles.headerSubtitle,
          { fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16 }
        ]}>
          اضغط على أي فئة لبدء الذكر
        </Text>
      </View>

      <View style={[
        styles.categoriesContainer,
        {
          padding: isTablet ? 30 : 15,
        }
      ]}>
        {athkarCategories.map((category) => renderCategoryCard(category))}
      </View>

      <View style={[
        styles.footer,
        {
          padding: isTablet ? 40 : 20,
        }
      ]}>
        <Text style={[
          styles.footerText,
          { fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16 }
        ]}>
          "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#666',
    textAlign: 'right',
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryCard: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  countBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  countText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'right',
  },
  cardSubtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'right',
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontStyle: 'italic',
  },
});

export default AthkarScreen; 