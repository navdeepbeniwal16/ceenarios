import * as React from "react";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ResponsiveDrawer = ({ open, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Chats", icon: <ChatIcon /> },
    { text: "Profile", icon: <AccountCircleIcon /> },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onToggle}
      // ... [rest of the props]
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={onToggle}>
            {/* Navigation logic will go here */}
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ResponsiveDrawer;
