import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VoiceRecordingTab from "../components/VoiceRecordingTab";
import InterviewService from "../services/scenarios/interviewService";
import FeedbackPane from "../components/FeedbackPane";

const PracticeInterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionId } = useParams();
  console.log("QuestionId:", questionId);

  const questions = location.state.questions;
  const question = questions[questionId];
  const companyName = location.state.companyName;
  const jobRole = location.state.jobRole;
  const jobDescription = location.state.jobDescription;

  const [audioUrl, setAudioUrl] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleVoiceRecordingSubmit = (audioUrl) => {
    console.log("handleVoiceRecordingSubmit is called...");
    setAudioUrl(audioUrl);
    console.log("Initiate request to get response feedback");
    getAudioResponseFeedback(audioUrl);
  };

  const getAudioResponseFeedback = async (audioUrl) => {
    const audioBlob = await urlToBlob(audioUrl);
    const response = await InterviewService.fetchAudioResponseFeedback(
      question,
      audioBlob,
      companyName,
      jobRole,
      jobDescription
    );
    console.log("Audio Evaluation Results:", response);
    const feedback = response.feedback;
    const transcription = response.transcription;
    setFeedback(feedback);
    setTranscription(transcription);
  };

  async function urlToBlob(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ display: "flex", height: "80vh" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "60%",
            ml: 2,
            mt: 2,
            maxWidth: "60%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={() =>
                navigate("/jobs/questions", { state: { questions: questions } })
              }
            >
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
              my: 2,
              border: "1px solid #dcdcdc",
              borderRadius: "10px",
              boxShadow: "none",
            }}
          >
            <Typography
              variant="body2"
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

          <Box sx={{ display: "flex", height: "60vh", marginY: "2px" }}>
            {transcription && (
              <Typography variant="body2">{transcription.text}</Typography>
            )}
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
        </Box>
        <Box
          sx={{
            width: "40%",
            ml: 2,
            mt: 2,
            maxWidth: "40%",
            overflowY: "auto", // To allows vertical scrolling
            zIndex: 1, // To avoid overlapping context by setting z-index lower than the overlapping component
          }}
        >
          <FeedbackPane feedback={feedback}></FeedbackPane>
        </Box>
      </Box>
    </Container>
  );
};

export default PracticeInterviewPage;
