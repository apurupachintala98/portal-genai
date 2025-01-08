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
  Chip,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getAllProjectDetails, insertNewProjectDetails, updateProjectDetails, deleteProjectDetails } from '../services/apiService';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [editRowId, setEditRowId] = useState(null); // Track editable row
  const [editedData, setEditedData] = useState({}); // Store edited values
  const [editedRow, setEditedRow] = useState(null); // For editing row
  const [isNewRow, setIsNewRow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
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
    setEditedRow({ SL_NO: projects.length + 1, PRJ_NM: "", LEAD_NM: "", MANAGER_NM: "", CURRENT_PHASE: "", LLM_PLATFORM: "", DEPLOYMENT_DT: "" });
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
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // const handleAddProject = async () => {
  //   try {
  //     await insertNewProjectDetails(newProject); // Add new project to the API
  //     setNewProject({
  //       PRJ_NM: "",
  //       LEAD_NM: "",
  //       MANAGER_NM: "",
  //       CURRENT_PHASE: "",
  //       LLM_PLATFORM: "",
  //       DEPLOYMENT_DT: "",
  //     }); // Reset the form
  //     fetchProjects(); // Refresh the project list
  //   } catch (error) {
  //     console.error("Failed to add project:", error);
  //     setError("Failed to add project. Please try again.");
  //   }
  // };

  const handleAddProject = async () => {
    try {
      // Create a new project with default values for all fields
      const sanitizedNewProject = {
        PRJ_NM: newProject.PRJ_NM || "",
        LEAD_NM: newProject.LEAD_NM || "",
        MANAGER_NM: newProject.MANAGER_NM || "",
        CURRENT_PHASE: newProject.CURRENT_PHASE || "",
        LLM_PLATFORM: newProject.LLM_PLATFORM || "",
        DEPLOYMENT_DT: newProject.DEPLOYMENT_DT || "",
        TGOV_NO: "", // Add other fields as empty strings or default values
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
      };
  
      // Call the API to insert the new project
      await insertNewProjectDetails(sanitizedNewProject);
  
      // Reset the new project form
      setNewProject({
        PRJ_NM: "",
        LEAD_NM: "",
        MANAGER_NM: "",
        CURRENT_PHASE: "",
        LLM_PLATFORM: "",
        DEPLOYMENT_DT: "",
      });
  
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
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Key Projects/ Milestone</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Assigned</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Manager</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Domain</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
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
                          project.CURRENT_PHASE === "Build"
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
                        value={editedData.DEPLOYMENT_DT || project.DEPLOYMENT_DT}
                        onChange={(e) => handleChange(e, "DEPLOYMENT_DT")}
                        fullWidth
                      />
                    ) : (
                      <Typography>{project.DEPLOYMENT_DT}</Typography>
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
                      value={editedData.PRJ_NM || ""}
                      onChange={(e) => handleChange(e, "PRJ_NM")}
                      fullWidth
                      placeholder="Enter Project Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={editedData.LEAD_NM || ""}
                      onChange={(e) => handleChange(e, "LEAD_NM")}
                      fullWidth
                      placeholder="Enter Lead Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={editedData.MANAGER_NM || ""}
                      onChange={(e) => handleChange(e, "MANAGER_NM")}
                      fullWidth
                      placeholder="Enter Manager Name"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={editedData.CURRENT_PHASE || "Build"}
                      onChange={(e) => handleChange(e, "CURRENT_PHASE")}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      value={editedData.LLM_PLATFORM || ""}
                      onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                      fullWidth
                      placeholder="Enter Domain"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    <TextField
                      type="date"
                      value={editedData.DEPLOYMENT_DT || ""}
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
                      onClick={() => handleAddProject()}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProjectTable;