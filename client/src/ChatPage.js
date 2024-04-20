import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  AppBar,
  Typography,
  Chip,
  Avatar,
  Skeleton,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send.js";
import PersonPin from "@mui/icons-material/PersonPin.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import girlAvatar from "./assets/girl.webp";
import boyAvatar from "./assets/boy.webp";
import PageWrapper from "./PageWrapper.js";

import ConversationManager from "./services/ConversationManager.js";
import ConversationEvaluation from "./ConversationEvaluation.js";
import OpenAIAgentEmulatorService from "./services/OpenAIFTService.js";

const openAIFineTunedModelApiKey =
  "" + process.env.REACT_APP_FINE_TUNED_MODEL_API_SK;

const openAIFineTunedModelService = new OpenAIAgentEmulatorService(
  openAIFineTunedModelApiKey
);
const conversationManager = new ConversationManager();

const useFetchContextData = () => {
  const [contextData, setContextData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (conversationManager.context) {
      setContextData(conversationManager.context);
      setIsLoading(false);
    } else {
      // Wait for contextManager.context to be populated
      const interval = setInterval(() => {
        if (conversationManager.context) {
          setContextData(conversationManager.context);
          setIsLoading(false);
          clearInterval(interval);
        }
      }, 2000); // Check every second

      // Clean up the interval
      return () => clearInterval(interval);
    }
  }, [conversationManager.context]); // React to changes in contextManager.context

  return { contextData, isLoading };
};

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const agent = location.state.character;
  conversationManager.setAgent(agent);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { contextData, isLoading } = useFetchContextData();
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
      conversationManager.pushMessage("user", inputText);

      // Get response from custom agent
      const agentResponse = await openAIFineTunedModelService.getChatResponse(
        await conversationManager.getAllMessages()
      );

      // Push agent response to context
      conversationManager.pushMessage("system", agentResponse);

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

  const navigateToHome = (character) => {
    navigate(`/`);
  };

  return (
    <PageWrapper sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", height: "80vh" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            // borderRight: "2px solid #e0e0e0",
            width: "70%",
            ml: 2,
            mt: 2,
            maxWidth: "70%",
          }}
        >
          <AppBar position="static"></AppBar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingX: "20px",
            }}
          >
            <IconButton
              // variant="contained"
              // size="small"
              // color="primary"
              onClick={() => navigateToHome()}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Chip
              label={agent.name}
              avatar={
                <Avatar
                  alt="Avatar Icon"
                  src={agent.gender === "female" ? girlAvatar : boyAvatar}
                />
              }
              sx={{
                width: "10%",
                maxWidth: "15%",
                minWidth: "10%",
                alignSelf: "center",
                // height: "5%",
                // maxHeight: "10%",
                marginBottom: "8px",
              }}
            ></Chip>
            <Typography></Typography>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              p: 2,
              flexGrow: 1, // To make this box grow and push the form to the bottom
            }}
          >
            {isLoading && !contextData && (
              <Box>
                <Skeleton variant="rounded" height={130} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "someHeight",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#5a5a5a", fontSize: "13px" }}
                  >
                    Please wait. Loading context...
                  </Typography>
                </Box>
              </Box>
            )}
            {/* Context Card */}
            {!isLoading && contextData && (
              <Paper
                variant="rounded"
                height={130}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #dcdcdc",
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    color: "#5a5a5a",
                  }}
                >
                  <PersonPin></PersonPin> {contextData.userContext.location}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "#5a5a5a" }}
                  gutterBottom
                >
                  {contextData.userContext.activity}.{" "}
                  {contextData.userContext.interaction}
                </Typography>
              </Paper>
            )}
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
              // borderTop: "1px solid #ddd",
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
          <ConversationEvaluation conversationManager={conversationManager} />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default ChatPage;
