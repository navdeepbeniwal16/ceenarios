import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Paper, AppBar, Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Layout from "./Layout";
import ContextManager from "./services/ContextManager";
import OpenAIService from "./services/OpenAIService";
import ConversationEvaluation from "./ConversationEvaluation";

// Initialize outside of the component to ensure they are singletons
const contextManager = new ContextManager(100);

const openAIApiKey = "" + process.env.REACT_APP_CHAT_API_SK;
const openAIService = new OpenAIService(openAIApiKey);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("From useEffect:");
    console.log(messages);
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newUserMessage = { role: "user", content: inputText };
    // Immediately update the UI with the user's message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText(""); // Clear the input field

    try {
      // Push user message to context
      contextManager.pushMessage("user", inputText);

      // Get OpenAI response
      console.log("Sending messages to OpenAI api...");
      const agentResponse = await openAIService.getChatResponse(
        contextManager.getMessages() // This should only get the messages meant for the agent
      );
      console.log("Response fetched from OpenAI api...");

      // Push Agent response to context
      contextManager.pushMessage("system", agentResponse);

      // Update the UI with the agent's response, without re-adding the user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: agentResponse },
      ]);
    } catch (error) {
      // Handle error (e.g., show an alert to the user)
      console.error("Failed to send message:", error);
    }

    scrollToBottom(); // Scroll to the bottom to show the new message
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #e0e0e0", // Add a border line here
          }}
        >
          <AppBar position="static">{/* Your AppBar content here */}</AppBar>
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            {/* Messages will be displayed here */}
            {messages.map((message, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  mb: 2, // Space added between messages
                  ml: message.role === "user" ? "auto" : "0",
                  mr: message.role === "assistant" ? "auto" : "0",
                  bgcolor: message.role === "user" ? "#e0f7fa" : "#fce4ec",
                  borderRadius: "20px",
                }}
              >
                {message.content}
              </Paper>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 1,
              p: 2,
              borderTop: "1px solid #ddd",
              position: "sticky",
              bottom: 0,
              background: "#fff",
            }}
            onSubmit={sendMessage}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{ borderRadius: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: "20px" }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
        <ConversationEvaluation /> {/* Evaluation panel */}
      </Box>
    </Layout>
  );
};

export default ChatPage;
