import React, { useEffect, useState } from "react";
import Design from "./dashlayout";
import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [chatMessage, setChatMessage] = useState();
  const [user, setUser] = useState();

  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const res = await axios.get(`https://haribackend.onrender.com/query/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    const messages = await axios.get(`https://haribackend.onrender.com/chats/${id}`);
    setChatData(messages.data?.message || []);
    try {
      if (res.data.role === "user") {
        const check = res.data.queries.find((item) => item.querynumber === id);

        setData(check.queryId);
        setUser(res.data._id);
      }

      if (res.data.role === "mentor") {
        if (res.data.mentorQueries.find((item) => item.querynumber === id)) {
          const check = res.data.mentorQueries.find(
            (item) => item.querynumber === id
          );

          setData(check.queryId);
          setUser(res.data._id);
        } else {
          const check = res.data.queries.find(
            (item) => item.querynumber === id
          );

          setData(check.queryId);
          setUser(res.data._id);
        }
      }
    } catch (error) {
      navigate("/query");
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const handlechat = async () => {
    try {
      const chat = await axios.post("https://haribackend.onrender.com/chats", {
        queryid: data._id,
        querynum: id,
        from: user,
        message: chatMessage,
      });
    } catch (error) {
      console.error("Error in handlechat:", error);
    }

    setChatMessage("");
  };

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
                backgroundColor: "#F8FBFD",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "#D6FFE4",
                  padding: "8px 15px",
                  borderRadius: "20px",
                }}
              >
                {data && data.status}
              </Typography>
            </Box>
            <Box
              flex={2}
              sx={{
                overflowY: "auto",
                height: { sm: "80vh", xs: "40vh" },
                margin: "20px",
              }}
            >
              {chatData && chatData.length > 0 ? (
                chatData.map((item) => {
                  const isCurrentUser = item.sender === user;

                  return (
                    <div
                      key={item._id}
                      style={{
                        textAlign: isCurrentUser ? "right" : "left",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          backgroundColor: isCurrentUser
                            ? "#FFFFFF"
                            : "#F7F5FB",
                          border: "1px solid #DEDEDE",
                          textWrap: "wrap",
                          whiteSpace: "pre",
                          maxWidth: "100%",
                          display: "inline-block",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        {item.Message}
                      </Typography>
                      <br />
                    </div>
                  );
                })
              ) : (
                <Typography>No messages available</Typography>
              )}
            </Box>
            <Box
              component="form"
              sx={{ display: "flex", marginBottom: "20px" }}
            >
              <TextField
                fullWidth
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button sx={{ fontSize: "20px" }} onClick={handlechat}>
                ▶︎
              </Button>
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

                <Typography component="p">Mentor</Typography>
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
