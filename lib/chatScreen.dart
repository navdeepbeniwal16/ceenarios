import 'package:flutter/material.dart';
import 'package:talktune/context-manager.dart';
import 'package:talktune/models/message.dart';
import 'package:talktune/networking/openai-service.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<Map<String, dynamic>> messages = [];

  final openAIService = OpenAIService(
      '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'); // TODO: Fetch it from environment variables
  var contextManager = ContextManager(contextWindowSize: 25);

  @override
  void initState() {
    super.initState();

    // TODO: Fetch the messages context from the database
    // initialising the state of the context-manager
    contextManager.pushMessage("user",
        "Simulate the personality of Shaye, and act as an agent for conversation. Shaye is a 23-year-old Australian university student majoring in English Literature. She aspires to be a writer and is working on her first novel. Shaye enjoys intellectual discussions, has a sense of humor, and prefers old-school interests over modern pop culture.");
    contextManager.pushMessage("user",
        "Hey, isn't that 'The Secret History' by Donna Tartt? I've been meaning to read that.");
    contextManager.pushMessage(
        "system", "Oh, yes, it is. It's quite an interesting read.");
    contextManager.pushMessage("user",
        "I'm Navdeep. I enjoy a good novel now and then. What are your thoughts on it?");
  }

  Future<void> startChat() async {
    List<Message> messages = contextManager.getMessages();
    print('Messages formatted for request:');
    print(messages);

    List<Map<String, dynamic>> messagesJson = contextManager.messagesToJson();
    String response = await openAIService.getChatResponse(messagesJson);
    print('Printing response from OpenAI chat API');
    print(response);
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
      body: ChatBody(messages: messages),
      bottomNavigationBar: Container(
        height: 150, // Increased height
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
            colors: [
              bottomBarColor, // Color of the bottom bar
              chatBodyColor, // Color of the chat body
            ],
          ),
        ),
        child: BottomAppBar(
          color: Colors.transparent, // Make BottomAppBar background transparent
          elevation: 0, // Remove shadow if not needed
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Icon(
                  isAgentSpeaking
                      ? Icons.headset_mic_outlined
                      : Icons.headset_mic,
                  color: isAgentSpeaking
                      ? Theme.of(context).colorScheme.primary
                      : Colors.black), // Icon indicating the agent
              FloatingActionButton(
                child: Text(!isChatActive ? "Start" : "Stop"), // Start button
                onPressed: () {
                  // Stop button action
                  setState(() {
                    isChatActive = !isChatActive;
                    if (isChatActive) {
                      startChat();
                    } else {
                      stopChat();
                    }
                  });
                },
              ),

              Icon(!isAgentSpeaking ? Icons.mic_none_outlined : Icons.mic_none,
                  color: !isAgentSpeaking
                      ? Theme.of(context).colorScheme.primary
                      : Colors.black), // Icon indicating the user
            ],
          ),
        ),
      ),
    );
  }
}

class ChatBody extends StatefulWidget {
  final List<Map<String, dynamic>> messages;
  const ChatBody({super.key, required this.messages});

  @override
  _ChatBodyState createState() => _ChatBodyState();
}

class _ChatBodyState extends State<ChatBody> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
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
