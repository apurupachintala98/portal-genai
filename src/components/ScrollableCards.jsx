import React, { useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Container,
  Link,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Card Data
const cards = [
  {
    title: "HEDIS Chat Assistant",
    description: "HEDIS (Healthcare Effectiveness Data and Information Set) is a set of health care performance measures used to track how well health care organizations perform in providing important health services to enrolled populations. <b>Learn more...</b>",
    link: { text: "Click Here", url: "http://10.126.192.122:3020/" },
  },
  {
    title: "Safety Net",
    description: "Safety Net Provider comprehensive view contains both Organizations and Individual Provider details along with corresponding error table information. Organizations can also be called as Orgs and Orgnization groups or groups or org Individual providers can also be called as Individuals or professionals. <b>Learn more...</b>",
    link: { text: "Click Here", url: "http://10.126.192.122:3010/" },
  },
  {
    title: "ARB Agent",
    description: "Coming Soon",
    link: { text: "Click Here", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
  },
  {
    title: "Data Genie",
    description: "Data Genie is the process of creating artificial data that mimics real-world data patterns. It uses techniques like statistical modeling, simulations, or machine learning algorithms to produce realistic datasets for training, testing, and analysis, often in scenarios where real data is scarce or sensitive. <b>Learn more...</b>",
    link: { text: "Click Here", url: "http://10.126.192.122:3040/" },
  },
  {
    title: "LLM Gateway",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/llm-gateway" },
  },
  {
    title: "EDA Ontology",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/" },
  },
  {
    title: "Intern Selector",
    description: "Coming Soon",
    link: { text: "Click Here", url: "http://10.126.192.122:3050/" },
  },
  {
    title: "FHIR",
    description: "Coming Soon",
    link: { text: "Click Here", url: "http://10.126.192.122:3090/" },
  },
  {
    title: "Smart Help",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/" },
  },
  {
    title: "Clara",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/" },
  },
  {
    title: "RMA.ai",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/" },
  },
  {
    title: "IQT",
    description: "Coming Soon",
    link: { text: "Click Here", url: "/" },
  },
];



const ScrollableCards = () => {
  const scrollContainerRef = useRef(null);

  // Scroll Left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4, }} >
      {/* Section Title */}
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#333",
          textAlign: "left",
        }}
      >
        Apps
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative", // Add relative positioning here
          mb: 2,
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1a3673",
            textAlign: "left",
          }}
        >
          Apps
        </Typography>

        {/* Arrows */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
          {/* Right Arrow */}
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: "-40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#1a3673",
              backgroundColor: "#fff",
              boxShadow: 2,
              marginRight: "10px",
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Left Arrow */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: "-63px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#1a3673",
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ position: "relative", marginTop: "3%" }}>
        {/* Scrollable Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: 2,
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
          }}
        >
          {cards.map((card, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                minWidth: "280px",
                maxWidth: "300px",
                p: 3,
                borderRadius: 3,
                flexShrink: 0,
                backgroundColor: "#fff",
                color: "#1a3673",
                textAlign: "left",
                boxShadow: '0 0 0 #bd95ff00, 0 0 6.9px #bd95ff46, 0 0 11.1px #bd95ff5f',
                margin: "10px",
                transition: 'boxShadow .3s',
                "&:hover": {
                  boxShadow: "0 0 0 #bd95ff00, 0 0 6.9px #bd95ff46, 0 0 23.1px #bd95ff5f", // Correct hover syntax
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", mb: 2 }} dangerouslySetInnerHTML={{ __html: card.description }}>
              </Typography>
              <Link
                href={card.link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none", color: "#6c5ce7" }}
              >
                <Typography
                  variant="caption"
                  sx={{ display: "flex", justifyContent: "end", fontSize: "1.25rem", }}
                >
                  &rarr;
                </Typography>
              </Link>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ScrollableCards;
