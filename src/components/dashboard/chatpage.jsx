import React, { useEffect, useState } from "react";
import Design from "./dashlayout";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const res = await axios.get(`http://localhost:4000/query/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (res) {
        console.log(res.data[0]);
        const neww = res.data[0].queries.find(
          (item) => item.querynumber === id
        );
        if (neww === undefined) {
          navigate("/query");
        } else {
          setData(neww);
        }
      }
    }
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <Design>
      <Box>
        <Box>
          <Toolbar>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            height: "100%",
            gap: "20px",
            backgroundColor: "#F9FBFD",
          }}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "80vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              <Typography>{data && data.status}</Typography>
            </Box>
            <Box flex={2} sx={{ overflowY: "auto" }}>
              data
            </Box>
            <Box component="form" sx={{ display: "flex" }}>
              <TextField fullWidth />
              <Button sx={{ fontSize: "20px" }}>▶︎</Button>
            </Box>
          </Box>
          <hr style={{ opacity: 0.5 }} />
          <Box flex={1}>
            <Box sx={{ padding: "10px" }}>
              <Typography variant="h4">
                {data && data.querynumber} - {data && data.title}
              </Typography>
            </Box>
            <hr style={{ opacity: 0.5 }} />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: "10px",
              }}
            >
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Created at</b>
                </Typography>

                <Typography component="p">{data && data.from}</Typography>
              </Box>
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Assigned to</b>
                </Typography>

                <Typography component="p">{data && data.mentor}</Typography>
              </Box>

              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Description</b>
                </Typography>

                <Typography component="p">
                  {data && data.description}
                </Typography>
              </Box>
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Tags</b>
                </Typography>

                {data &&
                  data.tags &&
                  data.tags.map((item) => (
                    <Typography component="p" key={item}>
                      {item}
                    </Typography>
                  ))}
              </Box>
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Category</b>
                </Typography>

                <Typography component="p">{data && data.category}</Typography>
              </Box>
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Sub-Category</b>
                </Typography>

                <Typography component="p">
                  {data && data.subCategory}
                </Typography>
              </Box>
              <Box sx={{ width: "50%", padding: "10px" }}>
                <Typography component="h4">
                  <b>Prefered Language</b>
                </Typography>

                <Typography component="p">{data && data.language}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Design>
  );
};

export default ChatPage;
