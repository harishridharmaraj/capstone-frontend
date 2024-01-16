import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HubIcon from "@mui/icons-material/Hub";

const Sidebar = () => {
  return (
    <Box
      p={1}
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <hr style={{ opacity: 0.5 }} />
        <ListItem disablePadding>
          <ListItemButton component="a" href="/query">
            <ListItemIcon>
              <HubIcon />
            </ListItemIcon>
            <ListItemText primary="Queries" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
