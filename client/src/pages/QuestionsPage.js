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

  const navigateToPracticePage = (questionId, question) => {
    navigate(`/jobs/questions/:${questionId}`);
  };

  const questionsList = questions.map((question, index) => (
    <ListItemButton
      key={index}
      component="div"
      sx={{ margin: "10px" }}
      disablePadding
      onClick={() => navigateToPracticePage(index, question)}
    >
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6">Question {index + 1}</Typography>
          <Typography variant="body1">{question}</Typography>
        </CardContent>
      </Card>
    </ListItemButton>
  ));

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignContent: "left",
        }}
      >
        <IconButton onClick={() => navigate("/jobs/description-upload")}>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
      </Box>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            pl: "13px",
          }}
          gutterBottom
        >
          Questions
        </Typography>
        <List>{questionsList}</List>
      </Box>
    </Container>
  );
};

export default QuestionsPage;
