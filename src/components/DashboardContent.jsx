import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography, Button, Checkbox, FormGroup, FormControlLabel,
    Paper, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import ProjectTable from "./ProjectTable";
import DashboardCard from "./DashboardCard";
import projectsIcon from "../assets/images/projects.svg";
import Chart from "./Chart";
import { getAllProjectDetails } from "../services/apiService";
import pptxgen from "pptxgenjs";
import bgImage from "../assets/images/bg-AI.jpeg";
import reportsIcon from "../assets/images/reports.svg";


const DashboardContent = ({
    theme,
    primaryColor
}) => {
    const [totalProjects, setTotalProjects] = useState(0);
    const [projectData, setProjectData] = useState([]);
    const [open, setOpen] = useState(false);
    // const [managerFilter, setManagerFilter] = useState('');
    // const [statusFilter, setStatusFilter] = useState('');
    // const [categoryFilter, setCategoryFilter] = useState('');

    const [filters, setFilters] = useState({
        managers: {},
        statuses: {},
        categories: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProjectDetails();
                console.log("Project Data:", data);  // Ensure the data structure is as expected
    
                setTotalProjects(data.length);
                setProjectData(data);
    
                const managerSet = new Set();
                const statusSet = new Set();
                const categorySet = new Set();
    
                data.forEach(item => {
                    if (item.MANAGER_NM && typeof item.MANAGER_NM === 'string') {
                        managerSet.add(item.MANAGER_NM.trim());
                    }
                    if (item.CURRENT_PHASE && typeof item.CURRENT_PHASE === 'string') {
                        statusSet.add(item.CURRENT_PHASE.trim());
                    }
                    if (item.CATEGORY && typeof item.CATEGORY === 'string') {
                        categorySet.add(item.CATEGORY.trim());
                    }
                });
    
                setFilters({
                    managers: Object.fromEntries([...managerSet].map(key => [key, false])),
                    statuses: Object.fromEntries([...statusSet].map(key => [key, false])),
                    categories: Object.fromEntries([...categorySet].map(key => [key, false])),
                });
    
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleCheckboxChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: {
                ...prev[filterType],
                [value]: !prev[filterType][value]
            }
        }));
    };

    const handleFilterSubmit = () => {
        console.log('Filter applied with:', filters);
        setOpen(false); // Close the dialog after submitting
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const stats = [
        { title: "Projects", value: totalProjects, image: projectsIcon, bgColor: "#e7f5ff" },
    ];


    const generatePPT = async () => {
        const pptx = new pptxgen();
        // Set the presentation layout
        pptx.layout = "LAYOUT_WIDE";

        // Get the current date in MM/DD/YYYY format
        const currentDate = new Date();
        const formattedDate = `${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${currentDate
                .getDate()
                .toString()
                .padStart(2, "0")}/${currentDate.getFullYear()}`;

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
                        text: `Date: ${formattedDate}`,
                        options: { x: 11.3, y: 0.1, w: 5.5, h: 0.65, color: "1a3673", fontSize: 12, bold: true },
                    },
                },
            ],
            slideNumber: { x: 0.3, y: "88%", color: "1a3673", fontSize: 12 },
        });

        // Slide 1: Title Slide
        const slide1 = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide1.addText("EDA Gen AI – Status Report", {
            x: 0.5,
            y: 0.5,
            fontSize: 28,
            color: "1a3673",
            fontFace: "Sans Medium",
        });
        slide1.addImage({ path: bgImage, x: 0, y: 1.0, w: 13.34, h: 5.4 });

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

        const rowsPerSlide = 10; // Adjust this number to control rows per slide
        const totalSlides = Math.ceil(projectData.length / rowsPerSlide);

        for (let i = 0; i < totalSlides; i++) {
            const slide2 = pptx.addSlide({ masterName: "MASTER_SLIDE" });
            slide2.addText("Project Status", {
                x: 0.5,
                y: 0.5,
                fontSize: 18,
                bold: true,
                color: "1a3673",
                fontFace: "Sans Medium",
            });

            const startRow = i * rowsPerSlide;
            const endRow = startRow + rowsPerSlide;

            const tableRows = projectData.slice(startRow, endRow).map((project) => [
                { text: project.SL_NO, options: { align: "center" } },
                { text: project.PRJ_NM, options: { align: "left" } },
                { text: project.LEAD_NM, options: { align: "center" } },
                { text: project.MANAGER_NM, options: { align: "center" } },
                { text: project.CURRENT_PHASE, options: { align: "center" } },
                { text: project.LLM_PLATFORM, options: { align: "center" } },
                { text: project.DEPLOYMENT_DT, options: { align: "center" } },
                { text: project.CATEGORY, options: { align: "center" } },

            ]);

            slide2.addTable([...tableHeader, ...tableRows], {
                x: 0.5,
                y: 1,
                w: 12,
                colW: [0.5, 5, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1],
                fontSize: 12,
                border: { pt: 1, color: "D9D9D9" },
                valign: "middle",
            });
        }
        pptx.writeFile("Project_Status_Report.pptx");
    };

    return (
        <Box>
            <Grid container spacing={3} justifyContent="flex-start" sx={{ p: 3 }}>
                {stats.map((stat, index) => (
                    <Grid item key={index}>
                        <DashboardCard
                            title={stat.title}
                            value={stat.value}
                            image={stat.image}
                            bgColor={stat.bgColor} />
                    </Grid>
                ))}

                <Grid item>
                    <Paper
                        elevation={3}
                        // onClick={generatePPT}
                        onClick={handleOpen}
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
                                }} />
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
            <Chart theme={theme} themeColor={primaryColor} />

            {/* <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { width: '80%' } }}>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {Object.entries(filters.managers).map(([manager, checked]) => (
                            <FormControlLabel
                                key={manager}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('managers', manager)} />}
                                label={manager}
                            />
                        ))}
                        {Object.entries(filters.statuses).map(([status, checked]) => (
                            <FormControlLabel
                                key={status}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('statuses', status)} />}
                                label={status}
                            />
                        ))}
                        {Object.entries(filters.categories).map(([category, checked]) => (
                            <FormControlLabel
                                key={category}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('categories', category)} />}
                                label={category}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button onClick={handleFilterSubmit}>Submit</Button>
                </DialogActions>
            </Dialog> */}

<Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { width: '80%' } }}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Managers</Typography>
                    <FormGroup>
                        {Object.entries(filters.managers).map(([manager, checked]) => (
                            <FormControlLabel
                                key={manager}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('managers', manager)} />}
                                label={manager}
                            />
                        ))}
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Statuses</Typography>
                    <FormGroup>
                        {Object.entries(filters.statuses).map(([status, checked]) => (
                            <FormControlLabel
                                key={status}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('statuses', status)} />}
                                label={status}
                            />
                        ))}
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">Categories</Typography>
                    <FormGroup>
                        {Object.entries(filters.categories).map(([category, checked]) => (
                            <FormControlLabel
                                key={category}
                                control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('categories', category)} />}
                                label={category}
                            />
                        ))}
                    </FormGroup>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={handleFilterSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>

        </Box>
    );
};

export default DashboardContent;
