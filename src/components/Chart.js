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

//   // Default X-axis and Y-axis options
//   const [xAxisField, setXAxisField] = useState("");
//   const [yAxisField, setYAxisField] = useState("");
//   const [chartType, setChartType] = useState("column");

//   const allowedXAxisFields = ["PRJ_NM", "MANAGER_NM", "DEPLOYMENT_DT", "LEAD_NM", "CURRENT_PHASE"];
//   const allowedYAxisFields = ["MANAGER_NM", "DEPLOYMENT_DT","LEAD_NM", "CURRENT_PHASE" ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await getAllProjectDetails();
//         setProjectData(data);

//         // Set default fields for X-axis and Y-axis
//         setXAxisField(allowedXAxisFields[0]); // Default to the first allowed X-axis field
//         setYAxisField(allowedYAxisFields[0]); // Default to the first allowed Y-axis field
//       } catch (err) {
//         console.error("Error fetching project data:", err);
//         setError("Failed to load project data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatYAxisData = (field, value) => {
//     if (field === "DEPLOYMENT_DT") {
//       return new Date(value).toLocaleDateString(); // Format dates for readability
//     }
//     return value; // Return other fields as-is
//   };

//   // const chartOptions = useMemo(() => {
//   //   if (!xAxisField || !yAxisField || projectData.length === 0) {
//   //     return null;
//   //   }

//   //   const limitedData = projectData.slice(0, 20);

//   //   // Process data for the pie chart
//   //   const pieData =
//   //     chartType === "pie"
//   //       ? limitedData.map((item) => ({
//   //         name: item[xAxisField],
//   //         y: parseFloat(item[yAxisField]) || 0, // Use Y-axis field for the value
//   //       }))
//   //       : [];

//   //   return {
//   //     chart: {
//   //       type: chartType,
//   //       backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//   //     },
//   //     title: { text: "Pictorial Representation of Projects" },
//   //     credits: { enabled: false },
//   //     tooltip: {
//   //       pointFormat: chartType === "pie" ? "{series.name}: <b>{point.y}</b>" : undefined,
//   //     },
//   //     plotOptions: {
//   //       pie: {
//   //         allowPointSelect: true,
//   //         cursor: "pointer",
//   //         dataLabels: {
//   //           enabled: true,
//   //           format: "{point.name}: {point.y}", // Show name and value
//   //           style: {
//   //             color: theme === "light" ? "#333333" : "#ffffff",
//   //           },
//   //         },
//   //       },
//   //     },
//   //     xAxis: chartType !== "pie" && {
//   //       categories: limitedData.map((item) => item[xAxisField]),
//   //       title: { text: xAxisField },
//   //       labels: {
//   //         style: { color: theme === "light" ? "#333333" : "#ffffff" },
//   //       },
//   //     },
//   //     yAxis: chartType !== "pie" && {
//   //       title: { text: yAxisField, style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//   //       labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//   //     },
//   //     series: [
//   //       chartType === "pie"
//   //         ? {
//   //           name: yAxisField,
//   //           colorByPoint: true,
//   //           data: pieData,
//   //         }
//   //         : {
//   //           name: yAxisField,
//   //           data: limitedData.map((item) =>
//   //             yAxisField === "DEPLOYMENT_DT"
//   //               ? new Date(item[yAxisField]).getTime()
//   //               : parseFloat(item[yAxisField]) || 0
//   //           ),
//   //           color: themeColor,
//   //         },
//   //     ],
//   //   };
//   // }, [xAxisField, yAxisField, theme, themeColor, chartType, projectData]);

//   const chartOptions = useMemo(() => {
//     if (!xAxisField || !yAxisField || projectData.length === 0) {
//       return null;
//     }
  
//     // Limit data to 20 entries
//     const limitedData = projectData.slice(0, 20);
  
//     // Group and count data dynamically based on the selected fields
//     const groupedData = limitedData.reduce((acc, item) => {
//       const xValue = item[xAxisField];
//       if (!acc[xValue]) {
//         acc[xValue] = 0;
//       }
//       acc[xValue] += 1; // Count the number of projects for each X-axis value
//       return acc;
//     }, {});
  
//     // Convert grouped data to arrays for chart processing
//     const categories = Object.keys(groupedData); // X-axis values (e.g., manager names)
//     const data = Object.values(groupedData); // Y-axis values (e.g., project counts)
  
//     return {
//       chart: {
//         type: chartType,
//         backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//       },
//       title: { text: "Pictorial Representation of Projects" },
//       credits: { enabled: false },
//       tooltip: {
//         pointFormat: "{series.name}: <b>{point.y}</b>",
//       },
//       xAxis: {
//         categories, // Dynamic X-axis categories
//         title: { text: xAxisField },
//         labels: {
//           style: { color: theme === "light" ? "#333333" : "#ffffff" },
//         },
//       },
//       yAxis: {
//         title: { text: "Number of Projects", style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//         labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//       },
//       series: [
//         {
//           name: "Projects",
//           data, // Dynamic Y-axis data
//           color: themeColor,
//         },
//       ],
//     };
//   }, [xAxisField, yAxisField, theme, themeColor, chartType, projectData]);
  
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
//       <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
//         <Box display="flex" gap={2} mb={2}>
//           {/* X-Axis Dropdown */}
//           <Select
//             value={xAxisField}
//             onChange={(e) => setXAxisField(e.target.value)}
//             size="small"
//             variant="outlined"
//           >
//             {allowedXAxisFields.map((option) => (
//               <MenuItem key={option} value={option}>
//                 X-Axis: {option}
//               </MenuItem>
//             ))}
//           </Select>

//           {/* Y-Axis Dropdown */}
//           <Select
//             value={yAxisField}
//             onChange={(e) => setYAxisField(e.target.value)}
//             size="small"
//             variant="outlined"
//           >
//             {allowedYAxisFields.map((option) => (
//               <MenuItem key={option} value={option}>
//                 Y-Axis: {option}
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
//             <MenuItem value="pie">Variable Radius Pie</MenuItem>
//             <MenuItem value="line">Line Chart</MenuItem>
//             <MenuItem value="area">Area Chart</MenuItem>
//             <MenuItem value="bar">Basic Bar Chart</MenuItem>
//             <MenuItem value="column">Basic Column Chart</MenuItem>
//           </Select>
//         </Box>

//         {chartOptions && (
//           <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Chart;

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
//   const [chartType, setChartType] = useState("column");

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

//     // Prepare data dynamically based on the selected filterField
//     const groupedData = limitedData.reduce((acc, item) => {
//       const xValue = item[filterField];
//       const yValue =
//         filterField === "DEPLOYMENT_DT"
//           ? new Date(item["DEPLOYMENT_DT"]).toLocaleDateString()
//           : item["PRJ_NM"];
//       if (!acc[xValue]) {
//         acc[xValue] = [];
//       }
//       acc[xValue].push(yValue);
//       return acc;
//     }, {});

//     // Convert grouped data into categories and series data
//     const categories = Object.keys(groupedData); // X-axis values (e.g., Manager names, Deployment dates)
//     const seriesData = categories.map((category) => ({
//       name: category,
//       y: groupedData[category].length,
//     }));

//     return {
//       chart: {
//         type: chartType,
//         backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//       },
//       title: { text: "Pictorial Representation of Projects" },
//       credits: { enabled: false },
//       tooltip: {
//         pointFormat: "{series.name}: <b>{point.y}</b>",
//       },
//       xAxis: {
//         categories,
//         title: { text: filterField },
//         labels: {
//           style: { color: theme === "light" ? "#333333" : "#ffffff" },
//         },
//       },
//       yAxis: {
//         title: { text: "Number of Projects", style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//         labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//       },
//       series: [
//         {
//           name: "Projects",
//           data: seriesData.map((item) => item.y),
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
//       <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
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
//             <MenuItem value="pie">Pie Chart</MenuItem>
//             <MenuItem value="line">Line Chart</MenuItem>
//             <MenuItem value="area">Area Chart</MenuItem>
//             <MenuItem value="bar">Bar Chart</MenuItem>
//             <MenuItem value="column">Column Chart</MenuItem>
//           </Select>
//         </Box>

//         {chartOptions && (
//           <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Chart;

import React, { useEffect, useRef, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import { getAllProjectDetails } from "../services/apiService";

const Chart = ({ theme, themeColor }) => {
  const chartRef = useRef(null);

  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterField, setFilterField] = useState("MANAGER_NM");
  const [chartType, setChartType] = useState("bar");

  const allowedFields = ["PRJ_NM", "MANAGER_NM", "DEPLOYMENT_DT", "LEAD_NM", "CURRENT_PHASE"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllProjectDetails();
        setProjectData(data);
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = useMemo(() => {
    if (!filterField || projectData.length === 0) {
      return null;
    }

    // Limit data to 20 entries
    const limitedData = projectData.slice(0, 20);

    // Group projects based on the selected filter field
    const groupedData = limitedData.reduce((acc, item) => {
      const xValue = item[filterField];
      if (!acc[xValue]) {
        acc[xValue] = [];
      }
      acc[xValue].push(item["PRJ_NM"]); // Collect project names
      return acc;
    }, {});

    // Prepare categories and series data
    const categories = Object.keys(groupedData); // X-axis values (e.g., manager names, deployment dates)
    const seriesData = categories.map((category) => ({
      name: category,
      y: groupedData[category].length,
      projects: groupedData[category].join(", "), // Concatenate project names
    }));

    return {
      chart: {
        type: chartType,
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      },
      title: { text: "Pictorial Representation of Projects" },
      credits: { enabled: false },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b><br>Projects: ${this.point.projects}`;
        },
      },
      xAxis: {
        categories,
        title: { text: filterField },
        labels: {
          style: { color: theme === "light" ? "#333333" : "#ffffff" },
        },
      },
      yAxis: {
        title: { text: "Projects", style: { color: theme === "light" ? "#333333" : "#ffffff" } },
        labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
      },
      series: [
        {
          name: "Projects",
          data: seriesData.map((item) => ({
            y: item.y, // Number of projects (bar height)
            name: item.name, // X-axis category
            projects: item.projects, // Tooltip details
          })),
          color: themeColor,
        },
      ],
    };
  }, [filterField, chartType, projectData, theme, themeColor]);

  useEffect(() => {
    if (chartRef.current && chartOptions) {
      const chart = chartRef.current.chart;
      chart.update(chartOptions, true, true);
    }
  }, [chartOptions]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
        <Box display="flex" gap={2} mb={2}>
          {/* Filter Dropdown */}
          <Select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            size="small"
            variant="outlined"
          >
            {allowedFields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>

          {/* Chart Type Dropdown */}
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            size="small"
            variant="outlined"
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="column">Column Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
          </Select>
        </Box>

        {chartOptions && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
        )}
      </Paper>
    </Box>
  );
};

export default Chart;
