import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// مزوّد الإعدادات العامة (حجم الخط، إظهار الفضل والثواب)
class SettingsProvider extends ChangeNotifier {
  static const String _fontScaleKey = 'fontScale';
  static const String _showRewardKey = 'showReward';

  // حدود حجم الخط
  static const double minFontScale = 0.8;
  static const double maxFontScale = 1.6;
  static const double fontScaleStep = 0.1;

  double _fontScale = 1.0;
  bool _showReward = true;

  double get fontScale => _fontScale;
  bool get showReward => _showReward;

  SettingsProvider() {
    _load();
  }

  Future<void> _load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _fontScale = prefs.getDouble(_fontScaleKey) ?? 1.0;
      _showReward = prefs.getBool(_showRewardKey) ?? true;
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading settings: $e');
    }
  }

  Future<void> setFontScale(double value) async {
    _fontScale = value.clamp(minFontScale, maxFontScale);
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setDouble(_fontScaleKey, _fontScale);
    } catch (e) {
      debugPrint('Error saving font scale: $e');
    }
  }

  void increaseFont() => setFontScale(_fontScale + fontScaleStep);
  void decreaseFont() => setFontScale(_fontScale - fontScaleStep);

  Future<void> toggleShowReward() async {
    _showReward = !_showReward;
    notifyListeners();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_showRewardKey, _showReward);
    } catch (e) {
      debugPrint('Error saving showReward: $e');
    }
  }
}
