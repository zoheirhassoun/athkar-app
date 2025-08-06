@echo off
echo =========================================
echo   Flutter Athkar App - Quick Launcher
echo =========================================
echo.

REM Add Flutter to PATH for this session
set PATH=%PATH%;C:\Users\Zoheir\flutter\bin

echo Checking Flutter...
flutter --version
if %errorlevel% neq 0 (
    echo ERROR: Flutter not found
    echo Please make sure Flutter is installed at C:\Users\Zoheir\flutter\
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
flutter pub get

echo.
echo Available devices:
flutter devices

echo.
echo Choose how to run the app:
echo 1. Chrome (Web Browser)
echo 2. Edge (Web Browser) 
echo 3. Check for Android devices
echo 4. Build APK for Android
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting app in Chrome...
    echo App will open at: http://localhost:8080
    echo Press Ctrl+C in this window to stop the app
    flutter run -d chrome --web-port=8080
) else if "%choice%"=="2" (
    echo.
    echo Starting app in Edge...
    echo App will open at: http://localhost:8080
    echo Press Ctrl+C in this window to stop the app
    flutter run -d edge --web-port=8080
) else if "%choice%"=="3" (
    echo.
    echo Checking for Android devices...
    flutter emulators
    echo.
    echo If you see devices above, run: flutter run
    echo If no devices, you can:
    echo - Connect Android phone with USB debugging
    echo - Start Android emulator from Android Studio
    pause
) else if "%choice%"=="4" (
    echo.
    echo Building APK for Android...
    flutter build apk --release
    echo.
    echo APK built successfully!
    echo Location: build\app\outputs\flutter-apk\app-release.apk
    pause
) else (
    echo Invalid choice. Running in Chrome by default...
    flutter run -d chrome --web-port=8080
)

echo.
echo App session ended.
pause