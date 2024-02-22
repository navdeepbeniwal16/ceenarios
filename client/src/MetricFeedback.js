import React, { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Paper,
  Chip,
  linearProgressClasses,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, yellow, red } from "@mui/material/colors";

// Helper function to determine the color for the progress bar based on the score
const getColorForScore = (score) => {
  if (score >= 8) return green[500]; // Green for scores 8 and above
  if (score >= 5) return yellow[700]; // Yellow for scores 5 to 7
  return red[500]; // Red for scores below 5
};

// Dictionary for user-friendly metric names
const metricNameDictionary = {
  sentimentAnalysis: "Sentiment",
  engagementLevel: "Engagement Level",
  grammaticalCorrectness: "Grammatical Correctness",
  conversationDepth: "Conversation Depth",
  politenessAndFormality: "Politeness and Formality",
};

const MetricFeedback = ({ metricName, score, feedbackPoints }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const userFriendlyName = metricNameDictionary[metricName] || metricName; // Fallback to the original key if not found

  return (
    <Paper variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: "Roboto" }}>
        {userFriendlyName}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={score * 10}
        sx={{
          mb: 1,
          height: 3,
          borderRadius: 5,
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: getColorForScore(score), // Apply color to progress bar
          },
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Chip
          label={`${score}/10`}
          color="primary"
          sx={{ fontWeight: "bold", marginRight: 1 }}
        />
      </Box>
      {showFeedback && (
        <Box>
          {Array.isArray(feedbackPoints) &&
            feedbackPoints.map((point, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ mb: 0.5, fontFamily: "Roboto" }}
              >
                <CheckCircleIcon
                  key={index}
                  sx={{ color: green[500], fontSize: 20, marginRight: 0.5 }}
                />
                {point}
              </Typography>
            ))}
        </Box>
      )}
      <Button size="small" onClick={() => setShowFeedback(!showFeedback)}>
        {showFeedback ? "Hide Feedback" : "Show Feedback"}
      </Button>
    </Paper>
  );
};

export default MetricFeedback;