import { Box, Typography, Link, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {"Copyright © Ceenarios "}
        {new Date().getFullYear()}
        {" | "}
        {"Developed by Navdeep Beniwal "}
        {" | "}
        <Link
          color="inherit"
          href="https://github.com/navdeepbeniwal16/talktune"
        >
          <GitHubIcon sx={{ height: "15px" }}></GitHubIcon>
          Source Code
        </Link>{" "}
      </Typography>
    );
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        minHeight: "200px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
