# دليل بناء تطبيق الأذكار - Flutter

## 📋 متطلبات النظام

### الأساسية
- **Flutter SDK**: الإصدار 3.0.0 أو أحدث
- **Dart SDK**: يأتي مع Flutter
- **Git**: لإدارة الإصدارات

### للتطوير على Android
- **Android Studio**: مع Android SDK
- **Java Development Kit (JDK)**: الإصدار 8 أو أحدث
- **Android SDK**: API Level 21 أو أحدث (Android 5.0)

### للتطوير على iOS (Mac فقط)
- **Xcode**: الإصدار 12.0 أو أحدث
- **iOS SDK**: iOS 11.0 أو أحدث
- **CocoaPods**: لإدارة تبعيات iOS

## 🚀 إعداد البيئة

### 1. تثبيت Flutter

#### Windows
```powershell
# تحميل Flutter SDK
# استخرج الملف إلى C:\flutter
# أضف C:\flutter\bin إلى متغير PATH

# التحقق من التثبيت
flutter doctor
```

#### macOS
```bash
# باستخدام Homebrew
brew install flutter

# أو تحميل مباشر
curl -O https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.x.x-stable.zip
```

#### Linux
```bash
# تحميل وتثبيت Flutter
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.x.x-stable.tar.xz
tar xf flutter_linux_3.x.x-stable.tar.xz
export PATH="$PATH:`pwd`/flutter/bin"
```

### 2. التحقق من الإعداد
```bash
flutter doctor
```

### 3. إعداد المحررات
```bash
# لـ VS Code
flutter config --enable-web

# لـ Android Studio
# تثبيت Flutter و Dart plugins
```

## 📦 إعداد المشروع

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd athkar-app
```

### 2. تثبيت التبعيات
```bash
flutter pub get
```

### 3. إنشاء ملفات الإعداد المحلية

#### Android
إنشاء `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk
flutter.sdk=C:\\flutter
flutter.buildMode=release
flutter.versionName=1.0.0
flutter.versionCode=1
```

#### iOS (إذا كنت تطور على Mac)
```bash
cd ios
pod install
```

## 🏗️ بناء التطبيق

### للتطوير والاختبار

#### تشغيل في وضع Debug
```bash
# Android
flutter run

# iOS (Mac فقط)
flutter run -d ios

# الويب
flutter run -d web
```

#### Hot Reload أثناء التطوير
```bash
# بعد تشغيل flutter run، اضغط:
r    # للـ hot reload
R    # للـ hot restart
q    # للخروج
```

### للإنتاج

#### بناء APK للأندرويد
```bash
# APK واحد لجميع المعماريات (حجم أكبر)
flutter build apk --release

# APK منفصل لكل معمارية (حجم أصغر، موصى به)
flutter build apk --split-per-abi --release

# الملفات ستكون في:
# build/app/outputs/flutter-apk/
```

#### بناء App Bundle للأندرويد (للنشر على Google Play)
```bash
flutter build appbundle --release

# الملف سيكون في:
# build/app/outputs/bundle/release/app-release.aab
```

#### بناء للـ iOS (Mac فقط)
```bash
flutter build ios --release

# للتصدير إلى IPA
flutter build ipa --release
```

## 📱 إعداد التوقيع للإنتاج

### Android

#### 1. إنشاء keystore
```bash
keytool -genkey -v -keystore ~/athkar-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias athkar
```

#### 2. إعداد gradle
إنشاء `android/key.properties`:
```properties
storePassword=كلمة_مرور_المتجر
keyPassword=كلمة_مرور_المفتاح
keyAlias=athkar
storeFile=C:\\Users\\YourName\\athkar-keystore.jks
```

#### 3. تحديث build.gradle
في `android/app/build.gradle`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### iOS

#### 1. إعداد في Xcode
```bash
# فتح المشروع في Xcode
open ios/Runner.xcworkspace

# إعداد Team والـ Bundle Identifier
# في Project Navigator > Runner > Signing & Capabilities
```

## 🔧 حل المشاكل الشائعة

### مشاكل Android

#### خطأ في Gradle
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

#### مشاكل SDK
```bash
flutter doctor --android-licenses
```

### مشاكل iOS

#### مشاكل CocoaPods
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
```

#### مشاكل الشهادات
```bash
# تنظيف وإعادة بناء
flutter clean
cd ios
xcodebuild clean
cd ..
flutter build ios
```

### مشاكل عامة

#### تنظيف شامل
```bash
flutter clean
flutter pub get
flutter doctor
```

#### إعادة تعيين Flutter
```bash
flutter upgrade
flutter doctor
```

## 📊 تحسين الأداء

### تقليل حجم التطبيق
```bash
# استخدام obfuscation
flutter build apk --obfuscate --split-debug-info=build/debug-info

# إزالة الرموز غير المستخدمة
flutter build apk --tree-shake-icons
```

### تحليل الحجم
```bash
flutter build apk --analyze-size
```

## 🚀 النشر

### Google Play Store
1. بناء App Bundle: `flutter build appbundle --release`
2. رفع الملف على Google Play Console
3. ملء معلومات التطبيق
4. مراجعة ونشر

### Apple App Store
1. بناء IPA: `flutter build ipa --release`
2. رفع عبر Xcode أو Application Loader
3. إعداد App Store Connect
4. إرسال للمراجعة

## ⚙️ إعدادات إضافية

### تفعيل الويب
```bash
flutter config --enable-web
flutter create --platforms web .
```

### إضافة منصات جديدة
```bash
flutter create --platforms=windows,macos,linux .
```

## 📚 موارد إضافية

- [Flutter Documentation](https://docs.flutter.dev/)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Cookbook](https://docs.flutter.dev/cookbook)
- [Flutter YouTube Channel](https://www.youtube.com/c/flutterdev)

---

💡 **نصيحة**: احتفظ بنسخة احتياطية من keystore وكلمات المرور في مكان آمن!