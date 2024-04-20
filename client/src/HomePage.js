import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Box,
} from "@mui/material";
import FlareIcon from "@mui/icons-material/Flare";
import PageWrapper from "./PageWrapper";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Data for characters // TODO: Need to store this data in a file or in the database
  const characters = [
    {
      id: "1",
      name: "Celine",
      gender: "female",
      description:
        "Celine is an insightful and spirited woman, deeply passionate about life, love, and exploring the complexities of human connections.",
      fineTuneAgentId: "ft:gpt-3.5-turbo-1106:personal::8uyNtcdU",
    },
    {
      id: "2",
      name: "Jesse",
      gender: "male",
      description:
        "Jesse is a thoughtful and romantic guy, always curious about life and love, and not afraid to get deep in conversation.",
      fineTuneAgentId: "ft:gpt-3.5-turbo-1106:personal::8uyNtcdU",
    },
  ];

  const startConversation = (character) => {
    navigate(`/chat/${character.name}`, { state: { character } });
  };

  return (
    <PageWrapper sx={{ display: "flex" }}>
      <Container maxWidth="md" sx={{ marginTop: "20px", fontFamily: "Roboto" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "40px" }}>
          {" "}
          Welcome to Ceenarios
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "40px" }}>
          {" "}
          Ceenarios allows you to interact with virtual characters to improve
          your communication skills. Receive feedback on different aspects of
          your conversations and see how you're doing.
        </Typography>
        <Grid
          id="catalogue"
          container
          spacing={3}
          sx={{ marginBottom: "40px" }}
        >
          {characters.map((character, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "180px",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    overflow: "auto",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {character.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginTop: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    color="violet"
                    onClick={() => startConversation(character)}
                  >
                    Start Conversation
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box id="upcoming-features">
          <Typography
            variant="h5"
            sx={{
              // color: "#3B71CA",
              marginBottom: "20px",
            }}
          >
            {" "}
            {/* Adjusted margin */}
            Upcoming Features
          </Typography>
          <Typography variant="body1">
            Stay tuned for these awesome new features to enhance your experinece
            on the platform
          </Typography>
          <List sx={{ marginBottom: "20px" }}>
            <ListItem disablePadding>
              <ListItemIcon>
                <FlareIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts and profile creation to manage your preferences and save your data" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <FlareIcon />
              </ListItemIcon>
              <ListItemText primary="Fine-tuned characters to interact more like human" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <FlareIcon />
              </ListItemIcon>
              <ListItemText primary="Voice enabled interactions with the characters" />
            </ListItem>
          </List>
        </Box>

        <Box id="feedback">
          <Typography
            variant="h5"
            sx={{
              // color: "#3B71CA",
              marginBottom: "20px",
            }}
          >
            {" "}
            {/* Adjusted margin */}
            Feedback
          </Typography>
          <Typography variant="body1">
            Got any feedback for us? If so, please contact us at{" "}
            <Link color="inherit" href="navdeepbeniwal16@gmail.com">
              navdeepbeniwal16@gmail.com
            </Link>
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default HomePage;
