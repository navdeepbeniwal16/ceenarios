class ContextManager {
  static instance;
  messageCache = [];
  contextWindowSize;
  totalMessagesProcessed = 0;

  // Private constructor to prevent direct construction calls with the `new` operator.
  constructor(contextWindowSize = 5) {
    if (!ContextManager.instance) {
      this.contextWindowSize = contextWindowSize;
      ContextManager.instance = this;
    }
    return ContextManager.instance;
  }

  // Method to push a new message into the cache
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
    return [...this.messageCache]; // Return a shallow copy of the cache
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

// Ensuring a single instance
const instance = new ContextManager();
// Object.freeze(instance);

export default instance;
