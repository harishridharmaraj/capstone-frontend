import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControl,
} from "@mui/material";

const Assign = () => {
  const [query, setQuery] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState({});
  const navigate = useNavigate();

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("https://haribackend.onrender.com/admin", {
        headers: {
          "x-auth-token": token,
        },
      });

      const queryData = await axios.get("https://haribackend.onrender.com/assignmentors", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (queryData) {
        const openqueries = queryData.data.filter(
          (item) => item.status === "Open"
        );
        setQuery(openqueries);
      } else {
        navigate("/login");
      }

      if (res) {
        const onlymentor = res.data.filter((item) => item.role === "mentor");
        setMentors(onlymentor);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleQuery = async (queryNumber) => {
    const selectedMentorId = selectedMentors[queryNumber] || "";
    console.log(queryNumber, selectedMentorId);
    try {
      if (selectedMentorId !== "") {
        const res = await axios.post("https://haribackend.onrender.com/qryassign", {
          selectedMentorId,
          queryNumber,
        });
        console.log(selectedMentorId, queryNumber);
        if (res) {
          handleData();
        }
      }
    } catch (error) {
      console.error("Error handling query:", error);
    }
  };

  const handleMentorChange = (queryNumber, mentor) => {
    setSelectedMentors({
      ...selectedMentors,
      [queryNumber]: mentor,
    });
  };

  return (
    <Design>
      <div>
        <h2>Assign Mentors to Open Queries</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            height: "max-content",
          }}
        >
          {query ? (
            query.map((query) => (
              <Box
                key={query._id}
                sx={{
                  margin: "10px 10px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  backgroundColor: "#F7F5FC",
                  justifyContent: "space-between",
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    gap: "40px",
                  }}
                >
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/query/${query.querynumber}`}
                  >
                    <b>
                      {query.querynumber}-{query.title}
                    </b>
                  </Typography>
                  <Typography variant="p">
                    <b>{query.description}</b>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormControl key={query.querynumber}>
                    <Select
                      id={query.querynumber}
                      label="Mentor"
                      value={selectedMentors[query.querynumber] || ""}
                      onChange={(e) =>
                        handleMentorChange(query.querynumber, e.target.value)
                      }
                      sx={{ width: "200px", height: "40px" }}
                    >
                      {mentors.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button onClick={() => handleQuery(query.querynumber)}>
                      Submit
                    </Button>
                  </FormControl>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">No Queries</Typography>
            </Box>
          )}
        </Box>
      </div>
    </Design>
  );
};

export default Assign;
