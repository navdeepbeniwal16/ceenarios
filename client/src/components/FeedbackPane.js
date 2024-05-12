import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import FeedbackCard from "./FeedbackCard";

const FeedbackPane = () => {
  const [feedback, setFeedback] = useState({
    relevance: {
      strengths: [
        "The response does address the question by discussing a memorable concert experience",
        "Provides specific details about the concert attended",
      ],
      weaknesses: [
        "Includes unnecessary details about the roommate winning the tickets and the interviewee's music preferences",
        "Does not focus enough on what made the concert memorable",
      ],
      waysToImprove: [
        "Stay more focused on the aspects of the concert that made it memorable to directly address the question",
        "Avoid unnecessary details that detract from the main point",
      ],
      score: 6,
    },
    delivery: {
      strengths: [
        "The response is clear and easy to follow",
        "The interviewee effectively describes the experience",
      ],
      weaknesses: [
        "Repetitive mention of the roommate's trivia win and the interviewee's lack of familiarity with the artist",
        "Lack of enthusiasm and energy in the delivery",
      ],
      waysToImprove: [
        "Maintain a more engaging tone throughout the response",
        "Minimize repetition and focus on key points",
      ],
      score: 8,
    },
    tone: {
      strengths: [
        "Maintains a casual and friendly tone, reflecting a conversational approach",
      ],
      weaknesses: [
        "Could use a bit more professionalism given the formal setting of the interview",
        "Some parts of the response lack enthusiasm and excitement",
      ],
      waysToImprove: [
        "Balance a casual tone with a touch of professionalism suitable for the job interview setting",
        "Inject more enthusiasm and energy into the storytelling",
      ],
      score: 2,
    },
  });

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      {feedback &&
        Object.entries(feedback).map(([heading, details]) => (
          <FeedbackCard
            heading={heading}
            score={details.score}
            feedbackPoints={details.waysToImprove}
          />
        ))}
    </Container>
  );
};

export default FeedbackPane;
