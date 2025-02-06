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
  const [deploymentDate, setDeploymentDate] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllProjectDetails();
        const uniqueManagers = [...new Set(data.map(project => project.MANAGER_NM))];
        console.log("Unique Managers:", uniqueManagers); // Check the fetched and processed manager names
        setManagers(uniqueManagers);

        const uniqueCategories = [...new Set(data.map(project => project.CATEGORY))];
        setCategories(uniqueCategories);

        setProjectData(data);
        setFilteredData(data);
        // Assume you want to set the deployment date of the first project or a specific project
        const firstProjectDeploymentDate = new Date(data[0].DEPLOYMENT_DT);
        setDeploymentDate(firstProjectDeploymentDate);
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
      filtered = filtered.filter(project => project.MANAGER_NM === selectedManager);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => project.CATEGORY === selectedCategory);
    }
    setFilteredData(filtered);
  }, [selectedManager, selectedCategory, projectData]);


  // Effect to update chart when deployment date changes
  useEffect(() => {
    setChartOptions(prevOptions => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        max: deploymentDate.getTime()
      }
    }));
  }, [deploymentDate]);

  const [options, setChartOptions] = useState({    
    chart: {
      height: filteredData.length * 70  // Adjusting height based on number of rows
    },
    title: {
      text: ''
    },

    xAxis: {
      type: 'datetime',
      min: Date.UTC(2024, 0, 1), // Fixed start date: January 1, 2024
      max: deploymentDate.getTime(), // Set dynamically based on API data
      tickInterval: 24 * 3600 * 1000 * 30, // approx. one month in milliseconds
      labels: {
        format: '{value:%Y}', // Display the year
        align: 'high', // Position labels at the top of the axis
        style: {
          color: '#333333'
        }
      },
      dateTimeLabelFormats: {
        month: '%b', // Three-letter abbreviation for the month
        year: '%Y'
      }
    },

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
            title: { text: 'Start date' },
            labels: { format: '{point.start:%d %b %Y}' }
          },
          {
            title: { text: 'End date' },
            offset: 30,
            labels: { format: '{point.end:%d %b %Y}' }
          }
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
          const deploymentDate = new Date(project.DEPLOYMENT_DT).getTime();
          const startDate = new Date('2024-09-01').getTime();

          return {
            name: project.PRJ_NM,
            start: startDate,
            end: deploymentDate,
            manager: project.MANAGER_NM,
            y: filteredData.indexOf(project)
          };
        })
      }
    ]
  });

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


        <label style={{ marginRight: '10px', marginLeft: '10px' }}>Category:</label>
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

      <HighchartsReact highcharts={Highcharts} constructorType={'ganttChart'} options={options} />
    </div>
  );
};

export default Chart;
