// Define a message structure
class Message {
  String role;
  String content;

  Message({required this.role, required this.content});

  @override
  String toString() {
    return '{"role": "$role", "content": "$content"}';
  }

  Map<String, dynamic> toJson() {
    return {
      'role': role,
      'content': content,
    };
  }
}
