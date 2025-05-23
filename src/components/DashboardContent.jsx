import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography, Button, Checkbox, FormGroup, FormControlLabel,
    Paper, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
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

    const [filters, setFilters] = useState({
        managers: {},
        statuses: {},
        categories: {}
    });

    const isAllSelected = (items) => Object.values(items).every(Boolean);

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
                    if (item.STAFF_VP && typeof item.STAFF_VP === 'string') {
                        managerSet.add(item.STAFF_VP.trim());
                    }
                    if (item.CURRENT_PHASE && typeof item.CURRENT_PHASE === 'string') {
                        statusSet.add(item.CURRENT_PHASE.trim());
                    }
                    if (item.LLM_PLATFORM && typeof item.LLM_PLATFORM === 'string') {
                        categorySet.add(item.LLM_PLATFORM.trim());
                    }
                });
    
                setFilters({
                    managers: Object.fromEntries([...managerSet].map(key => [key, true])),
                    statuses: Object.fromEntries([...statusSet].map(key => [key, true])),
                    categories: Object.fromEntries([...categorySet].map(key => [key, true])),
                });
    
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };
    
        fetchData();
    }, []);
    
    // const handleCheckboxChange = (filterType, value) => {
    //     setFilters(prev => ({
    //         ...prev,
    //         [filterType]: {
    //             ...prev[filterType],
    //             [value]: !prev[filterType][value]
    //         }
    //     }));
    // };

    const handleCheckboxChange = (filterType, key, isChecked, isSelectAll = false) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: isSelectAll
                ? Object.fromEntries(Object.keys(prev[filterType]).map(subKey => [subKey, isChecked]))
                : { ...prev[filterType], [key]: isChecked }
        }));
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

    const handleFilterSubmit = async () => {
        // Generate the PPT before resetting the filters
        await generatePPT();
    
        console.log('Filter applied with:', filters);
        setOpen(false); // Close the dialog after submitting
    
        // Reset filters to all true after submitting
        const resetFilters = {};
        Object.keys(filters).forEach(filterType => {
            resetFilters[filterType] = Object.fromEntries(
                Object.keys(filters[filterType]).map(key => [key, true])
            );
        });
        setFilters(resetFilters);
    };
    


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

        // Apply filters
    const filteredData = projectData.filter(project => {
        const managerCheck = filters.managers[project.STAFF_VP] || false;
        const statusCheck = filters.statuses[project.CURRENT_PHASE] || false;
        const categoryCheck = filters.categories[project.LLM_PLATFORM] || false;
        return managerCheck && statusCheck && categoryCheck;
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
                { text: "Staff VP", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                { text: "Status", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                { text: "Platform", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },
                { text: "Date", options: { fontSize: 14, bold: true, align: "center", fill: "1a3673", color: "FFFFFF" } },

            ],
        ];

        const rowsPerSlide = 10; // Adjust this number to control rows per slide
        const totalSlides = Math.ceil(filteredData.length / rowsPerSlide);

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

            const tableRows = filteredData.slice(startRow, endRow).map((project, index) => [
                { text: String(startRow + index + 1), options: { align: "center" } },
                { text: project.PROJECT_NAME, options: { align: "left" } },
                { text: project.LEAD_NM, options: { align: "center" } },
                { text: project.STAFF_VP, options: { align: "center" } },
                { text: project.CURRENT_PHASE, options: { align: "center" } },
                { text: project.LLM_PLATFORM, options: { align: "center" } },
                { text: project.DEPLOYMENT_DATE, options: { align: "center" } },

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
        setOpen(false);
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
            {/* <ProjectTable /> */}
            <Chart theme={theme} themeColor={primaryColor} />

            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { width: '90%' } }}>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: "1.0rem", fontWeight: "bold", marginBottom: "1.1rem" }}>Manager</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ paddingTop: 0 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAllSelected(filters.managers)}
                                                onChange={(e) => handleCheckboxChange('managers', null, e.target.checked, true)}
                                                style={{ transform: 'scale(0.75)' }}
                                            />
                                        }
                                        label="Select All"
                                        style={{ fontWeight: 'bold', fontSize: "0.9rem" }}
                                    />
                                </Grid>
                                {Object.entries(filters.managers).map(([manager, checked]) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={manager} sx={{ paddingTop: 0 }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={(e) => handleCheckboxChange('managers', manager, e.target.checked)} // Pass event object
                                                    style={{ transform: 'scale(0.75)' }}
                                                />
                                            }
                                            label={manager}
                                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: "0.9rem" }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: "1.0rem", fontWeight: "bold", marginBottom: "1.1rem" }}>Status</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ paddingTop: 0 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAllSelected(filters.statuses)}
                                                onChange={(e) => handleCheckboxChange('statuses', null, e.target.checked, true)}
                                                style={{ transform: 'scale(0.75)' }}
                                            />
                                        }
                                        label="Select All"
                                        style={{ fontWeight: 'bold', fontSize: "0.9rem" }}
                                    />
                                </Grid>
                                {Object.entries(filters.statuses).map(([status, checked]) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={status} sx={{ paddingTop: 0 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('statuses', status)} style={{ transform: 'scale(0.75)' }} />}
                                            label={status}
                                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: "0.9rem" }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: "1.0rem", fontWeight: "bold", marginBottom: "1.1rem" }}>Category</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ paddingTop: 0 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAllSelected(filters.categories)}
                                                onChange={(e) => handleCheckboxChange('categories', null, e.target.checked, true)}
                                                style={{ transform: 'scale(0.75)' }}
                                            />
                                        }
                                        label="Select All"
                                        style={{ fontWeight: 'bold', fontSize: "0.9rem" }}
                                    />
                                </Grid>
                                {Object.entries(filters.categories).map(([category, checked]) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={category} sx={{ paddingTop: 0 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={checked} onChange={() => handleCheckboxChange('categories', category)} style={{ transform: 'scale(0.75)' }} />}
                                            label={category}
                                            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: "0.9rem" }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
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
