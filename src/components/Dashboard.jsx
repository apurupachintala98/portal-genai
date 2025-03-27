import React, { useState } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Breadcrumbs,
    Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import Settings from "./Settings";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from '@mui/icons-material/Chat';
import DashboardContent from './DashboardContent';
import Chat from './Chat';
import Project from './Project';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import shortLogo from '../assets/images/logo-s.png';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Define Sidebar Width
const drawerWidth = {
    full: 240,
    mini: 60,
};

const Dashboard = ({
    toggleTheme,
    theme,
    sidebarType,
    setSidebarType,
    settingsOpen,
    handleSettingsToggle,
}) => {
    const navigate = useNavigate();
    const collapsed = sidebarType === "mini";
    const [currentTab, setCurrentTab] = useState('dashboard'); // Default to showing the Dashboard

    const handleMenuItemClick = (itemId) => {
        setCurrentTab(itemId); // Set current tab based on the item ID
    };

    const handleNavigateHome = () => {
        navigate('/home');
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, id: "dashboard" },
        { text: "Project Status Chat", icon: <ChatIcon />, id: "chat" },
        { text: "Project", icon: <DashboardIcon />, id: "project" },

    ];

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth[sidebarType],
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth[sidebarType],
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                        display: "flex",
                        backgroundColor: "#1a3673",
                        color: "#fff",
                    },
                }}
            >
                <Box sx={{
                    display: "flex", alignItems: "center", width: "100%", p: 2, marginLeft: "7px"
                }}>
                    <img src={collapsed ? shortLogo : logo} alt="Logo" style={{ height: collapsed ? '32px' : '40px', width: "auto" }} />
                </Box>
                <Divider />
                <Box sx={{
                    display: "flex", alignItems: "center", width: "100%", padding: "16px 0", marginLeft: "7px", fontWeight: "bold"
                }}>
                    <IconButton aria-label="menu" size="large" sx={{ color: "#fff" }}>
                        <MenuIcon />
                    </IconButton>
                    {!collapsed && <Typography>MENU</Typography>}
                </Box>

                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={() => handleMenuItemClick(item.id)}
                            sx={{
                                textDecoration: "none", bgcolor: currentTab === item.id ? '#fff' : 'inherit',
                                color: currentTab === item.id ? '#1a3673' : '#fff',
                                '&:hover': {
                                    bgcolor: '#fff',
                                    color: '#1a3673',
                                },
                            }}>
                            <ListItemIcon sx={{
                                minWidth: collapsed ? "unset" : "48px", color: currentTab === item.id ? '#1a3673' : '#fff', '&:hover': {
                                    bgcolor: '#fff',
                                    color: '#1a3673',
                                },
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={item.text} />}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <AppBar position="fixed" sx={{
                zIndex: 1201,
                backgroundColor: theme === "light" ? "#1a3673" : "#333333",
                color: theme === "#fff",
                transition: "background-color 0.3s ease",
                width: `calc(100% - ${drawerWidth[sidebarType]}px)`,
                ml: `${drawerWidth[sidebarType]}px`,
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setSidebarType(collapsed ? 'full' : 'mini')}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {currentTab === 'dashboard' ? 'Elevance Data Intelligence Platform Dashboard' :
                            currentTab.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Typography>

                    <IconButton color="inherit" onClick={handleNavigateHome}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="subtitle1" onClick={handleNavigateHome} sx={{ cursor: 'pointer' }}>
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    backgroundColor: "background.default",
                    transition: "margin 0.3s ease",
                }}
            >
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link underline="hover" color="inherit" href="/" onClick={handleNavigateHome} sx={{ fontSize: "10px" }}>
                        <HomeIcon />
                    </Link>
                    {/* <Typography color="text.primary">
                        {currentTab === 'chat' ? 'Project Status Chat' : currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
                    </Typography> */}
                    <Typography color="text.primary">
                        {currentTab === 'chat' ?
                            'Project Status Chat' :
                            currentTab.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Typography>

                </Breadcrumbs>
                {currentTab === 'dashboard' && <DashboardContent />}
                {currentTab === 'chat' && <Chat />}
                {currentTab === 'project' && <Project />}

            </Box>
        </Box>
    );
};

export default Dashboard;
