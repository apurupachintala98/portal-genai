import React, { useState, useEffect, useRef } from "react";
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
    Button,
    Paper,
    TextField,
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
import pptxgen from "pptxgenjs";
import html2canvas from 'html2canvas';
// import logoPpt from "../assets/images/logo-ppt.png";
import bgImage from "../assets/images/bg-AI.jpeg";


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
    const [projectData, setProjectData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchProjectCount = async () => {
            try {
                const data = await getAllProjectDetails();
                const total = data.length; // Calculate the total number of projects
                setTotalProjects(total);
                setProjectData(data);
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

    const generatePPT = async () => {
        const pptx = new pptxgen();
        pptx.layout = "LAYOUT_WIDE";  // Set the presentation layout to wide

        let chartImage = null;
        // Ensure the chart element is available
        if (chartRef.current) {
            try {
                chartImage = await html2canvas(chartRef.current).then(canvas => canvas.toDataURL('image/jpeg', 1.0));
            } catch (error) {
                console.error("Failed to capture chart for PowerPoint:", error);
                return;  // Exit if the chart cannot be captured
            }
        } else {
            console.error("Chart element not found!");
            return;  // Exit if no chart reference
        }

        // Define the master slide layout
        pptx.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "FFFFFF" },
            objects: [
                { rect: { x: 0, y: 7, w: "100%", h: 0.25, fill: { color: "1a3673" } } },
                {
                    text: {
                        text: "Elevance Health - Confidential",
                        options: { x: 5.7, y: 7, w: 5.5, h: 0.25, color: "FFFFFF", fontSize: 12 },
                    },
                },
                {
                    image: {
                        path: "/assets/images/logo-ppt.png",
                        x: 12.3,
                        y: 6.4,
                        w: 0.65,
                        h: 0.55,
                    },
                },
                {
                    text: {
                        text: `Date: ${new Date().toLocaleDateString("en-US")}`,
                        options: { x: 11.3, y: 0.1, w: 5.5, h: 0.65, color: "1a3673", fontSize: 12, bold: true },
                    },
                },
            ],
            slideNumber: { x: 0.3, y: "88%", color: "1a3673", fontSize: 12 },
        });

        // Create a title slide
        const titleSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        titleSlide.addText("EDA Gen AI – Status Report", {
            x: 0.5,
            y: 0.5,
            fontSize: 28,
            color: "1a3673",
            fontFace: "Sans Medium",
        });
        titleSlide.addImage({ path: bgImage, x: 0, y: 1.0, w: 13.34, h: 5.4 });

        // Create slides with project data in a table
        const rowsPerSlide = 10;
        const totalSlides = Math.ceil(projectData.length / rowsPerSlide);

        // Create slides with project data in a table
        for (let i = 0; i < totalSlides; i++) {
            const slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
            slide.addText("Project Status", {
                x: 0.5,
                y: 0.5,
                fontSize: 18,
                bold: true,
                color: "1a3673",
                fontFace: "Sans Medium",
            });

            const startRow = i * rowsPerSlide;
            const endRow = Math.min(startRow + rowsPerSlide, projectData.length);

            // Slide 2: Table Slides with Pagination
            const tableHeader = [
                [
                    { text: "#", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    {
                        text: "Key Projects/ Milestone",
                        options: { fontSize: 14, bold: true, align: "left", fill: "1a3673", color: "FFFFFF" },
                    },
                    { text: "Assigned", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    { text: "Manager", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    { text: "Status", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    { text: "Domain", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    { text: "Date", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                    { text: "Category", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },

                ],
            ];

            const tableRows = projectData.slice(startRow, endRow).map(project => [
                { text: `${project.SL_NO}`, options: { align: "center" } },
                { text: project.PRJ_NM, options: { align: "left" } },
                { text: project.LEAD_NM, options: { align: "center" } },
                { text: project.MANAGER_NM, options: { align: "center" } },
                { text: project.CURRENT_PHASE, options: { align: "center" } },
                { text: project.LLM_PLATFORM, options: { align: "center" } },
                { text: project.DEPLOYMENT_DT, options: { align: "center" } },
                { text: project.CATEGORY, options: { align: "center" } },
            ]);

            slide.addTable([tableHeader, ...tableRows], {
                x: 0.5,
                y: 1,
                w: 12,
                colW: [0.5, 5, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1],
                fontSize: 12,
                border: { pt: 1, color: "D9D9D9" },
                valign: "middle",
            });
        }

        // Add a slide for the chart, if captured
        if (chartImage) {
            const chartSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
            chartSlide.addText("Project Status Chart", {
                x: 0.5,
                y: 0.5,
                fontSize: 18,
                bold: true,
                color: "1a3673",
                fontFace: "Sans Medium",
            });
            chartSlide.addImage({
                data: chartImage,
                x: 0.5,
                y: 1,
                w: 9,
                h: 4,
            });
        }

        // Save the presentation
        pptx.writeFile("Project_Status_Report.pptx").then(() => {
            console.log("Presentation successfully created!");
        }).catch(error => {
            console.error("Failed to save the presentation:", error);
        });
    };


    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
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

            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflowX: "hidden",
                }}
            >
                <AppBar position="fixed" sx={{
                    zIndex: 1201,
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#333333",
                    color: theme === "light" ? "#000" : "#fff",
                    transition: "background-color 0.3s ease"
                }}>
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
                        <Typography variant="h6" sx={{ flexGrow: 1, color: "#000" }}>
                            Dashboard
                        </Typography>

                        {/* Theme Toggle Icon */}
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1, color: "#000" }}>
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
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

                        <Grid item >
                            <Paper
                                elevation={3}
                                onClick={generatePPT}
                                sx={{
                                    borderRadius: 3,
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#e7f5ff",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    width: 200,
                                    height: 150,
                                }}
                            >
                                <Box mb={1}>
                                    <img
                                        src={reportsIcon}
                                        alt="Report Icon"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                                    Reports
                                </Typography>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontSize: "16px" }}>
                                    Click here
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <ProjectTable />
                    <Chart id="chartToCapture" ref={chartRef} theme={theme} themeColor={primaryColor} />

                    {/* <Grid container spacing={3} sx={{ mt: 3 }}> */}
                    {/* <Grid item xs={12} md={8}> */}
                    {/* <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    p: 2,
                    backgroundColor: "background.paper",
                    height: "100%",
                }}
            >
                <Chart theme={theme} themeColor={primaryColor} />
            </Paper> */}
                    {/* </Grid> */}

                    {/* Chat Assistant Section (40%) */}
                    {/* <Grid item xs={12} md={4}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    p: 2,
                    backgroundColor: "background.paper",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                    <Typography variant="h6" fontWeight="bold">
                        Chat Assistant
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="body1">
                            Welcome! How can I assist you today?
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        multiline
                        rows={2}
                        sx={{ mb: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Grid> */}
                    {/* </Grid> */}
                </Box>
            </Box>

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
