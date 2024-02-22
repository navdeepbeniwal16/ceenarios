import OpenAIService from "./OpenAIService";
// const OpenAIService = require("./OpenAIService");

class EvaluationManager {
  constructor(apiKey) {
    this.openAIService = new OpenAIService(apiKey);
  }

  async evaluateConversation(conversationData) {
    // Prepare the prompt
    const prompt = this.preparePrompt(conversationData);

    // Send the prompt to the OpenAI Chat API
    try {
      const apiResponse = await this.openAIService.getChatResponse([
        { role: "user", content: prompt },
      ]);

      // Step 3: Process the response
      const evaluationResults = this.processApiResponse(apiResponse);
      return evaluationResults;
    } catch (error) {
      console.error("Evaluation error:", error);
      throw error; // Rethrow or handle as needed
    }
  }

  preparePrompt(conversationData) {
    // Transform the conversation data into a readable format for the prompt
    let formattedConversation = conversationData
      .map((entry) => `${entry.role}: ${entry.content}`)
      .join("\n");

    return `Given the following conversation exchanges between a user and an AI assistant, evaluate the user's conversational performance based on the aspects of sentiment analysis, engagement level, grammatical correctness, conversation depth, and politeness and formality. The AI assistant is designed to facilitate conversational skills practice, so the feedback should be constructive and aimed at helping the user improve. Provide both quantitative scores (1 to 10) and qualitative feedback for each aspect tailored to the user.\n\n${formattedConversation}\n\nPlease provide the evaluation in the following structured format:\n\n{
      "sentimentAnalysis": {"score": [Score], "feedback": ["[Feedback point 1]", "[Feedback point 2]"]},
      "engagementLevel": {"score": [Score], "feedback": ["[Feedback point 1]", "[Feedback point 2]"]},
      "grammaticalCorrectness": {"score": [Score], "feedback": ["[Feedback point 1]", "[Feedback point 2]"]},
      "conversationDepth": {"score": [Score], "feedback": ["[Feedback point 1]", "[Feedback point 2]"]},
      "politenessAndFormality": {"score": [Score], "feedback": ["[Feedback point 1]", "[Feedback point 2]"]}
      }`;
  }

  processApiResponse(apiResponse) {
    // Assuming apiResponse is a string that needs to be parsed into JSON
    try {
      const results = apiResponse;
      console.log("Response sent by the evaluator:");
      console.log(results);
      return JSON.parse(results);
    } catch (error) {
      console.error("Error processing API response:", error);
      return null; // or handle as needed
    }
  }
}

export default EvaluationManager;

// const apiKey = "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";
// console.log("API Key: " + apiKey);
// const evaluationManager = new EvaluationManager(apiKey);

// const messages = [
//   { role: "user", content: "Hello, how are you today?" },
//   {
//     role: "assistant",
//     content: "I'm good, thank you! How can I assist you today?",
//   },
//   { role: "user", content: "Can you help me with my account issue?" },
//   {
//     role: "assistant",
//     content: "Certainly! Can you provide me with your account number?",
//   },
//   {
//     role: "user",
//     content: "It's 123456. I'm having trouble accessing my account.",
//   },
//   {
//     role: "assistant",
//     content: "Let me check that for you. One moment, please.",
//   },
// ];

// evaluationManager.evaluateConversation(messages); // TODO: Only uncomment for testing the service