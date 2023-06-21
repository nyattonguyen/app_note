import React from "react";
import UserMenu from "../components/UserMenu";
import { Box, Grid, Typography } from "@mui/material";
import { Outlet, useLoaderData } from "react-router-dom";
import FolderList from "../components/FolderList";
import PushNotification from "../components/PushNotification";
import bg from "../assets/image/bg.jpg";
import logo from "../assets/image/sticky-notes.png";
const Home = () => {
  const { folders } = useLoaderData();
  return (
    <>
      <img
        src={bg}
        alt="BG"
        width="100%"
        height="100%"
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          background: "transparent",
        }}
      />
      <div
        style={{
          background: "rgb(241 241 241 / 49%)",
          borderRadius: "10px",
          position: "relative",
          top: "80px",
        }}
      >
        <Typography variant="h4" sx={{ mb: "20px" }}>
          <img src={logo} alt="logo" style={{ width: "30px" }} />
          Note App
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "10px",
          }}
        >
          <UserMenu />
          <PushNotification />
        </Box>
        <Grid
          container
          sx={{
            height: "50vh",
            boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)",
          }}
        >
          <Grid item xs={3} sx={{ height: "100%" }}>
            <FolderList folders={folders} />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
