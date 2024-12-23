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

const menuData = [
  {
    title: "Applications",
    items: [
      { name: "LLM Gateway", url: "/llm-gateway" },
      { name: "HEDIS Chat Assistant", url: "/" },
      { name: "Safety Net", url: "/" },
      { name: "ARB Agent", url: "/" },
      { name: "Data Genie", url: "/" },
      { name: "EDA Ontology", url: "/" },
      { name: "Intern Selector", url: "/" },
      { name: "Gen AI UI", url: "/" },
    ],
  },
  {
    title: "EDA Applications",
    items: [{ name: "Smart Help", url: "/" }],
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
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#6c5ce7",
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
            <Button endIcon={<ArrowDropDownIcon />} color="primary">
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
                        sx={{ py: 0.5, px: 0 }}
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
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Background Video */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

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
              color: "#6c5ce7",
              mb: 2,
              fontFamily:
                "AkkuratMono,SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace",
              fontSize: "5rem",
              lineHeight: "1.1",
              letterSpacing: "-.096em",
              maxWidth: "32ch",
            }}
          >
            Welcome to the EDA Gen AI Center of Excellence
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

        <Box sx={{
          background: 'rgba(46, 4, 86, .75)', color: "#fff", padding: "5%"
        }}>
          <Typography sx={{ fontSize: "1.7rem" }}>&ldquo; The Data Intelligence Platform is a generative AI solution tailored for marketing teams. It leverages a profound understanding of the marketing landscape to deliver innovative tools and workflows that empower users and boost their success. By integrating state-of-the-art architectures, frameworks, and accelerators, the platform drives advanced, efficient, and impactful marketing. &rdquo;</Typography>

        </Box>

        <Box
          component="footer"
          sx={{
            position: "relative",
            bottom: 0,
            width: "100%",
            background: 'linear-gradient(0deg, #fff, #f6f6f6)',
            color: "#6c5ce7",
            py: 2,
            px: 4,
            fontWeight: "bold"
          }}
        >
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            © 2024 Elevance Health.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;
