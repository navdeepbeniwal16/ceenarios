import 'package:http/http.dart' as http;
import 'dart:convert';

class OpenAIService {
  final String _apiKey; // Your OpenAI API Key
  static const String _baseURL = 'https://api.openai.com/v1/chat/completions';

  OpenAIService(this._apiKey);

  Future<String> getChatResponse(List<Map<String, String>> messages) async {
    try {
      final response = await http.post(
        Uri.parse(_baseURL),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_apiKey',
        },
        body: jsonEncode({
          'model': 'gpt-3.5-turbo',
          'messages': messages,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['choices'][0]['message']
            ['content']; // Extracting the chat response
      } else {
        // Handle errors
        return 'Error: ${response.statusCode}';
      }
    } catch (e) {
      // Handle any exceptions
      return 'Error: $e';
    }
  }
}
