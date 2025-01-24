// import React, { useEffect, useRef, useMemo, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { Box, Paper, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
// import { getAllProjectDetails } from "../services/apiService";

// const Chart = ({ theme, themeColor }) => {
//   const chartRef = useRef(null);

//   const [projectData, setProjectData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterField, setFilterField] = useState("MANAGER_NM");
//   const [chartType, setChartType] = useState("bar");

//   const allowedFields = ["PRJ_NM", "MANAGER_NM", "DEPLOYMENT_DT", "LEAD_NM", "CURRENT_PHASE"];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await getAllProjectDetails();
//         setProjectData(data);
//       } catch (err) {
//         console.error("Error fetching project data:", err);
//         setError("Failed to load project data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartOptions = useMemo(() => {
//     if (!filterField || projectData.length === 0) {
//       return null;
//     }

//     // Limit data to 20 entries
//     const limitedData = projectData.slice(0, 20);

//     // Group projects based on the selected filter field
//     const groupedData = limitedData.reduce((acc, item) => {
//       const xValue = item[filterField];
//       if (!acc[xValue]) {
//         acc[xValue] = [];
//       }
//       acc[xValue].push(item["PRJ_NM"]); // Collect project names
//       return acc;
//     }, {});

//     // Prepare categories and series data
//     const categories = Object.keys(groupedData); // X-axis values (e.g., manager names, deployment dates)
//     const seriesData = categories.map((category) => ({
//       name: category,
//       y: groupedData[category].length,
//       projects: groupedData[category].join(", "), // Concatenate project names
//     }));

//     return {
//       chart: {
//         type: chartType,
//         backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//       },
//       title: { text: "Pictorial Representation of Projects" },
//       credits: { enabled: false },
//       tooltip: {
//         formatter: function () {
//           return `<b>${this.point.name}</b><br>Projects: ${this.point.projects}`;
//         },
//       },
//       xAxis: {
//         categories,
//         title: { text: filterField },
//         labels: {
//           style: { color: theme === "light" ? "#333333" : "#ffffff" },
//         },
//       },
//       yAxis: {
//         title: { text: "Projects", style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//         labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//       },
//       series: [
//         {
//           name: "Projects",
//           data: seriesData.map((item) => ({
//             y: item.y, // Number of projects (bar height)
//             name: item.name, // X-axis category
//             projects: item.projects, // Tooltip details
//           })),
//           color: themeColor,
//         },
//       ],
//     };
//   }, [filterField, chartType, projectData, theme, themeColor]);

//   useEffect(() => {
//     if (chartRef.current && chartOptions) {
//       const chart = chartRef.current.chart;
//       chart.update(chartOptions, true, true);
//     }
//   }, [chartOptions]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}> */}
//         <Box display="flex" gap={2} mb={2}>
//           {/* Filter Dropdown */}
//           <Select
//             value={filterField}
//             onChange={(e) => setFilterField(e.target.value)}
//             size="small"
//             variant="outlined"
//           >
//             {allowedFields.map((field) => (
//               <MenuItem key={field} value={field}>
//                 {field}
//               </MenuItem>
//             ))}
//           </Select>

//           {/* Chart Type Dropdown */}
//           <Select
//             value={chartType}
//             onChange={(e) => setChartType(e.target.value)}
//             size="small"
//             variant="outlined"
//           >
//             <MenuItem value="bar">Bar Chart</MenuItem>
//             <MenuItem value="column">Column Chart</MenuItem>
//             <MenuItem value="line">Line Chart</MenuItem>
//             <MenuItem value="area">Area Chart</MenuItem>
//             <MenuItem value="pie">Pie Chart</MenuItem>
//           </Select>
//         </Box>

//         {chartOptions && (
//           <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
//         )}
//       {/* </Paper> */}
//     </Box>
//   );
// };

// export default Chart;

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsReact from 'highcharts-react-official';
import { getAllProjectDetails } from "../services/apiService";

if (typeof HighchartsGantt === 'function') {
  HighchartsGantt(Highcharts);
}

const Chart = () => {
  const [projectData, setProjectData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedManager, setSelectedManager] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllProjectDetails();
        setProjectData(data);
        setFilteredData(data);

        // Extract unique managers and categories
        const uniqueManagers = [...new Set(data.map(project => project.manager))];
        const uniqueCategories = [...new Set(data.map(project => project.category))];

        setManagers(uniqueManagers);
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to load project data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on selected manager and category
    let filtered = projectData;
    if (selectedManager !== "All") {
      filtered = filtered.filter(project => project.manager === selectedManager);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    setFilteredData(filtered);
  }, [selectedManager, selectedCategory, projectData]);

  const options = {
    chart: {
      type: 'gantt'
    },
    title: {
      text: 'Project Progress Gantt Chart'
    },
    yAxis: {
      categories: filteredData.map(project => project.name),
      title: null
    },
    series: [
      {
        name: 'Projects',
        data: filteredData.map(project => ({
          name: project.name,
          start: new Date(project.startDate).getTime(),
          end: new Date(project.endDate).getTime(),
          completed: {
            amount: project.progress / 100
          },
          color: project.color || '#7cb5ec' // Default color if not provided
        }))
      }
    ]
  };

  return (
    <div>
      <h1>Gantt Chart</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '20px' }}>
        <label>Manager: </label>
        <select
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <option value="All">All</option>
          {managers.map(manager => (
            <option key={manager} value={manager}>{manager}</option>
          ))}
        </select>

        <label style={{ marginLeft: '20px' }}>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />
    </div>
  );
};

export default Chart;
