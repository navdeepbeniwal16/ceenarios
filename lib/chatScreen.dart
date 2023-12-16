import 'package:flutter/material.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<Map<String, dynamic>> messages = [];

  void startChat() {
    // TODO: Need to integrate with backend services to establish a connection and keep it going until user clicks on stop
    // Dummy code
    messages = [
      {'text': 'Hello! How can I help you today?', 'isAgent': true},
      {
        'text':
            'I have a question about my account, and I would very much appreciate your help',
        'isAgent': false
      },
      {'text': 'Sure, I would be happy to help with that!', 'isAgent': true},
      // Add more dummy messages here...
    ];
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
