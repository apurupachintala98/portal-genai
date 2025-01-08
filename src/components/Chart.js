import React, { useEffect, useRef, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, Select, MenuItem } from "@mui/material";

const oldData = [
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
const projectData = [
    // Use the provided dataset or limit it to the first 15 items
    ...oldData.slice(0, 15),
];

// Helper function to check if a field is numeric
const isNumericField = (field) => {
    return projectData.some((item) => !isNaN(parseFloat(item[field])));
};

// Chart Component
// const Chart = ({ theme, themeColor }) => {
//     const chartRef = useRef(null);

//     // Extract available fields
//     const fields = Object.keys(projectData[0]);

//     // Filter dropdown options
//     const xAxisOptions = fields.filter((field) => projectData.some((item) => item[field]));
//     const yAxisOptions = fields.filter(isNumericField);

//     // Default selected fields
//     const [xAxisField, setXAxisField] = useState(xAxisOptions[3]);
//     const [yAxisField, setYAxisField] = useState(yAxisOptions[0]);
//     const [chartType, setChartType] = useState("column"); // Default chart type

//     // Chart options
//     const chartOptions = useMemo(
//         () => ({
//             chart: {
//                 type: chartType,
//                 backgroundColor: theme === "light" ? "#ffffff" : "#333333",
//             },
//             title: { text: "Pictorial Representation of Projects" },
//             credits: { enabled: false },
//             xAxis: {
//                 categories: projectData.map((item) => item[xAxisField]),
//                 title: { text: xAxisField },
//                 labels: {
//                     style: { color: theme === "light" ? "#333333" : "#ffffff" },
//                 },
//             },
//             yAxis: {
//                 title: { text: yAxisField, style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//                 labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
//             },
//             series: [
//                 {
//                     name: yAxisField,
//                     data: projectData.map((item) => parseFloat(item[yAxisField]) || 0),
//                     color: themeColor,
//                 },
//             ],
//         }),
//         [xAxisField, yAxisField, theme, themeColor, chartType]
//     );

//     // Update chart dynamically
//     useEffect(() => {
//         if (chartRef.current) {
//             const chart = chartRef.current.chart;
//             chart.update(chartOptions, true, true);
//         }
//     }, [chartOptions]);

//     return (
//         <Box sx={{ p: 3 }}>
//             <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>

//                 {/* Dropdowns */}
//                 <Box display="flex" gap={2} mb={2}>
//                     {/* X-Axis Dropdown */}
//                     <Select
//                         value={xAxisField}
//                         onChange={(e) => setXAxisField(e.target.value)}
//                         size="small"
//                         variant="outlined"
//                     >
//                         {xAxisOptions.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 X-Axis: {option}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     {/* Y-Axis Dropdown */}
//                     <Select
//                         value={yAxisField}
//                         onChange={(e) => setYAxisField(e.target.value)}
//                         size="small"
//                         variant="outlined"
//                     >
//                         {yAxisOptions.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 Y-Axis: {option}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     {/* Chart Type Dropdown */}
//                     <Select
//                         value={chartType}
//                         onChange={(e) => setChartType(e.target.value)}
//                         size="small"
//                         variant="outlined"
//                     >
//                         <MenuItem value="pie">Variable Radius Pie</MenuItem>
//                         <MenuItem value="line">Line Chart</MenuItem>
//                         <MenuItem value="area">Area Chart</MenuItem>
//                         <MenuItem value="bar">Basic Bar Chart</MenuItem>
//                         <MenuItem value="column">Basic Column Chart</MenuItem>
//                     </Select>
//                 </Box>

//                 {/* Chart */}
//                 <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
//             </Paper>
//         </Box>
//     );
// };

const Chart = ({ theme, themeColor }) => {
  const chartRef = useRef(null);

  // Extract available fields
  const fields = Object.keys(projectData[0]);

  // Define allowed X-axis options
  const allowedXAxisFields = [
      "PRJ_NM",
      "MANAGER_NM",
      "DEPLOYMENT_DT",
      "LEAD_NM",
      "LLM_PLATFORM",
      "CURRENT_PHASE",
  ];

  // Filter dropdown options
  const xAxisOptions = fields.filter(
      (field) => allowedXAxisFields.includes(field)
  );
  const yAxisOptions = fields.filter(isNumericField);

  // Default selected fields
  const [xAxisField, setXAxisField] = useState(xAxisOptions[0]); // Default to the first allowed option
  const [yAxisField, setYAxisField] = useState(yAxisOptions[0]);
  const [chartType, setChartType] = useState("column"); // Default chart type

  // Chart options
  const chartOptions = useMemo(
      () => ({
          chart: {
              type: chartType,
              backgroundColor: theme === "light" ? "#ffffff" : "#333333",
          },
          title: { text: "Pictorial Representation of Projects" },
          credits: { enabled: false },
          xAxis: {
              categories: projectData.map((item) => item[xAxisField]),
              title: { text: xAxisField },
              labels: {
                  style: { color: theme === "light" ? "#333333" : "#ffffff" },
              },
          },
          yAxis: {
              title: { text: yAxisField, style: { color: theme === "light" ? "#333333" : "#ffffff" } },
              labels: { style: { color: theme === "light" ? "#333333" : "#ffffff" } },
          },
          series: [
              {
                  name: yAxisField,
                  data: projectData.map((item) => parseFloat(item[yAxisField]) || 0),
                  color: themeColor,
              },
          ],
      }),
      [xAxisField, yAxisField, theme, themeColor, chartType]
  );

  // Update chart dynamically
  useEffect(() => {
      if (chartRef.current) {
          const chart = chartRef.current.chart;
          chart.update(chartOptions, true, true);
      }
  }, [chartOptions]);

  return (
      <Box sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Pictorial Representation of Projects
              </Typography>

              {/* Dropdowns */}
              <Box display="flex" gap={2} mb={2}>
                  {/* X-Axis Dropdown */}
                  <Select
                      value={xAxisField}
                      onChange={(e) => setXAxisField(e.target.value)}
                      size="small"
                      variant="outlined"
                  >
                      {xAxisOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                              X-Axis: {option}
                          </MenuItem>
                      ))}
                  </Select>

                  {/* Y-Axis Dropdown */}
                  <Select
                      value={yAxisField}
                      onChange={(e) => setYAxisField(e.target.value)}
                      size="small"
                      variant="outlined"
                  >
                      {yAxisOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                              Y-Axis: {option}
                          </MenuItem>
                      ))}
                  </Select>

                  {/* Chart Type Dropdown */}
                  <Select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value)}
                      size="small"
                      variant="outlined"
                  >
                      <MenuItem value="pie">Variable Radius Pie</MenuItem>
                      <MenuItem value="line">Line Chart</MenuItem>
                      <MenuItem value="area">Area Chart</MenuItem>
                      <MenuItem value="bar">Basic Bar Chart</MenuItem>
                      <MenuItem value="column">Basic Column Chart</MenuItem>
                  </Select>
              </Box>

              {/* Chart */}
              <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
          </Paper>
      </Box>
  );
};

export default Chart;
