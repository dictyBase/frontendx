import { createMuiTheme } from "@material-ui/core/styles"

// create theme with our inner tab overrides
export const goTabTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#e6f2ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
  },
})
