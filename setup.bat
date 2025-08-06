@echo off
echo =========================================
echo   Flutter Athkar App - Setup Script
echo =========================================
echo.

echo Checking Flutter installation...
flutter doctor
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Flutter is not installed or not in PATH
    echo Please install Flutter SDK from: https://flutter.dev/docs/get-started/install
    echo.
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
flutter pub get

echo.
echo Checking for connected devices...
flutter devices

echo.
echo Setup complete! You can now run:
echo   flutter run           (to run on connected device)
echo   flutter run -d web     (to run on web browser)
echo   flutter build apk      (to build APK for Android)
echo.
pause