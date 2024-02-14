import 'dart:convert';

import 'package:talktune/models/message.dart';

class ContextManager {
  // Cache to store messages
  List<Message> _messageCache = [];

  // Size of the context window
  late int _contextWindowSize;

  // Total messages processed
  int _totalMessagesProcessed = 0;

  // Constructor to set the default context window size
  ContextManager({int contextWindowSize = 5}) {
    _contextWindowSize = contextWindowSize;
  }

  // Method to push a new message into the cache
  void pushMessage(String role, String content) {
    var message = Message(role: role, content: content);
    _messageCache.add(message);
    _totalMessagesProcessed++;

    // Ensure cache does not exceed the context window size
    if (_messageCache.length > _contextWindowSize) {
      _messageCache.removeAt(0); // Remove the oldest message
      // TODO: Ansynchrously push the message to the database
    }
  }

  // Method to get all messages in the cache
  List<Message> getMessages() {
    return List<Message>.from(_messageCache);
  }

  // Method to serialize messages to JSON
  List<Map<String, dynamic>> messagesToJson() {
    return _messageCache.map((message) => message.toJson()).toList();
  }

  // Method to configure the context window size
  void setContextWindowSize(int size) {
    _contextWindowSize = size;
  }

  // Method to get the number of total messages processed
  int getTotalMessagesProcessed() {
    return _totalMessagesProcessed;
  }
}
