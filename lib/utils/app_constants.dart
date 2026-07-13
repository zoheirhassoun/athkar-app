import 'package:flutter/material.dart';

/// ثوابت التطبيق العامة (الإصدار، الألوان المشتركة).
class AppConstants {
  AppConstants._();

  /// إصدار التطبيق المعروض في الواجهة (طابقه مع pubspec.yaml).
  static const String appVersion = '1.2.0';

  // ===== ألوان العلامة (مشتركة بين الوضعين) =====

  /// أخضر زمردي هادئ — اللون الأساسي للطابع الإسلامي.
  static const Color brandGreen = Color(0xFF0E8A6B);

  /// نيلي عميق — لون ثانوي للوضع الفاتح.
  static const Color deepIndigo = Color(0xFF1E3A8A);

  /// كهرماني — لون التمييز (الفضل والثواب).
  static const Color amber = Color(0xFFF59E0B);

  // ===== لوحة الوضع الليلي =====

  /// خلفية داكنة بلمسة مخضرّة دافئة (ليست سوداء قاسية).
  static const Color darkBackground = Color(0xFF0F1714);

  /// سطح البطاقات في الوضع الليلي.
  static const Color darkSurface = Color(0xFF17211D);

  /// سطح مرتفع (شريط علوي/سفلي).
  static const Color darkElevated = Color(0xFF1E2A25);

  /// أخضر فاتح متوهّج للوضع الليلي.
  static const Color darkPrimary = Color(0xFF3DDC97);

  /// نص أساسي فاتح.
  static const Color darkOnSurface = Color(0xFFE7ECE9);

  /// نص ثانوي خافت.
  static const Color darkOnSurfaceMuted = Color(0xFF9FB0A9);
}
