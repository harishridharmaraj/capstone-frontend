import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Design from "./dashlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Randomstring from "randomstring";

const QueryForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [lang, setLang] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [jpg, setJpg] = useState("");
  const [data, setData] = useState([]);

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const res = await axios.get("http://localhost:4000/query", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (res) {
        console.log(res.data);
        setData(res.data);
      } else {
        navigate("/dashboard");
      }
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const querydata = {
      querynumber: Randomstring.generate({
        length: 8,
        charset: "numeric",
      }),
      category: category,
      subCategory: subCategory,
      tags: selectedTags,
      language: lang,
      title: title,
      description: description,
      from: from,
      to: to,
      user: data._id,
      attachments: jpg,
    };
    const email = data.email;
    console.log(email);
    const res = await axios.post("http://localhost:4000/create", {
      querydata,
      email,
    });
    console.log(res);
    navigate("/query");
  };

  const categories = [
    "Zen-Class Doubt",
    "Placement Related",
    "Coordination Related",
    "Pre-Bootcamp Related",
  ];
  const subcategories = {
    "Zen-Class Doubt": [
      "Task",
      "WebCode",
      "Class Topic",
      "Webkata",
      "Codekata",
      "Assessment",
    ],
    "Placement Related": [
      "Compnay Info",
      "Completion Certificate",
      "Portfolio",
    ],
    "Coordination Related": [
      "Session Timing",
      "Session Joining Link",
      "Session Feedback",
      "Completion Certificate",
      "Payment",
    ],
    "Pre-Bootcamp Related": [
      "Session",
      "Payment",
      "Codekata",
      "Webkata",
      "Task",
      "Other",
    ],
  };
  const Tags = [
    "html",
    "nodejs",
    "css",
    "BootStrap",
    "mui",
    "react",
    "mongodb",
  ];

  return (
    <Design>
      <Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "10px",
            padding: "10px",
            flexWrap: "wrap",
            // backgroundImage: "linear-gradient(to right, #00a1ca, #fff)",
          }}
        >
          <Button
            component="a"
            href="/query"
            sx={{
              backgroundColor: "#00a1ca",
              color: "#fff",
              fontWeight: "bolder",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#14346c",
                color: "#fff",
              },
            }}
          >
            Back
          </Button>
        </Toolbar>
      </Box>
      <Box sx={{ width: "auto", justifyContent: "center", display: "flex" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { sm: "500px" },
            display: "flex",
            flexDirection: "column",
            gap: "30px",

            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0px 2px 5px 0px black",
          }}
        >
          <Box>
            <Typography>Topic</Typography>
            <br />
            <FormControl sx={{ display: "flex" }}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                label="---Select Category---"
                labelId="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
              >
                {categories.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            {category && (
              <>
                <FormControl sx={{ display: "flex" }}>
                  <InputLabel id="Sub-Category">Sub-Category</InputLabel>
                  <Select
                    label="---Select Sub-Category---"
                    labelId="Sub-Category"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    {subcategories[category].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
              </>
            )}
            {subCategory === "Task" ||
            subCategory === "WebCode" ||
            subCategory === "Class Topic" ? (
              <>
                <FormControl sx={{ display: "flex" }}>
                  <InputLabel id="Sub-Category">Tags</InputLabel>
                  <Select
                    label="Tags"
                    labelId="Tags"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                  >
                    {Tags.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
              </>
            ) : (
              ""
            )}

            <FormControl sx={{ display: "flex" }}>
              <InputLabel id="category">
                Prefered Voice Communication Language
              </InputLabel>
              <Select
                label="Prefered Voice Communication Language"
                labelId="Prefered Voice Communication Language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography>Details</Typography>
            <br />
            <FormControl sx={{ display: "flex" }}>
              <TextField
                label="Query Title"
                placeholder="Enter the query title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl sx={{ display: "flex" }}>
              <TextField
                label="Query Description"
                placeholder="Enter the Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <Typography>
              Your available Time ? ( Ours : 9:00 AM - 7:00 PM )
            </Typography>
            <br />
            <FormControl sx={{ display: "flex" }}>
              <label>From</label>
              <TextField
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl sx={{ display: "flex" }}>
              <label>To</label>
              <TextField
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <Typography>Attachments (Optional)</Typography>
            <TextField
              type="file"
              value={jpg}
              onChange={(e) => setJpg(e.target.value)}
            />
          </Box>
          <Box
            sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              component="a"
              href="/query"
              sx={{
                backgroundColor: "#00a1ca",
                color: "#fff",
                fontWeight: "bolder",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#14346c",
                  color: "#fff",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#00a1ca",
                color: "#fff",
                fontWeight: "bolder",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#14346c",
                  color: "#fff",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Design>
  );
};

export default QueryForm;
