import { Theme } from "@mui/material/styles";
import withStyles from '@mui/styles/withStyles';
import Button from "@mui/material/Button"

const SecondaryButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(Button)

export { SecondaryButton }
