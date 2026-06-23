// Isolated theme object for DSC homepage redesign
// This does NOT modify the global application theme

export const dscHomeTheme = {
  colors: {
    primary: "#004080",
    primaryLight: "#0066cc",
    primaryDark: "#003060",
    warning: "#ffc107",
    warningLight: "#fff3cd",
    textPrimary: "#333",
    textSecondary: "#555",
    textTertiary: "#666",
    background: "#f5f7fa",
    cardBackground: "#ffffff",
  },
  spacing: (multiplier: number) => `${multiplier * 8}px`, // 1 = 8px, 2 = 16px
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.08)",
    cardHover: "0 8px 16px rgba(0,64,128,0.15)",
  },
  breakpoints: {
    xs: "0px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
} as const
