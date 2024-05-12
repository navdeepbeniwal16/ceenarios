import { Box, Container, Typography } from "@mui/material";
import React from "react";
import FeedbackCard from "./FeedbackCard";

const FeedbackPane = ({ feedback }) => {
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      <Box sx={{ my: "22px" }}>
        {feedback &&
          Object.entries(feedback).map(([heading, details]) => (
            <FeedbackCard
              heading={heading}
              score={details.score}
              feedbackPoints={details.waysToImprove}
            />
          ))}
      </Box>
    </Container>
  );
};

export default FeedbackPane;
