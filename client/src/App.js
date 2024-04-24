import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./ChatPage";
import Footer from "./Footer";
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";
import HomePage from "./HomePage";
import AppAppBar from "./AppAppBar";
import JobDetailsUpload from "./pages/JobDetailsUpload";
import PageWrapper from "./PageWrapper";

const violetBase = "#6C2AE8"; // "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const grayBase = "#808080"; // This should be adjusted to your specific gray
const grayMain = grayBase;
const grayLight = alpha(grayBase, 0.5);
const grayDark = alpha(grayBase, 0.9);

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontSize: "1.25rem", // 20px
    },
    body2: {
      fontSize: "0.875rem", // 14px
    },
  },
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    gray: {
      main: grayMain,
      light: grayLight,
      dark: grayDark,
      contrastText: getContrastRatio(grayMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppAppBar></AppAppBar>
        <PageWrapper>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat/:characterName" element={<ChatPage />} />
              <Route
                path="/jobs/description-upload"
                element={<JobDetailsUpload />}
              />
            </Routes>
          </Box>
        </PageWrapper>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
