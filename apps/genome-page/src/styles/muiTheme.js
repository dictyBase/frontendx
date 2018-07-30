import { createMuiTheme } from "@material-ui/core/styles"

// create theme with our standard tab overrides
const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#a3bae9",
        color: "#000",
      },
    },
  },
})

export default muiTheme
