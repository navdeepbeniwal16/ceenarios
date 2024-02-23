import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MetricFeedback from "./MetricFeedback";
import EvaluationManager from "./services/EvaluationManager";
import contextManager from "./services/ContextManager";
import { ReactComponent as ChatEvaluationIcon } from "./assets/chat-evaluation.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blue } from "@mui/material/colors";
import { ReactComponent as MissingChatsIcon } from "./assets/missing_chats.svg";

const apiKey = process.env.REACT_APP_CHAT_API_SK;
const evaluationManager = new EvaluationManager(apiKey);

const ConversationEvaluation = () => {
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [noMessages, setNoMessages] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = async () => {
    const messages = contextManager.getMessages();
    if (messages.length === 0) {
      setNoMessages(true); // Set noMessages to true if there are no messages
      setIsEvaluating(false); // To stop the evaluating icon
      return;
    }
    setIsEvaluating(true); // To show progress circle until evaluation is done

    const results = await evaluationManager.evaluateConversation(messages);
    setEvaluationResults(results);
    setShowResults(true);
    setIsEvaluating(false);
  };

  return (
    <Box>
      {!showResults ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          {noMessages ? (
            <>
              <MissingChatsIcon
                style={{ width: "300px", height: "300px", marginBottom: "8px" }}
              />
              <Typography variant="body1" gutterBottom>
                Oops! <br />
                Looks like there is not conversation yet. Please start a
                conversation to have it evaluated.
              </Typography>
            </>
          ) : (
            <>
              <ChatEvaluationIcon
                style={{ width: "300px", height: "300px", marginBottom: "8px" }}
              />
              <Typography variant="body1" gutterBottom>
                Click the button to evaluate the conversation based on the
                following metrics
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: blue[600] }} />
                  </ListItemIcon>
                  <ListItemText primary="Sentiment" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: blue[600] }} />
                  </ListItemIcon>
                  <ListItemText primary="Engagement Level" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: blue[600] }} />
                  </ListItemIcon>
                  <ListItemText primary="Grammatical Correctness" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: blue[600] }} />
                  </ListItemIcon>
                  <ListItemText primary="Conversation Depth" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: blue[600] }} />
                  </ListItemIcon>
                  <ListItemText primary="Politeness and Formality" />
                </ListItem>
              </List>
            </>
          )}

          <Button
            variant="contained"
            onClick={handleEvaluate}
            disabled={isEvaluating}
          >
            Evaluate
          </Button>
          {/* Render the CircularProgress if evaluation is in progress */}
          {isEvaluating && <CircularProgress size={24} />}
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2">
              Feedback
            </Typography>
            {isEvaluating && <CircularProgress size={24} />}
            <Button
              variant="outlined"
              onClick={() => {
                handleEvaluate();
              }}
            >
              Re-evaluate
            </Button>
          </Box>

          {evaluationResults &&
            Object.entries(evaluationResults).map(([metric, details]) => (
              <MetricFeedback
                key={metric}
                metricName={metric}
                score={details.score}
                feedbackPoints={details.feedback}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ConversationEvaluation;
