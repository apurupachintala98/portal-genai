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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../services/apiService";

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
  const [editedRow, setEditedRow] = useState(null); // For editing row
  const [isNewRow, setIsNewRow] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiService.getAllProjectDetails();
        setProjects(data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    setEditRowId(id);
    const projectToEdit = projects.find((proj) => proj.SL_NO === id);
    setEditedData({ ...projectToEdit });
  };

  const handleDeleteClick = (id) => {
    setProjects((prevProjects) => prevProjects.filter((proj) => proj.SL_NO !== id));
  };

  const handleAddClick = () => {
    setIsNewRow(true);
    setEditedRow({ SL_NO: projects.length + 1, PRJ_NM: "", LEAD_NM: "", MANAGER_NM: "", CURRENT_PHASE: "", LLM_PLATFORM: "", DEPLOYMENT_DT: "" });
  };

  const handleFieldChange = (field, value) => {
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };


  const handleEditClick = (id) => {
    setEditedRow(id);
  };

  const handleSaveClick = () => {
    setProjects((prevProjects) => {
      if (isNewRow) {
        // Add the new project
        return [...prevProjects, { SL_NO: prevProjects.length + 1, ...editedRow }];
      } else {
        // Update the edited project
        return prevProjects.map((proj) =>
          proj.SL_NO === editedRow.id ? { ...proj, ...editedRow } : proj
        );
      }
    });
    setEditedRow(null);
    setIsNewRow(false);
  };

  const handleSave = (id) => {
    if (isNewRow) {
      // Add the new project to the table
      setProjects((prev) => [...prev, { ...editedData, SL_NO: projects.length + 1 }]);
      setIsNewRow(false);
    } else {
      // Update the existing project
      const updatedProjects = projects.map((proj) =>
        proj.SL_NO === id ? { ...proj, ...editedData } : proj
      );
      setProjects(updatedProjects);
    }

    setEditRowId(null);
    setEditedData({});
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter((proj) => proj.SL_NO !== id);
    setProjects(updatedProjects);
    setEditRowId(null);
  };


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
                    onClick={() => handleEdit(project.SL_NO)}
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
</Paper>


    </Box>
  );
};

export default ProjectTable;