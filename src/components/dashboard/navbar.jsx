import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import man from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [data, setData] = useState([]);
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

    setData(res.data);
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundImage: "linear-gradient(to right, #00a1ca, #14346c)" }}
      >
        <CssBaseline />
        <Container maxWidth="l">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                margin: "20px",
                gap: "10px",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              <SelfImprovementIcon
                sx={{ fontSize: "40px", fontWeight: "bolder" }}
              />
              <Typography
                component="a"
                href="/dashboard"
                sx={{ fontSize: "20px", fontWeight: "bolder", color: "#fff" }}
              >
                Doubt Guru
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title="Open settings"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  <Typography sx={{ display: { xs: "none", sm: "contents" } }}>
                    {data.name}
                  </Typography>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={man} />
                  </IconButton>
                </div>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" component="a" href="/account">
                    Account
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    href="/dashboard"
                  >
                    Dashboard
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    component="a"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
