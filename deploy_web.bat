@echo off
echo ========================================
echo     تطبيق الأذكار - نشر على الويب
echo ========================================
echo.

REM إضافة Flutter إلى PATH
set PATH=%PATH%;C:\Users\Zoheir\flutter\bin

echo [1/4] تنظيف البناء السابق...
flutter clean

echo [2/4] تحديث التبعيات...
flutter pub get

echo [3/4] بناء التطبيق للويب...
flutter build web --release

echo [4/4] تحسين ملف HTML...
echo تم تحسين ملف الويب مسبقاً

echo.
echo ✅ التطبيق جاهز للنشر!
echo.
echo ملفات الويب في: build\web\
echo.
echo للنشر على GitHub Pages:
echo 1. git init
echo 2. git add .
echo 3. git commit -m "Initial release v1.0.0"
echo 4. git remote add origin https://github.com/zoheir/athkar-app.git
echo 5. git push -u origin main
echo 6. git subtree push --prefix build/web origin gh-pages
echo.
echo للنشر على Netlify:
echo - ارفع مجلد build\web مباشرة
echo.
pause