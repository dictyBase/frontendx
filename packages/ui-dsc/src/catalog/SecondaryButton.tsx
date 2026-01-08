import { Theme } from "@mui/material/styles"
import { withStyles } from "tss-react/mui"
import Button from "@mui/material/Button"

const SecondaryButton = withStyles(Button, (theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))

export { SecondaryButton }
