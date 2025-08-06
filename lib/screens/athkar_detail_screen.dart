import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/athkar_item.dart';
import 'istighfar_counter_screen.dart';

class AthkarDetailScreen extends StatefulWidget {
  final AthkarCategory category;

  const AthkarDetailScreen({
    super.key,
    required this.category,
  });

  @override
  State<AthkarDetailScreen> createState() => _AthkarDetailScreenState();
}

class _AthkarDetailScreenState extends State<AthkarDetailScreen>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  
  int _currentIndex = 0;
  List<int> _counters = [];
  bool _showReward = true;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    
    // Initialize counters
    _counters = widget.category.items.map((item) => item.count).toList();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  Color _getColorFromHex(String hex) {
    final buffer = StringBuffer();
    if (hex.length == 6 || hex.length == 7) buffer.write('ff');
    buffer.write(hex.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }

  void _onTap() {
    if (_counters[_currentIndex] > 0) {
      // Haptic feedback
      HapticFeedback.lightImpact();
      
      // Animation
      _animationController.forward().then((_) {
        _animationController.reverse();
      });
      
      setState(() {
        _counters[_currentIndex]--;
      });
      
      // Auto advance to next when counter reaches 0
      if (_counters[_currentIndex] == 0) {
        Future.delayed(const Duration(milliseconds: 500), () {
          if (_currentIndex < widget.category.items.length - 1) {
            _nextItem();
          } else {
            _showCompletionDialog();
          }
        });
      }
    }
  }

  void _nextItem() {
    if (_currentIndex < widget.category.items.length - 1) {
      setState(() {
        _currentIndex++;
        _showReward = true;
      });
      _pageController.animateToPage(
        _currentIndex,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _previousItem() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
        _showReward = true;
      });
      _pageController.animateToPage(
        _currentIndex,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _resetCurrentCounter() {
    setState(() {
      _counters[_currentIndex] = widget.category.items[_currentIndex].count;
    });
  }

  void _resetAllCounters() {
    setState(() {
      _counters = widget.category.items.map((item) => item.count).toList();
      _currentIndex = 0;
      _showReward = true;
    });
    _pageController.animateToPage(
      0,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _showCompletionDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        title: Row(
          children: [
            Icon(
              Icons.check_circle,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(width: 8),
            const Text('تم الانتهاء'),
          ],
        ),
        content: const Text(
          'بارك الله فيك! لقد أتممت جميع أذكار هذه الفئة.',
          textAlign: TextAlign.center,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pop();
            },
            child: const Text('العودة'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              _resetAllCounters();
            },
            child: const Text('إعادة التكرار'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // إذا كانت فئة الاستغفار، انتقل إلى الحاسبة المخصصة
    if (widget.category.id == 'istighfar') {
      return const IstighfarCounterScreen();
    }

    final theme = Theme.of(context);
    final screenSize = MediaQuery.of(context).size;
    final isTablet = screenSize.width > 768;
    final categoryColor = _getColorFromHex(widget.category.color);
    
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.category.title),
        centerTitle: true,
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              switch (value) {
                case 'reset_current':
                  _resetCurrentCounter();
                  break;
                case 'reset_all':
                  _resetAllCounters();
                  break;
                case 'toggle_reward':
                  setState(() {
                    _showReward = !_showReward;
                  });
                  break;
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'reset_current',
                child: Row(
                  children: [
                    Icon(Icons.refresh),
                    SizedBox(width: 8),
                    Text('إعادة تعيين الحالي'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'reset_all',
                child: Row(
                  children: [
                    Icon(Icons.restart_alt),
                    SizedBox(width: 8),
                    Text('إعادة تعيين الكل'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'toggle_reward',
                child: Row(
                  children: [
                    Icon(Icons.info),
                    SizedBox(width: 8),
                    Text('إظهار/إخفاء الفضل والثواب'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          // Progress indicator
          Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'الذكر ${_currentIndex + 1} من ${widget.category.items.length}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.7),
                      ),
                    ),
                    Text(
                      'المجموع: ${_counters.reduce((a, b) => a + b)}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: categoryColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: (_currentIndex + 1) / widget.category.items.length,
                  backgroundColor: categoryColor.withOpacity(0.2),
                  valueColor: AlwaysStoppedAnimation<Color>(categoryColor),
                ),
              ],
            ),
          ),
          
          // Main content
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  _currentIndex = index;
                  _showReward = true;
                });
              },
              itemCount: widget.category.items.length,
              itemBuilder: (context, index) {
                final item = widget.category.items[index];
                final counter = _counters[index];
                final isCompleted = counter == 0;
                
                return SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      // Counter Card
                      GestureDetector(
                        onTap: _onTap,
                        child: AnimatedBuilder(
                          animation: _scaleAnimation,
                          builder: (context, child) {
                            return Transform.scale(
                              scale: _currentIndex == index ? _scaleAnimation.value : 1.0,
                              child: Container(
                                width: double.infinity,
                                margin: const EdgeInsets.only(bottom: 24),
                                padding: EdgeInsets.all(isTablet ? 32 : 24),
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: isCompleted
                                        ? [Colors.green.shade400, Colors.green.shade600]
                                        : [categoryColor, categoryColor.withOpacity(0.8)],
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                  ),
                                  borderRadius: BorderRadius.circular(20),
                                  boxShadow: [
                                    BoxShadow(
                                      color: (isCompleted ? Colors.green : categoryColor).withOpacity(0.3),
                                      blurRadius: 15,
                                      offset: const Offset(0, 8),
                                    ),
                                  ],
                                ),
                                child: Column(
                                  children: [
                                    Icon(
                                      isCompleted ? Icons.check_circle : Icons.touch_app,
                                      size: isTablet ? 48 : 40,
                                      color: Colors.white,
                                    ),
                                    const SizedBox(height: 16),
                                    Text(
                                      '$counter',
                                      style: theme.textTheme.displayLarge?.copyWith(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: isTablet ? 72 : 60,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      isCompleted ? 'مكتمل' : 'اضغط للعد',
                                      style: theme.textTheme.titleMedium?.copyWith(
                                        color: Colors.white.withOpacity(0.9),
                                        fontSize: isTablet ? 18 : 16,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      
                      // Text Card
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(isTablet ? 28 : 24),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _buildFormattedText(
                              item.text,
                              theme,
                              isTablet,
                            ),
                            if (item.reference != null) ...[
                              const SizedBox(height: 16),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: categoryColor.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: categoryColor.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      Icons.menu_book,
                                      size: 16,
                                      color: categoryColor,
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        item.reference!,
                                        style: theme.textTheme.bodySmall?.copyWith(
                                          color: categoryColor,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                            if (item.reward != null && _showReward) ...[
                              const SizedBox(height: 16),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.amber.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: Colors.amber.withOpacity(0.3),
                                    width: 1,
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Icon(
                                          Icons.star,
                                          size: 16,
                                          color: Colors.amber.shade600,
                                        ),
                                        const SizedBox(width: 8),
                                        Text(
                                          'الفضل والثواب:',
                                          style: theme.textTheme.bodySmall?.copyWith(
                                            color: Colors.amber.shade600,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      item.reward!,
                                      style: theme.textTheme.bodySmall?.copyWith(
                                        color: Colors.amber.shade700,
                                        height: 1.5,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          
          // Navigation buttons
          Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _currentIndex > 0 ? _previousItem : null,
                    icon: const Icon(Icons.arrow_back),
                    label: const Text('السابق'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: theme.colorScheme.secondary,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _currentIndex < widget.category.items.length - 1
                        ? _nextItem
                        : null,
                    icon: const Icon(Icons.arrow_forward),
                    label: const Text('التالي'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: categoryColor,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFormattedText(String text, ThemeData theme, bool isTablet) {
    // التحقق من وجود الاستعاذة في النص
    if (text.contains('"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"')) {
      final parts = text.split('\n\n');
      if (parts.length >= 2) {
        return Column(
          children: [
            // الاستعاذة بلون مختلف
            Text(
              parts[0].replaceAll('"', ''), // إزالة علامات التنصيص
              style: theme.textTheme.titleMedium?.copyWith(
                fontSize: isTablet ? 20 : 16,
                height: 1.6,
                fontWeight: FontWeight.w400,
                color: Colors.orange.shade700,
                fontStyle: FontStyle.italic,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            // آية الكرسي بالتنسيق العادي
            Text(
              parts.sublist(1).join('\n\n'),
              style: theme.textTheme.titleLarge?.copyWith(
                fontSize: isTablet ? 24 : 20,
                height: 1.8,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        );
      }
    }
    
    // التحقق من وجود البسملة في النص (المعوذات)
    if (text.contains('"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"')) {
      final parts = text.split('\n\n');
      if (parts.length >= 2) {
        return Column(
          children: [
            // البسملة بلون مختلف
            Text(
              parts[0].replaceAll('"', ''), // إزالة علامات التنصيص
              style: theme.textTheme.titleMedium?.copyWith(
                fontSize: isTablet ? 20 : 16,
                height: 1.6,
                fontWeight: FontWeight.w600,
                color: Colors.blue.shade700,
                fontStyle: FontStyle.italic,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            // نص السورة بالتنسيق العادي
            Text(
              parts.sublist(1).join('\n\n'),
              style: theme.textTheme.titleLarge?.copyWith(
                fontSize: isTablet ? 24 : 20,
                height: 1.8,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        );
      }
    }
    
    // إذا لم تحتوي على الاستعاذة أو البسملة، عرض النص العادي
    return Text(
      text,
      style: theme.textTheme.titleLarge?.copyWith(
        fontSize: isTablet ? 24 : 20,
        height: 1.8,
        fontWeight: FontWeight.w500,
      ),
      textAlign: TextAlign.center,
    );
  }
}