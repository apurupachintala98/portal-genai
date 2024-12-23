import React, { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

// Dummy data for projects
const initialProjects = [
    {
      id: 1,
      name: "Sunil Joshi",
      role: "Web Designer",
      project: "Elite Admin",
      priority: "Low",
      status: "Completed",
      date: "2023-12-10",
      avatar: "/avatars/sunil.png",
    },
    {
      id: 2,
      name: "John Deo",
      role: "Web Developer",
      project: "Flexy Admin",
      priority: "Medium",
      status: "In Progress",
      date: "2023-12-15",
      avatar: "/avatars/john.png",
    },
    {
      id: 3,
      name: "Sara Smith",
      role: "UI/UX Designer",
      project: "Material Pro",
      priority: "High",
      status: "Pending",
      date: "2024-01-05",
      avatar: "/avatars/sara.png",
    },
    {
      id: 4,
      name: "David Warner",
      role: "Frontend Developer",
      project: "Xtreme Admin",
      priority: "Low",
      status: "Completed",
      date: "2024-01-10",
      avatar: "/avatars/david.png",
    },
    {
      id: 5,
      name: "Emily Johnson",
      role: "Project Manager",
      project: "Modernize Dashboard",
      priority: "Very High",
      status: "In Progress",
      date: "2024-01-15",
      avatar: "/avatars/emily.png",
    },
    {
      id: 6,
      name: "Michael Brown",
      role: "Backend Developer",
      project: "CRM Dashboard",
      priority: "Medium",
      status: "Pending",
      date: "2024-02-01",
      avatar: "/avatars/michael.png",
    },
    {
      id: 7,
      name: "Jessica Wilson",
      role: "QA Engineer",
      project: "Test Manager",
      priority: "Low",
      status: "Completed",
      date: "2024-02-12",
      avatar: "/avatars/jessica.png",
    },
    {
      id: 8,
      name: "Robert Taylor",
      role: "Full Stack Developer",
      project: "Ecommerce Pro",
      priority: "High",
      status: "In Progress",
      date: "2024-02-18",
      avatar: "/avatars/robert.png",
    },
    {
      id: 9,
      name: "Olivia Martinez",
      role: "Graphic Designer",
      project: "Portfolio Site",
      priority: "Medium",
      status: "Pending",
      date: "2024-03-02",
      avatar: "/avatars/olivia.png",
    },
    {
      id: 10,
      name: "Daniel Thomas",
      role: "DevOps Engineer",
      project: "Cloud Manager",
      priority: "Very High",
      status: "Completed",
      date: "2024-03-10",
      avatar: "/avatars/daniel.png",
    },
  ];
  

const ProjectTable = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [editRowId, setEditRowId] = useState(null); // Track editable row
  const [editedData, setEditedData] = useState({}); // Store edited values

  // Enable editing for a row
  const handleEdit = (id) => {
    setEditRowId(id);
    const projectToEdit = projects.find((proj) => proj.id === id);
    setEditedData(projectToEdit);
  };

  // Handle field change
  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Save updated data
  const handleSave = () => {
    const updatedProjects = projects.map((proj) =>
      proj.id === editRowId ? editedData : proj
    );
    setProjects(updatedProjects);
    setEditRowId(null); // Exit edit mode
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Projects
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Assigned</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Key Projects/ Milestone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} hover>
                  {/* Assigned */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={project.avatar} alt={project.name} sx={{ mr: 2 }} />
                      <Box>
                        <Typography fontWeight="bold">{project.name}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {project.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Editable Fields */}
                  <TableCell>
                    {editRowId === project.id ? (
                      <TextField
                        value={editedData.project}
                        onChange={(e) => handleChange(e, "project")}
                        fullWidth
                      />
                    ) : (
                      project.project
                    )}
                  </TableCell>

                  <TableCell>
                    {editRowId === project.id ? (
                      <TextField
                        value={editedData.status}
                        onChange={(e) => handleChange(e, "status")}
                        fullWidth
                      />
                    ) : (
                      <Chip
                        label={project.status}
                        color={
                          project.status === "Completed"
                            ? "success"
                            : project.status === "In Progress"
                            ? "warning"
                            : "error"
                        }
                        variant="outlined"
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    {editRowId === project.id ? (
                      <TextField
                        type="date"
                        value={editedData.date}
                        onChange={(e) => handleChange(e, "date")}
                        fullWidth
                      />
                    ) : (
                      project.date
                    )}
                  </TableCell>

                  <TableCell>
                    {editRowId === project.id ? (
                      <TextField
                        value={editedData.priority}
                        onChange={(e) => handleChange(e, "priority")}
                        fullWidth
                      />
                    ) : (
                      <Chip
                        label={project.priority}
                        color={
                          project.priority === "Low"
                            ? "success"
                            : project.priority === "Medium"
                            ? "warning"
                            : "error"
                        }
                        variant="outlined"
                      />
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    {editRowId === project.id ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton color="primary" onClick={() => handleEdit(project.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProjectTable;
