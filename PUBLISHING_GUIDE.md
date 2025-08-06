# 📱 دليل نشر تطبيق الأذكار

## 🎯 الطرق المتاحة للنشر

### 1️⃣ **Expo Go (للاختبار السريع)**
```bash
npx expo publish
```
- ✅ مجاني
- ✅ لا يحتاج موافقة المتاجر  
- ✅ تحديثات فورية
- ❌ يحتاج تطبيق Expo Go

### 2️⃣ **EAS Build (للمتاجر)**
```bash
# تسجيل الدخول
eas login

# إنشاء build
eas build --platform android
eas build --platform ios

# النشر
eas submit --platform android
eas submit --platform ios
```

## 🎨 الأصول المطلوبة قبل النشر

### الأيقونات المطلوبة:
1. **icon.png** - 1024x1024 (أيقونة التطبيق)
2. **adaptive-icon.png** - 1024x1024 (أندرويد)
3. **splash.png** - 1284x2778 (شاشة البداية)
4. **favicon.png** - 48x48 (للويب)

### أدوات إنشاء الأيقونات:
- [Canva](https://canva.com) - مجاني
- [AppIcon.co](https://appicon.co) - مولد أيقونات
- [MakeAppIcon](https://makeappicon.com) - شامل

## 💰 التكاليف

### Google Play Store:
- **رسوم التسجيل:** $25 (مرة واحدة)
- **النشر:** مجاني
- **المراجعة:** 1-3 أيام

### Apple App Store:
- **رسوم سنوية:** $99
- **النشر:** مجاني  
- **المراجعة:** 1-7 أيام

## 📋 متطلبات النشر

### Android (Google Play):
1. حساب Google Play Console
2. دفع رسوم $25
3. ملء معلومات التطبيق
4. سياسة الخصوصية
5. وصف وصور التطبيق

### iOS (App Store):
1. حساب Apple Developer ($99/سنة)
2. جهاز Mac (للتطوير)
3. Xcode
4. ملء معلومات App Store Connect

## 🚀 الخطوات العملية

### 1. التحضير:
```bash
# تثبيت EAS CLI
npm install -g eas-cli

# تسجيل الدخول
eas login
```

### 2. إنشاء Build:
```bash
# أندرويد فقط
eas build --platform android

# iOS فقط  
eas build --platform ios

# كلاهما
eas build --platform all
```

### 3. اختبار Build:
```bash
# إنشاء APK للاختبار
eas build --platform android --profile preview
```

### 4. النشر:
```bash
# رفع لـ Google Play
eas submit --platform android

# رفع لـ App Store
eas submit --platform ios
```

## 📝 نصائح مهمة

### للأندرويد:
- استخدم **Android App Bundle (AAB)** بدلاً من APK
- فعّل **Play App Signing**
- أضف **وصف جذاب** باللغة العربية
- استخدم **صور عالية الجودة**

### لـ iOS:
- تأكد من **guidelines** شركة آبل
- اختبر على **أجهزة حقيقية**
- أضف **App Store screenshots**
- راجع **App Review Guidelines**

## 🔄 البدائل المجانية

### 1. F-Droid (أندرويد):
- متجر مفتوح المصدر
- مجاني 100%
- للتطبيقات المفتوحة

### 2. GitHub Releases:
- توزيع APK مباشر
- مجاني
- للمطورين التقنيين

### 3. Firebase App Distribution:
- للاختبار المحدود
- مجاني
- سهل الاستخدام

## 📞 الدعم والمساعدة
- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **EAS Build**: [docs.expo.dev/build](https://docs.expo.dev/build)
- **مجتمع Expo**: [forums.expo.dev](https://forums.expo.dev)

---

**"أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"**

💡 **نصيحة:** ابدأ بـ Expo Go للاختبار، ثم انتقل لـ EAS Build للنشر الرسمي.