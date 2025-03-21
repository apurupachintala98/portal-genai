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
  MenuItem, Dialog, DialogContent, Grid, DialogActions
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import "../App.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FilterList, Save as SaveIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { getAllProjectDetails, insertNewProjectDetails, updateProjectDetails, deleteProjectDetails } from '../services/apiService';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // Track editable row
  const [editedData, setEditedData] = useState({}); // Store edited values
  const [isNewRow, setIsNewRow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [showAllOptions, setShowAllOptions] = useState({});
  const dateFields = new Set(["Deployment_Date", "Start_Date"]);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [newProject, setNewProject] = useState({
    Staff_VP: "",
    Director: "",
    LEAD_NM: "",
    TGOV_NO: "",
    Program_Type: "",
    Project_Name: "",
    Project_Description: "",
    LLM_PLATFORM: "",
    LLM_MODEL: "",
    Platform_Services: "",
    data: "",
    Business_User: "",
    Start_Date: new Date(),
    Deployment_Date: "",
    Current_Phase: "",
    status: "",
    Link_to_Slide: ""
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


  const handleAddClick = () => {
    setIsNewRow(true);
    setEditedData({
      SL_NO: projects.length > 0 ? Math.max(...projects.map(p => p.SL_NO)) + 1 : 1,
      Staff_VP: "",
      Director: "",
      LEAD_NM: "",
      TGOV_NO: "",
      Program_Type: "",
      Project_Name: "",
      Project_Description: "",
      LLM_PLATFORM: "",
      LLM_MODEL: "",
      Platform_Services: "",
      data: "",
      Business_User: "",
      Start_Date: "",
      Deployment_Date: "",
      Current_Phase: "",
      status: "",
      Link_to_Slide: ""
    });
    setOpenDialog(true);
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

  const handleSaveProject = async () => {
    if (isNewRow) {
      await handleAddProject();
    } else {
      await handleSave(editRowId);
    }
    setOpenDialog(false);
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

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  // const handleChange = (e, field) => {
  //   let value = e.target.value;

  //   // Check if the field is a date field and the value is empty, then set to null
  //   if (dateFields.has(field) && value === "") {
  //     value = null;
  //   }

  //   if (isNewRow) {
  //     setNewProject((prev) => ({ ...prev, [field]: value }));
  //   } else {
  //     setEditedData((prev) => ({ ...prev, [field]: value }));
  //   }
  // };


  const handleAddProject = async () => {
    try {
      // Save the new project to the database
      await insertNewProjectDetails(newProject);

      // Refresh the project list and reset the state
      fetchProjects();
      setNewProject({});
      setIsNewRow(false);
    } catch (error) {
      console.error("Failed to add project:", error);
      setError("Failed to add project. Please try again.");
    }
  };

  const handleEditClick = (sl_no) => {
    const project = projects.find((p) => p.SL_NO === sl_no);
    setEditRowId(sl_no);
    setEditedData({
      Staff_VP: project.STAFF_VP || "",
      Director: project.DIRECTOR || "",
      LEAD_NM: project.LEAD_NM || "",
      TGOV_NO: project.TGOV_NO || "",
      Program_Type: project.PROGRAM_TYPE || "",
      Project_Name: project.PROJECT_NAME || "",
      Project_Description: project.PROJECT_DESCRIPTION || "",
      LLM_PLATFORM: project.LLM_PLATFORM || "",
      LLM_MODEL: project.LLM_MODEL || "",
      Platform_Services: project.PLATFORM_SERVICES || "",
      data: project.DATA || "",
      Business_User: project.BUSINESS_USER || "",
      Start_Date: project.START_DATE || "",
      Deployment_Date: project.DEPLOYMENT_DATE || "",
      Current_Phase: project.CURRENT_PHASE || "",
      status: project.STATUS || "",
      Link_to_Slide: project.LINK_TO_SLIDE || ""
    });
    setOpenDialog(true);
    setIsNewRow(false);
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
                  { label: "SL.NO", key: "SL_NO" },
                  { label: "Key Projects/ Milestone", key: "PROJECT_NAME" },
                  { label: "Lead", key: "LEAD_NM" },
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
              {filteredProjects.map((project, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px" }}>
                    <Typography>{index + 1}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px" }}>

                    <Typography>{project.PROJECT_NAME}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>

                    <Typography>{project.LEAD_NM}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>

                    <Typography>{project.STAFF_VP}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>

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
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>
                    <Typography>{project.LLM_PLATFORM}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>
                    <Typography>{project.DEPLOYMENT_DATE.split(" ")[0]}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", padding: "6px", paddingLeft: "18px", textAlign: "center" }}>
                    <>
                      <IconButton color="primary" onClick={() => handleEditClick(project.SL_NO)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small" onClick={() => {
                        setRowToDelete(project.SL_NO);
                        setConfirmDeleteOpen(true);
                      }} >
                        <DeleteIcon />
                      </IconButton>
                    </>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <Grid container spacing={2}>
              {Object.keys(isNewRow ? newProject : editedData).map((field) => (
                <Grid item xs={6} key={field}>
                  <TextField
                    fullWidth
                    size="small"
                    type={field === 'Deployment_Date' || field === 'Start_Date' ? 'date' : 'text'}
                    label={field.replace('_', ' ')}
                    value={(isNewRow ? newProject[field] : editedData[field]) || ''}
                    InputLabelProps={{
                      shrink: field === 'Deployment_Date' || field === 'Start_Date' ? true : undefined,
                    }}
                    required={field === 'Deployment_Date' || field === 'Start_Date'}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isNewRow) {
                        setNewProject((prev) => ({ ...prev, [field]: value }));
                      } else {
                        setEditedData((prev) => ({ ...prev, [field]: value }));
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveProject}
              disabled={
                isNewRow
                  ? !newProject.Deployment_Date || !newProject.Start_Date
                  : !editedData.Deployment_Date || !editedData.Start_Date
              }
            >
              {isNewRow ? 'Add' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
        >
          <DialogContent>
            <Typography>Are you sure you want to delete this project?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                await handleDelete(rowToDelete);
                setConfirmDeleteOpen(false);
                setRowToDelete(null);
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>


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