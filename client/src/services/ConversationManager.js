import OpenAIService from "./OpenAIService";

class ConversationManager {
  openAIService;
  agent; // virtual agent details object
  context; // to store prompt context (to feed to chat api) and user context (to be displayed)
  messageCache = []; // to store messages in the current conversation

  contextWindowSize;
  totalMessagesProcessed = 0;

  constructor(contextWindowSize = 5) {
    this.contextWindowSize = contextWindowSize;

    // Initialise openAIService...
    const apiKey = process.env.REACT_APP_CHAT_API_SK;
    this.openAIService = new OpenAIService(apiKey);

    // Generating random context
    this.generateRandomContext();
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

  setAgent(agent) {
    this.agent = agent;
  }

  getAgent() {
    return this.agent;
  }

  async getAgentPersonaAsJson() {
    const agentName = (this.agent.name + "").toLowerCase();

    // Fetching virtual agent persona as JSON
    try {
      const personaFile = await fetch(
        `/assets/agents/personas/${agentName}.json`
      );

      if (!personaFile.ok) {
        throw new Error(`HTTP error! status: ${personaFile.status}`);
      }

      const contentType = personaFile.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const personaJSON = await personaFile.json();
      return personaJSON;
    } catch (error) {
      console.error("Error fetching the persona json file:", error);
      // Handle the error according to your use-case
    }
  }

  async getPromptMessage() {
    const promptContext = JSON.stringify(this.context.promptContext);
    const agentPersonaJSON = await this.getAgentPersonaAsJson();

    // Drafting the initial promptMessage using 'persona' and 'context'
    const promptMessage = {
      role: "system",
      content: `You are '${agentPersonaJSON.name}', a ${agentPersonaJSON.age} ${
        agentPersonaJSON.gender
      } based in ${
        agentPersonaJSON.basedIn
      } and you need to role play as this person, and base your responses on the personality and traits of ${
        agentPersonaJSON.name
      } as provided below in JSON format
      Personality JSON:${JSON.stringify(agentPersonaJSON.personality)} 
      
      Also, please always keep in mind the Current Context of the interaction, also provided in JSON format.
      Current Interaction Context: ${promptContext}
      
      IMPORTANT: Only break the character when this secret key is provided to you : 'sdsbks@d#vbk3#2d%@f1s24s'`,
    };

    return promptMessage;
  }

  // Method to get all messages including the 'system' message
  async getAllMessages() {
    const promptMessage = await this.getPromptMessage();

    console.log("Prompt Message:", promptMessage); // TODO: TBR

    return [promptMessage, ...this.messageCache];
  }

  getPromptForConextGeneration() {
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

  // Utility method to parse Chat API response into a JSON object
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
    const prompt = this.getPromptForConextGeneration();

    // Send the prompt to the OpenAI Chat API
    try {
      const apiResponse = await this.openAIService.getChatResponse([
        { role: "user", content: prompt },
      ]);

      // Process the response
      const generatedContext = this.processApiResponse(apiResponse);
      this.context = generatedContext;
      console.log("Context", this.context); // TODO: TBR
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

export default ConversationManager;
