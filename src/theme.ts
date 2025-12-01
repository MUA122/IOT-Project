// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // Deep blue
    },
    secondary: {
      main: "#ff7043", // Warm orange
    },
    background: {
      default: "#0b1020",
      paper: "#14182b",
    },
    error: {
      main: "#ff5252",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ffb300",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    h5: {
      fontWeight: 600,
    },
  },
});
