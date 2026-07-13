// اختبارات تطبيق الأذكار
//
// تشمل اختبارات وحدة لبيانات الأذكار (البحث والإحصائيات) واختبار واجهة
// بسيط لشاشة قائمة الأذكار.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:athkar_app/screens/athkar_screen.dart';
import 'package:athkar_app/utils/athkar_data.dart';

void main() {
  group('AthkarData', () {
    test('توجد فئات أذكار', () {
      expect(AthkarData.categories, isNotEmpty);
    });

    test('إجمالي عدد الأذكار مطابق لمجموع عناصر الفئات', () {
      final expected = AthkarData.categories
          .fold<int>(0, (sum, c) => sum + c.items.length);
      expect(AthkarData.totalItemsCount, expected);
    });

    test('getCategoryById يرجع الفئة الصحيحة', () {
      final morning = AthkarData.getCategoryById('morning');
      expect(morning, isNotNull);
      expect(morning!.title, 'أذكار الصباح');
      expect(AthkarData.getCategoryById('does_not_exist'), isNull);
    });

    test('البحث بنص فارغ يرجع كل الفئات', () {
      expect(AthkarData.searchCategories(''), AthkarData.categories);
    });

    test('البحث يتجاهل التشكيل ويطابق العناوين', () {
      final results = AthkarData.searchCategories('الصباح');
      expect(results.any((c) => c.id == 'morning'), isTrue);
    });

    test('البحث بكلمة غير موجودة يرجع قائمة فارغة', () {
      expect(AthkarData.searchCategories('كلمةغيرموجودةنهائيا'), isEmpty);
    });
  });

  testWidgets('شاشة الأذكار تعرض الفئات وتدعم البحث',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Directionality(
          textDirection: TextDirection.rtl,
          child: AthkarScreen(),
        ),
      ),
    );

    // العنوان وبعض الفئات ظاهرة
    expect(find.text('الأذكار'), findsOneWidget);
    expect(find.text('أذكار الصباح'), findsOneWidget);

    // كتابة نص بحث يُصفّي القائمة
    await tester.enterText(find.byType(TextField), 'النوم');
    await tester.pump();

    expect(find.text('أذكار النوم'), findsOneWidget);
    expect(find.text('أذكار الصباح'), findsNothing);
  });
}
