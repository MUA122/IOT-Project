import React from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Label,
} from "recharts";

interface MQ2DataPoint {
  time: string;
  value: number;
}

interface FlameDataPoint {
  time: string;
  flame: number;
}

interface SensorChartsProps {
  mq2History: MQ2DataPoint[];
  flameHistory: FlameDataPoint[];
}

const SensorCharts: React.FC<SensorChartsProps> = ({
  mq2History,
  flameHistory,
}) => {
  const theme = useTheme();

  const cardStyle = {
    background:
      "radial-gradient(circle at top, rgba(255,255,255,0.06), rgba(0,0,0,0.25))",
    borderRadius: 3,
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.55)",
    transition: "0.25s",
    "&:hover": {
      transform: "translateY(-6px)",
      borderColor: "rgba(255,255,255,0.25)",
    },
  };

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        margin: 2,
      }}
    >
      {/* MQ-2 Chart */}
      <Card sx={{ ...cardStyle, mb: 4, width: "600px", height: "400px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            MQ-2 Gas Level (History)
          </Typography>

          <Box sx={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={mq2History}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis dataKey="time" tick={{ fill: "#ccc", fontSize: 11 }}>
                  <Label value="Time " offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis tick={{ fill: "#ccc", fontSize: 11 }} domain={[0, 100]}>
                  <Label value="Value " offset={-5} position="insideLeft" />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#14182b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Flame Sensor Chart */}
      <Card sx={{ ...cardStyle, mb: 4, width: "600px", height: "400px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Flame Sensor Detection (History)
          </Typography>

          <Box sx={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={flameHistory}>
                <defs>
                  <linearGradient
                    id="flameGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={theme.palette.error.main}
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="100%"
                      stopColor={theme.palette.error.main}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" tick={{ fill: "#ccc", fontSize: 11 }}>
                  <Label value="Time " offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis tick={{ fill: "#ccc", fontSize: 11 }} domain={[0, 1]}>
                  <Label value="Value " offset={-5} position="insideLeft" />
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#14182b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />

                <Area
                  type="monotone"
                  dataKey="flame"
                  stroke={theme.palette.error.main}
                  fill="url(#flameGradient)"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SensorCharts;
