import OpenAI from "openai";

class OpenAIAgentEmulatorService {
  openai = null;

  constructor(apiKey) {
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
        model: "ft:gpt-3.5-turbo-1106:personal::8uyNtcdU",
      });
      console.log("Response by fine-tuned agent...");
      console.log(response.choices[0]);
      return response.choices[0].message.content; // Extracting the chat response
    } catch (e) {
      console.error(`Error in fetching CHAT response: ${e}`);
      return `Error: ${e.response ? e.response.status : e.message}`;
    }
  }
}

export default OpenAIAgentEmulatorService;
