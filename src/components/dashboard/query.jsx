import React, { useEffect, useState } from "react";
import Design from "../dashboard/dashlayout";
import {
  Box,
  Toolbar,
  Button,
  TextField,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Query = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [lastqry, setLastQry] = useState([]);
  const handleData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      } else {
        const res = await axios.get("https://haribackend.onrender.com/query", {
          headers: {
            "x-auth-token": token,
          },
        });
        if (res) {
          setData(res.data);
          console.log(res.data);
          const final = res.data.queries.reverse()[0];
          setLastQry(final && final.queryId);
          console.log(final);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log("Login again", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleLastQry = () => {
    navigate(`/query/${lastqry.querynumber}`);
  };

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
          }}
        >
          <Button
            component="a"
            href="/createquery"
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
            + Create Query
          </Button>
          <TextField id="standard-basic" label="Search..." variant="standard" />
        </Toolbar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: "20px",
        }}
      >
        <Box
          sx={{ display: { xs: "block", sm: "block" }, flex: { xs: 0, sm: 1 } }}
        >
          <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {data.queries &&
              data.queries.map((item) => (
                <ListItem
                  key={item.queryId.querynumber}
                  component={Link}
                  to={`/query/${item.querynumber}`}
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    width: "100%",
                    backgroundImage:
                      "linear-gradient(to right, #00a1ca, #14346c)",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                      <b>{item.queryId.querynumber}</b>
                    </Typography>

                    <Typography>
                      <b>{item.queryId.status}</b>
                    </Typography>
                  </Box>
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{item.queryId.category}</Typography>
                    <Typography>
                      {item.queryId.from} - {item.queryId.to}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
          </List>
        </Box>
        <Box
          sx={{ display: { xs: "block", sm: "block" }, flex: { xs: 0, sm: 1 } }}
        >
          <Box>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Recent Query
            </Typography>
          </Box>
          <br />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">
              {lastqry && lastqry.querynumber}
            </Typography>
            <Typography variant="h5">{lastqry && lastqry.status}</Typography>
          </Box>
          <br />
          <hr style={{ opacity: 0.5 }} />
          <br />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              <b>Created at </b>
              <br />
              {lastqry && lastqry.from}
            </Typography>
            <Typography>
              <b>Assigned to</b> <br />
              Mentor
            </Typography>
          </Box>
          <br />
          <Box>
            <Typography>
              <b>Description</b>
              <br />
              {lastqry && lastqry.description}
            </Typography>
          </Box>
          <br />
          <Box sx={{ display: "flex", justifyContent: "center" }} component="a">
            <Button
              onClick={handleLastQry}
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
              Go to Query
            </Button>
          </Box>
        </Box>
      </Box>
    </Design>
  );
};

export default Query;
