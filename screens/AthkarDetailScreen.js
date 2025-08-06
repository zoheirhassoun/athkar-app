import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // Not needed anymore
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const AthkarDetailScreen = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;
  const isSmallScreen = width < 375;
  const { category } = route.params;
  const [athkarCounts, setAthkarCounts] = useState({});

  // إعادة ضبط العدادات عند تغيير الفئة
  useEffect(() => {
    setAthkarCounts({});
  }, [category]);

  const athkarData = {
    morning: [
      {
        text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        count: 1,
        benefit: 'من قالها حين يصبح أعتق من النار'
      },
      {
        text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        count: 1,
        benefit: 'من قالها حين يصبح كان حقاً على الله أن يرضيه يوم القيامة'
      },
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        count: 100,
        benefit: 'حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ'
      },
      {
        text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        count: 100,
        benefit: 'كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة'
      },
      {
        text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
        count: 100,
        benefit: 'من قالها غفر الله له وإن كان فر من الزحف'
      }
    ],
    evening: [
      {
        text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        count: 1,
        benefit: 'من قالها حين يمسي أعتق من النار'
      },
      {
        text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        count: 1,
        benefit: 'من قالها حين يمسي كان حقاً على الله أن يرضيه يوم القيامة'
      },
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        count: 100,
        benefit: 'حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ'
      }
    ],
    sleep: [
      {
        text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
        // translation: 'باسمك ربي وضعت جنبي، وبك أرفعه، فإن أمسكت نفسي فارحمها، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين',
        count: 1,
        benefit: 'من قالها حين ينام حفظه الله'
      },
      {
        text: 'اللَّهُمَّ إِنِّي أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
        // translation: 'اللهم إني أسلمت نفسي إليك، وفوضت أمري إليك، ووجهت وجهي إليك، وألجأت ظهري إليك، رغبة ورهبة إليك، لا ملجأ ولا منجا منك إلا إليك، آمنت بكتابك الذي أنزلت، وبنبيك الذي أرسلت',
        count: 1,
        benefit: 'من قالها ثم مات مات على الفطرة'
      },
      {
        text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
        // translation: 'اللهم قني عذابك يوم تبعث عبادك',
        count: 3,
        benefit: 'دعاء للوقاية من عذاب يوم القيامة'
      },
      {
        text: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
        // translation: 'اللهم باسمك أموت وأحيا',
        count: 1,
        benefit: 'ذكر عند النوم'
      },
      {
        text: 'سُبْحَانَ اللَّهِ',
        // translation: 'سبحان الله',
        count: 33,
        benefit: 'تسبيح قبل النوم'
      },
      {
        text: 'الْحَمْدُ لِلَّهِ',
        // translation: 'الحمد لله',
        count: 33,
        benefit: 'حمد قبل النوم'
      },
      {
        text: 'اللَّهُ أَكْبَرُ',
        // translation: 'الله أكبر',
        count: 34,
        benefit: 'تكبير قبل النوم'
      },
      {
        text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        // translation: 'أعوذ بكلمات الله التامات من شر ما خلق',
        count: 3,
        benefit: 'للحماية من الشر أثناء النوم'
      }
    ],
    wakeup: [
      {
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانِي بَعْدَ مَا أَمَاتَنِي وَإِلَيْهِ النُّشُورُ',
        // translation: 'الحمد لله الذي أحياني بعد ما أماتني وإليه النشور',
        count: 1,
        benefit: 'من قالها حين يستيقظ حمد الله'
      },
      {
        text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
        // translation: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير، سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر، ولا حول ولا قوة إلا بالله',
        count: 1,
        benefit: 'من قالها غفر له'
      }
    ],
    prayer: [
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        // translation: 'سبحان الله وبحمده',
        count: 33,
        benefit: 'تسبيح بعد الصلاة'
      },
      {
        text: 'الْحَمْدُ لِلَّهِ',
        // translation: 'الحمد لله',
        count: 33,
        benefit: 'حمد بعد الصلاة'
      },
      {
        text: 'اللَّهُ أَكْبَرُ',
        // translation: 'الله أكبر',
        count: 34,
        benefit: 'تكبير بعد الصلاة'
      }
    ],
    daily: [
      {
        text: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        // translation: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
        count: 10,
        benefit: 'ذكر يومي مبارك'
      },
      {
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        // translation: 'سبحان الله وبحمده',
        count: 100,
        benefit: 'تسبيح يومي'
      }
    ],
    protection: [
      {
        text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        // translation: 'أعوذ بكلمات الله التامات من شر ما خلق',
        count: 3,
        benefit: 'للحماية من الشر'
      },
      {
        text: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        // translation: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم',
        count: 3,
        benefit: 'للحماية والأمان'
      }
    ],
    quran: [
      {
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        // translation: 'سورة الإخلاص',
        count: 3,
        benefit: 'تعدل ثلث القرآن'
      },
      {
        text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        // translation: 'سورة الفلق',
        count: 3,
        benefit: 'للحماية من الشرور'
      },
      {
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَـٰهِ النَّاسِ * مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ',
        // translation: 'سورة الناس',
        count: 3,
        benefit: 'للحماية من الوسواس'
      }
    ]
  };

  const currentAthkar = athkarData[category] || athkarData.morning;

  const handleCount = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAthkarCounts(prev => {
      const currentCount = prev[index] || 0;
      const targetCount = currentAthkar[index].count;
      const newCount = currentCount + 1;
      
      if (newCount >= targetCount) {
        // إخفاء البطاقة عند الوصول للعدد المطلوب
        return {
          ...prev,
          [index]: targetCount // نضع العدد النهائي لإخفاء البطاقة
        };
      }
      
      return {
        ...prev,
        [index]: newCount
      };
    });
  };

  const resetCount = (index) => {
    setAthkarCounts(prev => ({
      ...prev,
      [index]: 0
    }));
  };

  const resetAll = () => {
    Alert.alert(
      'إعادة تعيين جميع الأذكار',
      'هل تريد إعادة تعيين جميع الأذكار وبدء العد من جديد؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'إعادة تعيين',
          style: 'destructive',
          onPress: () => {
            setAthkarCounts({});
            // إضافة اهتزاز خفيف لتأكيد العملية
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ],
    );
  };

  const getCategoryTitle = () => {
    const titles = {
      morning: 'أذكار الصباح',
      evening: 'أذكار المساء',
      sleep: 'أذكار النوم',
      wakeup: 'أذكار الاستيقاظ',
      prayer: 'أذكار الصلاة',
      daily: 'أذكار يومية',
      protection: 'أذكار الحفظ',
      quran: 'أذكار القرآن'
    };
    return titles[category] || 'الأذكار';
  };

  const renderAthkarItem = (item, index) => {
    const currentCount = athkarCounts[index] || 0;
    const isCompleted = currentCount >= item.count;
    
    // إخفاء البطاقة إذا اكتمل العد
    if (isCompleted) {
      return null;
    }
    
    return (
      <View key={index} style={[
        styles.athkarCard,
        {
          padding: isTablet ? 30 : 20,
          marginBottom: isTablet ? 20 : 15,
        }
      ]}>
        <View style={styles.cardHeader}>
          <Text style={[
            styles.cardNumber,
            { fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16 }
          ]}>
            {index + 1}
          </Text>
        </View>
        
        <Text style={[
          styles.athkarText,
          { 
            fontSize: isTablet ? 24 : isSmallScreen ? 16 : 18,
            lineHeight: isTablet ? 36 : isSmallScreen ? 24 : 28,
          }
        ]}>
          {item.text}
        </Text>
        
        <Text style={[
          styles.benefitText,
          { fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12 }
        ]}>
          {item.benefit}
        </Text>

        <TouchableOpacity
          style={[
            styles.countButton,
            {
              marginTop: isTablet ? 30 : 20,
              paddingVertical: isTablet ? 25 : 20,
              paddingHorizontal: isTablet ? 50 : 40,
              borderRadius: isTablet ? 50 : 40,
              backgroundColor: '#1e3a8a',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#1e3a8a',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
            }
          ]}
          onPress={() => handleCount(index)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.countButtonText,
            { fontSize: isTablet ? 32 : isSmallScreen ? 20 : 24 }
          ]}>
            {currentCount}
          </Text>
          <Text style={[
            styles.countTargetText,
            { fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14 }
          ]}>
            من {item.count}
          </Text>
        </TouchableOpacity>

        {currentCount > 0 && (
          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                marginTop: isTablet ? 15 : 10,
                paddingVertical: isTablet ? 12 : 8,
                paddingHorizontal: isTablet ? 25 : 20,
                borderRadius: isTablet ? 20 : 15,
              }
            ]}
            onPress={() => resetCount(index)}
          >
            <Text style={[
              styles.resetButtonText,
              { fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14 }
            ]}>
              إعادة تعيين
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        {
          padding: isTablet ? 30 : 20,
          paddingBottom: isTablet ? 20 : 15,
        }
      ]}>
        <Text style={[
          styles.categoryTitle,
          { fontSize: isTablet ? 28 : isSmallScreen ? 18 : 22 }
        ]}>
          {getCategoryTitle()}
        </Text>
        <Text style={[
          styles.progressText,
          { fontSize: isTablet ? 18 : isSmallScreen ? 12 : 14 }
        ]}>
          {(() => {
            const completedCount = currentAthkar.filter((_, index) => {
              const currentCount = athkarCounts[index] || 0;
              return currentCount >= currentAthkar[index].count;
            }).length;
            return `تم إكمال ${completedCount} من ${currentAthkar.length} أذكار`;
          })()}
        </Text>
        
        {Object.keys(athkarCounts).length > 0 && (
          <TouchableOpacity
            style={[
              styles.resetAllButton,
              {
                marginTop: isTablet ? 15 : 10,
                paddingVertical: isTablet ? 12 : 8,
                paddingHorizontal: isTablet ? 20 : 15,
                borderRadius: isTablet ? 20 : 15,
              }
            ]}
            onPress={resetAll}
          >
            <Text style={[
              styles.resetAllButtonText,
              { fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14 }
            ]}>
              إعادة تعيين الكل
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { padding: isTablet ? 30 : 20, paddingTop: 0 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {(() => {
          const remainingItems = currentAthkar.map((item, index) => renderAthkarItem(item, index)).filter(item => item !== null);
          
          if (remainingItems.length === 0) {
            // جميع الأذكار مكتملة
            return (
              <View style={[
                styles.completionCard,
                {
                  padding: isTablet ? 50 : 40,
                  marginTop: isTablet ? 60 : 40,
                }
              ]}>
                <Ionicons 
                  name="checkmark-circle" 
                  size={isTablet ? 120 : isSmallScreen ? 60 : 80} 
                  color="#059669" 
                />
                <Text style={[
                  styles.completionTitle,
                  { fontSize: isTablet ? 32 : isSmallScreen ? 20 : 24 }
                ]}>
                  تم إكمال جميع الأذكار
                </Text>
                <Text style={[
                  styles.completionSubtitle,
                  { fontSize: isTablet ? 20 : isSmallScreen ? 14 : 16 }
                ]}>
                  بارك الله فيك وتقبل منك
                </Text>
                <TouchableOpacity
                  style={[
                    styles.restartButton,
                    {
                      marginTop: isTablet ? 30 : 20,
                      paddingVertical: isTablet ? 15 : 12,
                      paddingHorizontal: isTablet ? 30 : 25,
                      borderRadius: isTablet ? 25 : 20,
                      marginBottom: 15,
                    }
                  ]}
                  onPress={resetAll}
                >
                  <Text style={[
                    styles.restartButtonText,
                    { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
                  ]}>
                    إعادة جميع الأذكار
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.backToListButton,
                    {
                      paddingVertical: isTablet ? 15 : 12,
                      paddingHorizontal: isTablet ? 30 : 25,
                      borderRadius: isTablet ? 25 : 20,
                    }
                  ]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={[
                    styles.backToListButtonText,
                    { fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16 }
                  ]}>
                    العودة لقائمة الأذكار
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
          
          return remainingItems;
        })()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  progressText: {
    color: '#666',
    textAlign: 'center',
  },
  resetAllButton: {
    backgroundColor: '#ef4444',
  },
  resetAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  athkarCard: {
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
    alignItems: 'center',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  cardNumber: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    textAlign: 'center',
    minWidth: 30,
  },
  athkarText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 15,
  },


  benefitText: {
    color: '#059669',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
    fontWeight: '500',
  },

  countButton: {
    // All styles are now inline for better responsive control
  },
  countButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  countTargetText: {
    color: 'white',
    opacity: 0.8,
    marginTop: 5,
  },
  resetButton: {
    backgroundColor: '#ef4444',
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  completionTitle: {
    fontWeight: 'bold',
    color: '#059669',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  completionSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  restartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backToListButton: {
    backgroundColor: '#6b7280',
    alignItems: 'center',
    shadowColor: '#6b7280',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  backToListButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AthkarDetailScreen; 