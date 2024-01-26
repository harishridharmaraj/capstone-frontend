import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import man from "../../assets/man.png";

const Mentors = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [fetchData, setFetchData] = useState();
  const navigate = useNavigate();

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:4000/admin", {
        headers: {
          "x-auth-token": token,
        },
      });
      const users = res.data.filter((item) => item.role === "user");
      const usersData = users.map((user) => ({
        email: user.email,
        name: user.name,
      }));
      setUserData(usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    handleData();
  }, []);
  useEffect(() => {
    setFetchData("");
  }, [selectedUser]);
  const handleUser = () => {
    setFetchData(userData.find((user) => user.email === selectedUser));
  };
  const handleMentorMail = async () => {
    try {
      const mentorEmail = fetchData.email;
      await axios.post("http://localhost:4000/creatementors", {
        mentorEmail,
      });
      setSelectedUser("");
      setFetchData("");
    } catch (error) {
      console.log("Error Adding Mentor");
    }
  };
  return (
    <Design>
      <div>
        <Typography variant="h5">Convert Users to Mentors</Typography>
        <Box sx={{ margin: { xs: 0, sm: "20px" } }}>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            <FormControl sx={{ width: "300px" }}>
              <InputLabel>Select Users</InputLabel>
              <Select
                value={selectedUser}
                label="Select Users"
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {userData.map((user) => (
                  <MenuItem value={user.email} key={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handleUser}>
              <b>Fetch User</b>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={man} alt="Avatar" width={100} height={100} />

            <Box>
              <Box sx={{ display: "flex" }}>
                <label>
                  <b>Name: </b>
                </label>
                <Typography sx={{ textTransform: "capitalize" }}>
                  {fetchData && fetchData.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <label>
                  <b>Email: </b>
                </label>
                <Typography>{fetchData && fetchData.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant="contained" onClick={handleMentorMail}>
                Send
              </Button>
              <Typography variant="p">
                <sup>*</sup> Sends Email to convert user as Mentor
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </Design>
  );
};

export default Mentors;
