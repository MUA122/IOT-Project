import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import SensorsIcon from "@mui/icons-material/Sensors";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimelineIcon from "@mui/icons-material/Timeline";
import ShieldIcon from "@mui/icons-material/Shield";
import type { DashboardStats, SensorReading } from "../types/sensors";

interface DashboardProps {
  mq2Reading: SensorReading;
  flameReading: SensorReading;
  stats: DashboardStats;
}

const Dashboard: React.FC<DashboardProps> = ({
  mq2Reading,
  flameReading,
  stats,
}) => {
  const resolveChipColor = (status: SensorReading["status"]) => {
    switch (status) {
      case "safe":
        return "success";
      case "warning":
        return "warning";
      case "danger":
        return "error";
      default:
        return "default";
    }
  };

  const resolveStatusLabel = (status: SensorReading["status"]) => {
    switch (status) {
      case "safe":
        return "Safe";
      case "warning":
        return "Warning";
      case "danger":
        return "Danger";
      default:
        return "Unknown";
    }
  };

  const cardBaseStyles = {
    background:
      "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 55%)",
    borderRadius: 3,
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
    overflow: "hidden",
    position: "relative" as const,
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      opacity: 0,
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.15), transparent 60%)",
      transition: "opacity 0.25s ease",
      pointerEvents: "none" as const,
    },
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 28px 70px rgba(0,0,0,0.6)",
      borderColor: "rgba(255,255,255,0.35)",
      "&::before": {
        opacity: 1,
      },
    },
  };

  const systemStatusColor = resolveChipColor(stats.systemStatus);
  const systemStatusLabel = resolveStatusLabel(stats.systemStatus);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        background: `radial-gradient(circle at top, rgba(25,118,210,0.4), transparent 55%), radial-gradient(circle at bottom, rgba(255,112,67,0.28), #050713)`,
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
              Realtime Monitoring
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", maxWidth: 420 }}
            >
              Live status of the fire and smoke detection system with sensor
              insights and safety indicators.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              px: 2.5,
              py: 1.5,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(5,7,19,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase", opacity: 0.7 }}
              >
                System Status
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {systemStatusLabel}
              </Typography>
            </Box>
            <Chip
              size="small"
              color={systemStatusColor}
              label={`${stats.uptimePercentage.toFixed(1)}% Uptime`}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
            mb: 3,
          }}
        >
          <Card sx={cardBaseStyles}>
            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Box>
                  <Typography variant="overline" sx={{ opacity: 0.7 }}>
                    Gas Sensor
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    MQ-2 Smoke & Gas
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  color={resolveChipColor(mq2Reading.status)}
                  label={resolveStatusLabel(mq2Reading.status)}
                />
              </Stack>

              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {mq2Reading.value.toFixed(0)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.75, textTransform: "uppercase" }}
                >
                  {mq2Reading.unit}
                </Typography>
              </Stack>

              <Typography variant="caption" sx={{ mt: 1, opacity: 0.7 }}>
                Last updated: {mq2Reading.updatedAt}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", opacity: 0.7 }}
              >
                Safe Range (0-35 PPM)
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <TimelineIcon
                    fontSize="small"
                    sx={{ mr: 0.5, opacity: 0.8 }}
                  />
                  Relative level vs. safety threshold
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, mq2Reading.value)}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                />
              </Box>
            </CardContent>

            <Box
              sx={{
                position: "absolute",
                inset: "auto 0 0 auto",
                width: 140,
                height: 140,
                opacity: 0.16,
                background:
                  "radial-gradient(circle at center, #ff7043, transparent 60%)",
              }}
            />
          </Card>

          <Card sx={cardBaseStyles}>
            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Box>
                  <Typography variant="overline" sx={{ opacity: 0.7 }}>
                    Flame Sensor
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    IR Flame Detection
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  color={resolveChipColor(flameReading.status)}
                  label={resolveStatusLabel(flameReading.status)}
                />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,112,67,0.16)",
                    border: "1px solid rgba(255,112,67,0.35)",
                  }}
                >
                  <LocalFireDepartmentIcon
                    sx={{ fontSize: 32, color: "#ff8a65" }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Flame detected:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {flameReading.value > 0 ? "Yes" : "No"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 0.5, opacity: 0.7 }}
                  >
                    Last updated: {flameReading.updatedAt}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Raw sensor value: {flameReading.value.toFixed(0)}
                </Typography>
              </Box>
            </CardContent>

            <Box
              sx={{
                position: "absolute",
                inset: "0 auto auto 0",
                width: 150,
                height: 150,
                opacity: 0.18,
                background:
                  "radial-gradient(circle at center, #ff5252, transparent 60%)",
              }}
            />
          </Card>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <Card sx={cardBaseStyles}>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    backgroundColor: "rgba(76,175,80,0.18)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SensorsIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Alerts today
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {stats.alertsToday}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={cardBaseStyles}>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    backgroundColor: "rgba(255,179,0,0.18)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TimelineIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Incidents this week
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {stats.incidentsThisWeek}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={cardBaseStyles}>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    backgroundColor: "rgba(25,118,210,0.25)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ShieldIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Overall system status
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {systemStatusLabel}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
