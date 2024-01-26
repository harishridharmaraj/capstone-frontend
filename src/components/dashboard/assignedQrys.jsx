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

const Assigned = () => {
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
      const res = await axios.get("http://localhost:4000/mentorprofile", {
        headers: {
          "x-auth-token": token,
        },
      });

      const queryData = await axios.get("http://localhost:4000/mentorqry", {
        headers: {
          "x-auth-token": token,
        },
      });

      const mentorOpenQueries = queryData.data.filter(
        (item) => item.mentor === res.data._id
      );
      console.log();
      if (queryData) {
        const openqueries = mentorOpenQueries.filter(
          (item) => item.status === "Assigned"
        );
        setQuery(openqueries);
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
    try {
      const res = await axios.put("http://localhost:4000/solvedqry", {
        queryNumber,
      });
      if (res) {
        handleData();
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
        <h2>Queries to Solve</h2>
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
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{
                      fontWeight: "bolder",
                    }}
                    onClick={() => handleQuery(query.querynumber)}
                  >
                    Query Solved
                  </Button>
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

export default Assigned;
