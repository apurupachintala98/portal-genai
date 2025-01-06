import axios from "axios";

const BASE_URL = "https://llmgwassist.edagenaidev.awsdns.internal.das";
const Dashboard_BASE_URL = "http://10.126.192.122:3070/";


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
