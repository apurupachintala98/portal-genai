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
import { getAllProjectDetails, insertNewProjectDetails, updateProjectDetails, deleteProjectDetails  } from '../services/apiService';

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

  // const handleFieldChange = (field, value) => {
  //   setEditedRow((prev) => ({ ...prev, [field]: value }));
  // };


  // const handleEditClick = (id) => {
  //   setEditedRow(id);
  // };

  // const handleSaveClick = () => {
  //   setProjects((prevProjects) => {
  //     if (isNewRow) {
  //       // Add the new project
  //       return [...prevProjects, { SL_NO: prevProjects.length + 1, ...editedRow }];
  //     } else {
  //       // Update the edited project
  //       return prevProjects.map((proj) =>
  //         proj.SL_NO === editedRow.id ? { ...proj, ...editedRow } : proj
  //       );
  //     }
  //   });
  //   setEditedRow(null);
  //   setIsNewRow(false);
  // };

  // const handleSave = (id) => {
  //   if (isNewRow) {
  //     // Add the new project to the table
  //     setProjects((prev) => [...prev, { ...editedData, SL_NO: projects.length + 1 }]);
  //     setIsNewRow(false);
  //   } else {
  //     // Update the existing project
  //     const updatedProjects = projects.map((proj) =>
  //       proj.SL_NO === id ? { ...proj, ...editedData } : proj
  //     );
  //     setProjects(updatedProjects);
  //   }

  //   setEditRowId(null);
  //   setEditedData({});
  // };

  const handleSave = async (sl_no) => {
    try {
      await updateProjectDetails(sl_no, editedData); // Call the API to update the project
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

  const handleAddProject = async () => {
    try {
      await insertNewProjectDetails(newProject); // Add new project to the API
      setNewProject({
        PRJ_NM: "",
        LEAD_NM: "",
        MANAGER_NM: "",
        CURRENT_PHASE: "",
        LLM_PLATFORM: "",
        DEPLOYMENT_DT: "",
      }); // Reset the form
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Failed to add project:", error);
      setError("Failed to add project. Please try again.");
    }
  };
  const handleEditClick = (sl_no) => {
    const project = projects.find((p) => p.SL_NO === sl_no);
    setEditRowId(sl_no);
    setEditedData(project);
  };

  const handleUpdateProject = async (sl_no, updatedData) => {
    try {
      await updateProjectDetails(sl_no, updatedData);
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDeleteProject = async (sl_no) => {
    try {
      await deleteProjectDetails(sl_no);
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // const handleDelete = (id) => {
  //   const updatedProjects = projects.filter((proj) => proj.SL_NO !== id);
  //   setProjects(updatedProjects);
  //   setEditRowId(null);
  // };


  // const columns = [
  //   {
  //     field: "PRJ_NM",
  //     headerName: "Key Projects/ Milestone",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           value={editedRow.PRJ_NM}
  //           onChange={(e) => handleFieldChange("PRJ_NM", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Typography>{params.row.PRJ_NM}</Typography>
  //       );
  //     },
  //   },
  //   {
  //     field: "LEAD_NM",
  //     headerName: "Assigned",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           value={editedRow.LEAD_NM}
  //           onChange={(e) => handleFieldChange("LEAD_NM", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Typography>{params.row.LEAD_NM}</Typography>
  //       );
  //     },
  //   },
  //   {
  //     field: "MANAGER_NM",
  //     headerName: "Manager",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           value={editedRow.MANAGER_NM}
  //           onChange={(e) => handleFieldChange("MANAGER_NM", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Typography>{params.row.MANAGER_NM}</Typography>
  //       );
  //     },
  //   },
  //   {
  //     field: "CURRENT_PHASE",
  //     headerName: "Status",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           value={editedRow.CURRENT_PHASE}
  //           onChange={(e) => handleFieldChange("CURRENT_PHASE", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Chip label={params.row.CURRENT_PHASE} />
  //       );
  //     },
  //   },
  //   {
  //     field: "LLM_PLATFORM",
  //     headerName: "Domain",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           value={editedRow.LLM_PLATFORM}
  //           onChange={(e) => handleFieldChange("LLM_PLATFORM", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Typography>{params.row.LLM_PLATFORM}</Typography>
  //       );
  //     },
  //   },
  //   {
  //     field: "DEPLOYMENT_DT",
  //     headerName: "Date",
  //     flex: 1,
  //     renderCell: (params) => {
  //       return params.row.SL_NO === editedRow?.id ? (
  //         <TextField
  //           type="date"
  //           value={editedRow.DEPLOYMENT_DT}
  //           onChange={(e) => handleFieldChange("DEPLOYMENT_DT", e.target.value)}
  //           size="small"
  //         />
  //       ) : (
  //         <Typography>{params.row.DEPLOYMENT_DT}</Typography>
  //       );
  //     },
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     flex: 1,
  //     renderCell: (params) => {
  //       const isEditing = params.row.SL_NO === editedRow?.id;
  //       return isEditing ? (
  //         <Button
  //           variant="contained"
  //           size="small"
  //           color="success"
  //           startIcon={<SaveIcon />}
  //           onClick={handleSaveClick}
  //         >
  //           Save
  //         </Button>
  //       ) : (
  //         <>
  //           <IconButton color="primary" onClick={() => handleEditClick(params.row.SL_NO)}>
  //             <EditIcon />
  //           </IconButton>
  //           <IconButton color="error" onClick={() => handleDeleteClick(params.row.SL_NO)}>
  //             <DeleteIcon />
  //           </IconButton>
  //         </>
  //       );
  //     },
  //   },
  // ];

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

       {/* <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Key Projects/ Milestone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Assigned</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Manager</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Domain</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.SL_NO} hover>
                  <TableCell>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.PRJ_NM || project.PRJ_NM}
                        onChange={(e) => handleChange(e, "PRJ_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography fontWeight="bold">{project.PRJ_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.LEAD_NM || project.LEAD_NM}
                        onChange={(e) => handleChange(e, "LEAD_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography fontWeight="bold">{project.LEAD_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {editRowId === project.SL_NO ? (
                      <TextField
                        value={editedData.MANAGER_NM || project.MANAGER_NM}
                        onChange={(e) => handleChange(e, "MANAGER_NM")}
                        fullWidth
                      />
                    ) : (
                      <Typography fontWeight="bold">{project.MANAGER_NM}</Typography>
                    )}
                  </TableCell>

                  <TableCell>
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

                  <TableCell>
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

                  <TableCell>
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

                  <TableCell>
                    {editRowId === project.id ? (
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
                        <IconButton color="primary" onClick={() => handleEdit(project.SL_NO)}>
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
                  <TableCell>
                    <TextField
                      value={editedData.PRJ_NM || ""}
                      onChange={(e) => handleChange(e, "PRJ_NM")}
                      fullWidth
                      placeholder="Enter Project Name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editedData.LEAD_NM || ""}
                      onChange={(e) => handleChange(e, "LEAD_NM")}
                      fullWidth
                      placeholder="Enter Lead Name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editedData.MANAGER_NM || ""}
                      onChange={(e) => handleChange(e, "MANAGER_NM")}
                      fullWidth
                      placeholder="Enter Manager Name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editedData.CURRENT_PHASE || "Build"}
                      onChange={(e) => handleChange(e, "CURRENT_PHASE")}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editedData.LLM_PLATFORM || ""}
                      onChange={(e) => handleChange(e, "LLM_PLATFORM")}
                      fullWidth
                      placeholder="Enter Domain"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={editedData.DEPLOYMENT_DT || ""}
                      onChange={(e) => handleChange(e, "DEPLOYMENT_DT")}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave()}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>  */}
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