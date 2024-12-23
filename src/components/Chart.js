import React, { useEffect, useRef, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, Select, MenuItem } from "@mui/material";

// Dummy Data
const projectData = [
    {
        id: 1,
        name: "Sunil Joshi",
        role: "Web Designer",
        project: "Elite Admin",
        priority: "Low",
        status: "Completed",
        date: "2023-12-10",
    },
    {
        id: 2,
        name: "John Deo",
        role: "Web Developer",
        project: "Flexy Admin",
        priority: "Medium",
        status: "In Progress",
        date: "2023-12-15",
    },
    {
        id: 3,
        name: "Sara Smith",
        role: "UI/UX Designer",
        project: "Material Pro",
        priority: "High",
        status: "Pending",
        date: "2024-01-05",
    },
    {
        id: 4,
        name: "David Warner",
        role: "Frontend Developer",
        project: "Xtreme Admin",
        priority: "Low",
        status: "Completed",
        date: "2024-01-10",
    },
    {
        id: 5,
        name: "Emily Johnson",
        role: "Project Manager",
        project: "Modernize",
        priority: "Very High",
        status: "In Progress",
        date: "2024-01-15",
    },
    {
        id: 6,
        name: "Michael Brown",
        role: "Backend Developer",
        project: "CRM Dashboard",
        priority: "Medium",
        status: "Pending",
        date: "2024-02-01",
    },
    {
        id: 7,
        name: "Jessica Wilson",
        role: "QA Engineer",
        project: "Test Manager",
        priority: "Low",
        status: "Completed",
        date: "2024-02-12",
    },
    {
        id: 8,
        name: "Robert Taylor",
        role: "Full Stack Developer",
        project: "Ecommerce Pro",
        priority: "High",
        status: "In Progress",
        date: "2024-02-18",
    },
    {
        id: 9,
        name: "Olivia Martinez",
        role: "Designer",
        project: "Portfolio Site",
        priority: "Medium",
        status: "Pending",
        date: "2024-03-02",
    },
    {
        id: 10,
        name: "Daniel Thomas",
        role: "DevOps Engineer",
        project: "Cloud Manager",
        priority: "Very High",
        status: "Completed",
        date: "2024-03-10",
    },  
];

// Helper function to check if a field is numeric
const isNumericField = (field) => {
    return projectData.some((item) => !isNaN(parseFloat(item[field])));
};

// Chart Component
const Chart = ({ theme, themeColor }) => {
    const chartRef = useRef(null);

    // Extract available fields
    const fields = Object.keys(projectData[0]);

    // Filter dropdown options
    const xAxisOptions = fields.filter((field) => projectData.some((item) => item[field]));
    const yAxisOptions = fields.filter(isNumericField);

    // Default selected fields
    const [xAxisField, setXAxisField] = useState(xAxisOptions[3]);
    const [yAxisField, setYAxisField] = useState(yAxisOptions[0]);

    // Chart options
    const chartOptions = useMemo(
        () => ({
            chart: { type: "column", backgroundColor: theme === "light" ? "#ffffff" : "#333333", },
            title: { text: "Pictorial Representation of Projects" },
            credits: { enabled: false },
            xAxis: {
                categories: projectData.map((item) => item[xAxisField]),
                title: { text: xAxisField },
                labels: {
                    style: { color: theme === "light" ? "#333333" : "#ffffff" },
                  },
            },
            yAxis: {
                title: { text: yAxisField, style: { color: theme === "light" ? "#333333" : "#ffffff" } },
                labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
              },
            series: [
                {
                    name: yAxisField,
                    data: projectData.map((item) => parseFloat(item[yAxisField]) || 0),
                    color: themeColor,
                },
            ],
        }),
        [xAxisField, yAxisField, theme, themeColor]
    );

    // Update chart dynamically
    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart;
            chart.update(chartOptions, true, true);
        }
    }, [chartOptions]);

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Pictorial Representation of Projects
                </Typography>

                {/* Dropdowns */}
                <Box display="flex" gap={2} mb={2}>
                    {/* X-Axis Dropdown */}
                    <Select
                        value={xAxisField}
                        onChange={(e) => setXAxisField(e.target.value)}
                        size="small"
                        variant="outlined"
                    >
                        {xAxisOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                X-Axis: {option}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Y-Axis Dropdown */}
                    <Select
                        value={yAxisField}
                        onChange={(e) => setYAxisField(e.target.value)}
                        size="small"
                        variant="outlined"
                    >
                        {yAxisOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                Y-Axis: {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                {/* Chart */}
                <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
            </Paper>
        </Box>
    );
};

export default Chart;
