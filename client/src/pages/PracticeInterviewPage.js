import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VoiceRecordingTab from "../components/VoiceRecordingTab";

const PracticeInterviewPage = () => {
  const location = useLocation();
  const question = location.state.question;
  const [audioUrl, setAudioUrl] = useState(null);

  const handleVoiceRecordingSubmit = (audioUrl) => {
    console.log("handleVoiceRecordingSubmit is called...");
    setAudioUrl(audioUrl);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Interview Practice Arena
        </Typography>
        <Typography></Typography>
      </Box>
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
          {question}
        </Typography>
      </Paper>
      <Box sx={{ display: "flex", height: "60vh" }}>
        <Typography>This is a box....</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {audioUrl && <audio src={audioUrl} controls />}
      </Box>

      <VoiceRecordingTab
        handleRecord={() => console.log("Handle record is pressed...")}
        handleSubmit={handleVoiceRecordingSubmit}
      ></VoiceRecordingTab>
    </Container>
  );
};

export default PracticeInterviewPage;