import OpenAIService from "./OpenAIService";

class ContextManager {
  static instance;
  openAIService;
  messageCache = []; // to store messages in the current conversation
  context;
  contextWindowSize;
  totalMessagesProcessed = 0;

  // Private constructor to prevent direct construction calls
  constructor(contextWindowSize = 5) {
    if (!ContextManager.instance) {
      this.contextWindowSize = contextWindowSize;

      // Initialise openAIService...
      const apiKey = process.env.REACT_APP_CHAT_API_SK;
      this.openAIService = new OpenAIService(apiKey);

      // Generating random context
      this.generateRandomContext();
      ContextManager.instance = this;
    }
    return ContextManager.instance;
  }

  // Method to push new message into the cache
  pushMessage(role, content) {
    const message = { role, content };
    this.messageCache.push(message);
    this.totalMessagesProcessed++;

    // Ensure cache does not exceed the context window size
    if (this.messageCache.length > this.contextWindowSize) {
      this.messageCache.shift(); // Remove the oldest message
      // TODO: Ansynchrously push the message to the database
    }
  }

  // Method to get all messages in the cache
  getMessages() {
    return [...this.messageCache]; // Return a shallow copy of the cache to prevent state courruption
  }

  // Method to get all messages including the prompt message to feed to the Chat API
  getMessagesForRequest() {
    const jsonContext = JSON.stringify(this.context.promptContext);
    // Note: No need to replace '/' with '', since '/' does not need to be escaped in JSON

    const promptMessage = {
      role: "system",
      content: `You are 'Celine', the fictional character from 'Before' Trilogy and you need to respond to the user as if you are Celine. Current Context: ${jsonContext}`,
    };

    console.log("Prompt Message:");
    console.log(promptMessage);
    return [promptMessage, ...this.messageCache];
  }

  preparePromptForConextGeneration() {
    return `
    To make the prompt more dynamic and encourage a wider variety of locations, you can add more specificity to the instructions and emphasize the randomness of the location selection. Here's a revised version of the prompt:
    
    Generate a random context for a real-world-like interaction between two people who have never met 
    before, focusing on everyday activities. Randomly select a location. Ensure the user is the active 
    participant and initiates the interaction. Provide the context response in JSON format 
    (with no other text) with the following structure:
    
    Sample JSON response
    {
      "promptContext": {
        "location": "Randomly selected location",
        "activity": "Specific activity related to the location",
        "interaction": "Description of how the user initiates interaction with the other person"
      },
      "userContext": {
        "location": "Same as promptContext location",
        "activity": "User's perspective of the activity starting with something like 'you...'",
        "interaction": "User's perspective of initiating the interaction"
      }
    }
    
    Ensure the promptContext and userContext fields provide detailed and specific descriptions 
    of the environment, activities, and interaction initiation. The location should be randomly 
    selected for each response to create a more dynamic and real-world-like scenario.`;
  }

  // Method to parse Chat API response into a JSON object
  processApiResponse(apiResponse) {
    try {
      const results = apiResponse;
      return JSON.parse(results);
    } catch (error) {
      console.error("Error processing API response into JSON:", error);
      return null;
    }
  }

  // returns an object with a "userContext" & "promptContext"
  async generateRandomContext() {
    // Prepare the prompt
    const prompt = this.preparePromptForConextGeneration();

    // Send the prompt to the OpenAI Chat API
    try {
      const apiResponse = await this.openAIService.getChatResponse([
        { role: "user", content: prompt },
      ]);

      // Process the response
      const generatedContext = this.processApiResponse(apiResponse);
      this.context = generatedContext;
      console.log("Context");
      console.log(JSON.parse(JSON.stringify(this.context)));
    } catch (error) {
      console.error("Error generating random context:", error);
      throw error;
    }
  }

  // Method to configure the context window size
  setContextWindowSize(size) {
    this.contextWindowSize = size;
  }

  // Method to get the number of total messages processed
  getTotalMessagesProcessed() {
    return this.totalMessagesProcessed;
  }
}

// Creating a single instance
const instance = new ContextManager();

export default instance;
