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
    title: "LLM Gateway",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "HEDIS Chat Assistant",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "Safety Net",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "ARB Agent",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "Data Genie",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "EDA Ontology",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "Intern Selector",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "Gen AI UI",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
  {
    title: "Smart Help",
    description: "Coming Soon",
    link: { text: "Click Here", url: "" },
  },
];

console.log(cards);


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
    <Container maxWidth="lg" sx={{ my: 4 ,}} >
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
            color: "#333",
            textAlign: "left",
          }}
        >
          Apps
        </Typography>

        {/* Arrows */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 , position: "relative" }}>
          {/* Right Arrow */}
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: "-40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
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
              <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                {card.description}
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
