import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
import { ScatterChart, PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const data1 = [
  {
    id: "data-0",
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: "data-18",
    x1: 65.05,
    x2: 78.93,
    y1: 104.5,
    y2: 150.9,
  },
  {
    id: "data-19",
    x1: 162.25,
    x2: 63.707,
    y1: 413.07,
    y2: 26.483,
  },
  {
    id: "data-20",
    x1: 68.88,
    x2: 150.8,
    y1: 74.68,
    y2: 333.2,
  },
];
const DataBox = styled(Box)({
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#F7F5FC",
  borderRadius: "20px",
  height: "100px",
  width: "200px",
});
const Dashbaord = () => {
  const [data, setData] = useState([]);
  const [queries, setQueries] = useState([]);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState([]);

  const navigate = useNavigate();
  const handleData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const res = await axios.get("http://localhost:4000/dashboard", {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(res.data.queries);
    setData(res.data);
    setQueries(res.data.queries.length);
    setStatus(
      res.data.queries.filter((item) => item.status === "closed").length
    );
    setOpen(res.data.queries.filter((item) => item.status === "Open").length);
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <Design>
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <DataBox
            component="a"
            href="/query"
            sx={{ width: { xs: "300px" }, color: "#000" }}
          >
            <Typography>Queries Raised</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{queries}</b>
            </Typography>
          </DataBox>
          <DataBox sx={{ width: { xs: "300px" } }}>
            <Typography>Queries Cleared</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{status}</b>
            </Typography>
          </DataBox>
          <DataBox sx={{ width: { xs: "300px" } }}>
            <Typography>1:1 Sessions</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>2</b>
            </Typography>
          </DataBox>

          {data.role === "admin" ? (
            <DataBox
              component="a"
              href="/assign"
              sx={{ width: { xs: "300px" } }}
            >
              <Typography>Assign queries</Typography>
              <Typography sx={{ fontSize: "30px" }}>
                <b>{open}</b>
              </Typography>
            </DataBox>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            alignItems: "center",
          }}
        >
          <Box>
            <ScatterChart
              width={300}
              height={300}
              series={[
                {
                  label: "Travelled so far!",
                  data: data1.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                },
              ]}
            />
          </Box>
          <Box>
            <PieChart
              series={[
                {
                  label: "Category",
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={300}
              height={200}
            />
          </Box>
        </Box>
      </Box>
    </Design>
  );
};

export default Dashbaord;
