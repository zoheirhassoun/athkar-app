# تطبيق الأذكار

> رفيقك اليومي للأذكار والتسبيح مع عداد تفاعلي أنيق

## 📱 حول التطبيق

تطبيق الأذكار هو تطبيق Flutter مصمم لمساعدة المسلمين في أداء الأذكار اليومية مع عداد تفاعلي أنيق. التطبيق مبني بلغة Dart ومتاح لنظامي Android و iOS.

### ✨ المميزات

- **واجهة سهلة الاستخدام**: تصميم عصري ومتجاوب
- **عدة فئات للأذكار**: أذكار الصباح، المساء، النوم، الاستيقاظ، وأذكار عامة
- **عداد تفاعلي**: عدّ الأذكار بلمسة واحدة مع تأثيرات بصرية
- **الوضع المظلم**: إمكانية التبديل بين الوضع الفاتح والمظلم
- **حفظ التقدم**: يحفظ التطبيق تقدمك في العد
- **دعم اللغة العربية**: مصمم خصيصاً للمحتوى العربي
- **استشهادات**: عرض المصادر والفضل لكل ذكر

## 🚀 البدء السريع

### متطلبات النظام

- Flutter SDK (الإصدار 3.0.0 أو أحدث)
- Dart SDK
- Android Studio أو VS Code
- للتطوير على Android: Android SDK
- للتطوير على iOS: Xcode (Mac فقط)

### التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/your-username/athkar-app.git
   cd athkar-app
   ```

2. **تثبيت التبعيات**
   ```bash
   flutter pub get
   ```

3. **تشغيل التطبيق**
   ```bash
   # للتشغيل على Android
   flutter run

   # للتشغيل على iOS (Mac فقط)
   flutter run -d ios

   # للتشغيل على الويب
   flutter run -d web
   ```

## 🏗️ بناء التطبيق للإنتاج

### بناء ملف APK للأندرويد

```bash
# بناء APK للإصدار
flutter build apk --release

# بناء APK مقسم حسب المعمارية (حجم أصغر)
flutter build apk --split-per-abi
```

### بناء App Bundle للأندرويد

```bash
flutter build appbundle --release
```

### بناء التطبيق لـ iOS

```bash
flutter build ios --release
```

## 📁 هيكل المشروع

```
lib/
├── main.dart                 # نقطة البداية
├── models/                   # نماذج البيانات
│   └── athkar_item.dart
├── providers/                # إدارة الحالة
│   └── theme_provider.dart
├── screens/                  # الشاشات
│   ├── home_screen.dart
│   ├── athkar_screen.dart
│   ├── athkar_detail_screen.dart
│   └── settings_screen.dart
├── utils/                    # المساعدات والأدوات
│   └── athkar_data.dart
└── widgets/                  # المكونات القابلة لإعادة الاستخدام
```

## 🎨 التخصيص

### إضافة أذكار جديدة

لإضافة أذكار جديدة، عدّل ملف `lib/utils/athkar_data.dart`:

```dart
AthkarCategory(
  id: 'new_category',
  title: 'عنوان الفئة الجديدة',
  subtitle: 'وصف الفئة',
  icon: 'star',
  color: '#FF6B35',
  items: [
    AthkarItem(
      text: 'نص الذكر',
      count: 10,
      reward: 'الفضل والثواب',
      reference: 'المصدر',
    ),
  ],
),
```

### تغيير الألوان والثيم

عدّل ملف `lib/providers/theme_provider.dart` لتخصيص الألوان والثيم.

## 📱 لقطات الشاشة

*(يمكن إضافة لقطات الشاشة هنا)*

## 🤝 المساهمة

نرحب بالمساهمات! إذا كنت تريد المساهمة:

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الـ branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للجميع للاستخدام والتطوير.

## 🙏 صدقة جارية

هذا التطبيق صدقة جارية مُهداة لأرواح أجدادي الكرام وآل حسون وجميع المسلمين والمسلمات:

- حسين أحمد حسون
- سعاد عمر أحمد  
- عوض عبدالحميد عديل
- بتول أحمد حسون

رحمهم الله جميعاً وجعل هذا العمل في ميزان حسناتهم.

> *"إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له"*

---

**طُوّر بـ ❤️ بواسطة زهير حسون**