#!/bin/bash

echo "========================================="
echo "  Flutter Athkar App - Setup Script"
echo "========================================="
echo

echo "Checking Flutter installation..."
if ! command -v flutter &> /dev/null; then
    echo
    echo "ERROR: Flutter is not installed or not in PATH"
    echo "Please install Flutter SDK from: https://flutter.dev/docs/get-started/install"
    echo
    exit 1
fi

flutter doctor

echo
echo "Installing dependencies..."
flutter pub get

echo
echo "Checking for connected devices..."
flutter devices

echo
echo "Setup complete! You can now run:"
echo "  flutter run           (to run on connected device)"
echo "  flutter run -d web     (to run on web browser)"
echo "  flutter build apk      (to build APK for Android)"
echo