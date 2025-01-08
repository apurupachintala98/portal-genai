import React, { useState, useEffect } from "react";
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
    Grid,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserMenu from "./UserMenu";
import Settings from "./Settings";
import ProjectTable from "./ProjectTable";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardCard from "./DashboardCard";
import projectsIcon from "../assets/images/projects.svg";
import reportsIcon from "../assets/images/reports.svg";
import Chart from "./Chart";
import { Link } from "react-router-dom"; 
import { getAllProjectDetails } from "../services/apiService";

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
    primaryColor
}) => {
    const collapsed = sidebarType === "mini";
    const [themeColor, setThemeColor] = useState("#673ab7"); // Default chart and theme color
    const [totalProjects, setTotalProjects] = useState(0);


    useEffect(() => {
        const fetchProjectCount = async () => {
            try {
                const data = await getAllProjectDetails();
                const total = data.length; // Calculate the total number of projects
                setTotalProjects(total);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchProjectCount();
    }, []);

    const menuItems = [
        { text: "Home", icon: <HomeIcon />, link: "/home" },
    ];

    const stats = [
        { title: "Projects", value: totalProjects, image: projectsIcon, bgColor: "#e7f5ff" },
    ];

    const user = { name: "John Doe", avatarUrl: "/avatar.png" };

    const handleLogout = () => {
        console.log("Logging out...");
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />

            {/* Sidebar Column */}
            <Box
                component="nav"
                sx={{
                    width: drawerWidth[sidebarType],
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth[sidebarType],
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                    },
                }}
            >
                <Drawer
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: drawerWidth[sidebarType],
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} component={Link}
                            to={item.link}
                            sx={{ textDecoration: "none", color: "inherit" }}>
                                <ListItemIcon sx={{ minWidth: collapsed ? "unset" : "48px" }}>
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && <ListItemText primary={item.text} />}
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>

            {/* Main Column */}
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowX: "hidden",
                }}
            >
                {/* Header */}

                <AppBar position="fixed" sx={{zIndex: 1201,
        backgroundColor: theme === "light" ? "#f5f5f5" : "#333333", 
        color: theme === "light" ? "#000" : "#fff", 
        transition: "background-color 0.3s ease" }}>
                    <Toolbar>
                        {/* Sidebar Toggle Button */}
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() =>
                                setSidebarType((prev) => (prev === "full" ? "mini" : "full"))
                            }
                            sx={{ mr: 2, color: "#000" }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Title */}
                        <Typography variant="h6" sx={{ flexGrow: 1, color: "#000"  }}>
                            Dashboard
                        </Typography>

                        {/* Theme Toggle Icon */}
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1, color: "#000"  }}>
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </Box>

                        {/* User Avatar */}
                        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                alt={user.name}
                                src={user.avatarUrl}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    cursor: "pointer",
                                    border: "2px solid #fff",
                                    "&:hover": {
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <UserMenu user={user} onLogout={handleLogout} />
                            </Avatar>
                        </Box> */}
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: 8, // Adds spacing below the header
                        backgroundColor: "background.default",
                        transition: "margin 0.3s ease",
                    }}
                >
                    <Grid container spacing={3} justifyContent="flex-start" sx={{ p: 3 }}>
                        {stats.map((stat, index) => (
                            <Grid item key={index}>
                                <DashboardCard
                                    title={stat.title}
                                    value={stat.value}
                                    image={stat.image}
                                    bgColor={stat.bgColor}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <ProjectTable />

                    <Chart theme={theme} themeColor={primaryColor} />
                </Box>
            </Box>

            {/* Settings Drawer */}
            <Settings
                open={settingsOpen}
                onClose={handleSettingsToggle}
                toggleTheme={toggleTheme}
                setPrimaryColor={setThemeColor}
                setSidebarType={setSidebarType}
                theme={theme}
            />
        </Box>
    );
};

export default Dashboard;
