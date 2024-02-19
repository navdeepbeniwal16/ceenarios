import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Paper, Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Layout from "./Layout";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    setMessages([...messages, { text: inputText, sender: "user" }]);
    setInputText("");
    // Simulate an agent response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "I'm an agent response to '" + inputText + "'",
          sender: "agent",
        },
      ]);
    }, 1000);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        <Toolbar />{" "}
        {/* This is necessary to offset the content below the AppBar */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, mt: 8 }}>
          {" "}
          {/* mt adjusted to push content below AppBar */}
          {messages.map((message, index) => (
            <Paper
              key={index}
              sx={{
                p: 1.5,
                maxWidth: "70%",
                mb: 2, // Space added between messages
                ml: message.sender === "user" ? "auto" : "0",
                mr: message.sender === "agent" ? "auto" : "0",
                bgcolor: message.sender === "user" ? "#e0f7fa" : "#fce4ec",
                borderRadius: "20px",
                // Space added between messages
              }}
            >
              {message.text}
            </Paper>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        {/* Rest of the code remains the same */}
        <Box
          component="form"
          sx={{ display: "flex", gap: 1, p: 2 }}
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
    </Layout>
  );
};

export default ChatPage;
