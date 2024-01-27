import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, TextField, Typography, Paper, Grid } from "@mui/material";
import axios from "axios";

const MentorForm = () => {
  const { mentortoken } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [mentorDetails, setMentorDetails] = useState({
    sector: "",
    field: "",
    category: "",
    experience: "",
    phone: "",
    qualifications: "",
    location: "",
    address: "",
    pincode: "",
  });
  const [err, setErr] = useState("");

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get(`https://haribackend.onrender.com/dashboard`, {
          headers: {
            "x-auth-token": token,
          },
        });

        if (res.data.accounttoken === mentortoken) {
          setData(res.data);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleChange = (e) => {
    setMentorDetails({
      ...mentorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    console.log("Clicked");
    const isEmptyField = Object.values(mentorDetails).some((val) => val === "");
    console.log("No errors", mentorDetails);
    if (isEmptyField) {
      setErr("Kindly fill all the fields");
    }
    try {
      await axios.post(`https://haribackend.onrender.com/mentor/${mentortoken}`, {
        mentordetails: mentorDetails,
      });

      setMentorDetails("");
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } catch (error) {
      console.log("Error in updating Mentor Details");
    }
  };

  return (
    <Design>
      <Box mt={3} p={3} component={Paper}>
        <Typography variant="h5" mb={3}>
          Mentor Details Form
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField name="Name" fullWidth value={data.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name="Email" fullWidth value={data.email} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Sector"
              placeholder="Ex: Finance, Engineering, Software"
              name="sector"
              fullWidth
              value={mentorDetails.sector}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Field"
              placeholder="Web Developer, Mechanical Engineer"
              name="field"
              fullWidth
              value={mentorDetails.field}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          {/* Add more Grid items for other details */}
          <Grid item xs={12}>
            <TextField
              label="Experience (in years)"
              name="experience"
              fullWidth
              value={mentorDetails.experience}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              placeholder="+91-9876543210"
              name="phone"
              fullWidth
              value={mentorDetails.phone}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Qualifications"
              placeholder="M.B.A, M.Sc, B.Tech, C.A"
              name="qualifications"
              fullWidth
              value={mentorDetails.qualifications}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={mentorDetails.location}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={mentorDetails.address}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              value={mentorDetails.pincode}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          {err && (
            <div
              style={{
                color: "red",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              {err}
            </div>
          )}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClick}>
              Update Details
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Design>
  );
};

export default MentorForm;
