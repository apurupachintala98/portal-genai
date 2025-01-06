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
import bgImage from "../assets/images/bg-AI.jpg";

const menuData = [
  {
    title: "Applications",
    items: [
      { name: "LLM Gateway", url: "/llm-gateway" },
      { name: "HEDIS Chat Assistant", url: "http://10.126.192.122:3020/" },
      { name: "Safety Net", url: "http://10.126.192.122:3010/" },
      { name: "ARB Agent", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
      { name: "Data Genie", url: "http://10.126.192.122:3040/" },
      { name: "EDA Ontology", url: "/" },
      { name: "Intern Selector", url: "http://10.126.192.122:3050/" },
      { name: "FHIR", url: "http://10.126.192.122:3090/" },
    ],
  },
  {
    title: "EDA Applications",
    items: [{ name: "Smart Help", url: "/" },
      { name: "Clara", url: "/" },
      { name: "RMA.ai", url: "/" },
      { name: "IQT", url: "/" }
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
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "#1a3673", color: "#fff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#fff",
              fontFamily:
                "AkkuratMono,SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace",
            }}
          >
            Elevance Data Intelligence Platform
          </Typography>

          {/* Dropdown Menu */}

<Box
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleClose}
  sx={{ position: "relative", cursor: "pointer" }}
>
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
        width: "600px",
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
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {section.title}
          </Typography>
          {section.items.map((item, i) => (
            <MenuItem
              key={i}
              sx={{
                py: 0.5,
                px: 0,
                fontWeight: "normal", // Default text weight
                transition: "all 0.3s", // Smooth transition
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent background
                  fontWeight: "bold", // Bold text on hover
                },
              }}
              component={Link}
              to={item.url}
            >
              {item.name}
            </MenuItem>
          ))}
        </Grid>
      ))}
    </Grid>
  </Menu>
</Box>


          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard"
            sx={{backgroundColor: "#fff", color: "#1a3673"}}
          >
            Dashboard
          </Button>
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
            height: "70%",
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
