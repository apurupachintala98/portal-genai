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
import { getAllProjectDetails } from "../services/apiService";


// Dummy data for projects
const initialProjects = [
  {
    "SL_NO": 1,
    "MANAGER_NM": "Nancy",
    "LEAD_NM": "Roopa A / Raj C",
    "TGOV_NO": "TGOV0001205",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "EDM3 Cost of Care Trend and Micro Trend",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDM3",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-03-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 2,
    "MANAGER_NM": "Nancy",
    "LEAD_NM": "Roopa A / Raj C",
    "TGOV_NO": "TGOV0001247",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "EDM3 DTM ML Plan",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDM3",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-03-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 3,
    "MANAGER_NM": "Nancy",
    "LEAD_NM": "Roopa A / Raj C",
    "TGOV_NO": "TGOV0001247",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "EDM3 Text to SQL ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-02-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 4,
    "MANAGER_NM": "Nancy",
    "LEAD_NM": "Roopa",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex / SLIP",
    "LLM_MODEL": "SQL Coder ",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "SDoH Community Builder",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "SDoH",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 5,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Biju",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "TBD",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Network Development ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 6,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Shankar Iyer",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "TBD",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Realtime Negotiation Assistant",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 7,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Shankar Iyer",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Contract Assist (IQT)",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 8,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Gregory Webster",
    "TGOV_NO": "TGOV000197",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex ",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Seamless E2E Onboarding",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 9,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Eleaine Fernandes",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex ",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Automated Data Configuration (RA, DART)",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 10,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Biju",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Network AI - Predictive Issue Resolution",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 11,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Shankar Iyer",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "SLIP",
    "LLM_MODEL": "nan",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "Provider Contract AI ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Production",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-08-24 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 12,
    "MANAGER_NM": "Ninad",
    "LEAD_NM": "Eleaine Fernandes",
    "TGOV_NO": "TGOV0001398",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "Roster Automation (RMA.AI)",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-12-24 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 13,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Krishnan",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "Mistral 8B",
    "APP_TYPE": "TO",
    "PRJ_NM": "Smart Help",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "CII, PCMS, HEDIS",
    "CURRENT_PHASE": "Production",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "NaT",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 14,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Pattabhi",
    "TGOV_NO": "TGOV0001300",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "Clara.ai",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "PT, Health OS, CII, HEDIS",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-12-24 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 15,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Manisha/Mike",
    "TGOV_NO": "TGOV0001254",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI / Bio BERT",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Chart Chase Clinical Summary",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "HEDIS,, Health OS",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 16,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Manisha/Mike",
    "TGOV_NO": "TGOV0001254",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI",
    "LLM_MODEL": "nan",
    "APP_TYPE": "TO",
    "PRJ_NM": "Chart Chase Explorer",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "Cost of Care",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 17,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Krishnan",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "Llama 3.1",
    "APP_TYPE": "TO",
    "PRJ_NM": "Intelligent Insight Explorer",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "CII",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-02-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 18,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Amin",
    "TGOV_NO": "TGOV0001188",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI",
    "LLM_MODEL": "nan",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "VBC Contract Ingestion and Simulation",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "PIMS",
    "CURRENT_PHASE": "Discovery",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 19,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Manisha/Mike",
    "TGOV_NO": "TGOV0001254",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI ",
    "LLM_MODEL": "nan",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "Risk Adjustment HCC Automation",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "Health OS",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-03-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 20,
    "MANAGER_NM": "Anil",
    "LEAD_NM": "Sucharitha M",
    "TGOV_NO": "TGOV0001349",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "Mistral 8B",
    "APP_TYPE": "SVRO",
    "PRJ_NM": "Mapsphere - Data Mapping Audit Automation",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "Data Exchange",
    "CURRENT_PHASE": "Testing ",
    "EKS_ENABLED_YN": "Yes ",
    "REACT_UI_ENABLED_YN": "Yes",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-12-24 00:00:00",
    "TARGET_USERS": "Business Analysts ",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 21,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji A / Siva",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "GitHub",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Github Copilot",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "In Progress",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 22,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji A / Tom",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Cortex Copilot",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "Elevance Enterprise ",
    "CURRENT_PHASE": "In Progress",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 23,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Madhu R",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Foundation  Assist ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 24,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Nihar T",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Framework Assist ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 25,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji A / Teja",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "ARB Assist ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Beta ",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 26,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji A / Pavan",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "GitHub",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "React JS UI Templates",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Production",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 27,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Kiran S / Vinay",
    "TGOV_NO": "TGOV0001317",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Privia ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Production",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2024-12-25 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 28,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Dolly A",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Architecture Assist ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 29,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Madhu R",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Mapper ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 30,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Madhu R",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Ospray ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "EDA Org",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 31,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji / Teja ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Genie",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 32,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Srihari / Siva ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Quality",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 33,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Srihari / Siva ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Automatic Onboarding",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 34,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Srihari / Siva ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Automatic Release Deployment",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 35,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Srihari / Siva ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Data Life Cycle Management ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 36,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Srihari / Siva ",
    "TGOV_NO": "TGOV0001243",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "Compute Optimization (EMR on EKS)",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "Build",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "2025-01-01 00:00:00",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 37,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji / Teja ",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "EDA Ontology - Knowledge Graph ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "nan",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "NaT",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 38,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "Balaji / Teja ",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Cortex",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "EDA Metaverse - Knowledge Graph ",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "nan",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "NaT",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 39,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "nan",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "Open AI ",
    "LLM_MODEL": "nan",
    "APP_TYPE": "EE",
    "PRJ_NM": "FHIR Chat",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "nan",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "NaT",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
  {
    "SL_NO": 40,
    "MANAGER_NM": "Sanjay",
    "LEAD_NM": "nan",
    "TGOV_NO": "nan",
    "APM_NO": "nan",
    "LLM_PLATFORM": "nan",
    "LLM_MODEL": "nan",
    "APP_TYPE": "nan",
    "PRJ_NM": "Digital Data Sandbox",
    "PRJ_DESC": "nan",
    "BASE_APLCTN_NM": "nan",
    "CURRENT_PHASE": "nan",
    "EKS_ENABLED_YN": "nan",
    "REACT_UI_ENABLED_YN": "nan",
    "AI_TASKFORCE_REVIEWED_YN": "nan",
    "AI_TASKFORCE_APPROVED_YN": "nan",
    "DEPLOYMENT_DT": "NaT",
    "TARGET_USERS": "nan",
    "COMMENTS": "nan"
  },
]
  

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

  const fetchProjectDetails = async () => {
    try {
      const initialProjects = await getAllProjectDetails();
      console.log("Project Details:", initialProjects);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
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
      <TableRow key={project.id} hover>
        {/* Key Projects / Milestone */}
        <TableCell>
          <Typography fontWeight="bold">{project.PRJ_NM}</Typography>
        </TableCell>

        {/* Assigned */}
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography fontWeight="bold">{project.LEAD_NM}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography fontWeight="bold">{project.MANAGER_NM}</Typography>
            </Box>
          </Box>
        </TableCell>

        {/* Status */}
        <TableCell>
          {editRowId === project.id ? (
            <TextField
              value={editedData.CURRENT_PHASE}
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

        {/* Domain */}
        <TableCell>
          {editRowId === project.id ? (
            <TextField
              value={editedData.LLM_PLATFORM}
              onChange={(e) => handleChange(e, "LLM_PLATFORM")}
              fullWidth
            />
          ) : (
            project.LLM_PLATFORM
          )}
        </TableCell>

        {/* Date */}
        <TableCell>
          {editRowId === project.id ? (
            <TextField
              type="date"
              value={editedData.DEPLOYMENT_DT}
              onChange={(e) => handleChange(e, "DEPLOYMENT_DT")}
              fullWidth
            />
          ) : (
            project.DEPLOYMENT_DT
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

// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for API calls
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   Avatar,
//   Chip,
//   IconButton,
//   TextField,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

// // Replace with your actual API base URL
// const Dashboard_BASE_URL = "https://your-api-url.com";

// export const getAllProjectDetails = async () => {
//   try {
//     const response = await axios.get(`${Dashboard_BASE_URL}/get_all_project_details/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching project details:", error);
//     throw error; // Re-throw the error to handle it in the calling component
//   }
// };


// const ProjectTable = () => {
//   const [projects, setProjects] = useState([]);
//   const [editRowId, setEditRowId] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const data = await getAllProjectDetails();
//         setProjects(data); // Update projects with API data
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching project details:", err);
//         setError("Failed to fetch project details.");
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);
  

//   const handleEdit = (id) => {
//     setEditRowId(id);
//     const projectToEdit = projects.find((proj) => proj.id === id);
//     setEditedData(projectToEdit);
//   };

//   const handleChange = (e, field) => {
//     setEditedData({ ...editedData, [field]: e.target.value });
//   };

//   const handleSave = () => {
//     const updatedProjects = projects.map((proj) =>
//       proj.id === editRowId ? editedData : proj
//     );
//     setProjects(updatedProjects);
//     setEditRowId(null);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 5 }}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Projects
//       </Typography>

//       <Paper elevation={3} sx={{ borderRadius: 3 }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold" }}>Assigned</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Key Projects/ Milestone</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {projects.map((project) => (
//                 <TableRow key={project.id} hover>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar src={project.avatar} alt={project.name} sx={{ mr: 2 }} />
//                       <Box>
//                         <Typography fontWeight="bold">{project.name}</Typography>
//                         <Typography color="text.secondary" variant="body2">
//                           {project.role}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </TableCell>

//                   <TableCell>
//                     {editRowId === project.id ? (
//                       <TextField
//                         value={editedData.project}
//                         onChange={(e) => handleChange(e, "project")}
//                         fullWidth
//                       />
//                     ) : (
//                       project.project
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     {editRowId === project.id ? (
//                       <TextField
//                         value={editedData.status}
//                         onChange={(e) => handleChange(e, "status")}
//                         fullWidth
//                       />
//                     ) : (
//                       <Chip
//                         label={project.status}
//                         color={
//                           project.status === "Completed"
//                             ? "success"
//                             : project.status === "In Progress"
//                             ? "warning"
//                             : "error"
//                         }
//                         variant="outlined"
//                       />
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     {editRowId === project.id ? (
//                       <TextField
//                         type="date"
//                         value={editedData.date}
//                         onChange={(e) => handleChange(e, "date")}
//                         fullWidth
//                       />
//                     ) : (
//                       project.date
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     {editRowId === project.id ? (
//                       <TextField
//                         value={editedData.priority}
//                         onChange={(e) => handleChange(e, "priority")}
//                         fullWidth
//                       />
//                     ) : (
//                       <Chip
//                         label={project.priority}
//                         color={
//                           project.priority === "Low"
//                             ? "success"
//                             : project.priority === "Medium"
//                             ? "warning"
//                             : "error"
//                         }
//                         variant="outlined"
//                       />
//                     )}
//                   </TableCell>

//                   <TableCell>
//                     {editRowId === project.id ? (
//                       <Button
//                         variant="contained"
//                         color="success"
//                         size="small"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSave}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <IconButton color="primary" onClick={() => handleEdit(project.id)}>
//                         <EditIcon />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };

// export default ProjectTable;
