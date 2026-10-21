import { Theme } from "@mui/material/styles"
import { withStyles } from "tss-react/mui"
import Button from "@mui/material/Button"

const SecondaryButton = withStyles(Button, (theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

export { SecondaryButton }
