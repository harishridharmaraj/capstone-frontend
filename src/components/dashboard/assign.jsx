// import React, { useState, useEffect } from "react";
// import Design from "./dashlayout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Assign = () => {
//   const [data, setData] = useState([]);
//   const [queries, setQueries] = useState([]);
//   const [status, setStatus] = useState([]);
//   const [open, setOpen] = useState([]);

//   const navigate = useNavigate();
//   const handleData = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }

//     const res = await axios.get("http://localhost:4000/admin", {
//       headers: {
//         "x-auth-token": token,
//       },
//     });
//     try {
//       if (res) {
//         console.log(res.data.map((user) => user.queries));
//         setData(res.data);
//         const arr = res.data.map((user) =>
//           user.queries.filter((qry) => qry.status === "Open")
//         );

//         console.log(arr.map((item) => item));
//       }
//     } catch {
//       navigate("/login");
//     }
//   };
//   useEffect(() => {
//     handleData();
//   }, []);
//   return <Design>{open.map((item) => item.title)}</Design>;
// };

// export default Assign;

import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

const Assign = () => {
  const [users, setUsers] = useState([]);
  const [mentor, setMentor] = useState("");
  const [openQueries, setOpenQueries] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
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
      const mentor = await axios.get("http://localhost:4000/mentors", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(mentor.data);
      setMentor(mentor.data);
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);

        // Extract open queries from each user
        const allOpenQueries = res.data.reduce((openQueries, user) => {
          const userOpenQueries = user.queries.filter(
            (query) => query.status === "Open"
          );
          return [...openQueries, ...userOpenQueries];
        }, []);

        setOpenQueries(allOpenQueries);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    }
  };

  const handleMentorSelection = async (queryId) => {
    try {
      const updatedQueries = openQueries.filter(
        (query) => query._id !== queryId
      );
      setOpenQueries(updatedQueries);

      // Save mentor to backend
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4000/admin/assign-mentor/${queryId}`,
        { mentor: selectedMentor },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      // Reset selectedMentor
      setSelectedMentor("");
    } catch (error) {
      console.error("Error assigning mentor:", error);
    }
  };
  const handleQuery = () => {};

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Design>
      <div>
        <h2>Assign Mentors to Open Queries</h2>
        <Box>
          {openQueries.map((query) => (
            <Box
              sx={{
                margin: "20px 50px",
                padding: "10px",
                display: "flex",
                backgroundColor: "#F7F5FC",
                justifyContent: "space-between",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
              >
                <Typography
                  variant="h5"
                  component={Link}
                  to={`/query/${query.querynumber}`}
                >
                  <b>
                    {" "}
                    {query.querynumber}-{query.title}
                  </b>
                </Typography>
                <Typography variant="p">
                  <b>{query.description}</b>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Select
                  label="Mentor"
                  onChange={(e) => setSelectedMentor(e.target.value)}
                  sx={{ width: "200px", height: "40px" }}
                >
                  {mentor &&
                    mentor.map((item) => <MenuItem>{item.name}</MenuItem>)}
                </Select>
                <Button onClick={handleQuery(query.querynumber)}>Submit</Button>
              </Box>
            </Box>
          ))}
        </Box>
        {openQueries.map((query) => (
          <div key={query._id}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleMentorSelection(query._id)}
            >
              {query.title} - {query.from}
            </Button>

            <FormControl fullWidth>
              <InputLabel id={`mentor-select-label-${query._id}`}>
                Choose Mentor
              </InputLabel>
              <Select
                labelId={`mentor-select-label-${query._id}`}
                id={`mentor-select-${query._id}`}
                value={selectedMentor}
                label="Choose Mentor"
                onChange={(e) => setSelectedMentor(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </div>
    </Design>
  );
};

export default Assign;
