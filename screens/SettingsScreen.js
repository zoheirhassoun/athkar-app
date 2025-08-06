import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallScreen = width < 375;
  const { theme, isDark, toggleTheme } = useTheme();
  
  const [notifications, setNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const settingsItems = [
    {
      title: 'الإشعارات',
      subtitle: 'تذكير بالأذكار',
      icon: 'notifications',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      title: 'الاهتزاز',
      subtitle: 'اهتزاز عند العد',
      icon: 'phone-portrait',
      type: 'switch',
      value: hapticFeedback,
      onValueChange: setHapticFeedback,
    },
    {
      title: 'التشغيل التلقائي',
      subtitle: 'انتقال تلقائي للذكر التالي',
      icon: 'play-circle',
      type: 'switch',
      value: autoPlay,
      onValueChange: setAutoPlay,
    },
    {
      title: 'الوضع المظلم',
      subtitle: 'تغيير مظهر التطبيق',
      icon: 'moon',
      type: 'switch',
      value: isDark,
      onValueChange: toggleTheme,
    },
  ];

  const infoItems = [
    {
      title: 'حول التطبيق',
      subtitle: 'إصدار 1.0.0',
      icon: 'information-circle',
      action: () => Alert.alert('حول التطبيق', 'تطبيق الأذكار - إصدار 1.0.0\n\nرفيقك اليومي للأذكار والتسبيح مع عداد تفاعلي أنيق.\n\n👨‍💻 صُمم وطُور بحب ودقة على يد: زهير حسون\n\n🤲 هذا التطبيق صدقة جارية مُهداة لأرواح أجدادي الكرام:\n• حسين أحمد حسون (رحمه الله)\n• سعاد عمر أحمد (رحمها الله)\n• عوض عبدالحميد عديل (رحمه الله)\n• بتول أحمد حسون (رحمها الله)\n\nجعل الله هذا العمل في ميزان حسناتهم، وتقبل منا ومنكم صالح الأعمال.'),
    },
    {
      title: 'تقييم التطبيق',
      subtitle: 'ساعدنا في التطوير',
      icon: 'star',
      action: () => Alert.alert('تقييم التطبيق', 'شكراً لك على استخدام التطبيق!\n\nسيتم إضافة رابط التقييم قريباً.'),
    },
    {
      title: 'مشاركة التطبيق',
      subtitle: 'شارك مع الأصدقاء',
      icon: 'share-social',
      action: () => Alert.alert('مشاركة التطبيق', 'سيتم إضافة ميزة المشاركة قريباً.'),
    },
    {
      title: 'سياسة الخصوصية',
      subtitle: 'اقرأ سياسة الخصوصية',
      icon: 'shield-checkmark',
      action: () => Alert.alert('سياسة الخصوصية', 'سيتم إضافة سياسة الخصوصية قريباً.'),
    },
    {
      title: 'المطور',
      subtitle: 'زهير حسون',
      icon: 'person',
      action: () => Alert.alert('المطور', '👨‍💻 زهير حسون\n\n🚀 مطور تطبيقات الهاتف المحمول\n📱 متخصص في React Native و Flutter\n\n✨ شكراً لك على استخدام التطبيق!'),
    },
  ];

  const renderSettingItem = (item) => (
    <View key={item.title} style={[
      styles.settingItem,
      {
        paddingVertical: isTablet ? 20 : 15,
        paddingHorizontal: isTablet ? 30 : 20,
        borderBottomColor: theme.colors.border,
      }
    ]}>
      <View style={styles.settingLeft}>
        <View style={[
          styles.iconContainer,
          {
            width: isTablet ? 50 : isSmallScreen ? 35 : 40,
            height: isTablet ? 50 : isSmallScreen ? 35 : 40,
            borderRadius: isTablet ? 25 : isSmallScreen ? 17.5 : 20,
            marginRight: isTablet ? 20 : 15,
            backgroundColor: theme.isDark ? theme.colors.border : '#dbeafe',
          }
        ]}>
          <Ionicons 
            name={item.icon} 
            size={isTablet ? 28 : isSmallScreen ? 20 : 24} 
            color={theme.colors.primary} 
          />
        </View>
        <View style={styles.settingText}>
          <Text style={[
            styles.settingTitle,
            { 
              fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16,
              color: theme.colors.text,
            }
          ]}>
            {item.title}
          </Text>
          <Text style={[
            styles.settingSubtitle,
            { 
              fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14,
              color: theme.colors.textSecondary,
            }
          ]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: theme.colors.textTertiary, true: theme.colors.primary }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity onPress={item.action}>
          <Ionicons 
            name="chevron-forward" 
            size={isTablet ? 28 : isSmallScreen ? 20 : 24} 
            color={theme.colors.textTertiary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[
        styles.header,
        {
          padding: isTablet ? 40 : 20,
          backgroundColor: theme.colors.surface,
        }
      ]}>
        <Text style={[
          styles.headerTitle,
          { 
            fontSize: isTablet ? 32 : isSmallScreen ? 20 : 24,
            color: theme.colors.text,
          }
        ]}>
          الإعدادات
        </Text>
        <Text style={[
          styles.headerSubtitle,
          { 
            fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16,
            color: theme.colors.textSecondary,
          }
        ]}>
          خصّص تجربتك مع التطبيق
        </Text>
      </View>

      <View style={[
        styles.section,
        { marginBottom: isTablet ? 30 : 20 }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { 
            fontSize: isTablet ? 24 : isSmallScreen ? 16 : 18,
            paddingHorizontal: isTablet ? 30 : 20,
            color: theme.colors.text,
          }
        ]}>
          التفضيلات
        </Text>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.surface }]}>
          {settingsItems.map(renderSettingItem)}
        </View>
      </View>

      <View style={[
        styles.section,
        { marginBottom: isTablet ? 30 : 20 }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { 
            fontSize: isTablet ? 24 : isSmallScreen ? 16 : 18,
            paddingHorizontal: isTablet ? 30 : 20,
            color: theme.colors.text,
          }
        ]}>
          معلومات
        </Text>
        <View style={[styles.sectionContent, { backgroundColor: theme.colors.surface }]}>
          {infoItems.map(renderSettingItem)}
        </View>
      </View>

      <View style={[
        styles.footer,
        { padding: isTablet ? 50 : 30 }
      ]}>
        <Text style={[
          styles.footerText,
          { 
            fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16,
            color: theme.colors.textSecondary,
          }
        ]}>
          "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
        </Text>
        <Text style={[
          styles.footerSubtext,
          { 
            fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14,
            color: theme.colors.textTertiary,
          }
        ]}>
          تطبيق الأذكار - نسخة 1.0.0
        </Text>
        <Text style={[
          styles.developerCredit,
          { 
            fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12,
            color: theme.colors.primary,
          }
        ]}>
          تطوير: زهير حسون
        </Text>
        <Text style={[
          styles.charityNote,
          { 
            fontSize: isTablet ? 14 : isSmallScreen ? 8 : 10,
            color: theme.colors.secondary,
          }
        ]}>
          صدقة جارية لأرواح أجدادي الكرام وآل حسون وجميع المسلمين والمسلمات - رحمهم الله
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
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'right',
  },
  sectionContent: {
    backgroundColor: 'white',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  settingSubtitle: {
    color: '#666',
    textAlign: 'right',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  footerSubtext: {
    color: '#999',
  },
  developerCredit: {
    color: '#1e3a8a',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  charityNote: {
    color: '#059669',
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default SettingsScreen; 