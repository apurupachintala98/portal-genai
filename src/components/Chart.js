import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsReact from 'highcharts-react-official';
import { getAllProjectDetails } from "../services/apiService";
// import Exporting from 'highcharts/modules/exporting';

if (typeof HighchartsGantt === 'function') {
  HighchartsGantt(Highcharts);
}
// Exporting(Highcharts);

const Chart = ({ onCaptureImage }) => {
  const chartRef = useRef(null);
  const [projectData, setProjectData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedManager, setSelectedManager] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxDeploymentDate, setMaxDeploymentDate] = useState();
  const [minStartDate, setMinStartDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllProjectDetails();
        const uniqueManagers = [...new Set(data.map(project => project.STAFF_VP))];
        setManagers(uniqueManagers);

        const uniqueCategories = [...new Set(data.map(project => project.LLM_PLATFORM))];
        setCategories(uniqueCategories);

        setProjectData(data);
        setFilteredData(data);
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
    let filtered = projectData;
    if (selectedManager !== "All") {
      filtered = filtered.filter(project => project.STAFF_VP === selectedManager);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => project.LLM_PLATFORM === selectedCategory);
    }

    // Calculate the maximum deployment date from the filtered data
    // const maxDate = new Date(Math.max(...filtered.map(project => new Date(project.DEPLOYMENT_DT).getTime())));
    const maxDeploymentDate = new Date(Math.max(...filtered.map(project => {
      const d = new Date(project.DEPLOYMENT_DATE);
      return d.getTime();
    })));

    // Calculate the minimum start date from the filtered data
    const minStartDate = new Date(Math.min(...filtered.map(project => {
      const d = new Date(project.START_DATE);
      return d.getTime();
    })));

    // Ensure minStartDate is a valid date before setting it
    if (!isNaN(minStartDate.getTime())) {
      setMinStartDate(minStartDate);
    } else {
      setMinStartDate(undefined); // Default or fallback min date
    }

    // Ensure maxDate is a valid date before setting it
    if (!isNaN(maxDeploymentDate.getTime())) {
      setMaxDeploymentDate(maxDeploymentDate);
    } else {
      setMaxDeploymentDate(undefined); // Default or fallback max date
    }

    setFilteredData(filtered);
  }, [selectedManager, selectedCategory, projectData]);

  const options = {
    chart: {
      height: filteredData.length * 60  // Adjusting height based on number of rows
    },
    title: {
      text: ''
    },
    xAxis: [{
      tickInterval: 24 * 3600 * 1000 * 30, // Month
      labels: {
        formatter: function () {
          const date = new Date(this.value); // Convert timestamp to Date object
          const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
          return monthNames[date.getUTCMonth()]; // Use getUTCMonth to avoid timezone issues
        },
        padding: 0,
        style: {
          fontSize: '0.625rem',
          lineHeight: '1'
        }
      },
      min: minStartDate ? minStartDate.getTime() : undefined,
      max: maxDeploymentDate ? maxDeploymentDate.getTime() : undefined, 
    }, {
      tickInterval: 1000 * 60 * 60 * 24 * 365, // Year
      gridLineWidth: 1,
      grid: {
        cellHeight: 22
      },
      labels: {
        format: '{value:%Y}',
        padding: 0,
        style: {
          fontSize: '0.75rem',
          lineHeight: '1',
          fontWeight: 'bold'
        }
      },
    }],

    yAxis: {
      type: 'category',
      grid: {
        enabled: true,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        columns: [
          {
            title: { text: 'Project' },
            labels: { format: '{point.name}' }
          },
          {
            title: { text: 'Manager' },
            labels: { format: '{point.manager}' }
          },
          {
            title: { text: 'Status' },
            labels: { format: '{point.status}' }
          },
        ]
      }
    },
    tooltip: {
      xDateFormat: '%e %b %Y, %H:%M'
    },
    series: [
      {
        name: 'Projects',
        data: filteredData.map(project => {
          const deploymentDate = new Date(project.DEPLOYMENT_DATE).getTime();
          // const startDate = new Date('2024-09-01').getTime();
          const startDate = new Date(project.START_DATE).getTime();

          return {
            name: project.PROJECT_NAME,
            start: startDate,
            end: deploymentDate,
            manager: project.STAFF_VP,
            status: project.STATUS,
            color: "#2caffe",
            y: filteredData.indexOf(project)
          };
        })
      }
    ]
  };

  return (
    <div>
      <h1>Project Status</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '10px' }}>Manager:</label>
        <select
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="All">All</option>
          {managers.map(manager => (
            <option key={manager} value={manager}>{manager}</option>
          ))}
        </select>


        <label style={{ marginRight: '10px', marginLeft: '10px' }}>Platform:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="All">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={options} ref={chartRef} /> */}
      <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={options} />

    </div>
  );
};

export default Chart;
