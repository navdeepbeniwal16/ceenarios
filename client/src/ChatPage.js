import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Paper, AppBar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send.js";
import Layout from "./Layout.js";
import contextManager from "./services/ContextManager";
import ConversationEvaluation from "./ConversationEvaluation.js";
import OpenAIAgentEmulatorService from "./services/OpenAIFTService.js";

const openAIFineTunedModelApiKey =
  "" + process.env.REACT_APP_FINE_TUNED_MODEL_API_SK;
const openAIFineTunedModelService = new OpenAIAgentEmulatorService(
  openAIFineTunedModelApiKey
);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // scroll to the botton of the chats when new messages are added to messages array
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newUserMessage = { role: "user", content: inputText };

    // update the UI with the user's message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText(""); // Clear the input field

    try {
      // Push user message into context
      contextManager.pushMessage("user", inputText);

      // Get response from custom agent
      const agentResponse = await openAIFineTunedModelService.getChatResponse(
        contextManager.getMessagesForRequest()
      );

      // Push agent response to context
      contextManager.pushMessage("system", agentResponse);

      // Update the UI with the agent's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: agentResponse },
      ]);
    } catch (error) {
      // TODO: Handle error (e.g., show an alert to the user)
      console.error("Failed to send message:", error);
    }

    scrollToBottom();
  };

  return (
    <Layout sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", height: "80vh" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid #e0e0e0",
            width: "70%",
            ml: 2,
            mt: 2,
            maxWidth: "70%",
          }}
        >
          <AppBar position="static"></AppBar>
          <Box
            sx={{
              overflowY: "auto",
              p: 2,
              flexGrow: 1, // To make this box grow and push the form to the bottom
            }}
          >
            {/* iterating over the messages to display in sequence */}
            {messages.map((message, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  mb: 2,
                  ml: message.role === "user" ? "auto" : "0",
                  mr: message.role === "assistant" ? "auto" : "0",
                  bgcolor: message.role === "user" ? "#3B71CA" : "#ffffff",
                  borderRadius: "20px",
                  color: message.role === "user" ? "#fff" : "#000",
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
              bottom: 0,
              background: "#fff",
            }}
            onSubmit={sendMessage}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{ borderRadius: "20px" }}
            />
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ borderRadius: "10px" }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "30%",
            ml: 2,
            mt: 2,
            maxWidth: "30%",
            overflowY: "auto", // To allows vertical scrolling
            zIndex: 1, // To avoid overlapping context by setting z-index lower than the overlapping component
          }}
        >
          <ConversationEvaluation />
        </Box>
      </Box>
    </Layout>
  );
};

export default ChatPage;
