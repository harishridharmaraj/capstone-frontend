import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Stack, Box } from "@mui/material";
const Design = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} gap="20px">
        <Sidebar />
        <Box flex={5} style={{ margin: "10px" }}>
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default Design;
