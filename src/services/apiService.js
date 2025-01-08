import axios from "axios";

const BASE_URL = "https://llmgwassist.edagenaidev.awsdns.internal.das";
const Dashboard_BASE_URL = "http://10.126.192.122:3070";


export const getPlatforms = async () => {
  const response = await axios.get(`${BASE_URL}/llm_platform`);
  return response.data;
};

export const getModelsByPlatform = async (platform) => {
  const response = await axios.get(`${BASE_URL}/llm_platform/${platform}/models`);
  return response.data;
};

export const getLLMResponse = async (data) => {
  const response = await axios.put(`${BASE_URL}/get_llm_response/`, data);
  return response.data;
};

export const getAllProjectDetails = async () => {
  const response = await axios.get(`${Dashboard_BASE_URL}/get_all_project_details/`);
  return response.data;
};

export const insertNewProjectDetails = async (newProject) => {
  try {
    const response = await axios.post(
      `${Dashboard_BASE_URL}/insert_new_project_details/`, newProject);
    return response.data;
  } catch (error) {
    console.error("Error inserting new project details:", error);
    throw error;
  }
};

export const updateProjectDetails = async (sl_no, updatedProject) => {
  try {
    // Rename SL_NO to sl in the payload
    const { SL_NO, ...projectData } = updatedProject; // Exclude SL_NO from the original object
    const payload = { sl_no: SL_NO, ...projectData }; // Rename and include it as `sl`

    const response = await axios.post(`${Dashboard_BASE_URL}/update_project_details/`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project details:", error);
    throw error;
  }
};


// Delete project details
export const deleteProjectDetails = async (sl_no) => {
  try {
    const response = await axios.post(`${Dashboard_BASE_URL}/delete_project_details/`, sl_no);
    return response.data;
  } catch (error) {
    console.error("Error deleting project details:", error);
    throw error;
  }
};