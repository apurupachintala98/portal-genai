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
    PRJ_NM: "",
    LEAD_NM: "",
    MANAGER_NM: "",
    CURRENT_PHASE: "",
    LLM_PLATFORM: "",
    DEPLOYMENT_DT: "",
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

  const handleFilterChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      [selectedColumn]: value,
    }));
    handleFilterClose();
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

  const handleAddClick = () => {
    const nextSL_NO = projects.length > 0
      ? Math.max(...projects.map((p) => p.SL_NO)) + 1
      : 1;

    setIsNewRow(true);
    setNewProject({
      SL_NO: nextSL_NO, // Assign the calculated SL_NO
      PRJ_NM: "",
      LEAD_NM: "",
      MANAGER_NM: "",
      CURRENT_PHASE: "Build", // Default status
      LLM_PLATFORM: "",
      DEPLOYMENT_DT: "",
      TGOV_NO: "",
      APM_NO: "",
      LLM_MODEL: "",
      APP_TYPE: "",
      PRJ_DESC: "",
      BASE_APLCTN_NM: "",
      EKS_ENABLED_YN: "",
      REACT_UI_ENABLED_YN: "",
      AI_TASKFORCE_REVIEWED_YN: "",
      AI_TASKFORCE_APPROVED_YN: "",
      TARGET_USERS: "",
      COMMENTS: "",
    });
  };

  const handleSave = async (SL_NO) => {
    try {
      const sanitizedData = { ...editedData }; // Clone the data
      delete sanitizedData.SL_NO; // Remove SL_NO from the payload

      await updateProjectDetails(SL_NO, sanitizedData); // Pass SL_NO as a query parameter
      fetchProjects(); // Refresh the project list
      setEditRowId(null); // Exit edit mode
      setEditedData({});
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = async (sl_no) => {
    try {
      await deleteProjectDetails(sl_no); // Call the API to delete the project
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (isNewRow) {
      // Update the new project data
      setNewProject((prev) => ({ ...prev, [field]: value }));
    } else {
      // Update the edited row data
      setEditedData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddProject = async () => {
    try {
      const sanitizedNewProject = { ...newProject };
      await insertNewProjectDetails(sanitizedNewProject);
      setNewProject({});
      setIsNewRow(false);

      // Refresh the project list
      fetchProjects();
    } catch (error) {
      console.error("Failed to add project:", error);
      setError("Failed to add project. Please try again.");
    }
  };


  const handleEditClick = (sl_no) => {
    const project = projects.find((p) => p.SL_NO === sl_no);
    setEditRowId(sl_no);
    setEditedData({ ...project }); // Clone the selected project for editing
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
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "Key Projects/ Milestone", key: "PRJ_NM" },
                  { label: "Assigned", key: "LEAD_NM" },
                  { label: "Manager", key: "MANAGER_NM" },
                  { label: "Status", key: "CURRENT_PHASE" },
                  { label: "Domain", key: "LLM_PLATFORM" },
                  { label: "Date", key: "DEPLOYMENT_DT" },
                  { label: "Actions", key: null },
                ].map((column) => (
                  <TableCell key={column.key} sx={{ fontWeight: "bold", fontSize: "16px" }}>
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
                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.PRJ_NM || project.PRJ_NM}
                        onChange={(e) => handleChange(e, "PRJ_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.PRJ_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.LEAD_NM || project.LEAD_NM}
                        onChange={(e) => handleChange(e, "LEAD_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.LEAD_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.MANAGER_NM || project.MANAGER_NM}
                        onChange={(e) => handleChange(e, "MANAGER_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.MANAGER_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.CURRENT_PHASE || project.CURRENT_PHASE}
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

                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.LLM_PLATFORM || project.LLM_PLATFORM}
                        onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.LLM_PLATFORM}</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: "14px" }}>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        type="date"
                        value={(editedData.DEPLOYMENT_DT || project.DEPLOYMENT_DT)?.split(" ")[0]}
                        onChange={(e) => handleChange(e, "DEPLOYMENT_DT")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.DEPLOYMENT_DT.split(" ")[0]}</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: "14px" }}>
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
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(project.SL_NO)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(project.SL_NO)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {isNewRow && (
                <TableRow hover>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={newProject.PRJ_NM || ""}
                      onChange={(e) => handleChange(e, "PRJ_NM")}
                      fullWidth
                      placeholder="Enter Project Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={newProject.LEAD_NM || ""}
                      onChange={(e) => handleChange(e, "LEAD_NM")}
                      fullWidth
                      placeholder="Enter Lead Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={newProject.MANAGER_NM || ""}
                      onChange={(e) => handleChange(e, "MANAGER_NM")}
                      fullWidth
                      placeholder="Enter Manager Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={newProject.CURRENT_PHASE || "Build"}
                      onChange={(e) => handleChange(e, "CURRENT_PHASE")}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={newProject.LLM_PLATFORM || ""}
                      onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                      fullWidth
                      placeholder="Enter Domain"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      type="date"
                      value={newProject.DEPLOYMENT_DT || ""}
                      onChange={(e) => handleChange(e, "DEPLOYMENT_DT")}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={handleAddProject}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table>
        </TableContainer>

        {/* <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={handleFilterClose}
        >
          <div style={{ padding: "10px", maxHeight: "300px", overflowY: "auto" }}>
            {selectedColumn &&
              getColumnOptions(selectedColumn).map((option) => (
                <FormControlLabel
                  key={option}
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
              ))}
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </div>
        </Menu> */}
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