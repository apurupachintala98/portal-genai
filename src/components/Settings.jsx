import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Settings = ({
  open,
  onClose,
  toggleTheme,
  setPrimaryColor,
  setSidebarType,
  theme,
  sidebarType,
}) => {
  const themeColors = ["#1a3673", "#1976d2", "#9c27b0", "#ff9800", "#4caf50"];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Theme Option */}
        <Typography variant="subtitle1">Theme Option</Typography>
        <RadioGroup row value={theme}>
          <FormControlLabel
            value="light"
            control={<Radio />}
            label="Light"
            onClick={() => toggleTheme("light")}
          />
          <FormControlLabel
            value="dark"
            control={<Radio />}
            label="Dark"
            onClick={() => toggleTheme("dark")}
          />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* Theme Colors */}
        <Typography variant="subtitle1">Theme Colors</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {themeColors.map((color) => (
            <Box
              key={color}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
              }}
              onClick={() => setPrimaryColor(color)}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Settings;
