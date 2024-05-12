import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const QuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state.questions;
  const companyName = location.state.companyName;
  const jobRole = location.state.jobRole;
  const jobDescription = location.state.jobDescription;

  const navigateToPracticePage = (questionId, question) => {
    navigate(`/jobs/questions/${questionId}`, {
      state: {
        questions: questions,
        questionId: questionId,
        companyName: companyName,
        jobRole: jobRole,
        jobDescription: jobDescription,
      },
    });
  };

  const questionsList = questions.map((question, index) => (
    <ListItemButton
      key={index}
      component="div"
      sx={{ margin: "10px" }}
      disablePadding
      onClick={() => navigateToPracticePage(index, question)}
    >
      <Card variant="outlined" sx={{ width: "100%", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="subtitle2">Question {index + 1}</Typography>
          <Typography variant="body2">{question}</Typography>
        </CardContent>
      </Card>
    </ListItemButton>
  ));

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => navigate("/jobs/description-upload")}>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        <Typography></Typography>
      </Box>

      <Box>
        <List>{questionsList}</List>
      </Box>
    </Container>
  );
};

export default QuestionsPage;
