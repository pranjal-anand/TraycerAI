"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#14a098",
      light: "#cccccc",
    },
    secondary: {
      main: "#cb2d6f",
      light: "#501f3a",
    },
    background: {
      default: "#0f292f",
      paper: "#501f3a",
    },
    text: {
      primary: "#cccccc",
      secondary: "#14a098",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { color: "#cb2d6f", fontWeight: 700 },
    h6: { color: "#cccccc" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#501f3a",
          border: "1px solid #14a098",
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#14a098",
          color: "#cccccc",
          "&:hover": {
            backgroundColor: "#cb2d6f",
            color: "#0f292f",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#501f3a",
            "& fieldset": {
              borderColor: "#14a098",
            },
            "&:hover fieldset": {
              borderColor: "#cb2d6f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#cb2d6f",
            },
          },
          "& .MuiInputBase-input": {
            color: "#cccccc",
          },
          "& .MuiInputLabel-root": {
            color: "#cccccc",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(203, 45, 111, 0.2)",
          },
        },
      },
    },
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
