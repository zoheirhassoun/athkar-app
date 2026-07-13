#!/usr/bin/env bash
# سكربت بناء تطبيق الأذكار (Flutter web) داخل بيئة Netlify.
# يثبّت Flutter ثم يبني نسخة الويب في مجلد build/web.
set -euo pipefail

FLUTTER_CHANNEL="${FLUTTER_CHANNEL:-stable}"
FLUTTER_DIR="$HOME/flutter"

echo "==> تثبيت Flutter (قناة: $FLUTTER_CHANNEL)"
if [ ! -x "$FLUTTER_DIR/bin/flutter" ]; then
  git clone https://github.com/flutter/flutter.git --depth 1 -b "$FLUTTER_CHANNEL" "$FLUTTER_DIR"
fi
export PATH="$PATH:$FLUTTER_DIR/bin"

# السماح باستخدام git داخل مجلد مملوك لمستخدم مختلف (بيئة Netlify)
git config --global --add safe.directory "$FLUTTER_DIR" || true

echo "==> إصدار Flutter"
flutter --version

echo "==> تفعيل دعم الويب وجلب الحزم"
flutter config --enable-web
flutter pub get

echo "==> بناء نسخة الويب (release)"
flutter build web --release

echo "==> اكتمل البناء: build/web"
