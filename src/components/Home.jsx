import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import ScrollableCards from "./ScrollableCards";
import bgVideo from "../assets/images/bgDashboard.mp4";
import bgImage from "../assets/images/bg-AI.jpeg";
import logo from '../assets/images/logo.png';

const menuData = [
  // {
  //   title: "Services/Frameworks",
  //   items: [
  //     { name: "LLM Gateway", url: "/llm-gateway" },
  //     { name: "RAG Chat Assist (Hedis)", url: "/hedis" },
  //     { name: "Text2SQL (SafetyNet)", url: "/safety-net" },
  //     { name: "Workflow Manager (ARB Scheduler)", url: "/arb-scheduler" },
  //     { name: "Semantic Router (ARB Assist)", url: "/arb-assist" },
  //     { name: "Data Genie", url: "/data-genie" },
  //     { name: "Knowledge Graph (EDA Ontology)", url: "/" },
  //     { name: "Conversational Chat", url: "/conversational-chat" },
  //     { name: "FHIR Chat", url: "/fhir-chat" },
  //   ],
  // },
  {
        title: "Services/Frameworks",
        items: [
          { name: "LLM Gateway", url: "/llm-gateway" },
          { name: "RAG Chat Assist (Hedis)", url: "http://10.126.192.122:3020/" },
          { name: "Text2SQL (SafetyNet)", url: "http://10.126.192.122:3010/" },
          { name: "Workflow Manager (ARB Scheduler)", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
          { name: "Semantic Router (ARB Assist)", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
          { name: "Data Genie", url: "http://10.126.192.122:3040/" },
          { name: "Knowledge Graph (EDA Ontology)", url: "/" },
          { name: "Conversational Chat", url: "http://10.126.192.122:3050/" },
          { name: "FHIR Chat", url: "http://10.126.192.122:3090/" },
        ],
      },
  {
    title: "Applications",
    items: [{ name: "CII SmartHelp", url: "https://evolve.antheminc.com" },
    { name: "Clara.ai", url: "https://claraai.carelon.com" },
    { name: "EDM IntelliQ", url: "/" },
    { name: "Prov360", url: "/" },
    { name: "RMA.ai", url: "/" },
    { name: "IQT", url: "/" },
    { name: "Privia", url: "/" }
    ],
  },
];

function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "#1a3673", color: "#fff" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo on the Left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          </Box>

          {/* Title at the Center */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "300",
              color: "#fff",
              fontSize: "1.75rem",
              fontFamily: "AkkuratMono, SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace",
            }}
          >
            EDA Data Intelligence Platform
          </Typography>

          {/* Menu Items on the Right */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Dropdown Menu */}
            <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleClose} sx={{ position: "relative", cursor: "pointer" }}>
              <Button endIcon={<ArrowDropDownIcon />} color="primary" sx={{ color: "#fff" }}>
                Applications
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                sx={{
                  mt: 2,
                  "& .MuiPaper-root": {
                    width: "800px",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: "#1a3673",
                    color: "#fff",
                  },
                }}
              >
                <Grid container spacing={2}>
                  {menuData.map((section, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}>
                        {section.title}
                      </Typography>
                      {section.items.map((item, i) => (
                        <MenuItem
                          key={i}
                          sx={{
                            py: 0.5,
                            px: 0,
                            fontWeight: "normal",
                            transition: "all 0.3s",
                            ":hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              fontWeight: "bold",
                            },
                          }}
                          component="a"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Menu>
            </Box>

            {/* Dashboard Button */}
            <Button variant="contained" color="primary" component={Link} to="/dashboard" sx={{ backgroundColor: "#fff", color: "#1a3673", ml: 2 }}>
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url(${bgImage})`, // Add the background image
          backgroundSize: "cover", // Ensure the image covers the entire area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
        }}
      ></Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            width: "50%",
            height: "75%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            padding: "5%",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "300",
              color: "#1a3673",
              mb: 2,
              fontFamily:
                "AkkuratMono,SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace",
              fontSize: "5rem",
              lineHeight: "1.1",
              letterSpacing: "-.096em",
              maxWidth: "32ch",
            }}
          >
            Welcome to the Elevance Data Intelligence Platform
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#333",
              textAlign: "left",
            }}
          >
            Unlock Innovation with Generative AI Solutions Empower your teams to
            build cutting-edge AI solutions with our state-of-the-art platforms,
            architectures, frameworks, and accelerators. From guidance on AI
            taskforce reviews to seamless project tracking, we’re here to drive
            success at every step.
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 2, background: "#fff" }}>
          <ScrollableCards />
        </Box>

        <Box
          sx={{
            background: "rgba(26, 54, 115, .75)",
            color: "#fff",
            padding: "5%",
            position: "relative", // Ensure this section is positioned relative to contain the video
            overflow: "hidden",   // Prevent video overflow
          }}
        >
          {/* Background Video */}
          <Box
            sx={{
              position: "absolute", // Make video fixed to the box
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,          // Send video behind content
            }}
          >
            <video
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensure video covers the entire background
              }}
            >
              <source src={bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Typography
            sx={{
              fontSize: "1.7rem",
              position: "relative", // Ensure text appears above the video
              zIndex: 1,
            }}
          >
            &ldquo; The Data Intelligence Platform is a generative AI solution tailored for marketing teams. It leverages a profound understanding of the marketing landscape to deliver innovative tools and workflows that empower users and boost their success. By integrating state-of-the-art architectures, frameworks, and accelerators, the platform drives advanced, efficient, and impactful marketing. &rdquo;
          </Typography>
        </Box>

        <Box
          component="footer"
          sx={{
            position: "relative",
            bottom: 0,
            width: "100%",
            background: 'linear-gradient(0deg, #fff, #f6f6f6)',
            color: "#1a3673",
            py: 2,
            px: 4,
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "left", fontWeight: "bolder" }}>
            © 2024 Elevance Health.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;
