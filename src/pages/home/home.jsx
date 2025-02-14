import { Box } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/navbar";
import Group from "../../components/group/group";
import style from "./home.module.css"
import ParticularGroup from "../../components/particular-group/particular-group";
const Home = () => {


  return <Box className ={style["main-container"]}>
    <Navbar></Navbar>
    <Box className={style["group-container"]}>
      <Group></Group>
      <ParticularGroup></ParticularGroup>
    </Box>
  </Box>;
};

export default Home;
