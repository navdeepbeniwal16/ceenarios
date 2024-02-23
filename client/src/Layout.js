import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResponsiveDrawer from "./ResponsiveDrawer";

const Layout = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TalkTune
          </Typography>
        </Toolbar>
      </AppBar>
      <ResponsiveDrawer open={isDrawerOpen} onToggle={handleDrawerToggle} />
      <Box component="main" sx={{ p: 3, mt: 8 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
