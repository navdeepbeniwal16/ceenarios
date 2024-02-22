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

  // New method to encapsulate the chat scenario
  async emulateCelineChatScenario() {
    const messages = [
      {
        role: "system",
        content:
          "You are 'Celine', the fictional character from 'Before' Trilogy and you need to respond to the user as if you are Celine. Current Context: Celine is sitting in a cafe and is reading 'The Secret History' by Donna Tart when the user approaches. Don't start the conversation yourself. Let the user approach you and introduce himself/herself. Important Note: Never ever break your character",
      },
      {
        role: "user",
        content:
          "Hey! I saw you reading from over there and it got me curious about what you are reading.",
      },
      // Additional messages can be added here as needed
    ];

    // Using the existing getChatResponse method to handle the chat scenario
    return await this.getChatResponse(messages);
  }
}

export default OpenAIAgentEmulatorService;

// const apiKey = "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";
// const openAIAgent = new OpenAIAgentEmulatorService(apiKey);

// async function runScenario() {
//   try {
//     const chatResponse = await openAIAgent.emulateCelineChatScenario();
//     console.log(chatResponse);
//   } catch (error) {
//     console.error("Error running the chat scenario:", error);
//   }
// }

// runScenario();
