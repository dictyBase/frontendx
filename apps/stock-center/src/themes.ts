import { createTheme, ThemeOptions } from "@mui/material/styles"

const primaryColor = "#004080"
const blueSecondaryColor = "#001b53"

const navTheme = {
  primary: primaryColor,
  secondary: blueSecondaryColor,
}

const footerTheme = {
  primary: primaryColor,
  secondary: "#ebe97a",
  text: "#d8d8d8",
}

const headerTheme = {
  primary: primaryColor,
  secondary: blueSecondaryColor,
  text: primaryColor,
}

const catalogThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#3182ce",
      light: "#5ea0e8",
      dark: "#2c5282",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e53e3e",
      light: "#f59e0b",
      dark: "#c53030",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
      disabled: "#a0aec0",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      color: "#1a202c",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#1a202c",
    },
    body1: {
      fontSize: "14px",
      color: "#4a5568",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "13px",
      color: "#718096",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    caption: {
      fontSize: "12px",
      color: "#718096",
      fontWeight: 600,
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: 600,
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          background: "#3182ce",
          color: "#ffffff",
          "&:hover": {
            background: "#2c5282",
          },
        },
        outlined: {
          borderColor: "#e2e8f0",
          color: "#4a5568",
          "&:hover": {
            background: "#f7fafc",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px 24px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "15px",
        },
        input: {
          padding: "12px 16px",
          "&::placeholder": {
            color: "#a0aec0",
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3182ce",
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: "#e2e8f0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#e3f3ff",
          position: "sticky",
          top: 0,
          zIndex: 2,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "16px 20px",
          fontSize: "13px",
          fontWeight: 500,
          color: "#4a5568",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          borderBottomColor: "#e2e8f0",
          borderBottomWidth: "2px",
        },
        body: {
          padding: "20px",
          fontSize: "14px",
          color: "#4a5568",
          borderBottomColor: "#f1f3f5",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "all 0.15s",
          "&:hover": {
            backgroundColor: "#f7fafc",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          width: "18px",
          height: "18px",
          padding: 0,
          color: "#cbd5e0",
          "&.Mui-checked": {
            color: "#3182ce",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          color: "#cbd5e0",
          "&.Mui-checked": {
            color: "#3182ce",
          },
        },
      },
    },
  },
}

const catalogTheme = createTheme(catalogThemeOptions)

export { catalogTheme, navTheme, footerTheme, headerTheme }
