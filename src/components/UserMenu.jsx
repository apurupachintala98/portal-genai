import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SettingsIcon from "@mui/icons-material/Settings";

const UserMenu = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open Menu Handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Menu Handler
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Avatar Icon */}
      <Avatar
        alt={user.name}
        src={user.avatarUrl}
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      />

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: 2,
            boxShadow: 3,
            padding: 1,
          },
        }}
      >
        {/* User Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Avatar alt={user.name} src={user.avatarUrl} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        
        {/* Logout Option */}
        <MenuItem onClick={onLogout} sx={{ color: "error.main" }}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
