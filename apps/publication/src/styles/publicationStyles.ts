import { makeStyles } from "@material-ui/core/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

export default useStyles
