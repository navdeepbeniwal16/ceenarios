import React from "react";
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
      {/* <div>
        <ResponsiveDrawer />
        <ChatPage />
        <Footer />
      </div> */}
      <div>
        <ResponsiveDrawer />
        <HomePage></HomePage>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
