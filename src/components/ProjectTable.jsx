import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  Checkbox,
  Chip,
  IconButton,
  TextField,
  FormControlLabel,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import "../App.css";
import { FilterList, Save as SaveIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { getAllProjectDetails, insertNewProjectDetails, updateProjectDetails, deleteProjectDetails } from '../services/apiService';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // Track editable row
  const [editedData, setEditedData] = useState({}); // Store edited values
  const [editedRow, setEditedRow] = useState(null); // For editing row
  const [isNewRow, setIsNewRow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [showAllOptions, setShowAllOptions] = useState({});
  const [newProject, setNewProject] = useState({
    PROJECT_NAME: "",
    LEAD_NM: "",
    STAFF_VP: "",
    CURRENT_PHASE: "",
    LLM_PLATFORM: "",
    DEPLOYMENT_DATE: "",
  });
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterClick = (event, column) => {
    setSelectedColumn(column);
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
    setSelectedColumn(null);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => {
      const columnOptions = prev[selectedColumn] || [];
      if (columnOptions.includes(option)) {
        return {
          ...prev,
          [selectedColumn]: columnOptions.filter((item) => item !== option),
        };
      }
      return {
        ...prev,
        [selectedColumn]: [...columnOptions, option],
      };
    });
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      [selectedColumn]: selectedOptions[selectedColumn],
    }));
    handleFilterClose();
  };

  const getColumnOptions = (columnKey) => {
    const options = projects.map((project) => project[columnKey]);
    return [...new Set(options)]; // Get unique options
  };

  const filteredProjects = projects.filter((project) => {
    return Object.entries(filters).every(([key, values]) => {
      return values.length === 0 || values.includes(project[key]);
    });
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getAllProjectDetails();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch project data.");
    } finally {
      setLoading(false);
    }
  };

  // const handleAddClick = () => {
  //   setIsNewRow(true);
  //   setNewProject({
  //     SL_NO: projects.length > 0
  //       ? Math.max(...projects.map((p) => p.SL_NO)) + 1
  //       : 1, // Assign the next SL_NO
  //   STAFF_VP: "",
  //   DIRECTOR: "",
  //   LEAD_NM: "",
  //   TGOV_NO: "",
  //   PROGRAM_TYPE: "",
  //   PROJECT_NAME: "",
  //   PROJECT_DESCRIPTION: "",
  //   LLM_PLATFORM: "",
  //   LLM_MODEL: "",
  //   PLATFORM_SERVICES: "",
  //   DATA: "",
  //   BUSINESS_USER: "",
  //   START_DATE: "",
  //   DEPLOYMENT_DATE: "",
  //   CURRENT_PHASE: "",
  //   STATUS: "",
  //   LINK_TO_SLIDE: ""
  //   });
  // };


const handleAddClick = () => {
  setIsNewRow(true);
  setEditedData({
    SL_NO: projects.length > 0 ? Math.max(...projects.map(p => p.SL_NO)) + 1 : 1,
    PROJECT_NAME: "",
        LEAD_NM: "",
        STAFF_VP: "",
        DIRECTOR: "",
        TGOV_NO: "",
        PROGRAM_TYPE: "",
        PROJECT_DESCRIPTION: "",
        LLM_PLATFORM: "",
        LLM_MODEL: "",
        PLATFORM_SERVICES: "",
        DATA: "",
        BUSINESS_USER: "",
        START_DATE: "",
        DEPLOYMENT_DATE: "",
        CURRENT_PHASE: "",
        STATUS: "",
        LINK_TO_SLIDE: ""
  });
};

  // const handleSave = async (SL_NO) => {
  //   try {
  //     const sanitizedData = { ...editedData }; // Clone the data
  //     delete sanitizedData.SL_NO; // Remove SL_NO from the payload

  //     await updateProjectDetails(SL_NO, sanitizedData); // Pass SL_NO as a query parameter
  //     fetchProjects(); // Refresh the project list
  //     setEditRowId(null); // Exit edit mode
  //     setEditedData({});
  //   } catch (error) {
  //     console.error("Failed to update project:", error);
  //   }
  // };
  const handleSave = async () => {
    if (!editRowId) {
      console.error("No project selected for saving.");
      return;
    }

    try {
      await updateProjectDetails(editRowId, editedData);
      fetchProjects();
      setEditRowId(null);
      setEditedData({});
    } catch (error) {
      console.error("Failed to update project:", error);
      setError("Failed to update project. Please try again.");
    }
  };

  const handleDelete = async (sl_no) => {
    try {
      await deleteProjectDetails(sl_no);
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError("Failed to delete project. Please try again.");
    }
  };

  // const handleChange = (e, field) => {
  //   const value = e.target.value;
  //   if (isNewRow) {
  //     setNewProject((prev) => ({ ...prev, [field]: value }));
  //   } else {
  //     setEditedData((prev) => ({ ...prev, [field]: value }));
  //   }
  // };

  const handleChange = (event, field) => {
    const value = event.target.value;
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  // const handleAddProject = async () => {
  //   try {
  //     // Save the new project to the database
  //     await insertNewProjectDetails(newProject);

  //     // Refresh the project list and reset the state
  //     fetchProjects();
  //     setNewProject({});
  //     setIsNewRow(false);
  //   } catch (error) {
  //     console.error("Failed to add project:", error);
  //     setError("Failed to add project. Please try again.");
  //   }
  // };



  // const handleEditClick = (sl_no) => {
  //   const project = projects.find((p) => p.SL_NO === sl_no);
  //   setEditRowId(sl_no);
  //   setEditedData({ ...project }); // Clone the selected project for editing
  // };


  const handleAddProject = async () => {
    try {
      await insertNewProjectDetails(editedData);
      fetchProjects();
      setIsNewRow(false);
      setEditedData({});
    } catch (error) {
      console.error("Failed to add project:", error);
      setError("Failed to add project. Please try again.");
    }
  };

  const handleEditClick = (project) => {
    setEditRowId(project.SL_NO);
    setEditedData({ ...project });
  };

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
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Projects
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        > Add
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer>
          {/* <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "Key Projects/ Milestone", key: "PROJECT_NAME" },
                  { label: "Assigned", key: "LEAD_NM" },
                  { label: "Staff VP", key: "STAFF_VP" },
                  { label: "Status", key: "CURRENT_PHASE" },
                  { label: "Platform", key: "LLM_PLATFORM" },
                  { label: "Date", key: "DEPLOYMENT_DATE" },
                  { label: "Actions", key: null },
                ].map((column, index) => (
                  <TableCell key={column.key ? column.key : `column-${index}`} sx={{ fontWeight: "bold", fontSize: "16px", textAlign: index !== 0 ? "center" : "left" }}>
                    {column.label}
                    {column.key && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleFilterClick(e, column.key)}
                      >
                        <FilterList fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.SL_NO} hover>
                  <TableCell sx={{ fontSize: "14px", padding: "6px" , paddingLeft: "18px"}}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.PROJECT_NAME ?? project.PROJECT_NAME}
                        onChange={(e) => handleChange(e, "PROJECT_NAME")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.PROJECT_NAME}</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.LEAD_NM ?? project.LEAD_NM}
                        onChange={(e) => handleChange(e, "LEAD_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.LEAD_NM}</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.STAFF_VP ?? project.STAFF_VP}
                        onChange={(e) => handleChange(e, "STAFF_VP")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.STAFF_VP}</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.CURRENT_PHASE ?? project.CURRENT_PHASE}
                        onChange={(e) => handleChange(e, "CURRENT_PHASE")}
                        fullWidth
                      />
                    ) : (
                      <Chip
                        label={project.CURRENT_PHASE}
                        color={
                          project.CURRENT_PHASE === "Production"
                            ? "success"
                            : project.CURRENT_PHASE === "In Progress"
                              ? "warning"
                              : "error"
                        }
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.LLM_PLATFORM ?? project.LLM_PLATFORM}
                        onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.LLM_PLATFORM}</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" , padding: "6px",  paddingLeft: "18px", textAlign: "center"}}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        type="date"
                        value={(editedData.DEPLOYMENT_DATE ?? project.DEPLOYMENT_DATE)?.split(" ")[0]}
                        onChange={(e) => handleChange(e, "DEPLOYMENT_DATE")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.DEPLOYMENT_DATE.split(" ")[0]}</Typography>
                    )}
                  </TableCell>
                  {/* <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.CATEGORY ?? project.CATEGORY}
                        onChange={(e) => handleChange(e, "CATEGORY")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.CATEGORY}</Typography>
                    )}
                  </TableCell> 
                  <TableCell sx={{ fontSize: "14px", padding: "6px",  paddingLeft: "18px", textAlign: "center" }}>
                    {editRowId === project.SL_NO ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={() => handleSave(project.SL_NO)}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <IconButton color="primary" onClick={() => handleEditClick(project.SL_NO)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" size="small" onClick={() => handleDelete(project.SL_NO)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}

            
              {isNewRow && (
                <TableRow hover>
                  <TableCell >
                    <TextField
                      value={newProject.PROJECT_NAME}
                      onChange={(e) => handleChange(e, "PROJECT_NAME")}
                      fullWidth
                      placeholder="Enter Project Name"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newProject.LEAD_NM}
                      onChange={(e) => handleChange(e, "LEAD_NM")}
                      fullWidth
                      placeholder="Enter Lead Name"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newProject.STAFF_VP}
                      onChange={(e) => handleChange(e, "STAFF_VP")}
                      fullWidth
                      placeholder="Enter Manager Name"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newProject.CURRENT_PHASE}
                      onChange={(e) => handleChange(e, "CURRENT_PHASE")}
                      fullWidth
                      placeholder="Enter Current Phase"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newProject.LLM_PLATFORM}
                      onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                      fullWidth
                      placeholder="Enter Domain"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={newProject.DEPLOYMENT_DATE}
                      onChange={(e) => handleChange(e, "DEPLOYMENT_DATE")}
                      fullWidth
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <TextField
                      value={newProject.CATEGORY}
                      onChange={(e) => handleChange(e, "CATEGORY")}
                      fullWidth
                      placeholder="Enter Category"
                      sx={{padding: "6.5px 14px"}}
                    />
                  </TableCell> 
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={handleAddProject}
                      sx={{padding: "6.5px 14px"}}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table> */}

<Table>
          <TableHead>
            <TableRow>
              {["Key Projects/Milestone", "Assigned", "Staff VP", "Status", "Platform", "Date", "Actions"].map((label, index) => (
                <TableCell key={index} sx={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(isNewRow ? [editedData, ...projects] : projects).map((project, index) => (
              <TableRow key={project.SL_NO || index} hover>
                {["PROJECT_NAME", "LEAD_NM", "STAFF_VP", "CURRENT_PHASE", "LLM_PLATFORM", "DEPLOYMENT_DATE"].map((field, idx) => (
                  <TableCell key={idx}>
                    {(editRowId === project.SL_NO || isNewRow) ? (
                      <TextField
                        value={editedData[field] || ''}
                        onChange={(e) => handleChange(e, field)}
                        type={field === "DEPLOYMENT_DATE" ? "date" : "text"}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project[field]}</Typography>
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editRowId === project.SL_NO || isNewRow ? (
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => handleEditClick(project)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(project.SL_NO)}><DeleteIcon /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>

        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={handleFilterClose}
        >
          <div style={{ padding: "10px", maxHeight: "300px", overflowY: "auto" }}>
            {selectedColumn && (
              <>
                {getColumnOptions(selectedColumn)
                  .slice(0, showAllOptions[selectedColumn] ? undefined : 5)
                  .map((option) => (
                    <div key={option} style={{ display: "block" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              (selectedOptions[selectedColumn] || []).includes(option)
                            }
                            onChange={() => handleCheckboxChange(option)}
                          />
                        }
                        label={option}
                      />
                    </div>
                  ))}

                {getColumnOptions(selectedColumn).length > 5 && (
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() =>
                        setShowAllOptions((prev) => ({
                          ...prev,
                          [selectedColumn]: !prev[selectedColumn],
                        }))
                      }
                    >
                      {showAllOptions[selectedColumn] ? "Show Less" : "More"}
                    </Button>
                  </div>
                )}
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={handleApplyFilters}
              style={{ marginTop: "10px" }}
            >
              Apply
            </Button>
          </div>
        </Menu>

      </Paper>
    </Box>
  );
};

export default ProjectTable;