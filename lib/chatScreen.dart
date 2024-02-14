import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:talktune/context-manager.dart';
import 'package:talktune/models/message.dart';
import 'package:talktune/networking/openai-service.dart';
// ignore: depend_on_referenced_packages
import 'package:path_provider/path_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<Map<String, dynamic>> messages = [];
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  // final String openAIServiceSk = dotenv.env['CHAT_API_SK']!;
  final openAIService = OpenAIService(
      dotenv.env['CHAT_API_SK']!); // TODO: Fetch it from environment variables
  var contextManager = ContextManager(contextWindowSize: 100);

  Future<String> readPersonalityProfile() async {
    final String filePath =
        'assets/agents/julie.txt'; // Path to your text file within your assets
    try {
      final String contents = await rootBundle.loadString(filePath);
      return contents;
    } catch (e) {
      throw Exception('Failed to load file: $e');
    }
  }

  @override
  void initState() {
    super.initState();
    asyncInitState();
  }

  Future<void> asyncInitState() async {
    try {
      String personalitySetupPrompt = await readPersonalityProfile();
      print('Agent Personality');
      print(personalitySetupPrompt);
      setState(() {
        contextManager.pushMessage("user", personalitySetupPrompt);
        messages = convertMessagesForDisplay();
      });
    } catch (e) {
      print(e); // You may want to handle this error differently
    }
  }

  List<Map<String, dynamic>> convertMessagesForDisplay() {
    return contextManager.getMessages().map((message) {
      return {
        'isAgent': message.role == 'system',
        'text': message.content,
      };
    }).toList();
  }

  Future<void> startChat() async {
    // sendMessage(
    //     "Ohh really? I feel like I should definetely give it a try. You sound very convincing. I'm Navdeep by the way.");
  }

  Future<void> sendMessage(String message) async {
    setState(() {
      contextManager.pushMessage('user', message);
      messages = convertMessagesForDisplay();
    });
    List<Map<String, dynamic>> messagesFromContext =
        contextManager.messagesToJson();

    String response = await openAIService.getChatResponse(messagesFromContext);
    print('Printing response from OpenAI chat API');
    print(response);

    setState(() {
      contextManager.pushMessage('system', response);
      messages = convertMessagesForDisplay();
      Future.delayed(Duration(milliseconds: 100), () {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      });
    });
  }

  void stopChat() {
    // TODO: End conversation
    messages = [];
  }

  bool isChatActive = false;
  bool isAgentSpeaking = false;

  @override
  Widget build(BuildContext context) {
    // Define the colors
    final Color bottomBarColor = Theme.of(context).colorScheme.inversePrimary;
    const Color chatBodyColor = Colors.white;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chat'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Column(
        children: [
          Expanded(
              child:
                  ChatBody(controller: _scrollController, messages: messages)),
          Padding(
            padding: const EdgeInsets.all(35.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: 'Type a message',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  iconSize: 35.0,
                  onPressed: () {
                    sendMessage(_messageController.text);
                    _messageController.clear();
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ChatBody extends StatefulWidget {
  final List<Map<String, dynamic>> messages;
  final ScrollController controller;
  const ChatBody({super.key, required this.messages, required this.controller});

  @override
  _ChatBodyState createState() => _ChatBodyState();
}

class _ChatBodyState extends State<ChatBody> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: widget.controller,
      itemCount: widget.messages.length,
      itemBuilder: (context, index) {
        bool isAgent = widget.messages[index]['isAgent'];
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
          child: Row(
            mainAxisAlignment:
                isAgent ? MainAxisAlignment.start : MainAxisAlignment.end,
            children: [
              Flexible(
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                  margin: isAgent
                      ? const EdgeInsets.only(right: 60)
                      : const EdgeInsets.only(left: 60),
                  decoration: BoxDecoration(
                    color: isAgent
                        ? Colors.grey.shade200
                        : Theme.of(context).colorScheme.primary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    widget.messages[index]['text'],
                    style: TextStyle(
                      color: isAgent ? Colors.black : Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
