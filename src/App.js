import React, { useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import SignUp from "./components/SignUp";
import LlmGateway from "./pages/LlmGateway";
import RedirectComponent from './components/RedirectComponent';

function SettingsButton({ primaryColor, setSettingsOpen }) {
  const location = useLocation();

  // Show only on "/dashboard"
  if (location.pathname !== "/dashboard") return null;

  return (
    <IconButton
      onClick={() => setSettingsOpen(true)}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        backgroundColor: primaryColor,
        color: "white",
        borderRadius: "50%",
        boxShadow: 3,
        animation: "rotation 2s linear infinite",
        "@keyframes rotation": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    >
      <SettingsIcon />
    </IconButton>
  );
}

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#1a3673");
  const [sidebarType, setSidebarType] = useState("full");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: primaryColor },
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <Home />
            }
          />
          <Route
            path="/dashboard"
            element={
                <Dashboard
                  toggleTheme={toggleTheme}
                  theme={themeMode}
                  sidebarType={sidebarType}
                  setSidebarType={setSidebarType}
                  primaryColor={primaryColor}
                />
            }
          />
           <Route
            path="/llm-gateway"
            element={
             <LlmGateway />
            }
          />

          <Route path="/hedis" element={<RedirectComponent src="http://10.126.192.122:3020/" />} />
          <Route path="/safety-net" element={<RedirectComponent src="http://10.126.192.122:3010/" />} />
          <Route path="/arb-scheduler" element={<RedirectComponent src="https://arbassist.edagenaidev.awsdns.internal.das/" />} />
          <Route path="/arb-assist" element={<RedirectComponent src="https://arbassist.edagenaidev.awsdns.internal.das/" />} />
          <Route path="/data-genie" element={<RedirectComponent src="http://10.126.192.122:3040/" />} />
          <Route path="/conversational-chat" element={<RedirectComponent src="http://10.126.192.122:3050/" />} />
          <Route path="/fhir-chat" element={<RedirectComponent src="http://10.126.192.122:3090/" />} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>

        {/* Settings Drawer */}
        <Settings
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          toggleTheme={toggleTheme}
          setPrimaryColor={setPrimaryColor}
          setSidebarType={setSidebarType}
          theme={themeMode}
          sidebarType={sidebarType}
        />

        {/* Settings Button: Appears only on the dashboard */}
        <SettingsButton
          primaryColor={primaryColor}
          setSettingsOpen={setSettingsOpen}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
