import axios from "axios";

class OpenAIService {
  constructor(apiKey) {
    console.log("OpenAI Service is initialised...");
    this._apiKey = apiKey;
    this._baseURL = "https://api.openai.com/v1/chat/completions";
  }

  async getChatResponse(messages) {
    try {
      const response = await axios.post(
        this._baseURL,
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );

      // axios automatically parses the JSON response, so no need to call .json()
      console.log(
        `Data fetched from CHAT response: ${JSON.stringify(response.data)}`
      );
      return response.data.choices[0].message.content; // Extracting the chat response
    } catch (e) {
      // Handle any exceptions
      console.error(`Error in fetching CHAT response: ${e}`);
      return `Error: ${e.response ? e.response.status : e.message}`;
    }
  }
}

export default OpenAIService;
