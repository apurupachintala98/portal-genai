// import React, { useEffect, useRef, useMemo, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { Box, Paper, Typography, Select, MenuItem } from "@mui/material";
// import { getAllProjectDetails } from "../services/apiService";

// const Chart = ({ theme, themeColor }) => {
//   const chartRef = useRef(null);

//     // State to store project data
//     const [projectData, setProjectData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const isNumericField = (field) => {
//       return projectData.some((item) => !isNaN(parseFloat(item[field])));
//   };

//     useEffect(() => {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const data = await getAllProjectDetails();
//           setProjectData(data);
//         } catch (err) {
//           console.error("Error fetching project data:", err);
//           setError("Failed to load project data.");
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//   // Extract available fields
//   const fields = projectData.length > 0 ? Object.keys(projectData[0]) : [];
//   // Define allowed X-axis options
//   const allowedXAxisFields = [
//       "PRJ_NM",
//       "MANAGER_NM",
//       "DEPLOYMENT_DT",
//       "CURRENT_PHASE",
//   ];

//   // Filter dropdown options
//   const xAxisOptions = fields.filter(
//       (field) => allowedXAxisFields.includes(field)
//   );
//   const yAxisOptions = fields.filter(isNumericField);

//   // Default selected fields
//   const [xAxisField, setXAxisField] = useState(xAxisOptions[0]); // Default to the first allowed option
//   const [yAxisField, setYAxisField] = useState(yAxisOptions[0]);
//   const [chartType, setChartType] = useState("column"); // Default chart type

//   // Chart options
//   const chartOptions = useMemo(
//       () => ({
//           chart: {
//               type: chartType,
//               backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//           },
//           title: { text: "Pictorial Representation of Projects" },
//           credits: { enabled: false },
//           xAxis: {
//               categories: projectData.map((item) => item[xAxisField]),
//               title: { text: xAxisField },
//               labels: {
//                   style: { color: theme === "light" ? "#333333" : "#ffffff" },
//               },
//           },
//           yAxis: {
//               title: { text: yAxisField, style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//               labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//           },
//           series: [
//               {
//                   name: yAxisField,
//                   data: projectData.map((item) => parseFloat(item[yAxisField]) || 0),
//                   color: themeColor,
//               },
//           ],
//       }),
//       [xAxisField, yAxisField, theme, themeColor, chartType]
//   );

//   // Update chart dynamically
//   useEffect(() => {
//       if (chartRef.current) {
//           const chart = chartRef.current.chart;
//           chart.update(chartOptions, true, true);
//       }
//   }, [chartOptions]);

//   return (
//       <Box sx={{ p: 3 }}>
//           <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                   Pictorial Representation of Projects
//               </Typography>

//               {/* Dropdowns */}
//               <Box display="flex" gap={2} mb={2}>
//                   {/* X-Axis Dropdown */}
//                   <Select
//                       value={xAxisField}
//                       onChange={(e) => setXAxisField(e.target.value)}
//                       size="small"
//                       variant="outlined"
//                   >
//                       {xAxisOptions.map((option) => (
//                           <MenuItem key={option} value={option}>
//                               X-Axis: {option}
//                           </MenuItem>
//                       ))}
//                   </Select>

//                   {/* Y-Axis Dropdown */}
//                   <Select
//                       value={yAxisField}
//                       onChange={(e) => setYAxisField(e.target.value)}
//                       size="small"
//                       variant="outlined"
//                   >
//                       {yAxisOptions.map((option) => (
//                           <MenuItem key={option} value={option}>
//                               Y-Axis: {option}
//                           </MenuItem>
//                       ))}
//                   </Select>

//                   {/* Chart Type Dropdown */}
//                   <Select
//                       value={chartType}
//                       onChange={(e) => setChartType(e.target.value)}
//                       size="small"
//                       variant="outlined"
//                   >
//                       <MenuItem value="pie">Variable Radius Pie</MenuItem>
//                       <MenuItem value="line">Line Chart</MenuItem>
//                       <MenuItem value="area">Area Chart</MenuItem>
//                       <MenuItem value="bar">Basic Bar Chart</MenuItem>
//                       <MenuItem value="column">Basic Column Chart</MenuItem>
//                   </Select>
//               </Box>

//               {/* Chart */}
//               <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
//           </Paper>
//       </Box>
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

  // Helper function to determine numeric fields
  const isNumericField = (field) =>
    projectData.some((item) => !isNaN(parseFloat(item[field])));

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

  const fields = projectData.length > 0 ? Object.keys(projectData[0]) : [];
  const allowedXAxisFields = ["PRJ_NM", "MANAGER_NM", "DEPLOYMENT_DT", "CURRENT_PHASE"];
  const xAxisOptions = fields.filter((field) => allowedXAxisFields.includes(field));
  const yAxisOptions = fields.filter(isNumericField);

  const [xAxisField, setXAxisField] = useState(xAxisOptions[0] || "");
  const [yAxisField, setYAxisField] = useState(yAxisOptions[0] || "");
  const [chartType, setChartType] = useState("column");

  const chartOptions = useMemo(() => {
    return {
      chart: {
        type: chartType,
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      },
      title: { text: "Pictorial Representation of Projects" },
      credits: { enabled: false },
      xAxis: {
        categories: projectData.map((item) => item[xAxisField]),
        title: { text: xAxisField || "X-Axis" },
        labels: {
          style: { color: theme === "light" ? "#333333" : "#ffffff" },
        },
      },
      yAxis: {
        title: { text: yAxisField || "Y-Axis", style: { color: theme === "light" ? "#333333" : "#ffffff" } },
        labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
      },
      series: [
        {
          name: yAxisField || "Data",
          data: projectData.map((item) => parseFloat(item[yAxisField]) || 0),
          color: themeColor,
        },
      ],
    };
  }, [xAxisField, yAxisField, theme, themeColor, chartType, projectData]);

  useEffect(() => {
    if (chartRef.current) {
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
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Pictorial Representation of Projects
        </Typography>

        <Box display="flex" gap={2} mb={2}>
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

          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            size="small"
            variant="outlined"
          >
            <MenuItem value="pie">Variable Radius Pie</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="bar">Basic Bar Chart</MenuItem>
            <MenuItem value="column">Basic Column Chart</MenuItem>
          </Select>
        </Box>

        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
      </Paper>
    </Box>
  );
};

export default Chart;

