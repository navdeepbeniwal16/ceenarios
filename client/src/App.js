import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "./ResponsiveDrawer";
import ChatPage from "./ChatPage";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./HomePage";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: "1.25rem", // 20px
    },
    body2: {
      fontSize: "0.875rem", // 14px for body text
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ResponsiveDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat/:characterName" element={<ChatPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
