import React, { useState, useEffect } from "react";
import Design from "./dashlayout";
// import { ScatterChart, PieChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const data1 = [
//   {
//     id: "data-0",
//     x1: 329.39,
//     x2: 391.29,
//     y1: 443.28,
//     y2: 153.9,
//   },
//   {
//     id: "data-18",
//     x1: 65.05,
//     x2: 78.93,
//     y1: 104.5,
//     y2: 150.9,
//   },
//   {
//     id: "data-19",
//     x1: 162.25,
//     x2: 63.707,
//     y1: 413.07,
//     y2: 26.483,
//   },
//   {
//     id: "data-20",
//     x1: 68.88,
//     x2: 150.8,
//     y1: 74.68,
//     y2: 333.2,
//   },
// ];
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
  const [qryAdmin, setAdminQry] = useState();
  const [queries, setQueries] = useState([]);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [mentorqry, setMentorQry] = useState();
  const [solved, setSolved] = useState();

  const navigate = useNavigate();

  const handleData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:4000/dashboard", {
        headers: {
          "x-auth-token": token,
        },
      });
      const query = await axios.get("http://localhost:4000/querydata", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (!res || !res.data || !res.data.account === true) {
        navigate("/login");
      }
      // const mentorqueries = res.data.mentorQueries;

      const userQry = query.data.filter((item) => item.user === res.data._id);
      const solvedqry = query.data.filter(
        (item) => item.mentor === res.data._id
      );
      setSolved(solvedqry.filter((item) => item.status === "closed").length);
      setMentorQry(
        solvedqry.filter((item) => item.status === "Assigned").length
      );
      setAdminQry(query.data.filter((item) => item.status === "Open").length);

      if (res.data.error === "jwt expired") {
        navigate("/login");
      } else {
        setData(res.data);
        setQueries(userQry.length);
        setStatus(userQry.filter((item) => item.status === "closed").length);
        setAssigned(
          userQry.filter((item) => item.status === "Assigned").length
        );

        setOpen(userQry.filter((item) => item.status === "Open").length);
      }
    } catch (error) {
      navigate("/login");
    }
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
            sx={{ width: { xs: "250px", sm: "300px" }, color: "#000" }}
          >
            <Typography>Queries Raised</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{queries}</b>
            </Typography>
          </DataBox>
          <DataBox
            component="a"
            href="/query"
            sx={{ width: { xs: "250px", sm: "300px" }, color: "#000" }}
          >
            <Typography>Queries Assigned</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{assigned}</b>
            </Typography>
          </DataBox>
          <DataBox sx={{ width: { xs: "250px", sm: "300px" } }}>
            <Typography>Queries Cleared</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{status}</b>
            </Typography>
          </DataBox>
          <DataBox sx={{ width: { xs: "250px", sm: "300px" } }}>
            <Typography>Queries Open</Typography>
            <Typography sx={{ fontSize: "30px" }}>
              <b>{open}</b>
            </Typography>
          </DataBox>

          {data.role === "admin" ? (
            <DataBox
              component="a"
              href="/assign"
              sx={{ width: { xs: "250px", sm: "300px" } }}
            >
              <Typography>Assign queries</Typography>
              <Typography sx={{ fontSize: "30px" }}>
                <b>{qryAdmin}</b>
              </Typography>
            </DataBox>
          ) : (
            ""
          )}
          {data.role === "mentor" || "admin" ? (
            <DataBox
              component="a"
              href="/assigned"
              sx={{ width: { xs: "250px", sm: "300px" } }}
            >
              <Typography>Queries to Solve</Typography>
              <Typography sx={{ fontSize: "30px" }}>
                <b>{mentorqry}</b>
              </Typography>
            </DataBox>
          ) : (
            ""
          )}
          {data.role === "mentor" || "admin" ? (
            <DataBox sx={{ width: { xs: "250px", sm: "300px" } }}>
              <Typography>Solved Queries</Typography>
              <Typography sx={{ fontSize: "30px" }}>
                <b>{solved}</b>
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
          {/* <Box>
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
          </Box> */}
          {/* <Box>
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
          </Box> */}
        </Box>
      </Box>
    </Design>
  );
};

export default Dashbaord;
