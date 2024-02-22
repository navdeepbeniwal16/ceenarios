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
} from "@mui/material";
import FlareIcon from "@mui/icons-material/Flare";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  //   const navigate = useNavigate();

  // Dummy data for characters
  const characters = [
    {
      name: "Celine",
      description:
        "Celine is empathetic and great at understanding emotions, making her an excellent partner for discussions on sensitive topics.",
    },
    {
      name: "Jesse",
      description:
        "Jesse is known for his analytical thinking and loves to engage in deep, thought-provoking conversations.",
    },
  ];

  const startConversation = (characterName) => {
    // navigate(`/chat/${characterName}`);
  };

  return (
    <Layout sx={{ display: "flex" }}>
      <Container maxWidth="md" sx={{ marginTop: "20px", fontFamily: "Roboto" }}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "40px" }}>
          {" "}
          Welcome to TalkTune
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "40px" }}>
          {" "}
          TalkTune allows you to interact with virtual characters to improve
          your communication skills. Receive feedback on different aspects of
          your conversations and see how you're doing.
        </Typography>
        <Grid container spacing={3} sx={{ marginBottom: "40px" }}>
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
                    flexGrow: 1, // Allowing content to expand and push actions to the bottom
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
                    marginTop: "auto", // Pushing actions to the bottom
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => startConversation(character.name)}
                  >
                    Start Conversation
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="h5"
          sx={{ color: "#3B71CA", marginBottom: "20px" }}
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
        <Typography
          variant="h5"
          sx={{ color: "#3B71CA", marginBottom: "20px" }}
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
      </Container>
    </Layout>
  );
};

export default HomePage;
