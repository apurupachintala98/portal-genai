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

  // Default X-axis and Y-axis options
  const [xAxisField, setXAxisField] = useState("");
  const [yAxisField, setYAxisField] = useState("");
  const [chartType, setChartType] = useState("column");

  const allowedXAxisFields = ["PRJ_NM", "MANAGER_NM", "DEPLOYMENT_DT", "LEAD_NM", "CURRENT_PHASE"];
  const allowedYAxisFields = ["SL_NO", "MANAGER_NM", "DEPLOYMENT_DT"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllProjectDetails();
        setProjectData(data);

        // Set default fields for X-axis and Y-axis
        setXAxisField(allowedXAxisFields[0]); // Default to the first allowed X-axis field
        setYAxisField(allowedYAxisFields[0]); // Default to the first allowed Y-axis field
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatYAxisData = (field, value) => {
    if (field === "DEPLOYMENT_DT") {
      return new Date(value).toLocaleDateString(); // Format dates for readability
    }
    return value; // Return other fields as-is
  };

  const chartOptions = useMemo(() => {
    if (!xAxisField || !yAxisField || projectData.length === 0) {
      return null;
    }

    return {
      chart: {
        type: chartType,
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      },
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
          data: projectData.map((item) =>
            yAxisField === "DEPLOYMENT_DT"
              ? new Date(item[yAxisField]).getTime()
              : parseFloat(item[yAxisField]) || 0
          ),
          color: themeColor,
        },
      ],
    };
  }, [xAxisField, yAxisField, theme, themeColor, chartType, projectData]);

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
          {/* X-Axis Dropdown */}
          <Select
            value={xAxisField}
            onChange={(e) => setXAxisField(e.target.value)}
            size="small"
            variant="outlined"
          >
            {allowedXAxisFields.map((option) => (
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
            {allowedYAxisFields.map((option) => (
              <MenuItem key={option} value={option}>
                Y-Axis: {option}
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
            <MenuItem value="pie">Variable Radius Pie</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="bar">Basic Bar Chart</MenuItem>
            <MenuItem value="column">Basic Column Chart</MenuItem>
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

