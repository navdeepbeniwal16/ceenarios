import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MetricFeedback from "./MetricFeedback"; // Adjust the import path as necessary
import EvaluationManager from "./services/EvaluationManager"; // Adjust the import path as necessary
import contextManager from "./services/ContextManager";

const apiKey = process.env.REACT_APP_CHAT_API_SK;
const evaluationManager = new EvaluationManager(apiKey);

const ConversationEvaluation = () => {
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false); // Track evaluation status

  const handleEvaluate = async () => {
    setIsEvaluating(true); // Prevent further evaluations until this one completes
    const messages = contextManager.getMessages();
    console.log("Messages:");
    console.log(messages);
    const results = await evaluationManager.evaluateConversation(messages);
    console.log("Evaluation Results:");
    console.log(results);
    console.log(`Results Size: ${results.length}`);
    setEvaluationResults(results);
    setShowResults(true);
    setIsEvaluating(false); // Re-enable evaluation
  };

  return (
    <Box sx={{ width: "43%", ml: 2, mt: 2, maxWidth: "43%" }}>
      {!showResults ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            Click the button to evaluate the conversation based on various
            metrics.
          </Typography>
          <Button
            variant="contained"
            onClick={handleEvaluate}
            disabled={isEvaluating}
          >
            Evaluate
          </Button>
        </Box>
      ) : (
        <Box>
          {evaluationResults &&
            Object.entries(evaluationResults).map(([metric, details]) => (
              <MetricFeedback
                key={metric}
                metricName={metric}
                score={details.score}
                feedbackPoints={details.feedback}
              />
            ))}
          <Button
            variant="contained"
            onClick={() => {
              setShowResults(false);
              setIsEvaluating(false); // Ensure button is enabled when going for re-evaluation
            }}
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
