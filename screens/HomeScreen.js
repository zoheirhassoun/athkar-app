import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallScreen = width < 375;
  const { theme } = useTheme();

  const quickAccessItems = [
    {
      title: 'أذكار الصباح',
      subtitle: 'أذكار بداية اليوم',
      icon: 'sunny',
      color: '#FF6B35',
      screen: 'AthkarDetail',
      params: { category: 'morning' }
    },
    {
      title: 'أذكار المساء',
      subtitle: 'أذكار نهاية اليوم',
      icon: 'moon',
      color: '#00B4A6',
      screen: 'AthkarDetail',
      params: { category: 'evening' }
    },
    {
      title: 'أذكار النوم',
      subtitle: 'أذكار قبل النوم',
      icon: 'bed',
      color: '#3D5A80',
      screen: 'AthkarDetail',
      params: { category: 'sleep' }
    },
    {
      title: 'أذكار الاستيقاظ',
      subtitle: 'أذكار بعد الاستيقاظ',
      icon: 'alarm',
      color: '#7209B7',
      screen: 'AthkarDetail',
      params: { category: 'wakeup' }
    },
  ];

  const renderQuickAccessItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.quickAccessItem,
        {
          width: isTablet ? (width - 80) / 3 : (width - 60) / 2,
          height: isTablet ? 140 : isSmallScreen ? 100 : 120,
          marginBottom: isTablet ? 20 : 15,
        }
      ]}
      onPress={() => navigation.navigate('Athkar', {
        screen: item.screen,
        params: item.params
      })}
    >
      <LinearGradient
        colors={[item.color, item.color + '80']}
        style={styles.gradient}
      >
        <Ionicons 
          name={item.icon} 
          size={isTablet ? 40 : isSmallScreen ? 24 : 32} 
          color="white" 
        />
        <Text style={[
          styles.quickAccessTitle,
          { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
        ]}>
          {item.title}
        </Text>
        <Text style={[
          styles.quickAccessSubtitle,
          { fontSize: isTablet ? 14 : isSmallScreen ? 10 : 12 }
        ]}>
          {item.subtitle}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={theme.colors.primaryGradient}
        style={[
          styles.header,
          {
            paddingTop: isTablet ? 80 : 60,
            paddingBottom: isTablet ? 60 : 40,
            paddingHorizontal: isTablet ? 40 : 20,
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Ionicons 
            name="book" 
            size={isTablet ? 50 : isSmallScreen ? 35 : 40} 
            color="white" 
            style={styles.headerIcon}
          />
          <Text style={[
            styles.welcomeText,
            { fontSize: isTablet ? 36 : isSmallScreen ? 24 : 28 }
          ]}>
            مرحباً بك
          </Text>
          <Text style={[
            styles.subtitleText,
            { fontSize: isTablet ? 24 : isSmallScreen ? 16 : 18 }
          ]}>
            في تطبيق الأذكار
          </Text>
          <View style={styles.quoteContainer}>
            <Text style={[
              styles.quoteText,
              { fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16 }
            ]}>
              "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
            </Text>
            <Text style={[
              styles.quoteReference,
              { fontSize: isTablet ? 14 : isSmallScreen ? 10 : 12 }
            ]}>
              سورة الرعد - آية 28
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[
        styles.content,
        { padding: isTablet ? 40 : 20 }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { 
            fontSize: isTablet ? 28 : isSmallScreen ? 20 : 22,
            color: theme.colors.text,
          }
        ]}>
          الوصول السريع
        </Text>
        <View style={[
          styles.quickAccessGrid,
          {
            justifyContent: isTablet ? 'flex-start' : 'space-between',
            gap: isTablet ? 20 : 0,
          }
        ]}>
          {quickAccessItems.map((item, index) => 
            renderQuickAccessItem(item, index)
          )}
        </View>

        {/* قسم الميزات المميزة */}
        <View style={[
          styles.featuresContainer,
          {
            padding: isTablet ? 30 : 20,
            marginTop: isTablet ? 40 : 30,
            backgroundColor: theme.colors.surface,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: isTablet ? 28 : isSmallScreen ? 20 : 22,
              color: theme.colors.text,
            }
          ]}>
            ميزات التطبيق
          </Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Ionicons name="notifications" size={24} color="#059669" />
              <Text style={styles.featureText}>تذكير بالأذكار</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="phone-portrait" size={24} color="#059669" />
              <Text style={styles.featureText}>اهتزاز تفاعلي</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#059669" />
              <Text style={styles.featureText}>عداد ذكي</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="heart" size={24} color="#059669" />
              <Text style={styles.featureText}>صدقة جارية</Text>
            </View>
          </View>
        </View>

        {/* قسم الإحصائيات */}
        <View style={[
          styles.statsContainer,
          {
            padding: isTablet ? 30 : 20,
            marginTop: isTablet ? 20 : 15,
            backgroundColor: theme.colors.surface,
          }
        ]}>
          <Text style={[
            styles.sectionTitle,
            { 
              fontSize: isTablet ? 28 : isSmallScreen ? 20 : 22,
              color: theme.colors.text,
            }
          ]}>
            إحصائيات اليوم
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[
                styles.statNumber,
                { fontSize: isTablet ? 40 : isSmallScreen ? 28 : 32 }
              ]}>
                0
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14 }
              ]}>
                أذكار اليوم
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[
                styles.statNumber,
                { fontSize: isTablet ? 40 : isSmallScreen ? 28 : 32 }
              ]}>
                0
              </Text>
              <Text style={[
                styles.statLabel,
                { fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14 }
              ]}>
                أيام متتالية
              </Text>
            </View>
          </View>
        </View>

        {/* قسم دعوة للذكر */}
        <View style={[
          styles.inspirationContainer,
          {
            padding: isTablet ? 30 : 20,
            marginTop: isTablet ? 20 : 15,
            marginBottom: isTablet ? 30 : 20,
          }
        ]}>
          <Ionicons name="star" size={isTablet ? 40 : 30} color="#f59e0b" style={styles.inspirationIcon} />
          <Text style={[
            styles.inspirationTitle,
            { fontSize: isTablet ? 24 : isSmallScreen ? 18 : 20 }
          ]}>
            ابدأ رحلة الذكر
          </Text>
          <Text style={[
            styles.inspirationText,
            { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
          ]}>
            "مَن قَالَ سُبْحَانَ اللهِ وَبِحَمْدِهِ في يَوْمٍ مِائَةَ مَرَّةٍ حُطَّتْ خَطَايَاهُ وإنْ كَانَتْ مِثْلَ زَبَدِ البَحْرِ"
          </Text>
          <TouchableOpacity 
            style={[
              styles.startButton,
              {
                paddingVertical: isTablet ? 15 : 12,
                paddingHorizontal: isTablet ? 30 : 25,
              }
            ]}
            onPress={() => navigation.navigate('Athkar', {
              screen: 'AthkarDetail',
              params: { category: 'morning' }
            })}
          >
            <Text style={[
              styles.startButtonText,
              { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
            ]}>
              ابدأ الآن
            </Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 15,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  quoteContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  quoteText: {
    color: 'white',
    opacity: 0.9,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5,
  },
  quoteReference: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'right',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  quickAccessItem: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  quickAccessTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  quickAccessSubtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 4,
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#1a5f7a',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    marginTop: 8,
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  inspirationContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  inspirationIcon: {
    marginBottom: 15,
  },
  inspirationTitle: {
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 15,
    textAlign: 'center',
  },
  inspirationText: {
    color: '#92400e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 25,
    shadowColor: '#f59e0b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen; 