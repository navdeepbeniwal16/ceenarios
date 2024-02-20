import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MetricFeedback from "./MetricFeedback"; // Adjust the import path as necessary

const mockEvaluationResults = {
  sentimentAnalysis: {
    score: 7,
    feedback: [
      "Positive tone detected",
      "Could include more empathetic responses",
    ],
  },
  engagementLevel: {
    score: 8,
    feedback: ["Highly engaging", "Maintain this approach for better results"],
  },
  grammaticalCorrectness: {
    score: 9,
    feedback: ["Excellent grammar", "No issues found"],
  },
  conversationDepth: {
    score: 3,
    feedback: [
      "Try to delve deeper into topics",
      "Ask more open-ended questions",
    ],
  },
  politenessAndFormality: {
    score: 7,
    feedback: ["Appropriately polite", "Formality level is suitable"],
  },
};

const ConversationEvaluation = () => {
  const [showResults, setShowResults] = useState(false);

  const handleEvaluate = () => {
    setShowResults(true);
  };

  return (
    <Box sx={{ width: "33%", ml: 2, mt: 2, maxWidth: "33%" }}>
      {!showResults ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            Click the button to evaluate the conversation based on various
            metrics.
          </Typography>
          <Button variant="contained" onClick={handleEvaluate}>
            Evaluate
          </Button>
        </Box>
      ) : (
        <Box>
          {Object.entries(mockEvaluationResults).map(([metric, details]) => (
            <MetricFeedback
              key={metric}
              metricName={metric}
              score={details.score}
              feedbackPoints={details.feedback}
            />
          ))}
          <Button
            variant="contained"
            onClick={() => setShowResults(false)}
            sx={{ mt: 2 }}
          >
            Re-evaluate
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ConversationEvaluation;
