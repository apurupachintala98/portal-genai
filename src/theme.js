import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#673ab7" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#5f6368" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#bb86fc" },
    secondary: { main: "#03dac6" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b3b3b3" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
