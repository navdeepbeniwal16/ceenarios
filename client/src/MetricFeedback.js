import React, { useState } from "react";
import { Box, Typography, LinearProgress, Button, Paper } from "@mui/material";
import { green, yellow, red } from "@mui/material/colors";

// Helper function to determine the color based on the score
const getColorForScore = (score) => {
  if (score >= 8) return green[100]; // Green for scores 8 and above
  if (score >= 5) return yellow[100]; // Yellow for scores 5 to 7
  return red[100]; // Red for scores below 5
};

const MetricFeedback = ({ metricName, score, feedbackPoints }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: getColorForScore(score), // Dynamic background color based on score
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {metricName}
      </Typography>
      <LinearProgress variant="determinate" value={score * 10} sx={{ mb: 1 }} />
      <Typography variant="body2" sx={{ mb: 1 }}>
        Score: {score}/10
      </Typography>
      {showFeedback && (
        <Box>
          {Array.isArray(feedbackPoints) &&
            feedbackPoints.map((point, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                - {point}
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
