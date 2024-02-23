import OpenAI from "openai";

class OpenAIAgentEmulatorService {
  openai = null;

  constructor(apiKey) {
    console.log("OpenAIAgentEmulatorService is initialised...");
    this._apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: this._apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async getChatResponse(messages) {
    try {
      const response = await this.openai.chat.completions.create({
        messages: messages,
        model: "ft:gpt-3.5-turbo-1106:personal::8uyNtcdU", // TODO: Need to dynamically fetch this value based on character selection
      });
      return response.choices[0].message.content; // Extracting the chat response
    } catch (e) {
      console.error(`Error in fetching CHAT response: ${e}`);
      return `Error: ${e.response ? e.response.status : e.message}`;
    }
  }
}

export default OpenAIAgentEmulatorService;
