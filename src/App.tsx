// src/App.tsx
import React from "react";
import { ThemeProvider, CssBaseline, Divider, Box } from "@mui/material";
import RB from "./img/RB.png";
import MyPic from "./img/myPic2.png";
import OA from "./img/OA.png";
import MK from "./img/MK.png";
import MM from "./img/MM.png";
import SG from "./img/SG.png";
import { theme } from "./theme";
import NavBar from "./components/Nav";
import Dashboard from "./components/dashboard";
import SensorCharts from "./components/SensorCharts";
import TeamMembers from "./components/TeamMember";

const App: React.FC = () => {
  const mq2History = [
    { time: "1:20", value: 35 },
    { time: "1:21", value: 42 },
    { time: "1:22", value: 50 },
    { time: "1:23", value: 60 },
    { time: "1:24", value: 65 },
    { time: "1:25", value: 58 },
  ];

  const flameHistory = [
    { time: "1:20", flame: 0 },
    { time: "1:21", flame: 0 },
    { time: "1:22", flame: 1 },
    { time: "1:23", flame: 1 },
    { time: "1:24", flame: 0 },
    { time: "1:25", flame: 0 },
  ];

  const mq2Reading = {
    id: "mq2",
    label: "MQ-2 Gas Sensor",
    value: 65,
    unit: "ppm",
    status: "warning" as const,
    updatedAt: new Date().toLocaleTimeString(),
  };

  const flameReading = {
    id: "flame",
    label: "Flame Sensor",
    value: 1,
    unit: "bool",
    status: "danger" as const,
    updatedAt: new Date().toLocaleTimeString(),
  };

  const stats = {
    systemStatus: "danger" as const,
    alertsToday: 3,
    incidentsThisWeek: 5,
    uptimePercentage: 99.2,
  };
  const teamMembers = [
    {
      id: 1,
      name: "Eng. Rahma Badar",
      role: "IoT Instructor",
      image: RB,
    },
    {
      id: 2,
      name: "Mahmoud Usama",
      role: "Frontend Developer",
      image: MyPic,
    },
    {
      id: 3,
      name: "Omar Abdelaal",
      role: "Backend Developer",
      image: OA,
    },
    {
      id: 4,
      name: "Mariam Khalil",
      role: "IoT Hardware Specialist",
      image: MK,
    },
    {
      id: 5,
      name: "Menna Mostafa",
      role: "IoT Software Specialist",
      image: MM,
    },
    {
      id: 6,
      name: "Samira Gamal",
      role: "IoT Software Specialist",
      image: SG,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <NavBar />

      {/* Dashboard */}
      <Box id="dashboard-section">
        <Dashboard
          mq2Reading={mq2Reading}
          flameReading={flameReading}
          stats={stats}
        />
      </Box>
      <Divider />

      {/* Charts Section */}
      <Box id="charts-section">
        <SensorCharts mq2History={mq2History} flameHistory={flameHistory} />
      </Box>
      <Divider />
      <Box id="about-section">
        <TeamMembers members={teamMembers} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
