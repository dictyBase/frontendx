import { createMuiTheme } from "@material-ui/core/styles"

// create theme with our inner tab overrides
export const goTabTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
      // leaving this as an example of how to change selected tab properties
      // selected: {
      //   backgroundColor: "#f2f1ef",
      // },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#e6f2ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
        height: "3px",
      },
    },
  },
})
