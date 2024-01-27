import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HubIcon from "@mui/icons-material/Hub";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAdmin, setisAdmin] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const res = await axios.get("https://haribackend.onrender.com/dashboard", {
      headers: {
        "x-auth-token": token,
      },
    });
    if (res.data.role === "admin") {
      setisAdmin(true);
    }
    if (res.data.role === "mentor") {
      setIsMentor(true);
    }
  };
  useEffect(() => {
    handleData();
  }, []);
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
        <hr style={{ opacity: 0.5 }} />
        {isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/mentors">
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Mentors" />
              </ListItemButton>
            </ListItem>
            <hr style={{ opacity: 0.5 }} />
            <ListItem disablePadding>
              <ListItemButton component="a" href="/assign">
                <ListItemIcon>
                  <Diversity2Icon />
                </ListItemIcon>
                <ListItemText primary="Assign Queries" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isMentor && (
          <ListItem disablePadding>
            <ListItemButton component="a" href="/assigned">
              <ListItemIcon>
                <Diversity1Icon />
              </ListItemIcon>
              <ListItemText primary="Assigned Queries" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
