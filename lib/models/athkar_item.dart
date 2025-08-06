class AthkarItem {
  final String text;
  final int count;
  final String? reward;
  final String? reference;

  const AthkarItem({
    required this.text,
    required this.count,
    this.reward,
    this.reference,
  });

  factory AthkarItem.fromJson(Map<String, dynamic> json) {
    return AthkarItem(
      text: json['text'] as String,
      count: json['count'] as int,
      reward: json['reward'] as String?,
      reference: json['reference'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'text': text,
      'count': count,
      'reward': reward,
      'reference': reference,
    };
  }
}

class AthkarCategory {
  final String id;
  final String title;
  final String subtitle;
  final String icon;
  final String color;
  final List<AthkarItem> items;

  const AthkarCategory({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.items,
  });

  factory AthkarCategory.fromJson(Map<String, dynamic> json) {
    return AthkarCategory(
      id: json['id'] as String,
      title: json['title'] as String,
      subtitle: json['subtitle'] as String,
      icon: json['icon'] as String,
      color: json['color'] as String,
      items: (json['items'] as List<dynamic>?)
              ?.map((item) => AthkarItem.fromJson(item as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'icon': icon,
      'color': color,
      'items': items.map((item) => item.toJson()).toList(),
    };
  }
}