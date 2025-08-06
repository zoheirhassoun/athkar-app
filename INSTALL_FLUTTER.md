# 🚀 Quick Flutter Installation Guide

## ⚡ **FASTEST METHOD - Direct Download**

### **Step 1: Download Flutter**
1. Go to: https://docs.flutter.dev/get-started/install/windows
2. Click "Download Flutter SDK"
3. Download the ZIP file (approximately 1GB)

### **Step 2: Extract and Setup**
1. Extract the ZIP to `C:\flutter` (or any folder you prefer)
2. Add Flutter to your PATH:
   - Open "Environment Variables" in Windows Settings
   - Add `C:\flutter\bin` to your PATH variable
   - Or run this command in PowerShell as Administrator:
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\flutter\bin", "Machine")
   ```

### **Step 3: Verify Installation**
Open a NEW PowerShell window and run:
```powershell
flutter doctor
```

### **Step 4: Accept Android Licenses (if needed)**
```powershell
flutter doctor --android-licenses
```

## 🔄 **Alternative: Using Git**
If you have Git installed:
```powershell
git clone https://github.com/flutter/flutter.git C:\flutter
C:\flutter\bin\flutter doctor
```

## 🏃‍♂️ **Quick Setup for This Project**
Once Flutter is installed:
```powershell
cd "D:\Zoheir\Apps\Athkar App"
flutter pub get
flutter run
```

## ⚡ **Super Quick Test**
To test without installation, you can run on web:
```powershell
flutter run -d web
```

## 🆘 **If You Have Issues**
1. Restart PowerShell after adding to PATH
2. Run as Administrator if needed
3. Check antivirus isn't blocking Flutter
4. Use Flutter's official installer: https://flutter.dev/docs/get-started/install

---
**Estimated time: 5-10 minutes**